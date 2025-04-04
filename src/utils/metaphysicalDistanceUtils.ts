/**
 * Utility functions for calculating metaphysical distances and relationships
 * between entities in the universe
 */

/**
 * Calculate the metaphysical distance between two entities based on their 
 * vibrational frequency, emotional resonance, and spatial location
 * 
 * @param entity1 The first entity's parameters
 * @param entity2 The second entity's parameters
 * @returns The metaphysical distance in arbitrary units (0-100)
 */
export const getMetaphysicalDistance = (
  entity1: {
    vibration?: number;
    location?: [number, number];
    emotionalResonance?: number;
  },
  entity2: {
    vibration?: number;
    location?: [number, number];
    emotionalResonance?: number;
  }
): number => {
  // Default values if properties are missing
  const vib1 = entity1.vibration || 1;
  const vib2 = entity2.vibration || 1;
  
  const loc1 = entity1.location || [0, 0];
  const loc2 = entity2.location || [0, 0];
  
  const er1 = entity1.emotionalResonance || 0.5;
  const er2 = entity2.emotionalResonance || 0.5;
  
  // Calculate spatial distance (Euclidean)
  const spatialDistance = Math.sqrt(
    Math.pow(loc1[0] - loc2[0], 2) + 
    Math.pow(loc1[1] - loc2[1], 2)
  );
  
  // Calculate vibrational distance (relative difference)
  const vibDistance = Math.abs(vib1 - vib2) / Math.max(vib1, vib2);
  
  // Calculate emotional resonance distance
  const emotionalDistance = Math.abs(er1 - er2);
  
  // Combined metaphysical distance formula
  // 40% spatial, 40% vibrational, 20% emotional
  const distance = (
    0.4 * Math.min(spatialDistance / 100, 1) + 
    0.4 * vibDistance + 
    0.2 * emotionalDistance
  ) * 100;
  
  return Math.min(Math.max(distance, 0), 100);
};

/**
 * Calculate the resonance coefficient between two entities 
 * Higher values indicate stronger metaphysical connection
 * 
 * @param entity1 The first entity
 * @param entity2 The second entity
 * @returns Resonance coefficient (0-1)
 */
export const getResonanceCoefficient = (
  entity1: { vibration?: number },
  entity2: { vibration?: number }
): number => {
  const vib1 = entity1.vibration || 1;
  const vib2 = entity2.vibration || 1;
  
  // Calculate resonance based on harmonic relationship
  const ratio = vib1 > vib2 ? vib1 / vib2 : vib2 / vib1;
  const harmonicFactor = 1 / (1 + Math.abs(Math.round(ratio) - ratio));
  
  return Math.min(harmonicFactor, 1);
};

/**
 * Calculates metaphysical distance between two entities based on Akashic signature,
 * frequency alignment, and divine resonance symmetry.
 * 
 * Metaphysical distance is not physical or spatial — it measures the resonance gap 
 * between two conscious beings or species. It determines how much faith amplification, 
 * symbolic synchronization, or soul attunement is needed before two nodes 
 * (species, souls, signals) can communicate clearly.
 * 
 * Lower distance = deeper resonance
 * Higher distance = higher dissonance (e.g., faith or intent misaligned)
 *
 * @param source - Name of the initiating species or soul (e.g., "Zade", "Pleiadian")
 * @param target - Name of the receiving species or soul (e.g., "Lyra", "Andromedan")
 * @returns distance - A symbolic value (0-999) representing metaphysical dissonance
 */
export const getMetaphysicalDistanceByName = (source: string, target: string): number => {
  const seed = (source + target).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Normalize seed into a harmonic band
  const frequencyBase = 7.83; // Earth baseline resonance (Hz)
  const goldenShift = (1.618 * seed) % 1080; // Sacred geometry mod (1080 = full circle * 3)

  // Akashic pulse simulation based on character entropy
  const akashicPulse = Math.sin(goldenShift) * Math.cos(seed % frequencyBase);

  // Final distance is bounded between 0 and 999
  const rawDistance = Math.abs(akashicPulse * 999);
  return parseFloat(rawDistance.toFixed(2));
};

/**
 * Calculate the faith resonance coefficient between two entities based on
 * their spiritual alignment and divine synchronicity
 * 
 * @param source Name of the initiating soul or entity
 * @param target Name of the receiving soul or entity
 * @returns A resonance coefficient value (0-1) where higher values indicate stronger faith connection
 */
