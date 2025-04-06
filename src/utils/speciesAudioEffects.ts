
import { Species } from '@/components/species/types';

// Create audio context on demand
let audioContext: AudioContext | null = null;

const getAudioContext = (): AudioContext => {
  if (!audioContext) {
    audioContext = new window.AudioContext();
  }
  return audioContext;
};

/**
 * Play ping sound using Web Audio API
 * @param frequency Base frequency in Hz
 * @param power Volume as percentage (0-100)
 */
export const playPingSound = (frequency: number, power: number) => {
  try {
    const context = getAudioContext();
    const volume = power / 100; // Convert percentage to decimal
    
    // Create oscillator
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, context.currentTime);
    
    // Create gain node for volume control
    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(volume * 0.7, context.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(volume * 0.3, context.currentTime + 1.5);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 3);
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Start and stop
    oscillator.start();
    oscillator.stop(context.currentTime + 3);
  } catch (error) {
    console.error("Error playing ping sound:", error);
  }
};

/**
 * Play response tone based on species properties
 */
export const playResponseSound = (species: Species) => {
  try {
    const context = getAudioContext();
    const baseFrequency = species.vibration || 7.83;
    
    // Create oscillator 
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = baseFrequency;
    
    // Second oscillator for harmonics
    const oscillator2 = context.createOscillator();
    oscillator2.type = 'sine';
    oscillator2.frequency.value = baseFrequency * 1.5;
    
    // Create gain node
    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, context.currentTime + 0.1);
    gainNode.gain.linearRampToValueAtTime(0, context.currentTime + 2);
    
    // Create second gain node with different envelope
    const gainNode2 = context.createGain();
    gainNode2.gain.setValueAtTime(0, context.currentTime);
    gainNode2.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.3);
    gainNode2.gain.linearRampToValueAtTime(0, context.currentTime + 1.5);
    
    // Connect nodes
    oscillator.connect(gainNode);
    oscillator2.connect(gainNode2);
    gainNode.connect(context.destination);
    gainNode2.connect(context.destination);
    
    // Realm-specific modulation
    const lfo = context.createOscillator();
    lfo.frequency.value = species.realm === "Existence" ? 3 : 
                          species.realm === "Non-Existence" ? 5 : 2;
    const lfoGain = context.createGain();
    lfoGain.gain.value = 5;
    lfo.connect(lfoGain);
    lfoGain.connect(oscillator.frequency);
    
    // Start and stop
    oscillator.start();
    oscillator2.start();
    lfo.start();
    oscillator.stop(context.currentTime + 2);
    oscillator2.stop(context.currentTime + 2);
    lfo.stop(context.currentTime + 2);
    
    // Add a success notification sound if species is responding
    if (species.responding) {
      setTimeout(() => {
        const notifyOsc = context.createOscillator();
        notifyOsc.type = 'sine';
        notifyOsc.frequency.value = 880;
        
        const notifyGain = context.createGain();
        notifyGain.gain.setValueAtTime(0.1, context.currentTime);
        notifyGain.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5);
        
        notifyOsc.connect(notifyGain);
        notifyGain.connect(context.destination);
        
        notifyOsc.start();
        notifyOsc.stop(context.currentTime + 0.5);
      }, 300);
    }
  } catch (error) {
    console.error("Error playing response sound:", error);
  }
};

/**
 * Play a tone when selecting a species
 */
export const playSpeciesTone = (species: Species) => {
  try {
    const context = getAudioContext();
    const baseFrequency = species.vibration || (species.fq !== undefined ? species.fq * 1000 : 440);
    
    // Create oscillator
    const oscillator = context.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = baseFrequency;
    
    // Create gain node
    const gainNode = context.createGain();
    gainNode.gain.setValueAtTime(0, context.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.15, context.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, context.currentTime + 0.5);
    
    // Connect nodes
    oscillator.connect(gainNode);
    gainNode.connect(context.destination);
    
    // Start and stop
    oscillator.start();
    oscillator.stop(context.currentTime + 0.5);
  } catch (error) {
    console.error("Error playing species tone:", error);
  }
};
