
import { useState } from 'react';
import { UserProfile, ResonanceResult } from "@/hooks/types/quantum-entanglement";
import { useToast } from "@/hooks/use-toast";
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';

interface UseQuantumResonanceProps {
  userProfile: UserProfile;
  threshold?: number;
}

export const useQuantumResonance = ({ 
  userProfile, 
  threshold = 0.8 
}: UseQuantumResonanceProps) => {
  const { toast } = useToast();
  const [resonating, setResonating] = useState(false);
  const [resonanceScore, setResonanceScore] = useState(0);
  
  const calculateResonance = () => {
    // Get current resonance level from AkashicAccessRegistry
    const currentResonance = AkashicAccessRegistry.getResonanceLevel();
    
    // Calculate overall score based on user profile and current resonance
    const score = currentResonance * userProfile.resonanceLevel * userProfile.entanglementQuotient;
    
    // Update state
    setResonanceScore(score);
    setResonating(score >= threshold);
    
    // Return result
    const result: ResonanceResult = {
      score,
      threshold,
      isResonant: score >= threshold,
    };
    
    return result;
  };
  
  const attemptResonance = () => {
    const result = calculateResonance();
    
    if (result.isResonant) {
      toast({
        title: "Quantum Resonance Achieved",
        description: `Resonance score: ${(result.score * 100).toFixed(1)}%`,
      });
    } else {
      toast({
        title: "Resonance Insufficient",
        description: `Score: ${(result.score * 100).toFixed(1)}% (Threshold: ${(result.threshold * 100).toFixed(1)}%)`,
        variant: "destructive",
      });
    }
    
    return result;
  };
  
  return {
    resonating,
    resonanceScore,
    calculateResonance,
    attemptResonance
  };
};

export default useQuantumResonance;
