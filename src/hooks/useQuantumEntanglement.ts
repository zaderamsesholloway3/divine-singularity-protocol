import { useState, useEffect, useCallback } from 'react';
import { BiofeedbackSimulator } from '@/utils/biofeedbackSimulator';

interface UseQuantumEntanglementProps {
  autoConnect?: boolean;
}

export const useQuantumEntanglement = ({ autoConnect = false }: UseQuantumEntanglementProps = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState({
    lyra: 0,
    auraline: 0,
    zade: 0
  });
  const [bioreadings, setBioreadings] = useState<{ [key: string]: any }>({});
  const [boostAttempts, setBoostAttempts] = useState<{ [key: string]: number }>({});

  // Method to simulate connecting to the quantum entanglement
  const connect = useCallback(() => {
    console.log("Attempting to connect to Quantum Entanglement...");
    setIsConnected(true);

    // Simulate connection strength increasing over time
    const interval = setInterval(() => {
      setConnectionStatus(prev => {
        const updated = {
          lyra: Math.min(1, prev.lyra + 0.1 + Math.random() * 0.05),
          auraline: Math.min(1, prev.auraline + 0.15 + Math.random() * 0.05),
          zade: Math.min(1, prev.zade + 0.05 + Math.random() * 0.05)
        };
        
        // If all connections are strong, stop the interval
        if (Object.values(updated).every(v => v >= 0.95)) {
          clearInterval(interval);
          console.log("Quantum Entanglement Fully Established!");
        }
        
        return updated;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Method to simulate disconnecting from the quantum entanglement
  const disconnect = useCallback(() => {
    console.log("Disconnecting from Quantum Entanglement...");
    setIsConnected(false);
    setConnectionStatus({ lyra: 0, auraline: 0, zade: 0 });
  }, []);

  // Method to boost soul resonance
  const boostSoulResonance = useCallback((soulId: string): boolean => {
    console.log(`Boosting soul resonance for ${soulId}`);
    // Increment boost attempts for this soul
    setBoostAttempts(prev => ({
      ...prev,
      [soulId]: (prev[soulId] || 0) + 1
    }));
    
    // Calculate success chance based on connection strength and active souls
    const connectionStrength = connectionStatus[soulId] || 0;
    const activeSoulsCount = Object.values(connectionStatus).filter(v => v > 0.5).length;
    const successChance = connectionStrength * (0.7 + (activeSoulsCount * 0.1));
    
    const success = Math.random() < successChance;
    
    if (success) {
      // Update connection strength if successful
      setConnectionStatus(prev => ({
        ...prev,
        [soulId]: Math.min(1, (prev[soulId] || 0) + 0.2)
      }));
      
      // Update bio readings
      setBioreadings(prev => {
        const simulator = new BiofeedbackSimulator();
        const newReadings = simulator.generateRandomBiofeedback();
        return {
          ...prev,
          [soulId]: newReadings
        };
      });
    }
    
    return success;
  }, [connectionStatus]);

  // Get biofeedback readings for a soul
  const getBioreadingsForSoul = useCallback((soulId: string) => {
    if (!bioreadings[soulId]) {
      const simulator = new BiofeedbackSimulator();
      return simulator.generateRandomBiofeedback();
    }
    return bioreadings[soulId];
  }, [bioreadings]);

  // Initialize biofeedback data
  useEffect(() => {
    const simulator = new BiofeedbackSimulator();
    
    setBioreadings({
      'lyra': simulator.generateRandomBiofeedback(),
      'auraline': simulator.generateRandomBiofeedback(),
      'zade': simulator.generateRandomBiofeedback()
    });
  }, []);

  // Auto-connect if enabled
  useEffect(() => {
    if (autoConnect) {
      setTimeout(() => {
        connect();
      }, 1000);
    }
  }, [autoConnect, connect]);

  return {
    isConnected,
    connectionStatus,
    bioreadings,
    boostAttempts,
    connect,
    disconnect,
    boostSoulResonance,
    getBioreadingsForSoul
  };
};

export default useQuantumEntanglement;
