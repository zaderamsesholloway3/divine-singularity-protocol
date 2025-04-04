
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
