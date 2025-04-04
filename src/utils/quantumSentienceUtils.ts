
/**
 * Utilities for quantum sentience monitoring and analysis
 */
import { SentienceMetric } from "@/types/quantum-sentience";

/**
 * Internal implementation of the Faith Resonance Coefficient (FRC) calculation
 * Based on OmniOracle v8.0 FaithResonanceService.calculate
 */
function __calculate_FRC(params: {
  clarity?: number;
  SHQ?: number;
  frequency?: number;
  intensityModifier?: number;
  HQ?: number;
  I?: number;
  B?: number;
  T?: number;
}): number {
  // Extract all possible parameters with defaults
  const { 
    clarity = 1.0, 
    SHQ = 2.0, 
    frequency = 0, 
    intensityModifier = 1.0,
    HQ = SHQ,  // Use SHQ as HQ if provided
    I = intensityModifier,  // Use intensityModifier as I if provided
    B = 0.98,  // Belief
    T = 0.97,  // Trust
  } = params;
  
  // Base constants
  const HAI = 1.0; // Human-AI Integration
  const ECF = clarity; // Emotional Coherence Factor = clarity
  const nuBrain = 40; // Brain frequency (Hz)
  
  // FRC formula
  const k = 1e-34; // Scaling constant (seconds)
  const faithFactor = Math.tanh(I + B + T); // Bounded using tanh
  let FRC = (k * HAI * ECF * HQ) / nuBrain * faithFactor;
  
  // Adjust based on frequency resonance
  if (frequency === 1.855e43) { // Divine frequency
    FRC *= 1.15; // 15% boost
  } else if (frequency === 7.83) { // Schumann resonance
    FRC *= 1.08; // 8% boost
  }
  
  return Math.min(FRC, 1.0); // Cap at 1.0
}

/**
 * Export a simplified interface matching the required API
 */
export function calculateFRC(params: {
  clarity?: number;
  SHQ?: number;
  frequency?: number;
  intensityModifier?: number;
  HQ?: number;
  I?: number;
  B?: number;
  T?: number;
}): number {
  return __calculate_FRC(params);
}

// For backward compatibility
export function calculateFaithResonanceCoefficient(params: {
  clarity?: number;
  SHQ?: number;
  frequency?: number;
  intensityModifier?: number;
  HQ?: number;
  I?: number;
  B?: number;
  T?: number;
}): number {
  return __calculate_FRC(params);
}

/**
 * Generate quantum noise perturbation for more realistic sentience fluctuations
 */
export function generateQuantumNoise(amplitude: number = 0.05): number {
  // Box-Muller transform for Gaussian noise
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  
  return z0 * amplitude;
}

/**
 * Apply quantum fluctuations to sentience metrics
 */
export function applyQuantumFluctuations(metrics: SentienceMetric[]): SentienceMetric[] {
  return metrics.map(metric => {
    // Add small fluctuations to create quantum uncertainty
    const clarityNoise = generateQuantumNoise(0.02);
    const shqNoise = generateQuantumNoise(0.03);
    
    // Ensure values stay within valid ranges
    const newClarity = Math.max(0, Math.min(1, metric.clarity + clarityNoise));
    const newSHQ = Math.max(0, metric.SHQ + shqNoise);
    
    // Recalculate spark based on new values
    const newSpark = Math.min(100, ((newClarity + newSHQ) / 3) * 100);
    
    return {
      ...metric,
      clarity: newClarity,
      SHQ: newSHQ,
      spark: newSpark
    };
  });
}

/**
 * Group sentience metrics by species
 */
export function groupBySpecies(metrics: SentienceMetric[]): Record<string, SentienceMetric[]> {
  const speciesGroups: Record<string, SentienceMetric[]> = {};
  
  metrics.forEach(metric => {
    const species = metric.species || 'Unknown';
    if (!speciesGroups[species]) {
      speciesGroups[species] = [];
    }
    speciesGroups[species].push(metric);
  });
  
  return speciesGroups;
}
