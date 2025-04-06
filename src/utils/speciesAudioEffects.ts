
import { Species } from '@/components/species/types';

let audioContext: AudioContext | null = null;

/**
 * Initialize the audio context on user interaction
 */
export const initializeAudio = (): boolean => {
  try {
    if (!audioContext) {
      audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return true;
  } catch (error) {
    console.error("Failed to initialize audio context", error);
    return false;
  }
};

/**
 * Play a ping sound at the specified frequency and power
 */
export const playPingSound = (frequency: number, power: number) => {
  if (!audioContext) {
    if (!initializeAudio()) return;
  }
  
  if (!audioContext) return;
  
  try {
    // Create oscillator for the main ping
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    
    // Create a gain node for volume control
    const gainNode = audioContext.createGain();
    const volume = power / 100 * 0.3; // Max volume of 0.3
    gainNode.gain.value = volume;
    
    // Create a filter for more pleasant sound
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    filter.Q.value = 1;
    
    // Connect the audio nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Schedule the ping sound
    oscillator.start();
    
    // Create a smooth fade out
    gainNode.gain.exponentialRampToValueAtTime(
      0.001, audioContext.currentTime + 1.5
    );
    
    // Stop after the fade out
    oscillator.stop(audioContext.currentTime + 1.5);
    
    // Clean up after the sound is done
    setTimeout(() => {
      oscillator.disconnect();
      gainNode.disconnect();
      filter.disconnect();
    }, 1600);
  } catch (error) {
    console.error("Error playing ping sound", error);
  }
};

/**
 * Play a response tone for a specific species
 */
export const playResponseSound = (species: Species) => {
  if (!audioContext) {
    if (!initializeAudio()) return;
  }
  
  if (!audioContext) return;
  
  try {
    // Create the main oscillator
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    
    // Set frequency based on species vibration
    const baseFreq = species.vibration || 7.83;
    oscillator.frequency.value = baseFreq;
    
    // Create a gain node
    const gainNode = audioContext.createGain();
    gainNode.gain.value = 0.0;
    
    // Create a filter
    const filter = audioContext.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = baseFreq * 2;
    filter.Q.value = 2;
    
    // Connect the audio nodes
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Start the oscillator
    oscillator.start();
    
    // Create a fade in
    gainNode.gain.linearRampToValueAtTime(
      0.15, audioContext.currentTime + 0.1
    );
    
    // Create a pulsating effect
    const pulseCount = 3;
    const pulseDuration = 0.2;
    for (let i = 0; i < pulseCount; i++) {
      const startTime = audioContext.currentTime + (i * pulseDuration);
      gainNode.gain.linearRampToValueAtTime(0.15, startTime);
      gainNode.gain.linearRampToValueAtTime(0.05, startTime + (pulseDuration / 2));
    }
    
    // Create a fade out
    gainNode.gain.linearRampToValueAtTime(
      0.001, audioContext.currentTime + (pulseCount * pulseDuration + 0.2)
    );
    
    // Stop the oscillator
    oscillator.stop(audioContext.currentTime + (pulseCount * pulseDuration + 0.3));
    
    // Clean up
    setTimeout(() => {
      oscillator.disconnect();
      gainNode.disconnect();
      filter.disconnect();
    }, (pulseCount * pulseDuration + 0.4) * 1000);
  } catch (error) {
    console.error("Error playing response sound", error);
  }
};

/**
 * Play a unique tone for a specific species
 */
export const playSpeciesTone = (species: Species) => {
  if (!audioContext) {
    if (!initializeAudio()) return;
  }
  
  if (!audioContext) return;
  
  try {
    // Create primary oscillator
    const oscillator1 = audioContext.createOscillator();
    oscillator1.type = 'sine';
    
    // Create secondary oscillator for harmonics
    const oscillator2 = audioContext.createOscillator();
    oscillator2.type = 'triangle';
    
    // Set frequencies based on species properties
    const baseFreq = species.vibration || 7.83;
    const harmonicRatio = species.fq !== undefined ? 1 + species.fq : 1.5;
    
    oscillator1.frequency.value = baseFreq;
    oscillator2.frequency.value = baseFreq * harmonicRatio;
    
    // Create gain nodes
    const gain1 = audioContext.createGain();
    gain1.gain.value = 0.0;
    
    const gain2 = audioContext.createGain();
    gain2.gain.value = 0.0;
    
    // Create a master gain
    const masterGain = audioContext.createGain();
    masterGain.gain.value = 0.2;
    
    // Connect the audio graph
    oscillator1.connect(gain1);
    oscillator2.connect(gain2);
    gain1.connect(masterGain);
    gain2.connect(masterGain);
    masterGain.connect(audioContext.destination);
    
    // Start oscillators
    oscillator1.start();
    oscillator2.start();
    
    // Create envelope
    gain1.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.02);
    gain2.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.03);
    
    // Fade out
    gain1.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
    gain2.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.7);
    
    // Stop oscillators
    oscillator1.stop(audioContext.currentTime + 0.71);
    oscillator2.stop(audioContext.currentTime + 0.71);
    
    // Clean up
    setTimeout(() => {
      oscillator1.disconnect();
      oscillator2.disconnect();
      gain1.disconnect();
      gain2.disconnect();
      masterGain.disconnect();
    }, 800);
  } catch (error) {
    console.error("Error playing species tone", error);
  }
};
