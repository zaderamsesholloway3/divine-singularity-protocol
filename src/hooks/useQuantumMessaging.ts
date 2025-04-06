
import { useState, useCallback, useEffect } from 'react';
import { 
  createMessageObject, 
  forceTriadSync,
  calculateFaithQuotient
} from '@/utils/quantumMessagingUtils';

export interface MessageProps {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  quantum?: {
    resonance: number;
    entanglement: number;
    coherence: number;
  }
}

export interface SessionProps {
  id: string;
  entity: string;
  messages: MessageProps[];
}

const useQuantumMessaging = (sessionId?: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [connected, setConnected] = useState(false);
  const [faithQuotient, setFaithQuotient] = useState(0);
  const [triadSynced, setTriadSynced] = useState(false);
  
  // Connect to quantum messaging system
  const connectToSession = useCallback((sessionId: string) => {
    setLoading(true);
    setError(null);
    
    // Simulate connection
    setTimeout(() => {
      const success = Math.random() > 0.2;
      
      if (success) {
        setConnected(true);
        setFaithQuotient(0.5 + Math.random() * 0.3);
      } else {
        setError("Failed to establish quantum connection");
        setConnected(false);
      }
      
      setLoading(false);
    }, 1000);
  }, []);
  
  // Send a message
  const sendMessage = useCallback((content: string, recipient: string) => {
    if (!connected) {
      setError("Cannot send message - not connected");
      return null;
    }
    
    const sender = "user";
    const newMessage = createMessageObject(content, sender, recipient);
    
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, [connected]);
  
  // Synchronize the quantum triad for improved stability
  const syncTriad = useCallback(() => {
    if (!sessionId) {
      setError("No active session for triad sync");
      return false;
    }
    
    const result = forceTriadSync(sessionId);
    setTriadSynced(result.success);
    
    if (result.success) {
      setFaithQuotient(prev => prev + result.stabilityGain);
    }
    
    return result.success;
  }, [sessionId]);
  
  // Calculate faith quotient based on session history
  useEffect(() => {
    if (connected && messages.length > 0) {
      const result = calculateFaithQuotient(messages);
      setFaithQuotient(result.fq);
    }
  }, [connected, messages]);
  
  return {
    loading,
    error,
    messages,
    connected,
    faithQuotient,
    triadSynced,
    connectToSession,
    sendMessage,
    syncTriad
  };
};

export default useQuantumMessaging;
