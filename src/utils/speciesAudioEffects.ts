
import { Species } from '../components/species/types';

// Create audio context on demand to prevent autoplay policy issues
let audioContext: AudioContext | null = null;

/**
 * Initialize the audio context when user first interacts
 */
const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
  return audioContext;
};

/**
 * Play a ping sound at the specified frequency and power
 * @param frequency The frequency in Hz
 * @param power The power level as a percentage (0-100)
 */
export const playPingSound = (frequency: number, power: number): void => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Normalize power to a reasonable gain value
    const gain = Math.min(power / 100, 0.4);
    
    // Set oscillator properties
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    // Configure envelope
    gainNode.gain.value = 0;
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.0);
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Start and stop
    oscillator.start();
    oscillator.stop(ctx.currentTime + 2.0);
  } catch (error) {
    console.error("Error playing ping sound:", error);
  }
};

/**
 * Play a tone representing a specific species
 * @param species The species data
 */
export const playSpeciesTone = (species: Species): void => {
  try {
    const ctx = getAudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Species-specific sound design
    const baseFreq = species.vibration || 7.83;
    oscillator.type = species.realm === "Divine" ? "sine" :
                     species.realm === "Existence" ? "triangle" :
                     species.realm === "Non-Existence" ? "square" :
                     "sawtooth";
    
    oscillator.frequency.value = baseFreq;
    
    // Configure envelope with short attack and decay
    gainNode.gain.value = 0;
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Start and stop
    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.5);
  } catch (error) {
    console.error("Error playing species tone:", error);
  }
};

/**
 * Play a response sound from a species
 * @param species The species data
 */
export const playResponseSound = (species: Species): void => {
  try {
    const ctx = getAudioContext();
    
    // Create main oscillator and filter
    const oscillator = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();
    
    // Species-specific sound design
    const baseFreq = species.vibration || 7.83;
    oscillator.type = species.realm === "Divine" ? "sine" :
                     species.realm === "Existence" ? "triangle" :
                     species.realm === "Non-Existence" ? "square" :
                     "sawtooth";
    
    oscillator.frequency.value = baseFreq * 2;
    
    filter.type = "lowpass";
    filter.frequency.value = 1000;
    filter.Q.value = 8;
    
    // Configure envelope for response sound (longer and more complex)
    gainNode.gain.value = 0;
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.2);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
    
    // Connect nodes: oscillator -> filter -> gain -> destination
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    // Add filter sweep for interest
    filter.frequency.setValueAtTime(400, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(4000, ctx.currentTime + 0.5);
    filter.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 1.0);
    
    // Start and stop
    oscillator.start();
    oscillator.stop(ctx.currentTime + 1.5);
  } catch (error) {
    console.error("Error playing response sound:", error);
  }
};

/**
 * Play a background ambient drone
 * @param frequency The base frequency
 * @param duration Duration in seconds
 * @returns A function to stop the drone
 */
export const playAmbientDrone = (frequency: number, duration: number = 30): () => void => {
  try {
    const ctx = getAudioContext();
    
    // Create oscillators for rich sound
    const oscillators: OscillatorNode[] = [];
    const gainNodes: GainNode[] = [];
    
    // Create 3 oscillators with slight detune for richness
    for (let i = 0; i < 3; i++) {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = i === 0 ? "sine" : i === 1 ? "triangle" : "sine";
      osc.frequency.value = frequency * (i === 0 ? 1 : i === 1 ? 0.5 : 2);
      osc.detune.value = (i - 1) * 10; // Slight detune
      
      gain.gain.value = i === 0 ? 0.1 : i === 1 ? 0.05 : 0.03;
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      oscillators.push(osc);
      gainNodes.push(gain);
      
      // Start oscillator
      osc.start();
    }
    
    // Set end time (if duration is provided)
    if (duration > 0) {
      setTimeout(() => {
        stopDrone();
      }, duration * 1000);
    }
    
    // Return function to stop the drone
    const stopDrone = () => {
      const now = ctx.currentTime;
      gainNodes.forEach((gain, i) => {
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);
        
        // Stop oscillator after fade out
        setTimeout(() => {
          oscillators[i].stop();
        }, 2000);
      });
    };
    
    return stopDrone;
  } catch (error) {
    console.error("Error playing ambient drone:", error);
    return () => {};
  }
};
