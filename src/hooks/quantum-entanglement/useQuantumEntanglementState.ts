
import { useState } from 'react';
import { EntityProfile, EntanglementState } from '../types/quantum-entanglement';

export function useQuantumEntanglementState(userId: string) {
  const [entanglementState, setEntanglementState] = useState<EntanglementState>({
    active: false,
    strength: 0,
    entangledWith: null,
    emotion: 'neutral'
  });
  
  const [userProfile, setUserProfile] = useState<EntityProfile>({
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
