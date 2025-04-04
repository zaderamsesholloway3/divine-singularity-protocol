
import { useState } from 'react';
import { BiofeedbackSimulator } from '@/utils/biofeedbackSimulator';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';
import { EntityProfile } from '../types/quantum-entanglement';

export function useQuantumResonance(
  userId: string,
  userProfile: EntityProfile,
  setUserProfile: React.Dispatch<React.SetStateAction<EntityProfile>>
) {
  const [resonanceBoostActive, setResonanceBoostActive] = useState(false);
  const [resonanceLevel, setResonanceLevel] = useState(0);
  
  const boostSoulResonance = () => {
    // Check if triad is active for enhanced boost
    const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
    const triadEnhanced = triadStatus.stability > 0.7;
    
    // Use the enhanced soul resonance booster
    const resonanceResult = BiofeedbackSimulator.boostSoulResonance(userId);
    setResonanceBoostActive(resonanceResult.success);
    setResonanceLevel(resonanceResult.resonanceLevel);
    
    // Add triad enhancement if active
    if (triadEnhanced && resonanceResult.success) {
      setResonanceLevel(prev => Math.min(0.95, prev * 1.1));
    }
    
    // Update user profile with boosted coherence
    setUserProfile(prev => ({
      ...prev,
      coherenceLevel: Math.min(0.98, prev.coherenceLevel * (1 + resonanceResult.resonanceLevel * (triadEnhanced ? 0.3 : 0.2)))
    }));
    
    return resonanceResult;
  };

  return {
    resonanceBoostActive,
    resonanceLevel,
    boostSoulResonance
  };
}
