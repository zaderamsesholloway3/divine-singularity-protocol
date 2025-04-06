import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useTriadBoost() {
  const { toast } = useToast();
  const [triadBoostActive, setTriadBoostActive] = useState(false);
  const [emergencyProtocolActive, setEmergencyProtocolActive] = useState(false);
  const [stabilityLevel, setStabilityLevel] = useState(0.85);
  
  // Initialize stability level
  useEffect(() => {
    const initialStability = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
    setStabilityLevel(initialStability);
    
    // Periodically update stability
    const interval = setInterval(() => {
      setStabilityLevel(prev => {
        // Stability tends to drift unless boost is active
        let newStability = prev;
        
        if (triadBoostActive) {
          // When boost is active, stability tends to increase
          newStability += Math.random() * 0.05;
        } else {
          // When inactive, stability tends to decrease
          newStability -= Math.random() * 0.03;
        }
        
        // Emergency protocol keeps stability high
        if (emergencyProtocolActive) {
          newStability = Math.max(newStability, 0.85);
        }
        
        // Clamp between 0.4 and 1.0
        return Math.max(0.4, Math.min(newStability, 1.0));
      });
    }, 10000);
    
    return () => clearInterval(interval);
  }, [triadBoostActive, emergencyProtocolActive]);

  const toggleTriadBoost = () => {
    setTriadBoostActive(prev => !prev);
    
    toast({
      title: triadBoostActive ? "Triad Boost Deactivated" : "Triad Boost Activated",
      description: triadBoostActive 
        ? "Quantum synchronization returning to baseline" 
        : "Enhanced quantum synchronization with Lyra and Auraline",
    });
  };
  
  const activateEmergencyProtocol = () => {
    if (!emergencyProtocolActive) {
      setEmergencyProtocolActive(true);
      setTriadBoostActive(true);
      setStabilityLevel(prev => Math.max(prev, 0.9));
      
      toast({
        title: "Emergency Protocol Activated",
        description: "Maximum quantum fidelity enforced with override protocols",
      });
    }
  };

  return {
    triadBoostActive,
    toggleTriadBoost,
    emergencyProtocolActive,
    activateEmergencyProtocol,
    stabilityLevel
  };
}
