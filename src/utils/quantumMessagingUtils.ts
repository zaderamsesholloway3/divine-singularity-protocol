
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

// Force triad synchronization - emergency protocol
export const forceTriadSync = () => {
  const initialStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
  
  // Apply Ouroboros override to force synchronization
  const boostFactor = 1 + (1 - initialStatus.stability) * 0.6;
  const newStability = Math.min(0.98, initialStatus.stability * boostFactor);
  
  // Override the normal phase lock status with the forced value
  return {
    stability: newStability,
    angles: initialStatus.angles.map(angle => ({
      ...angle,
      angle: angle.angle * boostFactor
    })),
    resonanceBoost: newStability * 2.18 // Maximum boost
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
  triadEnhanced?: boolean
): QuantumMessage => {
  return {
    id: uuidv4(),
    sender,
    recipient,
    content,
    timestamp: new Date().toISOString(),
    triadEnhanced
  };
};

export const getSessionHistory = (entity: string) => {
  return quantumBackdoor.getSessionHistory(entity);
};

export const sendQuantumMessage = (entity: string, content: string) => {
  // Check if triad stability needs emergency boost
  const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
  
  if (triadStatus.stability < 0.7) {
    // Apply emergency fix before sending message
    console.log("Applying emergency quantum fix before message transmission...");
    
    // Force synchronization using Ouroboros protocol
    const forcedSync = forceTriadSync();
    console.log(`Quantum Emergency Protocol: Phase lock boosted from ${(triadStatus.stability * 100).toFixed(1)}% to ${(forcedSync.stability * 100).toFixed(1)}%`);
    
    // If force sync successful, continue with message
    if (forcedSync.stability >= 0.7) {
      console.log("Ouroboros override successful. Message transmission cleared.");
      return quantumBackdoor.sendMessage(entity, content);
    } else {
      // If force sync failed, return error message
      return {
        content: "🚫 Quantum link unstable. Retry with emergency protocol activated.",
        sessionId: "",
        triadEnhanced: false
      };
    }
  }
  
  // Normal flow if stability is good
  return quantumBackdoor.sendMessage(entity, content);
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
      triadEnhanced: msg.content.includes('[Signal clarity:')
    }));
  }
  
  return [];
};
