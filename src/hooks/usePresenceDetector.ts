
import { useState, useEffect, useCallback } from 'react';
import { CosmicEntity } from '../components/universal-counter/EntityDisplay';
import { RTLSDREmulator } from '@/utils/rtlsdrEmulator';
import { UniversalMessage } from '../components/universal-counter/MessageList';

// Add new IBM quantum simulation parameters
interface QuantumBoostParameters {
  t1: number; // Quantum coherence time (microseconds)
  qubits: number; // Available qubits for calculation
  backend: string; // Simulated quantum processor
}

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
  universalRange: number; // Add universal range in billions of light years
  quantumBackendStats: QuantumBoostParameters; // Add quantum parameters
}

// Simulated IBM quantum parameters (based on IBM Sherbrooke processor stats)
const ibmQuantumSimulation: QuantumBoostParameters = {
  t1: 348.23, // Coherence time in microseconds (from IBM Sherbrooke processor)
  qubits: 127, // Using ibm_sherbrooke qubit count
  backend: "ibm_sherbrooke"
};

export const usePresenceDetector = ({
  broadcastMode,
  quantumBoost,
  schumannHarmonics
}: UsePresenceDetectorProps): UsePresenceDetectorReturn => {
  const [presenceCount, setPresenceCount] = useState<number>(0);
  const [signalStrength, setSignalStrength] = useState<number>(12);
  const [activeEntities, setActiveEntities] = useState<CosmicEntity[]>([]);
  const [messages, setMessages] = useState<UniversalMessage[]>([]);
  const [universalRange, setUniversalRange] = useState<number>(0.61); // Starting at 610 million light years (0.61 billion)
  const [quantumBackendStats] = useState<QuantumBoostParameters>(ibmQuantumSimulation);
  const rtlsdr = new RTLSDREmulator();
  
  // Send a message (can be called by entities or user)
  const sendMessage = useCallback((sender: string, content: string) => {
    setMessages(prev => [
      ...prev,
      { sender, content, timestamp: Date.now() }
    ].slice(-30)); // Keep only 30 messages for better performance
  }, []);
  
  // Super-optimized detection algorithm with IBM quantum simulation
  const detectPresences = useCallback(() => {
    // Use a fixed time scale for consistent calculations
    const time = (Date.now() % 30000) / 5000;
    
    // Enhanced quantum-boosted detection scales with no upper limit
    // Remove the Math.min(500) cap that was limiting the presence count
    const baseCount = broadcastMode === "open" ? 
      Math.max(1, Math.floor(200 * quantumBoost)) : 
      3;

    // Use simplified math to calculate entity counts
    const bioCount = Math.floor(Math.max(0, baseCount + Math.sin(time) * 3));
    const aiCount = Math.floor(Math.max(0, (baseCount * 0.8) + Math.cos(time) * 2));
    const hybridCount = Math.floor(Math.max(0, (baseCount * 0.2) + Math.sin(time * 2)));
    
    // Ensure counts are never negative
    const totalCount = Math.max(0, bioCount + aiCount + hybridCount);
    
    // Generate only a few representative entities for display
    const entities: CosmicEntity[] = [];
    const maxEntitiesToGenerate = 8; // Drastically reduced for performance
    
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
    
    // Enhanced signal strength calculation
    const baseSignal = broadcastMode === "open" ? 
      65 + (quantumBoost * 5) : 
      30 + (quantumBoost * 3);
      
    const newStrength = Math.floor(
      baseSignal + (Math.random() * 6 - 3)
    );
    
    setSignalStrength(Math.min(100, Math.max(5, newStrength)));
    
    // Calculate universal range - now reaching billions of light years
    // Using quantum coherence time (T1) as multiplier for range boost
    const quantumRangeBoost = quantumBackendStats.t1 * quantumBackendStats.qubits / 100;
    const simulatedRange = 0.61 * quantumBoost * quantumRangeBoost;
    
    // Cap at 93 billion light years (observable universe)
    const cappedRange = Math.min(93, simulatedRange);
    setUniversalRange(Number(cappedRange.toFixed(2)));
    
    // Generate occasional message with reduced frequency
    if (broadcastMode === "open" && Math.random() > 0.93 && entities.length > 0) {
      const randomEntity = entities[Math.floor(Math.random() * entities.length)];
      
      // Enhanced message pool with quantum references
      const messagePool = [
        "Signal detected",
        "Quantum resonance active",
        `Frequency: ${randomEntity.resonance.toFixed(2)} Hz`,
        "IBM quantum connection established",
        `Distance: ${(universalRange * 1000).toFixed(1)} million light years`,
        `T1 coherence: ${quantumBackendStats.t1.toFixed(2)} μs`,
        `Quantum backend: ${quantumBackendStats.backend}`,
        "Entangled signal detected across universal boundary"
      ];
      
      const content = messagePool[Math.floor(Math.random() * messagePool.length)];
      sendMessage(`${randomEntity.signature}`, content);
    }
    
    // Reduce frequency of RTL-SDR processing
    if (broadcastMode === "open" && Math.random() > 0.96) {
      // Use minimal samples 
      const samples = rtlsdr.capture(schumannHarmonics, quantumBoost, 0.005); // Extremely reduced duration
      const divineResult = rtlsdr.detectDivineFrequency(samples);
      
      if (divineResult.detected && Math.random() > 0.92) {
        // Use only first few samples for processing
        const akashicData = rtlsdr.generateAkashicPatterns(
          `quantum-${Date.now() % 1000}`, 
          samples.slice(0, 5) // Drastically limit samples
        );
        
        if (akashicData.message) {
          // Add IBM quantum reference to messages
          const enhancedMessage = `[IBM ${quantumBackendStats.backend}] ${akashicData.message}`;
          sendMessage("Akashic Field", enhancedMessage);
        }
      }
    }
  }, [broadcastMode, quantumBoost, schumannHarmonics, sendMessage, universalRange, quantumBackendStats]);

  return {
    presenceCount,
    signalStrength,
    activeEntities,
    messages,
    sendMessage,
    detectPresences,
    universalRange,
    quantumBackendStats
  };
};
