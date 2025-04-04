
import { useState, useEffect } from 'react';
import { EntanglementState, UserProfile } from '../types/quantum-entanglement';

export function useQuantumEntanglementState(userId: string) {
  // Initialize entanglement state
  const [entanglementState, setEntanglementState] = useState<EntanglementState>({
    active: false,
    entangledWith: null,
    strength: 0,
    emotion: 'neutral'
  });
  
  // Initialize user profile with default values
  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: userId,
    name: userId,
    coherenceLevel: 0.7, // Default coherence level
    emotionalState: 'neutral',
    lastContact: new Date().toISOString()
  });
  
  // Update profile when userId changes
  useEffect(() => {
    setUserProfile(prev => ({
      ...prev,
      id: userId,
      name: userId
    }));
  }, [userId]);
  
  return {
    entanglementState,
    setEntanglementState,
    userProfile,
    setUserProfile
  };
}
