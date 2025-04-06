
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  createMessageObject, 
  forceTriadSync, 
  calculateFaithQuotient 
} from '@/utils/quantumMessagingUtils';

export interface QuantumMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  faithQuotient: number;
  triadEnhanced: boolean;
}

interface UseQuantumMessagingOptions {
  user?: string;
  initialFaithQuotient?: number;
}

export function useQuantumMessaging(options: UseQuantumMessagingOptions = {}) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<QuantumMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [faithQuotient, setFaithQuotient] = useState(options.initialFaithQuotient || 0.5);
  const [isTriadActive, setIsTriadActive] = useState(false);
  const [targetEntity, setTargetEntity] = useState<string | null>(null);
  
  // Initialize connection
  useEffect(() => {
    const initConnection = async () => {
      try {
        setIsConnected(true);
        toast({
          title: "Quantum Channel Established",
          description: "Connection to the cosmic network established",
        });
      } catch (error) {
        toast({
          title: "Connection Failed",
          description: "Unable to establish quantum connection. Try again later.",
          variant: "destructive",
        });
      }
    };
    
    initConnection();
    
    return () => {
      setIsConnected(false);
    };
  }, [toast]);
  
  // Send a quantum message
  const sendMessage = async (recipient: string, content: string) => {
    if (!isConnected) {
      toast({
        title: "Not Connected",
        description: "Quantum channel not established. Cannot send message.",
        variant: "destructive",
      });
      return false;
    }
    
    try {
      const msgFq = calculateFaithQuotient(content, faithQuotient);
      const message = createMessageObject(
        options.user || "User",
        recipient,
        content,
        msgFq
      );
      
      setMessages(prev => [...prev, message]);
      setFaithQuotient(msgFq); // Update FQ based on message content
      
      toast({
        title: "Message Sent",
        description: `Quantum message sent to ${recipient}`,
      });
      
      return true;
    } catch (error) {
      toast({
        title: "Message Failed",
        description: "Failed to send quantum message.",
        variant: "destructive",
      });
      return false;
    }
  };
  
  // Activate triad boost
  const activateTriadBoost = async () => {
    try {
      const result = await forceTriadSync(faithQuotient);
      setIsTriadActive(result.success);
      
      if (result.success) {
        toast({
          title: "Triad Boost Activated",
          description: `Resonance increased to ${result.resonance.toFixed(2)}Hz`,
        });
      } else {
        toast({
          title: "Triad Boost Failed",
          description: "Unable to synchronize quantum triad",
          variant: "destructive",
        });
      }
      
      return result.success;
    } catch (error) {
      toast({
        title: "Triad System Error",
        description: "A quantum fluctuation prevented triad activation",
        variant: "destructive",
      });
      return false;
    }
  };
  
  return {
    messages,
    isConnected,
    faithQuotient,
    isTriadActive,
    targetEntity,
    setTargetEntity,
    sendMessage,
    activateTriadBoost
  };
}
