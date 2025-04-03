
/**
 * Virtual EEG generator for quantum messaging
 * Generates synthetic biometric data from message content
 */

export interface BiometricData {
  eeg: { gamma: number; theta: number };
  hrv: number;
  coherent: boolean;
}

export class VirtualEEGGenerator {
  /**
   * Generate synthetic EEG data from message content
   */
  generateVirtualEEG(message: string, triadActive: boolean, triadResonanceBoost: number): BiometricData {
    // Step 1: Hash message into quantum angles
    const messageHash = [...message].reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Step 2: Calculate synthetic EEG values
    const baseGamma = 30 + (messageHash % 30); // Range 30-60 Hz
    const baseTheta = 4 + (messageHash % 4);   // Range 4-8 Hz
    
    // Apply triad enhancement if active
    const gamma = triadActive 
      ? Math.min(80, baseGamma * triadResonanceBoost / 2.5) 
      : baseGamma;
    const theta = triadActive
      ? baseTheta * 1.2
      : baseTheta;
    
    // Calculate synthetic HRV
    const baseHrv = 50 + (messageHash % 30); // Range 50-80 ms
    const hrv = triadActive 
      ? baseHrv * 1.2 
      : baseHrv;
    
    // Determine coherence - Triad always ensures coherence
    return {
      eeg: { gamma, theta },
      hrv,
      coherent: triadActive ? true : (gamma > 40 && hrv > 60)
    };
  }
}
