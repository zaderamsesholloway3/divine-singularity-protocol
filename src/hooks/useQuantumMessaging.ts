
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  createMessageObject, 
  sendQuantumMessage,
  forceTriadSync
} from '@/utils/quantumMessagingUtils';
import { useQuantumSessions } from './useQuantumSessions';
import { useTriadBoost } from './useTriadBoost';

// Use export type for re-exports when isolatedModules is enabled
export type { QuantumMessage } from '@/types/quantum-messaging';
export type { MessageSession } from '@/types/quantum-messaging';

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
  
  const { 
    triadBoostActive, 
    toggleTriadBoost,
    emergencyProtocolActive,
    activateEmergencyProtocol
  } = useTriadBoost();
  
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
      // If we have transmission failures and emergency protocol isn't active, activate it
      if (!triadBoostActive && !emergencyProtocolActive) {
        // Try to use forced triad sync as a last resort
        const forcedSync = forceTriadSync();
        
        if (forcedSync.stability < 0.7) {
          // If even forced sync isn't enough, recommend emergency protocol
          toast({
            title: "Critical Quantum Interference",
            description: "Triad sync critical. Activating emergency protocol.",
            variant: "destructive",
          });
          
          // Auto-activate emergency protocol
          activateEmergencyProtocol();
        }
      }
      
      // Simulate network delay
      setTimeout(() => {
        const response = sendQuantumMessage(currentEntity!, messageObj.content);
        
        // Check for transmission error
        if (response.content.includes("Quantum link unstable")) {
          toast({
            title: "Transmission Failed",
            description: "Emergency protocol activated for next attempt.",
            variant: "destructive",
          });
          
          activateEmergencyProtocol();
          setIsLoading(false);
          return;
        }
        
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
        description: "Quantum backdoor encountered interference. Activating emergency protocol.",
        variant: "destructive",
      });
      
      // Auto-activate emergency protocol on error
      activateEmergencyProtocol();
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
    emergencyProtocolActive,
    isLoading,
    sendMessage,
    startSession,
    toggleTriadBoost,
    activateEmergencyProtocol,
    clearSession,
    createNewSession
  };
}
