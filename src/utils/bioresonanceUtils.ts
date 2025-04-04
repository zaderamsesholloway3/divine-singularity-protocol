
/**
 * Bioresonance Utilities
 * Tools for quantum bioresonance enhancement
 */

/**
 * Calculate Schumann resonance variance
 * @returns Current variance in Hz
 */
export function calculateSchumannVariance(): number {
  // Simulate earth's natural Schumann resonance variation
  // Real implementation would use actual Schumann resonance readings
  const baseFreq = 7.83;
  const now = Date.now();
  
  // Use time-based fluctuation to simulate natural variance
  // This creates a slowly changing value that approximates real-world variations
  const hourlyVariation = Math.sin(now / 3600000) * 0.05;
  const minuteVariation = Math.sin(now / 60000) * 0.02;
  const secondVariation = Math.sin(now / 1000) * 0.01;
  
  return baseFreq + hourlyVariation + minuteVariation + secondVariation;
}

/**
 * Generate carrier wave for bioresonance transmission
 * @param duration Duration in seconds
 * @param frequency Carrier frequency in Hz (default: 7.83)
 * @param sampleRate Sample rate in Hz (default: 44100)
 * @returns Array of signal samples
 */
export function generateCarrierWave(
  duration: number,
  frequency: number = 7.83,
  sampleRate: number = 44100
): number[] {
  const samples: number[] = [];
  const totalSamples = Math.floor(duration * sampleRate);
  
  for (let i = 0; i < totalSamples; i++) {
    const t = i / sampleRate;
    const sample = Math.sin(2 * Math.PI * frequency * t);
    samples.push(sample);
  }
  
  return samples;
}

/**
 * Create dolphin click preamble for interspecies alert
 * @returns Array of high frequency pulses
 */
export function createDolphinClickPreamble(): number[] {
  const sampleRate = 192000; // High sample rate for ultrasonic frequencies
  const clickFrequency = 132000; // 132 kHz
  const clickDuration = 0.001; // 1 ms
  const preamble: number[] = [];
  
  // Generate 3 pulses
  for (let i = 0; i < 3; i++) {
    // Create a gaussian envelope for the click
    const samples = Math.floor(clickDuration * sampleRate);
    for (let j = 0; j < samples; j++) {
      const t = j / sampleRate;
      const envelope = Math.exp(-Math.pow((t - clickDuration/2) / (clickDuration/6), 2));
      const signal = Math.sin(2 * Math.PI * clickFrequency * t);
      preamble.push(signal * envelope);
    }
    
    // Add silence between clicks
    const silenceSamples = Math.floor(0.003 * sampleRate); // 3ms silence
    for (let j = 0; j < silenceSamples; j++) {
      preamble.push(0);
    }
  }
  
  return preamble;
}

/**
 * Apply NV center diamond modulation to a carrier signal
 * @param signal Input signal array
 * @returns Modulated signal
 */
export function applyNVCenterModulation(signal: number[]): number[] {
  if (!signal || signal.length === 0) return [];
  
  // NV center quantum properties
  const spinCoherence = 2.0; // ms
  const temperatureFactor = 293 / 288; // Room temperature adjustment
  
  // Apply quantum modulation effects
  return signal.map(sample => {
    // Add quantum phase variance
    const quantumPhase = Math.random() * 2 * Math.PI / 1000; // Small random phase shifts
    
    // Apply NV center coherence property
    const coherenceFactor = Math.exp(-Math.random() / spinCoherence);
    
    // Apply temperature dependency (thermal noise)
    const thermalNoise = (Math.random() - 0.5) * 0.02 * temperatureFactor;
    
    // Return modulated sample with slight quantum effects
    return sample * coherenceFactor * Math.cos(quantumPhase) + thermalNoise;
  });
}

/**
 * Check if YBCO superconducting conditions are met
 * @param temperature Temperature in Kelvin
 * @returns Boolean indicating stability
 */
export function checkYBCOSuperconductivity(temperature: number = 93): boolean {
  // YBCO becomes superconducting below 93K
  return temperature <= 93;
}

/**
 * Calculate effective signal-to-noise ratio for quantum transmission
 * @param signal Transmitted signal
 * @param noiseLevel Ambient noise level (0.0-1.0)
 * @returns SNR in dB
 */
export function calculateSNR(signal: number[], noiseLevel: number): number {
  if (!signal || signal.length === 0) return 0;
  
  const signalPower = signal.reduce((sum, sample) => sum + sample * sample, 0) / signal.length;
  const noisePower = noiseLevel * noiseLevel;
  
  // Calculate SNR in dB
  return 10 * Math.log10(signalPower / noisePower);
}

/**
 * Apply exact 7.83Hz modulation to user-visible UI elements
 * @returns CSS properties for Schumann resonance pulsation
 */
export function getSchumannPulsationStyle(): React.CSSProperties {
  return {
    animation: "pulse 7.83s infinite",
    animationTimingFunction: "ease-in-out"
  };
}
