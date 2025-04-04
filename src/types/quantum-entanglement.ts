
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
