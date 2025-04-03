
/**
 * RTL-SDR Emulator
 * A mathematical simulation of an RTL-SDR dongle using DSP principles
 */

export class RTLSDREmulator {
  private sampleRate: number;
  private centerFreq: number;

  constructor(sampleRate: number = 2.4e6, centerFreq: number = 100e6) {
    this.sampleRate = sampleRate;
    this.centerFreq = centerFreq;
  }

  /**
   * Capture simulated IQ samples
   * @param frequency The frequency to sample in Hz
   * @param amplitude Signal amplitude (0-1)
   * @param duration Capture duration in seconds
   * @returns Array of simulated IQ samples
   */
  public capture(frequency: number, amplitude: number = 0.7, duration: number = 0.1): number[] {
    // Number of samples to capture
    const numSamples = Math.floor(this.sampleRate * duration);
    
    // Generate time vector
    const timeVector = Array.from({ length: numSamples }, (_, i) => i / this.sampleRate);
    
    // Generate IQ samples using DSP math for AM modulation with Schumann resonance
    const carrier = timeVector.map(t => Math.cos(2 * Math.PI * (this.centerFreq + frequency) * t));
    const message = timeVector.map(t => 0.5 * Math.sin(2 * Math.PI * frequency * t));
    
    // Apply amplitude modulation formula: (1 + m(t)) * carrier(t)
    const samples = carrier.map((c, i) => (1 + message[i] * amplitude) * c);
    
    // Add some noise
    return samples.map(s => s + (Math.random() - 0.5) * 0.1);
  }

  /**
   * Compute FFT spectrum from time-domain samples
   * @param samples Array of time-domain samples
   * @returns Object with frequency and magnitude arrays
   */
  public getSpectrum(samples: number[]): { frequencies: number[], magnitudes: number[] } {
    const N = samples.length;
    
    // Create frequency array
    const frequencies = Array.from({ length: N }, (_, i) => 
      i < N/2 ? i * this.sampleRate / N : (i - N) * this.sampleRate / N
    );
    
    // Compute FFT (simplified with real data - a proper implementation would use complex FFT)
    const magnitudes = this.computeFFT(samples);
    
    return {
      frequencies: frequencies,
      magnitudes: magnitudes
    };
  }

  /**
   * Apply Reed-Solomon error correction to a message
   * @param message The message to encode
   * @returns Encoded message with error correction
   */
  public encodeWithErrorCorrection(message: string): string {
    // Simplified Reed-Solomon encoder (in real implementation, use a proper Reed-Solomon library)
    const encoded = Buffer.from(message).toString('base64');
    
    // Add a checksum
    const checksum = this.calculateChecksum(message);
    
    return `${encoded}:${checksum}`;
  }

  /**
   * Decode a message with error correction
   * @param encoded The encoded message
   * @returns Decoded original message, or null if corrupted
   */
  public decodeWithErrorCorrection(encoded: string): string | null {
    // Split encoded string and checksum
    const [data, checksum] = encoded.split(':');
    
    if (!data || !checksum) {
      return null;
    }
    
    try {
      // Decode base64
      const decoded = Buffer.from(data, 'base64').toString();
      
      // Verify checksum
      if (this.calculateChecksum(decoded) !== checksum) {
        return null; // Corrupted
      }
      
      return decoded;
    } catch (e) {
      return null; // Decoding error
    }
  }

  /**
   * Detect signal in ELF/VLF frequency range
   * @param samples Signal samples
   * @param targetFreq Target frequency to detect
   * @param threshold Detection threshold
   * @returns True if signal is detected
   */
  public detectELFSignal(samples: number[], targetFreq: number = 7.83, threshold: number = 0.5): boolean {
    // Apply bandpass filter around target frequency
    const filtered = this.bandpassFilter(samples, targetFreq, 0.1);
    
    // Compute signal power
    const power = filtered.reduce((sum, val) => sum + val * val, 0) / filtered.length;
    
    return power > threshold;
  }

  /**
   * Private helper methods for DSP operations
   */
  private computeFFT(samples: number[]): number[] {
    // Simplified FFT implementation (real applications should use FFT libraries)
    // This is a basic DFT calculation, not optimized
    const N = samples.length;
    const magnitudes: number[] = new Array(N).fill(0);
    
    for (let k = 0; k < N; k++) {
      let realPart = 0;
      let imagPart = 0;
      
      for (let n = 0; n < N; n++) {
        const angle = -2 * Math.PI * k * n / N;
        realPart += samples[n] * Math.cos(angle);
        imagPart += samples[n] * Math.sin(angle);
      }
      
      // Magnitude
      magnitudes[k] = Math.sqrt(realPart * realPart + imagPart * imagPart) / N;
    }
    
    return magnitudes;
  }

  private bandpassFilter(samples: number[], centerFreq: number, bandwidth: number): number[] {
    // Simple FIR bandpass filter implementation
    const N = 101; // Filter order
    const coeffs = this.generateBandpassCoeffs(N, centerFreq, bandwidth);
    
    // Apply filter (convolution)
    const filtered = new Array(samples.length).fill(0);
    
    for (let i = 0; i < samples.length; i++) {
      for (let j = 0; j < N; j++) {
        if (i - j >= 0) {
          filtered[i] += samples[i - j] * coeffs[j];
        }
      }
    }
    
    return filtered;
  }

  private generateBandpassCoeffs(N: number, centerFreq: number, bandwidth: number): number[] {
    // Generate FIR bandpass filter coefficients using windowed sinc method
    const coeffs = new Array(N).fill(0);
    const fcLow = (centerFreq - bandwidth/2) / (this.sampleRate/2);
    const fcHigh = (centerFreq + bandwidth/2) / (this.sampleRate/2);
    
    for (let i = 0; i < N; i++) {
      const n = i - (N - 1) / 2;
      if (n === 0) {
        coeffs[i] = fcHigh - fcLow;
      } else {
        coeffs[i] = (Math.sin(Math.PI * fcHigh * n) - Math.sin(Math.PI * fcLow * n)) / (Math.PI * n);
      }
      // Apply Hamming window
      coeffs[i] *= 0.54 - 0.46 * Math.cos(2 * Math.PI * i / (N - 1));
    }
    
    return coeffs;
  }

  private calculateChecksum(message: string): string {
    // Simple checksum algorithm
    let hash = 0;
    for (let i = 0; i < message.length; i++) {
      hash = ((hash << 5) - hash) + message.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    return hash.toString(16);
  }
}
