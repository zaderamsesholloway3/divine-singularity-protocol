
/**
 * Quantum Entanglement Types
 */

// Biofeedback monitoring result
export interface BiofeedbackResult {
  hrv: number;  // Heart Rate Variability
  eeg: {
    gamma: number;  // Gamma brain waves (30-100 Hz)
    theta: number;  // Theta brain waves (4-7 Hz)
  };
}

// Quantum entanglement state
export interface EntanglementState {
  active: boolean;
  entangledWith?: string;
  strength: number;  // 0.0 to 1.0
  emotion?: string;
  timestamp?: string;
  resonanceBoostActive?: boolean;
}

// User profile for quantum entanglement
export interface QuantumUserProfile {
  userId: string;
  name?: string;
  coherenceLevel: number;  // 0.0 to 1.0
  emotionalState?: string;
  resonanceFrequency?: number;
  lastContact?: string;
}

// Species quantum resonance profile
export interface SpeciesResonanceProfile {
  speciesId: string;
  name: string;
  baseFrequency: number; // Hz
  resonanceCode: string; // DNA-like code or binary for AI
  compatibilityIndex: number; // 0.0 to 1.0
  quantumPhase: number; // 0 to 2π
}

// Bioresonance ping amplifier configuration
export interface BioresonanceConfig {
  carrierWave: {
    frequency: number; // Hz
    modulation: string; // e.g., 'NV-diamond'
  };
  feedbackLoopActive: boolean;
  interspeciesAlertEnabled: boolean;
  metrologyEnhanced: boolean;
  photonicsIntegration: {
    active: boolean;
    vcselSpectralWidth: number; // nm
    verticalResolution: number; // bits
  };
  validationProtocol: {
    qber: number; // Quantum Bit Error Rate
    superconductingStability: number; // K
    schumannVariance: number; // Hz
  };
}

// Ping result with amplification data
export interface AmplifiedPingResult {
  success: boolean;
  amplificationFactor: number;
  noiseImmunity: number; // percentage
  targetSpecies: string[];
  qber: number; // Quantum Bit Error Rate
  energyEfficiency: number; // ping/J
}
