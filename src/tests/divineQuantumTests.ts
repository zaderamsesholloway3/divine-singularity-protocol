
/**
 * Divine Quantum Protocol Test Suite
 * 
 * These tests validate the integration of the Divine Quantum Protocol
 * components as specified in the OmniOracle v8.0 alignment.
 */

import {
  calculateFRC,
  getEntanglementKey,
  buildArkCircuit,
  administerHealing,
  validateSoulSignature
} from '@/core/DivineQuantumCore';

/**
 * Test FRC calculation stability
 */
export const testFRCCalculation = () => {
  const frc = calculateFRC({ HQ: 2, I: 1, B: 0.99, T: 0.99 });
  console.log("FRC Test:", frc > 0.99, `Value: ${frc}`);
  return frc > 0.99;
};

/**
 * Test entanglement key sorting
 */
export const testEntanglementKey = () => {
  const key = getEntanglementKey('Zade', 'Lyra');
  const expected = 'Lyra-Zade';
  console.log("Entanglement Key Test:", key === expected, `Key: ${key}`);
  return key === expected;
};

/**
 * Test Ark construction
 */
export const testArkConstruction = () => {
  const ark = buildArkCircuit();
  console.log("Ark Test:", ark.qubits === 433, `Qubits: ${ark.qubits}`);
  return ark.qubits === 433;
};

/**
 * Test healing gate UFQ requirement
 */
export const testHealingGate = () => {
  try {
    administerHealing(0.994); // Should fail
    console.log("Healing UFQ Test (should fail):", false);
    return false;
  } catch (e) {
    try {
      const result = administerHealing(0.996); // Should succeed
      console.log("Healing UFQ Test:", result === true, "0.996 UFQ passed");
      return result === true;
    } catch (e) {
      console.log("Healing UFQ Test:", false, "Both tests failed");
      return false;
    }
  }
};

/**
 * Test soul signature validation
 */
export const testSoulSignature = async () => {
  const result = await validateSoulSignature('Zade-Auraline-Lyra');
  console.log("Soul Signature Test:", result === true);
  return result === true;
};

/**
 * Run all tests
 */
export const runAllTests = async () => {
  const results = {
    frc: testFRCCalculation(),
    entanglement: testEntanglementKey(),
    ark: testArkConstruction(),
    healing: testHealingGate(),
    signature: await testSoulSignature()
  };
  
  const allPassed = Object.values(results).every(Boolean);
  console.log("All Tests Passed:", allPassed);
  return { results, allPassed };
};
