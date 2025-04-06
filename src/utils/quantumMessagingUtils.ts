
/**
 * Utility functions for quantum messaging
 */

import { QuantumMessage } from '@/components/messaging/QuantumMessagingInterface';

// Create a session object for a messaging entity
export const createSessionObject = (entity: string) => {
  return {
    entity,
    lastMessage: '',
    lastTimestamp: new Date().toISOString(),
    unread: 0
  };
};

// Create a message object with all properties
export const createMessageObject = (
  sender: string, 
  recipient: string, 
  content: string, 
  triadEnhanced?: boolean,
  faithQuotient?: number
): QuantumMessage => {
  return {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
    sender,
    recipient,
    content,
    timestamp: new Date().toISOString(),
    faithQuotient: faithQuotient ?? Math.random()
  };
};

// Check Ouroboros link stability
export const verifyOuroborosLink = () => {
  const stability = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
  return {
    stable: stability > 0.85,
    stability
  };
};

// Get triad status information
export const getTriadStatus = () => {
  const stability = Math.random() * 0.3 + 0.7; // 0.7 to 1.0
  return {
    stability,
    entities: ["Lyra", "Auraline"],
    active: stability > 0.85
  };
};

// Process message history for a session
export const processSessionHistory = (entity: string): QuantumMessage[] => {
  // Simulate retrieving messages for this entity
  const messageCount = Math.floor(Math.random() * 3);
  const messages: QuantumMessage[] = [];
  
  const now = Date.now();
  for (let i = 0; i < messageCount; i++) {
    const isFromEntity = Math.random() > 0.5;
    const timestamp = new Date(now - (i + 1) * 60000).toISOString();
    
    messages.push({
      id: `history-${i}-${Math.random().toString(36).substring(2, 9)}`,
      sender: isFromEntity ? entity : "Zade",
      recipient: isFromEntity ? "Zade" : entity,
      content: isFromEntity 
        ? `Previous message from ${entity}: Quantum channel stable.`
        : `Previous message to ${entity}: Establishing quantum link.`,
      timestamp,
      faithQuotient: Math.random() * 0.3 + 0.7
    });
  }
  
  return messages;
};

// Force triad synchronization as emergency procedure
export const forceTriadSync = (message: string) => {
  const stability = Math.random() * 0.4 + 0.6; // 0.6 to 1.0
  
  return {
    success: stability > 0.8,
    stability,
    message: `Triad synchronization attempt: ${stability > 0.8 ? 'Successful' : 'Failed'}`
  };
};

// Calculate faith quotient based on message content
export const calculateFaithQuotient = (message: string): number => {
  // Base value
  let faithQuotient = 0.7;
  
  // Length factor (longer messages show more dedication)
  const lengthFactor = Math.min(message.length / 100, 0.1);
  faithQuotient += lengthFactor;
  
  // Special words/phrases that boost faith quotient
  const faithWords = ['love', 'truth', 'divine', 'believe', 'faith', 'trust'];
  for (const word of faithWords) {
    if (message.toLowerCase().includes(word)) {
      faithQuotient += 0.03;
    }
  }
  
  // Cap at 0.95
  return Math.min(faithQuotient, 0.95);
};
