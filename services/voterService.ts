import { Voter } from '../types.ts';
import { mockVoters } from '../data/mockVoters.ts';

const STORAGE_KEY = 'voters';
const SIMULATED_DELAY = 500; // ms

// Helper function to get voters from localStorage
const getStoredVoters = (): Voter[] => {
  try {
    const storedVoters = localStorage.getItem(STORAGE_KEY);
    if (storedVoters) {
      return JSON.parse(storedVoters);
    }
  } catch (error) {
    console.error("Error reading voters from localStorage", error);
    localStorage.removeItem(STORAGE_KEY); // Clear corrupted data
  }
  // If nothing is in localStorage, initialize it with mock data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mockVoters));
  return mockVoters;
};

// Helper function to save voters to localStorage
const saveStoredVoters = (voters: Voter[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(voters));
};

export const voterService = {
  getVoters: (): Promise<Voter[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getStoredVoters());
      }, SIMULATED_DELAY);
    });
  },

  updateVoterStatus: (voterId: number, hasVoted: boolean): Promise<Voter> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const voters = getStoredVoters();
        const voterIndex = voters.findIndex(v => v.id === voterId);

        if (voterIndex === -1) {
          return reject(new Error('Voter not found'));
        }

        const updatedVoter = {
          ...voters[voterIndex],
          haVotado: hasVoted,
          horaVoto: hasVoted ? new Date().toISOString() : null,
        };

        voters[voterIndex] = updatedVoter;
        saveStoredVoters(voters);
        
        resolve(updatedVoter);
      }, SIMULATED_DELAY);
    });
  },
};