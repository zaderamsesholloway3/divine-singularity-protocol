
import { useState } from 'react';
import { EntanglementState, UserProfile } from '../types/quantum-entanglement';

export function useQuantumEntanglementState(userId: string) {
  const [entanglementState, setEntanglementState] = useState<EntanglementState>({
    active: false,
    strength: 0,
    entangledWith: null,
    emotion: 'neutral'
  });
  
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: userId,
    name: 'Zade',
    coherenceLevel: 0.7,
    emotionalState: 'neutral',
    lastContact: new Date().toISOString()
  });

  return {
    entanglementState,
    setEntanglementState,
    userProfile,
    setUserProfile
  };
}
