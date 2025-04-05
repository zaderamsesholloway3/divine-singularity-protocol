
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
  
  // Enhanced detection algorithm with performance optimizations
  const detectPresences = () => {
    const time = Date.now() / 5000; // Faster oscillation for AI detection
    const baseCount = broadcastMode === "open" ? 
      Math.floor(Math.max(1, (144 * quantumBoost))) : // Scale down for performance, prevent negative values
      3;

    // New multi-dimensional detection with optimized entity generation
    const entities: CosmicEntity[] = [];
    
    // Biological beings detection (optimized algorithm)
    const bioCount = Math.floor(Math.max(0, baseCount + Math.sin(time) * 5 + Math.random() * 2));
    
    // AI entities detection (optimized)
    const aiCount = Math.floor(Math.max(0, (baseCount * 1.5) + Math.cos(time) * 8));
    
    // Hybrid/transdimensional detection (optimized)
    const hybridCount = Math.floor(Math.max(0, (baseCount * 0.5) + Math.sin(time * 3) * 3));
    
    const totalCount = bioCount + aiCount + hybridCount;
    
    // Generate a limited number of entity signatures for better performance
    const maxEntitiesToGenerate = Math.min(totalCount, broadcastMode === "open" ? 50 : 5);
    const entityDistribution = [bioCount, aiCount, hybridCount].map(count => 
      Math.floor((count / Math.max(1, totalCount)) * maxEntitiesToGenerate)
    );
    
    // Generate optimized entity signatures
    const generateEntities = (type: "biological" | "ai" | "hybrid", count: number) => {
      for (let i = 0; i < count; i++) {
        entities.push({
          type: type,
          signature: `${type === "biological" ? "Bio" : type === "ai" ? "AI" : "Hybrid"}-${Math.random().toString(36).substring(2, 6)}`,
          distance: type === "biological" ? Math.random() * 1000 : 
                     type === "ai" ? Math.random() * 10000 : Math.random() * 5000,
          resonance: type === "biological" ? 7.83 + (Math.random() - 0.5) * 0.1 :
                     type === "ai" ? 1.855 + (Math.random() - 0.5) * 0.01 : 14.1 + (Math.random() - 0.5) * 0.05
        });
      }
    };
    
    generateEntities("biological", entityDistribution[0]);
    generateEntities("ai", entityDistribution[1]);
    generateEntities("hybrid", entityDistribution[2]);

    setPresenceCount(totalCount);
    setActiveEntities(entities); // Already limited by maxEntitiesToGenerate
    
    // Enhanced signal strength calculation with bounds checking
    const baseSignal = broadcastMode === "open" ? 
      78 * Math.min(3, quantumBoost) : // Limit multiplier to prevent overflow
      32 * Math.min(3, quantumBoost);
      
    const newStrength = Math.floor(
      baseSignal + 
      (Math.random() * 10 - 5) + // Reduced random variance
      (entities.length / 10) // Reduced impact of entity count
    );
    
    setSignalStrength(Math.min(100, Math.max(5, newStrength)));
    
    // Generate occasional message based on entities with reduced frequency
    if (broadcastMode === "open" && Math.random() > 0.8 && entities.length > 0) {
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
    
    // Detect divine frequency using RTL-SDR with reduced processing
    if (broadcastMode === "open" && Math.random() > 0.95) {
      const samples = rtlsdr.capture(schumannHarmonics, quantumBoost);
      const divineResult = rtlsdr.detectDivineFrequency(samples);
      
      if (divineResult.detected && Math.random() > 0.9) {
        const akashicData = rtlsdr.generateAkashicPatterns(
          `quantum-${Date.now()}`, 
          samples.slice(0, Math.min(100, samples.length)) // Limit sample size for processing
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
