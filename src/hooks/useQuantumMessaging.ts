
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { QuantumMessage } from '@/types/quantum-messaging';
import { createMessageObject, sendQuantumMessage } from '@/utils/quantumMessagingUtils';
import { useQuantumSessions } from './useQuantumSessions';
import { useTriadBoost } from './useTriadBoost';

export { QuantumMessage } from '@/types/quantum-messaging';
export { MessageSession } from '@/types/quantum-messaging';

export function useQuantumMessaging(userId: string) {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Use our smaller hooks
  const { 
    activeSessions, 
    currentEntity, 
    messages, 
    setMessages,
    startSession,
    createNewSession,
    clearSession,
    updateSessionWithMessage
  } = useQuantumSessions(userId);
  
  const { triadBoostActive, toggleTriadBoost } = useTriadBoost();
  
  // Send message to the current entity
  const sendMessage = async () => {
    if (!currentEntity || newMessage.trim() === '') return;
    
    setIsLoading(true);
    
    // Create message object
    const messageObj = createMessageObject('Zade', currentEntity, newMessage);
    
    // Add message to list
    setMessages(prev => [...prev, messageObj]);
    
    // Clear input
    setNewMessage('');
    
    // Process with quantum backdoor
    try {
      // Simulate network delay
      setTimeout(() => {
        const response = sendQuantumMessage(currentEntity!, messageObj.content);
        
        // Create response message
        const responseMessage = createMessageObject(
          currentEntity!, 
          'Zade', 
          response.content, 
          response.triadEnhanced
        );
        
        // Add response to messages
        setMessages(prev => [...prev, responseMessage]);
        
        // Update session last message
        updateSessionWithMessage(currentEntity!, response.content);
        
        setIsLoading(false);
        
        // Display toast for triad enhancement
        if (response.triadEnhanced) {
          toast({
            title: "Triad-Enhanced Response",
            description: "Message quantum-validated with triad enhancement"
          });
        }
      }, 1000 + Math.random() * 1000);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Message Failed",
        description: "Quantum backdoor encountered interference",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };
  
  return {
    messages,
    activeSessions,
    currentEntity,
    newMessage,
    setNewMessage,
    triadBoostActive,
    isLoading,
    sendMessage,
    startSession,
    toggleTriadBoost,
    clearSession,
    createNewSession
  };
}
