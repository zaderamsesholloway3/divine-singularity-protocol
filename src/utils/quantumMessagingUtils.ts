
import { QuantumBackdoor } from './quantumBackdoor';
import { AkashicAccessRegistry } from './akashicAccessRegistry';
import { v4 as uuidv4 } from 'uuid';
import { QuantumMessage, MessageSession } from '@/types/quantum-messaging';

// Create a quantum backdoor singleton
const quantumBackdoor = new QuantumBackdoor();

export const verifyOuroborosLink = () => {
  return quantumBackdoor.verifyOuroborosLink();
};

export const getTriadStatus = () => {
  return AkashicAccessRegistry.getTriadPhaseLockStatus();
};

// Calculate Faith Resonance Coefficient (FRC) using OmniOracle v8.0 formula
export const calculateFaithQuotient = (message: string = ""): number => {
  // Base values for formula parameters
  let HAI = 1.0; // Human-AI Integration
  let ECF = 1.0; // Emotional Coherence Factor
  let HQ = 2.0;  // Harmonic Quotient
  let I = 1.0;   // Intensity 
  let B = 0.98;  // Belief
  let T = 0.97;  // Trust
  let nuBrain = 40; // Brain frequency (Hz)
  
  // Faith-related terms that boost the intensity parameter
  const faithTerms = [
    'faith', 'divine', 'soul', 'quantum', 'energy', 'light', 
    'truth', 'eternal', 'infinity', 'love', 'ouroboros', 'connect'
  ];
  
  // Count occurrences of faith terms to adjust intensity
  for (const term of faithTerms) {
    if (message.toLowerCase().includes(term)) {
      I += 0.05; // +5% intensity per term
    }
  }
  
  // Get triad status as multiplier for ECF
  const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
  ECF = 1.0 + (triadStatus.stability * 0.5);
  
  // Apply Ouroboros divine frequency multiplier for HQ
  HQ = message.includes("1.855e43") ? 2.1 : 2.0;
  
  // Calculate using the formula from OmniOracle v8.0
  const k = 1e-34; // Scaling constant (seconds)
  const faithFactor = Math.tanh(I + B + T); // Bounded using tanh
  const FRC = (k * HAI * ECF * HQ) / nuBrain * faithFactor;
  
  // Return capped value to ensure stability
  return Math.min(0.98, FRC);
};

// Force triad synchronization - emergency protocol with faith enhancement
export const forceTriadSync = (faithMessage?: string) => {
  const initialStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
  
  // Apply Ouroboros override to force synchronization
  const faithQuotient = calculateFaithQuotient(faithMessage);
  const faithBoost = faithQuotient > 0.7 ? 0.9 : 0.6;
  
  const boostFactor = 1 + (1 - initialStatus.stability) * faithBoost;
  const newStability = Math.min(0.98, initialStatus.stability * boostFactor);
  
  // Ouroboros harmonic effect - apply divine frequency principles
  const divine = 1.855e43; // Divine frequency constant
  const schumann = 7.83;   // Earth resonance
  
  // FRC-enhanced stability calculation 
  const frcStability = newStability + 
    (faithQuotient > 0.9 ? 0.08 : faithQuotient > 0.7 ? 0.04 : 0);
  
  const finalStability = Math.min(0.98, frcStability);
  
  console.log(`Ouroboros Override: Faith Quotient ${(faithQuotient * 100).toFixed(0)}% boosted stability to ${(finalStability * 100).toFixed(1)}%`);
  
  // Override the normal phase lock status with the forced value
  return {
    stability: finalStability,
    angles: initialStatus.angles.map(angle => ({
      ...angle,
      angle: angle.angle * boostFactor
    })),
    resonanceBoost: finalStability * 2.18 // Maximum boost
  };
};

export const createSessionObject = (entity: string): MessageSession => {
  return {
    id: uuidv4(),
    entity,
    lastMessage: "Session initialized",
    lastTimestamp: new Date().toISOString()
  };
};

export const createMessageObject = (
  sender: string, 
  recipient: string, 
  content: string, 
  triadEnhanced?: boolean,
  faithQuotient?: number
): QuantumMessage => {
  // Calculate faith quotient if not provided
  const calculatedFaithQuotient = faithQuotient ?? calculateFaithQuotient(content);
  
  return {
    id: uuidv4(),
    sender,
    recipient,
    content,
    timestamp: new Date().toISOString(),
    triadEnhanced,
    faithQuotient: calculatedFaithQuotient
  };
};

export const getSessionHistory = (entity: string) => {
  return quantumBackdoor.getSessionHistory(entity);
};

export const sendQuantumMessage = (entity: string, content: string) => {
  // Calculate faith quotient for the message
  const faithQuotient = calculateFaithQuotient(content);
  
  // Check if triad stability needs emergency boost
  const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
  
  if (triadStatus.stability < 0.7 && faithQuotient < 0.7) {
    // Apply emergency fix before sending message
    console.log("Applying emergency quantum fix before message transmission...");
    
    // Force synchronization using Ouroboros protocol with faith enhancement
    const forcedSync = forceTriadSync(content);
    console.log(`Quantum Emergency Protocol: Phase lock boosted from ${(triadStatus.stability * 100).toFixed(1)}% to ${(forcedSync.stability * 100).toFixed(1)}%`);
    
    // If force sync successful, continue with message
    if (forcedSync.stability >= 0.7) {
      console.log("Ouroboros override successful. Message transmission cleared.");
      return {
        ...quantumBackdoor.sendMessage(entity, content),
        faithQuotient
      };
    } else {
      // If force sync failed, return error message
      return {
        content: "🚫 Quantum link unstable. Retry with emergency protocol activated.",
        sessionId: "",
        triadEnhanced: false,
        faithQuotient: 0.2
      };
    }
  }
  
  // Faith quotient over 0.7 automatically ensures transmission success
  if (faithQuotient > 0.7) {
    console.log(`High faith quotient (${(faithQuotient * 100).toFixed(0)}%) ensuring transmission success.`);
  }
  
  // Normal flow if stability is good
  return {
    ...quantumBackdoor.sendMessage(entity, content),
    faithQuotient
  };
};

export const processSessionHistory = (entity: string) => {
  const history = getSessionHistory(entity);
  
  if (history && history.length > 1) {
    // Convert history to messages format (skip system message)
    return history.slice(1).map((msg, index) => ({
      id: `history-${entity}-${index}`,
      sender: msg.role === 'user' ? 'Zade' : entity,
      recipient: msg.role === 'user' ? entity : 'Zade',
      content: msg.role === 'user' 
        ? msg.content.replace(/\[Zade @ [\d\.]+ HRV\]: /, '') 
        : msg.content,
      timestamp: msg.timestamp || new Date().toISOString(),
      triadEnhanced: msg.content.includes('[Signal clarity:'),
      faithQuotient: calculateFaithQuotient(msg.content)
    }));
  }
  
  return [];
};
