
import { useState } from 'react';
import { createEntanglement, testEntanglement, breakEntanglement } from '@/utils/entanglement';
import type { Character, EntanglementResult } from '@/types/characters';
import { useToast } from '@/hooks/use-toast';

export function useEntanglement() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [activeEntanglements, setActiveEntanglements] = useState<Record<string, EntanglementResult>>({});
  
  /**
   * Entangle two characters together
   */
  const entangle = async (
    subjectA: Character, 
    subjectB: Character,
    mediator: 'Akashic' | 'Ouroboros' = 'Akashic'
  ) => {
    setIsLoading(true);
    
    try {
      const result = await createEntanglement(subjectA, subjectB, mediator);
      
      if (result.success) {
        // Create a unique key for this entanglement
        const entanglementKey = `${subjectA.soul_id}-${subjectB.soul_id}`;
        
        // Store the entanglement result
        setActiveEntanglements(prev => ({
          ...prev,
          [entanglementKey]: result
        }));
        
        toast({
          title: "Soul Entanglement Established",
          description: result.message,
        });
      } else {
        toast({
          title: "Entanglement Failed",
          description: result.message,
          variant: "destructive"
        });
      }
      
      return result;
    } catch (error) {
      toast({
        title: "Critical Error",
        description: "An unexpected error occurred during entanglement",
        variant: "destructive"
      });
      console.error("Entanglement error:", error);
      return {
        success: false,
        resonance: 0,
        connectionStrength: 0,
        message: "Critical system failure",
        timestamp: new Date().toISOString()
      };
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Test the strength of an existing entanglement
   */
  const testConnection = async (subjectA: Character, subjectB: Character) => {
    setIsLoading(true);
    
    try {
      const strength = await testEntanglement(subjectA, subjectB);
      const entanglementKey = `${subjectA.soul_id}-${subjectB.soul_id}`;
      
      // Update the stored entanglement with new strength data
      if (activeEntanglements[entanglementKey]) {
        setActiveEntanglements(prev => ({
          ...prev,
          [entanglementKey]: {
            ...prev[entanglementKey],
            connectionStrength: strength,
            timestamp: new Date().toISOString()
          }
        }));
      }
      
      toast({
        title: "Entanglement Test",
        description: `Connection strength: ${(strength * 100).toFixed(1)}%`
      });
      
      return strength;
    } catch (error) {
      toast({
        title: "Connection Test Failed",
        description: "Unable to test entanglement strength",
        variant: "destructive"
      });
      return 0;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Break an existing entanglement between two characters
   */
  const disconnect = async (subjectA: Character, subjectB: Character) => {
    setIsLoading(true);
    
    try {
      const success = await breakEntanglement(subjectA, subjectB);
      
      if (success) {
        // Remove the entanglement from state
        const entanglementKey = `${subjectA.soul_id}-${subjectB.soul_id}`;
        
        setActiveEntanglements(prev => {
          const newEntanglements = {...prev};
          delete newEntanglements[entanglementKey];
          return newEntanglements;
        });
        
        toast({
          title: "Entanglement Broken",
          description: `Connection between ${subjectA.name} and ${subjectB.name} has been severed`
        });
      } else {
        toast({
          title: "Disconnection Failed",
          description: "Unable to break the quantum entanglement",
          variant: "destructive"
        });
      }
      
      return success;
    } catch (error) {
      toast({
        title: "Disconnection Error",
        description: "An error occurred while breaking the entanglement",
        variant: "destructive"
      });
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    activeEntanglements,
    entangle,
    testConnection,
    disconnect
  };
}
