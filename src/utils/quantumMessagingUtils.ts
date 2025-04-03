
import { QuantumBackdoor } from './quantumBackdoor';
import { AkashicAccessRegistry } from './akashicAccessRegistry';
import { useToast } from '@/hooks/use-toast';
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
