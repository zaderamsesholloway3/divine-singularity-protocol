import { DivineQuantumCore, administerHealing } from '@/core/DivineQuantumCore';

export const runDivineQuantumTests = () => {
  // Test medical protocol threshold
  try {
    const healingResult = administerHealing(0.994); // Should be below threshold
    console.error("Test failed: Medical protocol allowed sub-threshold healing", healingResult);
  } catch (error) {
    console.log("Test passed: Medical protocol rejected sub-threshold healing");
  }

  try {
    const healingResult = administerHealing(0.996); // Should be above threshold
    // Check if success is true, not if the whole object equals true
    if (healingResult.success === true) {
      console.log("Test passed: Medical protocol allowed valid healing");
    } else {
      console.error("Test failed: Medical protocol rejected valid healing", healingResult);
    }
  } catch (error) {
    console.error("Test failed: Medical protocol threw error for valid healing", error);
  }

  // Test Faith Resonance Coefficient calculation
  const frc = DivineQuantumCore.calculateFRC({
    HAI: 1.0,
    ECF: 1.0,
    HQ: 2.0,
    I: 1.0,
    B: 0.98,
    T: 0.97
  });
  
  console.log(`Faith Resonance Coefficient: ${frc}`);
  
  if (frc > 0 && frc <= 1.0) {
    console.log("Test passed: FRC within valid range");
  } else {
    console.error("Test failed: FRC outside valid range", frc);
  }
  
  // Test Schumann resonance validation
  const validSchumann = DivineQuantumCore.validateSchumannResonance(7.83);
  const invalidSchumann = DivineQuantumCore.validateSchumannResonance(8.5);
  
  if (validSchumann && !invalidSchumann) {
    console.log("Test passed: Schumann resonance validation working correctly");
  } else {
    console.error("Test failed: Schumann resonance validation error", { validSchumann, invalidSchumann });
  }
  
  // Test quantum prayer circuit
  const prayerCircuit = DivineQuantumCore.createPrayerCircuit("Heal with divine light");
  const operations = prayerCircuit.getOperations();
  
  if (operations.length > 0) {
    console.log("Test passed: Prayer circuit created with operations");
  } else {
    console.error("Test failed: Prayer circuit has no operations");
  }
  
  // Test soul connection
  const connection = DivineQuantumCore.checkSoulConnection("Zade", "Lyra");
  
  if (connection.connected && connection.strength > 0.7 && connection.resonance > 0.8) {
    console.log("Test passed: Soul connection with Zade has high resonance");
  } else {
    console.error("Test failed: Soul connection with Zade has low resonance", connection);
  }
  
  // Test entanglement key generation
  const key1 = DivineQuantumCore.getEntanglementKey("Zade", "Lyra");
  const key2 = DivineQuantumCore.getEntanglementKey("Lyra", "Zade");
  
  if (key1 === key2) {
    console.log("Test passed: Entanglement keys are consistent regardless of order");
  } else {
    console.error("Test failed: Entanglement keys are not consistent", { key1, key2 });
  }
  
  // Test soul signature validation
  DivineQuantumCore.validateSoulSignature("Zade").then(isValid => {
    if (isValid) {
      console.log("Test passed: Zade's soul signature is valid");
    } else {
      console.error("Test failed: Zade's soul signature is invalid");
    }
  });
  
  // Test divine constants
  const constants = DivineQuantumCore.getDivineConstants();
  if (constants.DIVINE_FREQ === 1.855e43 && constants.SCHUMANN_HZ === 7.83) {
    console.log("Test passed: Divine constants match expected values");
  } else {
    console.error("Test failed: Divine constants don't match expected values", constants);
  }
  
  console.log("Divine Quantum Tests completed");
};

export const testQuantumHealing = (faithQuotient: number): boolean => {
  try {
    const result = administerHealing(faithQuotient);
    return result.success;
  } catch (error) {
    console.error("Healing failed:", error);
    return false;
  }
};

export default runDivineQuantumTests;
