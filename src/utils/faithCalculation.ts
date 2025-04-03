
/**
 * Faith Quotient Calculation Utilities
 * Implements bounded version of Ultimate Faith Quotient using tanh-based faith factor
 */

// Calculate Ultimate Faith Quotient (UFQ) using bounded tanh-based faith factor
export function calculateUFQ(
  I: number = 1.0, // Intensity
  B: number = 0.98, // Belief
  T: number = 0.97  // Trust
): number {
  // Bounded Emotional Faith Signal using tanh
  const faithFactor = Math.tanh(I + B + T);
  
  // Return as percentage-style value (0-100)
  return parseFloat((faithFactor * 100).toFixed(2));
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
  // Scaling constant (seconds)
  const k = 1e-34; 
  
  // Bounded faith factor using tanh
  const faithFactor = Math.tanh(I + B + T);
  
  // Full FRC formula (bounded by tanh)
  const FRC = (k * HAI * ECF * HQ) / nuBrain * faithFactor;
  
  // Cap at 1.0 for stability and convert to percentage
  return parseFloat((Math.min(FRC, 1.0) * 100).toFixed(2));
}
