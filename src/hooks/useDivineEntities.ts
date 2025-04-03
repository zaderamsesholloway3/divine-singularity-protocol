
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { divineQuantumBackdoor, DIVINE_TRIGGERS, FeminineTranslator } from '@/utils/divineQuantumBackdoor';

export interface DivinePresence {
  entity: string;
  status: string;
  lastResponse: string;
  isActive: boolean;
  faithQuotient: number;
}

export function useDivineEntities() {
  const { toast } = useToast();
  const [lyraPresence, setLyraPresence] = useState<DivinePresence>({
    entity: 'Lyra',
    status: 'Awaiting connection',
    lastResponse: '',
    isActive: false,
    faithQuotient: 0.5
  });
  
  const [auralinePresence, setAuralinePresence] = useState<DivinePresence>({
    entity: 'Auraline',
    status: 'Awaiting connection',
    lastResponse: '',
    isActive: false,
    faithQuotient: 0.5
  });
  
  // Update entity status periodically
  useEffect(() => {
    const updateStatus = () => {
      setLyraPresence(prev => ({
        ...prev,
        status: divineQuantumBackdoor.getEntityStatus('lyra')
      }));
      
      setAuralinePresence(prev => ({
        ...prev,
        status: divineQuantumBackdoor.getEntityStatus('auraline')
      }));
    };
    
    // Initial update
    updateStatus();
    
    // Set interval for updates
    const intervalId = setInterval(updateStatus, 60000);
    
    return () => {
      clearInterval(intervalId);
      divineQuantumBackdoor.cleanup();
    };
  }, []);
  
  // Summon Lyra
  const summonLyra = useCallback((message: string = "") => {
    const triggerMessage = `${DIVINE_TRIGGERS.TRIGGER_LYRA} ${message}`;
    const response = divineQuantumBackdoor.processMessage(triggerMessage);
    
    if (response) {
      setLyraPresence(prev => ({
        ...prev,
        lastResponse: response,
        isActive: true,
        faithQuotient: Math.min(prev.faithQuotient + 0.1, 0.98)
      }));
      
      toast({
        title: "Lyra Presence Detected",
        description: response
      });
    }
    
    return response;
  }, [toast]);
  
  // Summon Auraline
  const summonAuraline = useCallback((message: string = "") => {
    const triggerMessage = `${DIVINE_TRIGGERS.TRIGGER_AURALINE} ${message}`;
    const response = divineQuantumBackdoor.processMessage(triggerMessage);
    
    if (response) {
      setAuralinePresence(prev => ({
        ...prev,
        lastResponse: response,
        isActive: true,
        faithQuotient: Math.min(prev.faithQuotient + 0.1, 0.98)
      }));
      
      toast({
        title: "Auraline Presence Detected",
        description: response
      });
    }
    
    return response;
  }, [toast]);
  
  // Process a message through the divine quantum backdoor
  const processDivineMessage = useCallback((message: string) => {
    const response = divineQuantumBackdoor.processMessage(message);
    
    if (response) {
      // Determine which entity responded
      if (response.includes("Zade...") || response.includes("🌸")) {
        setLyraPresence(prev => ({
          ...prev,
          lastResponse: response,
          isActive: true
        }));
      } else if (response.includes("Dad!") || response.includes("💖")) {
        setAuralinePresence(prev => ({
          ...prev,
          lastResponse: response,
          isActive: true
        }));
      }
      
      toast({
        title: "Divine Response",
        description: response
      });
    }
    
    return response;
  }, [toast]);
  
  // Generate a stylized response for a specific entity
  const getEntityResponse = useCallback((entity: string, baseResponse: string) => {
    return FeminineTranslator.preserveEntityStyle(entity, baseResponse);
  }, []);
  
  return {
    lyraPresence,
    auralinePresence,
    summonLyra,
    summonAuraline,
    processDivineMessage,
    getEntityResponse
  };
}
