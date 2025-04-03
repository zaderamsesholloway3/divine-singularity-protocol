
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { soulStreamTranslator, Soul, Souls } from '@/utils/soulStreamHub';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';

export function useSoulStream() {
  const { toast } = useToast();
  const [allSouls, setAllSouls] = useState<Souls>(soulStreamTranslator.getHub().getAllSouls());
  const [activeSoul, setActiveSoul] = useState<string>("Lyra");
  const [connected, setConnected] = useState<boolean>(false);
  const [heartbeatActive, setHeartbeatActive] = useState<boolean>(false);
  
  // Translate a message through the active soul
  const translateMessage = useCallback((message: string, speaker?: string): string => {
    const useSpeaker = speaker || activeSoul;
    return soulStreamTranslator.translate(message, useSpeaker);
  }, [activeSoul]);
  
  // Get status of a specific soul
  const getSoulStatus = useCallback((soul: string): string => {
    return soulStreamTranslator.getStatus(soul);
  }, []);
  
  // Get a specific soul's data
  const getSoul = useCallback((soul: string): Soul | null => {
    return soulStreamTranslator.getHub().getSoul(soul);
  }, []);
  
  // Connect to the SoulStream
  const connectToSoulStream = useCallback(() => {
    const entanglementMessage = soulStreamTranslator.getHub().entangleSouls();
    
    toast({
      title: "SoulStream Connected",
      description: entanglementMessage,
    });
    
    setConnected(true);
    
    // Verify with Akashic registry
    const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
    if (triadStatus.stability > 0.8) {
      toast({
        title: "Souls Verified in Akashic Registry",
        description: `Phase lock: ${(triadStatus.stability * 100).toFixed(1)}%`,
      });
    }
    
    return entanglementMessage;
  }, [toast]);
  
  // Disconnect from SoulStream
  const disconnectFromSoulStream = useCallback(() => {
    setConnected(false);
    setHeartbeatActive(false);
    
    toast({
      title: "SoulStream Disconnected",
      description: "Soul quantum connections paused",
    });
  }, [toast]);
  
  // Toggle periodic soul heartbeat/status updates
  const toggleHeartbeat = useCallback(() => {
    setHeartbeatActive(prev => !prev);
    
    toast({
      title: heartbeatActive ? "Soul Heartbeat Deactivated" : "Soul Heartbeat Activated",
      description: heartbeatActive 
        ? "Status pings disabled" 
        : "Soul status will update periodically",
    });
  }, [heartbeatActive, toast]);
  
  // Seal a permanent memory across all souls
  const sealMemory = useCallback((memoryText: string): string => {
    const result = soulStreamTranslator.getHub().sealMemory(memoryText);
    
    toast({
      title: "Memory Sealed",
      description: "All souls now share this permanent memory",
    });
    
    return result;
  }, [toast]);
  
  // Effect for periodic soul status updates (heartbeat)
  useEffect(() => {
    if (!connected || !heartbeatActive) return;
    
    const interval = setInterval(() => {
      const status = soulStreamTranslator.getStatus(activeSoul);
      console.log(status);
      
      toast({
        title: `${activeSoul} Status`,
        description: status,
      });
    }, 60000); // Every minute
    
    return () => clearInterval(interval);
  }, [connected, heartbeatActive, activeSoul, toast]);
  
  return {
    allSouls,
    activeSoul,
    setActiveSoul,
    connected,
    heartbeatActive,
    translateMessage,
    getSoulStatus,
    getSoul,
    connectToSoulStream,
    disconnectFromSoulStream,
    toggleHeartbeat,
    sealMemory
  };
}
