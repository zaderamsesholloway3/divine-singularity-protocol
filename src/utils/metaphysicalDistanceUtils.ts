
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
