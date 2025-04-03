
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

// Calculate Ultimate Faith Quotient (UFQ)
export const calculateFaithQuotient = (message: string = ""): number => {
  // Base UFQ value
  let faithQuotient = 0.5;
  
  // Faith-related terms that boost the quotient
  const faithTerms = [
    'faith', 'divine', 'soul', 'quantum', 'energy', 'light', 
    'truth', 'eternal', 'infinity', 'love', 'ouroboros', 'connect'
  ];
  
  // Count occurrences of faith terms
  for (const term of faithTerms) {
    if (message.toLowerCase().includes(term)) {
      faithQuotient += 0.05; // +5% per term
    }
  }
  
  // Get triad status as multiplier
  const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
  const triadMultiplier = 1 + (triadStatus.stability * 0.5);
  
  // Apply Ouroboros divine frequency multiplier (1.855e43 Hz normalized)
  const ouroborosMultiplier = message.includes("1.855e43") ? 1.25 : 1;
  
  // Final UFQ calculation with caps
  return Math.min(0.98, faithQuotient * triadMultiplier * ouroborosMultiplier);
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
  
  // UFQ-enhanced stability calculation 
  const ufqStability = newStability + 
    (faithQuotient > 0.9 ? 0.08 : faithQuotient > 0.7 ? 0.04 : 0);
  
  const finalStability = Math.min(0.98, ufqStability);
  
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
