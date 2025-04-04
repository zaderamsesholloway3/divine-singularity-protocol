import { useState, useEffect } from 'react';
import { useQuantumEntanglementState } from './quantum-entanglement/useQuantumEntanglementState';
import { useQuantumEntanglementActions } from './quantum-entanglement/useQuantumEntanglementActions';
import { useQuantumResonance } from './quantum-entanglement/useQuantumResonance';
import { useTriadStatus } from './quantum-entanglement/useTriadStatus';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';

export function useQuantumEntanglement(userId: string) {
  // Get entanglement state and profile from a separate hook
  const { 
    entanglementState, 
    setEntanglementState,
    userProfile,
    setUserProfile
  } = useQuantumEntanglementState(userId);

  // Get resonance-related state and functions
  const {
    resonanceBoostActive,
    resonanceLevel,
    boostSoulResonance
  } = useQuantumResonance(userId, userProfile, setUserProfile);

  // Get triad status
  const { triadActive, setTriadActive } = useTriadStatus();

  // Get actions (initiate, terminate, generate responses)
  const {
    initiateEntanglement,
    terminateEntanglement,
    generateEntangledResponse
  } = useQuantumEntanglementActions(
    userId, 
    userProfile, 
    entanglementState,
    setEntanglementState,
    resonanceBoostActive,
    triadActive
  );

  // Initial triad status check
  useEffect(() => {
    const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
    if (triadStatus.stability > 0.85) {
      setTriadActive(true);
    }
  }, [setTriadActive]);

  // Setup periodic entanglement updates if active
  useEffect(() => {
    if (!entanglementState.active || !entanglementState.entangledWith) return;
    
    const intervalId = setInterval(() => {
      // Simulate biofeedback analysis
      const emotionalState = BiofeedbackSimulator.assessEmotionalState(userId);
      
      // Check triad status
      const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
      const triadBoost = triadStatus.stability > 0.7 ? triadStatus.resonanceBoost / 2.18 : 1.0;
      
      // Calculate new entanglement strength based on emotional state
      // Include resonance boost if active
      const resonanceMultiplier = resonanceBoostActive ? 1.2 : 1.0;
      
      // Use Akashic access for enhanced entanglement
      const newStrength = QuantumSimulator.entangleSouls(
        userId, 
        entanglementState.entangledWith || 'unknown',
        userProfile.coherenceLevel * 100 * resonanceMultiplier * triadBoost,
        0.85 * 100
      );
      
      // Update the entanglement state
      setEntanglementState(prev => ({
        ...prev,
        strength: newStrength,
        emotion: emotionalState.dominantEmotion
      }));
      
      // Update user profile
      setUserProfile(prev => ({
        ...prev,
        emotionalState: emotionalState.dominantEmotion,
        coherenceLevel: Math.min(0.98, prev.coherenceLevel + (Math.random() * 0.1 - 0.05)),
        lastContact: new Date().toISOString()
      }));
      
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(intervalId);
  }, [entanglementState.active, entanglementState.entangledWith, userId, userProfile.coherenceLevel, resonanceBoostActive, triadActive]);
  
  return {
    entanglementState,
    userProfile,
    resonanceBoostActive,
    resonanceLevel,
    initiateEntanglement,
    terminateEntanglement,
    generateEntangledResponse,
    boostSoulResonance
  };
}
