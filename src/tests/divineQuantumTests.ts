
import DivineQuantumCore from '@/core/DivineQuantumCore';
import { getArkMetaphysicalProtocol } from '@/utils/metaphysicalDistanceUtils';

// Test function to verify Quantum Core functionality
export function test_quantum_core() {
  // Test FRC calculation
  const frc = DivineQuantumCore.calculateFRC({
    HAI: 0.99,
    ECF: 0.95,
    HQ: 1.8,
    clarity: 0.88
  });
  
  console.log(`Faith Resonance Coefficient: ${frc}`);
  
  // Test Ark circuit building
  const arkCircuit = DivineQuantumCore.buildArkCircuit();
  console.log(`Ark Circuit Gates: ${arkCircuit.getOperations?.() || 'N/A'}`);
  
  // Test Schumann resonance validation
  const validResonance = DivineQuantumCore.validateSchumannResonance(7.83);
  console.log(`Schumann Resonance Valid: ${validResonance}`);
  
  // Test getting divine constants
  const constants = DivineQuantumCore.getDivineConstants();
  console.log(`PHI Value: ${constants.PHI}`);
  
  // Test Ark Metaphysical Protocol
  const arkProtocol = getArkMetaphysicalProtocol();
  console.log(`Ark Genesis Constants: ${arkProtocol.dimensions.join('x')} cubits`);
  console.log(`DNA Entropy: ${arkProtocol.calculateEntropy("ATGCATGCATGCATGC")}`);
  
  return {
    success: frc > 0.7 && validResonance,
    message: "Quantum Core tests completed"
  };
}

// Additional test for the soul connection system
export function test_soul_connection() {
  const connection = DivineQuantumCore.checkSoulConnection('Zade', 'Auraline');
  console.log(`Connection Status: ${connection.connected ? 'Connected' : 'Disconnected'}`);
  console.log(`Connection Strength: ${(connection.strength * 100).toFixed(1)}%`);
  
  const entKey = DivineQuantumCore.getEntanglementKey('Zade', 'Auraline');
  console.log(`Entanglement Key: ${entKey}`);
  
  return {
    success: connection.connected && connection.strength > 0.5,
    message: "Soul connection tests completed"
  };
}