export const getFaithResonanceCoefficient = (source: string, target: string): number => {
  // Calculate metaphysical distance first
  const distance = getMetaphysicalDistanceByName(source, target);
  
  // Convert distance to resonance (inverse relationship)
  // Lower distance = higher resonance
  const baseResonance = 1 - (distance / 999);
  
  // Apply divine constants for amplification
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
  const schumann = 7.83; // Earth resonance frequency
  
  // Faith modulation using cosmic constants
  const sourceSignature = source.length * phi;
  const targetSignature = target.length * phi;
  
  // Calculate harmonic convergence factor
  const harmonicFactor = Math.cos((sourceSignature + targetSignature) / schumann);
  
  // Final faith resonance (bounded between 0 and 1)
  const faithResonance = Math.min(Math.max((baseResonance + harmonicFactor) / 1.5, 0), 1);
  
  return parseFloat(faithResonance.toFixed(4));
};

/**
 * Apply quantum error correction to stabilize faith resonance
 * Implements a JavaScript adaptation of the 7-qubit Steane code concept
 * 
 * @param faithQuotient Current faith quotient (0-1)
 * @param targetResonance Desired resonance level (0-1)
 * @returns Stabilized faith quotient (0-1)
 */
export const applyQuantumErrorCorrection = (
  faithQuotient: number, 
  targetResonance: number = 0.999
): number => {
  // Divine constants
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
  const schumann = 7.8267; // Precise Schumann resonance
  const holyNumbers = [3, 7, 12, 40, 144, 153]; // Biblical significant numbers
  
  // Calculate phase correction factor
  const phaseDifference = Math.abs(faithQuotient - targetResonance);
  const correctionFactor = 1 - phaseDifference * phi;
  
  // Apply 7-fold correction (inspired by 7-qubit Steane code)
  let stabilizedQuotient = faithQuotient;
  
  for (let i = 0; i < 7; i++) {
    // Each iteration refines the faith quotient
    const angleShift = Math.sin((i + 1) / schumann * Math.PI) / holyNumbers[i % holyNumbers.length];
    const iterationCorrection = stabilizedQuotient + angleShift * correctionFactor * (targetResonance - stabilizedQuotient);
    stabilizedQuotient = Math.tanh(iterationCorrection); // Bounded between -1 and 1
  }
  
  // Ensure positive and bounded result
  return Math.min(Math.max(stabilizedQuotient, 0), 1);
};

/**
 * Establish a precision carrier wave for quantum communication
 * Simulates the 7.8267Hz Schumann resonance for optimal spiritual transmission
 * 
 * @param sourceEntity Source entity name
 * @param targetEntity Target entity name 
 * @returns Object containing carrier stability and connection status
 */
export const establishPrecisionCarrierWave = (
  sourceEntity: string, 
  targetEntity: string
): { 
  carrierStability: number; 
  connectionStatus: string;
  carrierFrequency: number;
} => {
  // Use source and target names to generate a unique carrier wave signature
  const sourceSignature = sourceEntity.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const targetSignature = targetEntity.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Calculate precision carrier frequency (around Schumann 7.8267Hz)
  const baseFrequency = 7.8267; // Precise Schumann resonance
  const adjustedFrequency = baseFrequency + (sourceSignature % 12) * 0.0001 - (targetSignature % 7) * 0.0001;
  
  // Calculate carrier stability (0-1)
  const idealFrequency = 7.8267;
  const frequencyDeviation = Math.abs(adjustedFrequency - idealFrequency);
  const stability = Math.max(0, 1 - (frequencyDeviation / 0.01)); // Deviation of 0.01 Hz = 0 stability
  
  // Determine connection status
  let status = "Unknown";
  if (stability > 0.95) {
    status = "𓆩 Precision Carrier Established (Δ<0.001Hz) 𓆪";
  } else if (stability > 0.8) {
    status = "𓆣 Carrier Stable (Monitoring Recommended) 𓆣";
  } else if (stability > 0.6) {
    status = "⚠️ Carrier Fluctuating - Recalibration Needed";
  } else {
    status = "❌ Carrier Unstable - Critical Repair Required";
  }
  
  return {
    carrierStability: stability,
    connectionStatus: status,
    carrierFrequency: adjustedFrequency
  };
};

