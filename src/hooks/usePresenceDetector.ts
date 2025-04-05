
import { useState, useEffect } from 'react';
import { CosmicEntity } from '../components/universal-counter/EntityDisplay';
import { RTLSDREmulator } from '@/utils/rtlsdrEmulator';
import { UniversalMessage } from '../components/universal-counter/MessageList';

interface UsePresenceDetectorProps {
  broadcastMode: "private" | "open";
  quantumBoost: number;
  schumannHarmonics: number;
}

interface UsePresenceDetectorReturn {
  presenceCount: number;
  signalStrength: number;
  activeEntities: CosmicEntity[];
  messages: UniversalMessage[];
  sendMessage: (sender: string, content: string) => void;
  detectPresences: () => void;
}

export const usePresenceDetector = ({
  broadcastMode,
  quantumBoost,
  schumannHarmonics
}: UsePresenceDetectorProps): UsePresenceDetectorReturn => {
  const [presenceCount, setPresenceCount] = useState<number>(0);
  const [signalStrength, setSignalStrength] = useState<number>(12);
  const [activeEntities, setActiveEntities] = useState<CosmicEntity[]>([]);
  const [messages, setMessages] = useState<UniversalMessage[]>([]);
  const rtlsdr = new RTLSDREmulator();
  
  // Send a message (can be called by entities or user)
  const sendMessage = (sender: string, content: string) => {
    setMessages(prev => [
      ...prev,
      { sender, content, timestamp: Date.now() }
    ].slice(-30)); // Keep only 30 messages for better performance
  };
  
  // Heavily optimized detection algorithm to prevent UI freezing
  const detectPresences = () => {
    // Use a fixed time scale for consistent calculations
    const time = (Date.now() % 30000) / 5000;
    
    // Scale down calculations for performance, prevent negative values
    const baseCount = broadcastMode === "open" ? 
      Math.floor(Math.max(1, (72 * quantumBoost))) : 
      3;

    // Use simplified math to calculate entity counts
    const bioCount = Math.floor(Math.max(0, baseCount + Math.sin(time) * 3));
    const aiCount = Math.floor(Math.max(0, (baseCount * 1.2) + Math.cos(time) * 4));
    const hybridCount = Math.floor(Math.max(0, (baseCount * 0.3) + Math.sin(time * 2) * 2));
    
    const totalCount = bioCount + aiCount + hybridCount;
    
    // Limit entity generation for better performance
    // Generate only a few representative entities for display
    const entities: CosmicEntity[] = [];
    const maxEntitiesToGenerate = 12; // Drastically reduced for performance
    
    // Add a few of each type
    const addEntities = (type: "biological" | "ai" | "hybrid", count: number) => {
      const actualCount = Math.min(count, Math.floor(maxEntitiesToGenerate / 3));
      for (let i = 0; i < actualCount; i++) {
        entities.push({
          type,
          signature: `${type.charAt(0).toUpperCase()}${type.slice(1)}-${Math.random().toString(36).substring(2, 5)}`,
          distance: type === "biological" ? Math.random() * 800 : 
                   type === "ai" ? Math.random() * 5000 : Math.random() * 2000,
          resonance: type === "biological" ? 7.83 + (Math.random() - 0.5) * 0.1 :
                   type === "ai" ? 1.855 + (Math.random() - 0.5) * 0.01 : 14.1 + (Math.random() - 0.5) * 0.05
        });
      }
    };
    
    addEntities("biological", bioCount);
    addEntities("ai", aiCount);
    addEntities("hybrid", hybridCount);

    // Update state with the calculated values
    setPresenceCount(totalCount);
    setActiveEntities(entities);
    
    // Simplified signal strength calculation
    const baseSignal = broadcastMode === "open" ? 
      65 + (quantumBoost * 10) : 
      30 + (quantumBoost * 5);
      
    const newStrength = Math.floor(
      baseSignal + (Math.random() * 6 - 3)
    );
    
    setSignalStrength(Math.min(100, Math.max(5, newStrength)));
    
    // Generate occasional message with reduced frequency
    if (broadcastMode === "open" && Math.random() > 0.92 && entities.length > 0) {
      const randomEntity = entities[Math.floor(Math.random() * entities.length)];
      const messagePool = [
        "Signal detected",
        "Quantum resonance active",
        `Frequency: ${randomEntity.resonance.toFixed(2)} Hz`,
        "Connection established",
        `Distance: ${Math.floor(randomEntity.distance)} units`,
        "Signature validated"
      ];
      const content = messagePool[Math.floor(Math.random() * messagePool.length)];
      sendMessage(`${randomEntity.signature}`, content);
    }
    
    // Reduce frequency of RTL-SDR processing
    if (broadcastMode === "open" && Math.random() > 0.95) {
      // Use minimal samples
      const samples = rtlsdr.capture(schumannHarmonics, quantumBoost, 0.01); // Reduced duration
      const divineResult = rtlsdr.detectDivineFrequency(samples);
      
      if (divineResult.detected && Math.random() > 0.9) {
        // Use only first few samples for processing
        const akashicData = rtlsdr.generateAkashicPatterns(
          `quantum-${Date.now() % 10000}`, 
          samples.slice(0, 10) // Drastically limit samples
        );
        
        if (akashicData.message) {
          sendMessage("Akashic Field", akashicData.message);
        }
      }
    }
  };

  return {
    presenceCount,
    signalStrength,
    activeEntities,
    messages,
    sendMessage,
    detectPresences
  };
};
