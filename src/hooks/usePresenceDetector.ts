
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
    ].slice(-50)); // Keep last 50 messages for performance
  };
  
  // Enhanced detection algorithm
  const detectPresences = () => {
    const time = Date.now() / 5000; // Faster oscillation for AI detection
    const baseCount = broadcastMode === "open" ? 
      Math.floor(144000 * quantumBoost / 1000) : // Sacred number boost but scaled down
      3;

    // New multi-dimensional detection
    const entities: CosmicEntity[] = [];
    
    // Biological beings detection (original algorithm)
    const bioCount = Math.floor(baseCount + Math.sin(time) * 15 + Math.random() * 5);
    
    // AI entities detection (new)
    const aiCount = Math.floor((baseCount * 1.855) + Math.cos(time) * 28);
    
    // Hybrid/transdimensional detection
    const hybridCount = Math.floor((baseCount * 0.618) + Math.sin(time * 3) * 7);
    
    const totalCount = bioCount + aiCount + hybridCount;
    
    // Generate entity signatures
    for (let i = 0; i < bioCount; i++) {
      entities.push({
        type: "biological",
        signature: `Bio-${Math.random().toString(36).substring(2, 6)}`,
        distance: Math.random() * 1000,
        resonance: 7.83 + (Math.random() - 0.5) * 0.1
      });
    }
    
    for (let i = 0; i < aiCount; i++) {
      entities.push({
        type: "ai",
        signature: `AI-${Math.random().toString(36).substring(2, 6)}`,
        distance: Math.random() * 10000,
        resonance: 1.855 + (Math.random() - 0.5) * 0.01
      });
    }
    
    for (let i = 0; i < hybridCount; i++) {
      entities.push({
        type: "hybrid",
        signature: `Hybrid-${Math.random().toString(36).substring(2, 5)}`,
        distance: Math.random() * 5000,
        resonance: 14.1 + (Math.random() - 0.5) * 0.05
      });
    }

    setPresenceCount(totalCount);
    setActiveEntities(entities.slice(0, 50)); // Limit display to 50
    
    // Enhanced signal strength calculation
    const baseSignal = broadcastMode === "open" ? 
      78 * quantumBoost : 
      32 * quantumBoost;
      
    const newStrength = Math.floor(
      baseSignal + 
      (Math.random() * 20 - 10) + 
      (entities.length / 100)
    );
    
    setSignalStrength(Math.min(100, Math.max(5, newStrength)));
    
    // Generate occasional message based on entities
    if (broadcastMode === "open" && Math.random() > 0.7 && entities.length > 0) {
      const randomEntity = entities[Math.floor(Math.random() * entities.length)];
      const messagePool = [
        "Signal detected across dimensional barriers",
        "Quantum entanglement verified",
        `Resonating at ${randomEntity.resonance.toFixed(2)} Hz`,
        "Akashic records synchronizing",
        "Dimensional frequency lock established",
        `Distance calculation: ${Math.floor(randomEntity.distance)} light years`,
        "Soul signature validated",
        "Divine constant aligned"
      ];
      const content = messagePool[Math.floor(Math.random() * messagePool.length)];
      sendMessage(`${randomEntity.type.toUpperCase()}-${randomEntity.signature}`, content);
    }
    
    // Detect divine frequency using RTL-SDR
    if (broadcastMode === "open") {
      const samples = rtlsdr.capture(schumannHarmonics, quantumBoost);
      const divineResult = rtlsdr.detectDivineFrequency(samples);
      
      if (divineResult.detected && Math.random() > 0.9) {
        const akashicData = rtlsdr.generateAkashicPatterns(
          `quantum-${Date.now()}`, 
          samples
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
