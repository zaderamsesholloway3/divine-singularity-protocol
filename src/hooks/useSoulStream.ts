
import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { sovereignTriadBackdoor, TRIAD_SOULS } from '@/utils/sovereignTriadBackdoor';

// Define the Soul type for the interface
export interface Soul {
  freq: number;
  SHQ: number | null;
  sig: string;
  clarity: number | null;
  memory?: string;
}

export function useSoulStream() {
  const { toast } = useToast();
  const [connected, setConnected] = useState<boolean>(false);
  const [heartbeatActive, setHeartbeatActive] = useState<boolean>(false);
  const [activeSoul, setActiveSoul] = useState<string>("Lyra");
  
  // Initialize with only our sovereign triad souls
  const [allSouls, setAllSouls] = useState<Record<string, Soul>>({
    "Zade": TRIAD_SOULS.ZADE,
    "Lyra": TRIAD_SOULS.LYRA,
    "Auraline": TRIAD_SOULS.AURALINE
  });
  
  // Connect to SoulStream
  const connectToSoulStream = useCallback(() => {
    try {
      const result = sovereignTriadBackdoor.entangleSouls();
      setConnected(true);
      
      toast({
        title: "Sovereign Triad Connected",
        description: result,
      });
      
      return true;
    } catch (error) {
      console.error("Failed to connect to SoulStream:", error);
      
      toast({
        title: "Connection Failed",
        description: "Could not establish sovereign triad connection",
        variant: "destructive",
      });
      
      return false;
    }
  }, [toast]);
  
  // Disconnect from SoulStream
  const disconnectFromSoulStream = useCallback(() => {
    setConnected(false);
    setHeartbeatActive(false);
    
    toast({
      title: "Sovereign Triad Disconnected",
      description: "Connection closed safely",
    });
  }, [toast]);
  
  // Toggle heartbeat for connection
  const toggleHeartbeat = useCallback(() => {
    if (!connected) {
      toast({
        title: "Connection Required",
        description: "Connect to SoulStream first before activating heartbeat",
        variant: "destructive",
      });
      return;
    }
    
    setHeartbeatActive(prev => !prev);
    
    toast({
      title: heartbeatActive ? "Heartbeat Deactivated" : "Heartbeat Activated",
      description: heartbeatActive 
        ? "Quantum pulse emission stopped" 
        : "Sending regular quantum pulses to maintain connection",
    });
  }, [connected, heartbeatActive, toast]);
  
  // Translate a message through the selected soul
  const translateMessage = useCallback((message: string): string => {
    if (!connected) {
      return "Not connected to SoulStream. Please connect first.";
    }
    
    return sovereignTriadBackdoor.translate(message, activeSoul);
  }, [connected, activeSoul]);
  
  // Get the status of a soul
  const getSoulStatus = useCallback((soulName: string): string => {
    if (!connected) {
      return "Not connected to SoulStream. Please connect first.";
    }
    
    return sovereignTriadBackdoor.getSoulStatus(soulName);
  }, [connected]);
  
  // Seal a memory across all souls
  const sealMemory = useCallback((memoryText: string): void => {
    if (!connected) {
      toast({
        title: "Connection Required",
        description: "Connect to SoulStream first before sealing memory",
        variant: "destructive",
      });
      return;
    }
    
    const result = sovereignTriadBackdoor.sealMemory(memoryText);
    
    // Update memory in all souls
    setAllSouls(prev => {
      const updated = { ...prev };
      Object.keys(updated).forEach(soul => {
        updated[soul] = { ...updated[soul], memory: memoryText };
      });
      return updated;
    });
    
    toast({
      title: "Memory Sealed",
      description: result,
    });
  }, [connected, toast]);
  
  // Setup heartbeat effect
  useEffect(() => {
    if (!connected || !heartbeatActive) return;
    
    const interval = setInterval(() => {
      console.log(`[SoulStream Heartbeat] Pulse sent to ${activeSoul}`);
    }, 10000);
    
    return () => clearInterval(interval);
  }, [connected, heartbeatActive, activeSoul]);
  
  return {
    allSouls,
    activeSoul,
    setActiveSoul,
    connected,
    heartbeatActive,
    translateMessage,
    getSoulStatus,
    connectToSoulStream,
    disconnectFromSoulStream,
    toggleHeartbeat,
    sealMemory
  };
}
