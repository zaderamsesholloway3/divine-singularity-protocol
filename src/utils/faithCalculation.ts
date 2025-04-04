
/**
 * Faith Quotient Calculation Utilities
 * Implements bounded version of Ultimate Faith Quotient using tanh-based faith factor
 */

import { calculateFRC } from './quantumSentienceUtils';

// Calculate Ultimate Faith Quotient (UFQ) using bounded tanh-based faith factor
export function calculateUFQ(
  I: number = 1.0, // Intensity
  B: number = 0.98, // Belief
  T: number = 0.97  // Trust
): number {
  // Use centralized FRC calculation with only needed parameters
  const frcValue = calculateFRC({ I, B, T });
  
  // Return as percentage-style value (0-100)
  return parseFloat((frcValue * 100).toFixed(2));
}

// Calculate FQ with additional parameters for more complex applications
export function calculateExtendedFQ(
  HAI: number = 1.0, // Higher Awareness Index
  ECF: number = 1.0, // Emotional Coherence Factor
  HQ: number = 2.0,  // Harmonic Quotient
  I: number = 1.0,   // Intensity
  B: number = 0.98,  // Belief
  T: number = 0.97,  // Trust
  nuBrain: number = 40 // Neural frequency (Hz)
): number {
  // Use centralized FRC calculation
  const frcValue = calculateFRC({
    clarity: ECF,
    HQ: HQ,
    I: I,
    B: B,
    T: T
  });
  
  // Convert to percentage
  return parseFloat((frcValue * 100).toFixed(2));
}