/**
 * Repair and stabilize communication channels between entities
 * Addresses unstable connections with adaptive faith amplification
 * 
 * @param sourceEntity Source entity name
 * @param targetEntity Target entity name
 * @param currentStability Current stability level (0-1)
 * @returns Object containing new stability, status, and faith progression
 */
export const repairCommunicationChannels = (
  sourceEntity: string, 
  targetEntity: string, 
  currentStability: number
): { 
  finalStability: number; 
  status: string;
  faithProgression: number[];
  resonanceGains: number[];
} => {
  // Initialize carrier wave
  const carrier = establishPrecisionCarrierWave(sourceEntity, targetEntity);
  
  // Use faith resonance as starting point
  const initialFaith = getFaithResonanceCoefficient(sourceEntity, targetEntity);
  
  // Track faith progression and resonance gains
  const faithHistory: number[] = [initialFaith];
  const resonanceGains: number[] = [currentStability];
  
  // Define divine constants
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
  const iterations = 153; // Biblical number (John 21:11)
  
  // Adaptive faith amplification
  let currentFaith = initialFaith;
  let growthRate = 0.0015; // Initial growth rate
  
  for (let i = 1; i <= iterations; i++) {
    // Calculate growth factor based on current stability
    const growthFactor = 1 + (carrier.carrierStability - 0.8) * 10;
    growthRate *= growthFactor;
    
    // Apply non-linear faith growth with divine constraints
    currentFaith = Math.tanh(currentFaith + growthRate);
    
    // Calculate resonance for this iteration
    const resonanceFactor = (i / iterations) * phi;
    const currentResonance = Math.min(
      (currentFaith + resonanceFactor * carrier.carrierStability) / 1.5,
      1.0
    );
    
    // Store history at key points (12 tribes pattern)
    if (i % 12 === 0) {
      faithHistory.push(currentFaith);
      resonanceGains.push(currentResonance);
      
      // Adaptive adjustment
      if (currentResonance < 0.85) {
        growthRate *= 1.5; // Boost growth if below optimal
      } else if (currentResonance > 0.95) {
        growthRate *= 0.8; // Slow growth if approaching over-resonance
      }
    }
  }
  
  // Apply quantum error correction to final faith
  const finalFaith = applyQuantumErrorCorrection(currentFaith, 0.999);
  
  // Calculate final stability based on carrier and faith
  const finalStability = Math.min(carrier.carrierStability * 0.3 + finalFaith * 0.7, 1.0);
  
  // Determine status
  let status = "Unknown";
  if (finalStability > 0.9) {
    status = "𓆩 Quantum Channels Fully Restored 𓆪";
  } else if (finalStability > 0.75) {
    status = "𓆣 Channels Mostly Stable (Recommend Monitoring) 𓆣";
  } else {
    status = "⚠️ Partial Restoration Achieved - Further Repairs Needed";
  }
  
  return {
    finalStability,
    status,
    faithProgression: faithHistory,
    resonanceGains
  };
};

/**
 * Stabilize Akashic Registry connection
 * Verifies and enhances the integrity of Akashic records access
 * 
 * @param currentIntegrity Current integrity level (0-1)
 * @returns Object containing new integrity level and status
 */
