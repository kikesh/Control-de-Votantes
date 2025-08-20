import React, { useState, useMemo, useEffect } from 'react';
import { Voter } from './types';
import { voterService } from './services/voterService';
import Header from './components/Header';
import Summary from './components/Summary';
import Statistics from './components/Statistics';
import SearchBar from './components/SearchBar';
import VoterList from './components/VoterList';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';
import SyncError from './components/SyncError';

export type AffiliationFilter = 'all' | 'affiliated' | 'not_affiliated';
export type VotingFilter = 'all' | 'voted' | 'not_voted';

const App: React.FC = () => {
  const [voters, setVoters] = useState<Voter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [affiliationFilter, setAffiliationFilter] = useState<AffiliationFilter>('all');
  const [votingFilter, setVotingFilter] = useState<VotingFilter>('all');
  const [centerFilter, setCenterFilter] = useState<string>('all');
  const [expandedVoterId, setExpandedVoterId] = useState<number | null>(null);

  // Effect to fetch initial data
  useEffect(() => {
    voterService.getVoters()
      .then(initialVoters => {
        setVoters(initialVoters);
      })
      .catch(() => {
        setError("No se pudo cargar la lista de votantes. Por favor, recargue la página.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  // Effect to listen for changes from other tabs (simulating other users)
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'voters' && event.newValue) {
        try {
          const updatedVoters = JSON.parse(event.newValue);
          setVoters(updatedVoters);
        } catch (e) {
            console.error("Failed to parse voters from storage event", e);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleToggleVoteStatus = (voterId: number) => {
    const voter = voters.find(v => v.id === voterId);
    if (!voter) return;

    const newVoteStatus = !voter.haVotado;
    const originalVoters = voters;

    // Optimistic UI update
    const updatedVoters = voters.map(v => 
        v.id === voterId 
          ? { ...v, haVotado: newVoteStatus, horaVoto: newVoteStatus ? new Date().toISOString() : null } 
          : v
      );
    setVoters(updatedVoters);

    voterService.updateVoterStatus(voterId, newVoteStatus)
      .then(updatedVoterFromServer => {
        // The optimistic update was successful. We can update with the server's confirmed data (e.g., precise timestamp)
        setVoters(prev => prev.map(v => v.id === updatedVoterFromServer.id ? updatedVoterFromServer : v));
      })
      .catch(() => {
        // Revert on error
        setSyncError(`No se pudo actualizar el estado de ${voter.nombre}. Inténtelo de nuevo.`);
        setVoters(originalVoters);
      });
  };

  const handleSendReminder = (voterName: string) => {
    // In a real app, this would trigger an email or SMS.
    // For this example, we'll just show an alert with a custom message.
    const message = `¡Hola ${voterName}! Te recordamos que la jornada de votación sigue abierta. ¡Tu participación es muy importante!`;
    alert(message);
  };
  
  const uniqueCenters = useMemo(() => {
    const centers = new Set(voters.map(voter => voter.centroVotacion));
    return Array.from(centers).sort();
  }, [voters]);

  const filteredVoters = useMemo(() => {
    return voters
      .filter(voter => {
        if (affiliationFilter === 'affiliated' && !voter.afiliadoUGT) {
          return false;
        }
        if (affiliationFilter === 'not_affiliated' && voter.afiliadoUGT) {
          return false;
        }
        if (votingFilter === 'voted' && !voter.haVotado) {
          return false;
        }
        if (votingFilter === 'not_voted' && voter.haVotado) {
          return false;
        }
        if (centerFilter !== 'all' && voter.centroVotacion !== centerFilter) {
            return false;
        }
        return true;
      })
      .filter(voter => {
        const lowerCaseSearchTerm = searchTerm.toLowerCase();
        return (
          voter.nombre.toLowerCase().includes(lowerCaseSearchTerm) ||
          voter.apellido.toLowerCase().includes(lowerCaseSearchTerm) ||
          (voter.apellido2 && voter.apellido2.toLowerCase().includes(lowerCaseSearchTerm)) ||
          voter.telefono.includes(searchTerm) ||
          voter.email.toLowerCase().includes(lowerCaseSearchTerm)
        );
      });
  }, [voters, searchTerm, affiliationFilter, votingFilter, centerFilter]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-8">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans">
      <Header />
      <main className="container mx-auto p-4 md:p-8">
         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 xl:col-span-3 space-y-6">
              <Summary voters={voters} />
              <Statistics voters={voters} />
            </div>
            <div className="lg:col-span-8 xl:col-span-9 space-y-6">
               <SearchBar
                searchTerm={searchTerm}
                onSearchTermChange={setSearchTerm}
                affiliationFilter={affiliationFilter}
                onAffiliationFilterChange={setAffiliationFilter}
                votingFilter={votingFilter}
                onVotingFilterChange={setVotingFilter}
                centerFilter={centerFilter}
                onCenterFilterChange={setCenterFilter}
                centers={uniqueCenters}
              />
              <VoterList
                voters={filteredVoters}
                onToggleVoteStatus={handleToggleVoteStatus}
                onSendReminder={handleSendReminder}
                expandedVoterId={expandedVoterId}
                onSetExpandedVoterId={setExpandedVoterId}
              />
            </div>
          </div>
      </main>
      <SyncError message={syncError} onClose={() => setSyncError(null)} />
    </div>
  );
};

export default App;
