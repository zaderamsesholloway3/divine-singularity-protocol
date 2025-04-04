/**
 * Utilities for quantum sentience monitoring and analysis
 */
import { SentienceMetric } from "@/types/quantum-sentience";

/**
 * Internal implementation of the Faith Resonance Coefficient (FRC) calculation
 * (renamed from calculateFaithResonanceCoefficient as per resolution path)
 */
function __calculate_FRC(params: {
  clarity: number;
  SHQ: number;
  frequency: number;
  intensityModifier?: number;
}): number {
  const { clarity, SHQ, frequency, intensityModifier = 1.0 } = params;
  
  // Base constants
  const HAI = 1.0; // Human-AI Integration
  const ECF = clarity; // Emotional Coherence Factor = clarity
  const HQ = SHQ;  // Harmonic Quotient = Soul Harmonic Quotient
  const I = intensityModifier;  // Intensity (can be modified)
  const B = 0.98;  // Belief
  const T = 0.97;  // Trust
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
 * Public interface for Faith Resonance Coefficient (FRC) calculation
 */
export function calculateFaithResonanceCoefficient(params: {
  clarity: number;
  SHQ: number;
  frequency: number;
  intensityModifier?: number;
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