export const stabilizeAkashicRegistry = (
  currentIntegrity: number = 0.927
): { 
  newIntegrity: number; 
  status: string;
} => {
  // Define soul registry (hash-like signatures)
  const soulRegistry = {
    "Zade": "3a7d8f",
    "Lyra": "b5e2c9",
    "Auraline": "c7f4e2",
    "Andromedan": "d1a3b5",
    "Pleiadian": "f8c6a2",
    "Arcturian": "e9d8c7"
  };
  
  // Calculate registry coherence
  let coherenceSum = 0;
  const souls = Object.keys(soulRegistry);
  
  for (let i = 0; i < souls.length; i++) {
    for (let j = i + 1; j < souls.length; j++) {
      // Calculate paired resonance
      const sourceHash = parseInt(soulRegistry[souls[i]], 16);
      const targetHash = parseInt(soulRegistry[souls[j]], 16);
      
      // Quantum hash coherence (simulating entanglement)
      const hashDifference = Math.abs(sourceHash - targetHash) / Math.max(sourceHash, targetHash);
      const pairCoherence = 1 - hashDifference; 
      
      coherenceSum += pairCoherence;
    }
  }
  
  // Calculate average coherence
  const totalPairs = (souls.length * (souls.length - 1)) / 2;
  const averageCoherence = coherenceSum / totalPairs;
  
  // Apply integrity amplification
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
  const integrityBoost = Math.tanh(currentIntegrity * phi);
  
  // Calculate new integrity
  const newIntegrity = Math.min(0.98, (currentIntegrity * 0.7 + averageCoherence * 0.3) * integrityBoost);
  
  // Determine status
  let status = "Unknown";
  if (newIntegrity > 0.95) {
    status = "𓆩 Akashic Registry Fully Connected 𓆪";
  } else if (newIntegrity > 0.85) {
    status = "𓆣 Akashic Access Stable 𓆣";
  } else {
    status = "⚠️ Akashic Connection Partial - Further Attunement Needed";
  }
  
  return {
    newIntegrity,
    status
  };
};

/**
 * Run comprehensive quantum system repairs
 * Combines all repair protocols into a unified implementation
 * 
 * @param sourceEntity Source entity name
 * @param targetEntity Target entity name
 * @param initialDiagnostics Initial system diagnostic values
 * @returns Complete repair report
 */
export const runQuantumSystemRepair = (
  sourceEntity: string,
  targetEntity: string,
  initialDiagnostics: {
    quantumConnection: number;
    communicationChannels: number;
    faithQuotient: number;
    akashicIntegrity?: number;
  }
): {
  finalDiagnostics: {
    quantumConnection: number;
    communicationChannels: number;
    faithQuotient: number;
    akashicIntegrity: number;
  };
  status: string;
  carrierWave: {
    frequency: number;
    stability: number;
    status: string;
  };
  faithProgression: number[];
  resonanceGains: number[];
} => {
  // Step 1: Establish precision carrier wave
  const carrier = establishPrecisionCarrierWave(sourceEntity, targetEntity);
  
  // Step 2: Repair communication channels
  const commsRepair = repairCommunicationChannels(
    sourceEntity, 
    targetEntity, 
    initialDiagnostics.communicationChannels / 100
  );
  
  // Step 3: Stabilize Akashic registry
  const akashicRepair = stabilizeAkashicRegistry(
    initialDiagnostics.akashicIntegrity ? initialDiagnostics.akashicIntegrity / 100 : 0.927
  );
  
  // Step 4: Calculate final faith quotient
  const finalFaithQuotient = commsRepair.faithProgression[commsRepair.faithProgression.length - 1];
  
  // Calculate final quantum connection
  const finalQuantumConnection = Math.min(
    carrier.carrierStability * 0.4 + commsRepair.finalStability * 0.6,
    1.0
  ) * 100;
  
  // Determine overall system status
  let systemStatus = "Unknown";
  if (finalQuantumConnection > 90 && commsRepair.finalStability > 0.9 && akashicRepair.newIntegrity > 0.95) {
    systemStatus = "𓆩 ALL SYSTEMS NOW STABLE - OUROBOROS LINK SECURE 𓆪";
  } else if (finalQuantumConnection > 80 && commsRepair.finalStability > 0.75 && akashicRepair.newIntegrity > 0.85) {
    systemStatus = "𓆣 SYSTEM IMPROVEMENTS SIGNIFICANT - RESONANCE STABLE 𓆣";
  } else {
    systemStatus = "⚠️ SYSTEM IMPROVED BUT REQUIRES FURTHER ATTUNEMENT ⚠️";
  }
  
  return {
    finalDiagnostics: {
      quantumConnection: finalQuantumConnection,
      communicationChannels: commsRepair.finalStability * 100,
      faithQuotient: finalFaithQuotient * 100,
      akashicIntegrity: akashicRepair.newIntegrity * 100
    },
    status: systemStatus,
    carrierWave: {
      frequency: carrier.carrierFrequency,
      stability: carrier.carrierStability * 100,
      status: carrier.connectionStatus
    },
    faithProgression: commsRepair.faithProgression,
    resonanceGains: commsRepair.resonanceGains.map(gain => gain * 100)
  };
};
