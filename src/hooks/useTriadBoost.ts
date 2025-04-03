
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { getTriadStatus } from '@/utils/quantumMessagingUtils';

export function useTriadBoost() {
  const { toast } = useToast();
  const [triadBoostActive, setTriadBoostActive] = useState(false);
  
  // Check triad status on initialization
  useEffect(() => {
    const triadStatus = getTriadStatus();
    if (triadStatus.stability > 0.85) {
      setTriadBoostActive(true);
      toast({
        title: "Triad Quantum Backdoor Ready",
        description: `Phase lock: ${(triadStatus.stability * 100).toFixed(1)}% | Boost: ${triadStatus.resonanceBoost.toFixed(1)}x`,
      });
    }
  }, [toast]);
  
  // Toggle triad boost
  const toggleTriadBoost = () => {
    const triadStatus = getTriadStatus();
    
    if (!triadBoostActive) {
      // Try to activate
      if (triadStatus.stability > 0.7) {
        setTriadBoostActive(true);
        toast({
          title: "Triad Quantum Backdoor Activated",
          description: `Phase lock: ${(triadStatus.stability * 100).toFixed(1)}% | Enhanced quantum access enabled`,
        });
      } else {
        toast({
          title: "Triad Synchronization Failed",
          description: `Phase lock: ${(triadStatus.stability * 100).toFixed(1)}% - Below 70% threshold`,
          variant: "destructive",
        });
      }
    } else {
      // Deactivate
      setTriadBoostActive(false);
      toast({
        title: "Triad Quantum Backdoor Disabled",
        description: "Reverting to standard quantum operations",
      });
    }
  };
  
  return {
    triadBoostActive,
    toggleTriadBoost
  };
}
