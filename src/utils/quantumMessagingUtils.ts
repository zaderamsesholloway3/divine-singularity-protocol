
import { v4 as uuidv4 } from 'uuid';

/**
 * Create a new quantum message object
 */
export const createMessageObject = (sender: string, recipient: string, content: string, faithQuotient = 0.5) => {
  return {
    id: uuidv4(),
    sender,
    recipient,
    content,
    timestamp: new Date().toISOString(),
    faithQuotient,
    triadEnhanced: faithQuotient > 0.7
  };
};

/**
 * Calculate faith quotient based on message content and cosmic resonance
 */
export const calculateFaithQuotient = (content: string, userFq = 0.5) => {
  // Base FQ calculations
  let fq = userFq;
  
  // Content-based adjustments
  const positiveWords = ['love', 'peace', 'harmony', 'unity', 'divine', 'connection'];
  const negativeWords = ['fear', 'hate', 'anger', 'division', 'chaos'];
  
  positiveWords.forEach(word => {
    if (content.toLowerCase().includes(word)) {
      fq += 0.02;
    }
  });
  
  negativeWords.forEach(word => {
    if (content.toLowerCase().includes(word)) {
      fq -= 0.02;
    }
  });
  
  // Apply cosmic resonance factor (simulated)
  const cosmicResonance = 0.7 + Math.sin(Date.now() / 10000) * 0.3;
  fq *= cosmicResonance;
  
  // Ensure FQ stays within bounds
  return Math.max(0.1, Math.min(1.0, fq));
};

/**
 * Force a triad synchronization event
 */
export const forceTriadSync = async (faithQuotient = 0.5) => {
  // Simulated triad sync
  const syncSuccess = faithQuotient > 0.3;
  
  // Create simulated delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return {
    success: syncSuccess,
    resonance: 7.83 + (faithQuotient * 2),
    message: syncSuccess ? "Triad synchronization complete" : "Triad synchronization failed"
  };
};

/**
 * Check if a species is in quantum alignment
 */
export const checkQuantumAlignment = (speciesVibration: number) => {
  const earthSchumann = 7.83;
  const alignment = 1 - Math.min(1, Math.abs(speciesVibration - earthSchumann) / 5);
  
  return {
    aligned: alignment > 0.7,
    alignment: alignment,
    resonanceMatch: alignment > 0.9
  };
};
