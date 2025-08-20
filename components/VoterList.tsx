import React from 'react';
import { Voter } from '../types';
import VoterCard from './VoterCard';

interface VoterListProps {
  voters: Voter[];
  onToggleVoteStatus: (voterId: number) => void;
  onSendReminder: (voterName: string) => void;
  expandedVoterId: number | null;
  onSetExpandedVoterId: (id: number | null) => void;
}

const VoterList: React.FC<VoterListProps> = ({
  voters,
  onToggleVoteStatus,
  onSendReminder,
  expandedVoterId,
  onSetExpandedVoterId,
}) => {
  if (voters.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">No se encontraron votantes</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Intente ajustar su búsqueda o filtros.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {voters.map((voter) => (
        <VoterCard
          key={voter.id}
          voter={voter}
          onToggleVoteStatus={onToggleVoteStatus}
          onSendReminder={onSendReminder}
          expandedVoterId={expandedVoterId}
          onSetExpandedVoterId={onSetExpandedVoterId}
        />
      ))}
    </div>
  );
};

export default VoterList;