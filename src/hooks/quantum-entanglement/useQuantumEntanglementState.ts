
import { useState } from 'react';
import { EntanglementState, UserProfile } from '@/hooks/types/quantum-entanglement';

export const useQuantumEntanglementState = () => {
  // Initialize state with default values
  const [entanglementState, setEntanglementState] = useState<EntanglementState>({
    nodes: [],
    edges: [],
    selectedNode: null,
    stats: {
      bandwidth: 85,
      latency: 12,
      coherence: 0.95,
      entanglementStrength: 0.87
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: 'user-1',
    name: 'Zade',
    resonanceLevel: 0.92,
    entanglementQuotient: 0.85
  });

  return {
    entanglementState,
    setEntanglementState,
    userProfile,
    setUserProfile
  };
};

export default useQuantumEntanglementState;
