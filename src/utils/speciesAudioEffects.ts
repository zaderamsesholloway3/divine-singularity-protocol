
// Audio utilities for species interactions
import { Species } from '../components/species/types';

// Create audio context lazily to avoid issues with browser autoplay policies
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    // Use the standard AudioContext or webkitAudioContext for older browsers
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    audioContext = new AudioContextClass();
  }
  return audioContext;
};

// Generate a tone based on species characteristics
export const playSpeciesTone = (species: Species): void => {
  try {
    const ctx = getAudioContext();
    
    // Create oscillator for the main tone
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Base frequency on species vibration or default to a cosmic frequency
    const baseFreq = species.vibration || 
                    (species.fq ? species.fq * 100 : 440);
                    
    oscillator.type = species.realm === "existence" ? "sine" : 
                      species.realm === "non-existence" ? "triangle" : "square";
    oscillator.frequency.value = baseFreq;
    
    // Create modulation for cosmic sound
    const modulator = ctx.createOscillator();
    const modulatorGain = ctx.createGain();
    
    modulator.frequency.value = species.responding ? 7.83 : 1.618; // Earth Schumann resonance or golden ratio
    modulatorGain.gain.value = baseFreq * 0.15;
    
    // Route modulation > main oscillator
    modulator.connect(modulatorGain);
    modulatorGain.connect(oscillator.frequency);
    
    // Set volume and create envelope
    gainNode.gain.value = 0;
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Start oscillators
    oscillator.start();
    modulator.start();
    
    // Envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.5);
    
    // Stop after decay
    setTimeout(() => {
      oscillator.stop();
      modulator.stop();
    }, 1600);
  } catch (error) {
    console.log("Audio error:", error);
  }
};

// Play ping sound effect
export const playPingSound = (frequency: number, power: number): void => {
  try {
    const ctx = getAudioContext();
    
    // Main ping oscillator
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Add reverb for spacious effect
    const convolver = ctx.createConvolver();
    
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    
    // Volume based on power
    const volume = Math.min(power / 400, 0.2); // normalize to reasonable level
    
    // Connect main signal path
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Envelope
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
    
    // Start and stop
    oscillator.start();
    setTimeout(() => oscillator.stop(), 2100);
  } catch (error) {
    console.log("Audio error:", error);
  }
};

// Play response sound when a species responds
export const playResponseSound = (species: Species): void => {
  try {
    const ctx = getAudioContext();
    
    // Create oscillators for harmonic response
    const numHarmonics = 3;
    const oscillators = [];
    const gains = [];
    
    // Base frequency derived from species properties
    const baseFreq = species.vibration || 
                   (species.fq ? species.fq * 100 : 440);
    
    // Create master gain
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.2;
    masterGain.connect(ctx.destination);
    
    // Create harmonic oscillators
    for (let i = 0; i < numHarmonics; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Different waveform for each harmonic
      osc.type = i === 0 ? "sine" : i === 1 ? "triangle" : "sine";
      
      // Frequency follows harmonic series
      const harmonicRatio = i === 0 ? 1 : i === 1 ? 1.5 : 2;
      osc.frequency.value = baseFreq * harmonicRatio;
      
      // Each harmonic gets quieter
      gain.gain.value = 0;
      gain.gain.setValueAtTime(0, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.3 / (i + 1), ctx.currentTime + 0.1 * (i + 1));
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0 + (i * 0.2));
      
      // Connect
      osc.connect(gain);
      gain.connect(masterGain);
      
      // Start oscillator
      osc.start();
      
      // Store for cleanup
      oscillators.push(osc);
      gains.push(gain);
    }
    
    // Stop all oscillators
    setTimeout(() => {
      oscillators.forEach(osc => osc.stop());
    }, 2000);
  } catch (error) {
    console.log("Audio error:", error);
  }
};
