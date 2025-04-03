
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  createMessageObject, 
  forceTriadSync,
  calculateFaithQuotient
} from '@/utils/quantumMessagingUtils';
import { useQuantumSessions } from './useQuantumSessions';
import { useTriadBoost } from './useTriadBoost';
import { bindQuantumSocket, createQuantumTunnelId } from '@/utils/quantumSocketBinding';
import { sendQuantumMessage, activateTriadPing } from '@/utils/quantumTransmissionUtils';

// Use export type for re-exports when isolatedModules is enabled
export type { QuantumMessage } from '@/types/quantum-messaging';
export type { MessageSession } from '@/types/quantum-messaging';

export function useQuantumMessaging(userId: string) {
  const { toast } = useToast();
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [socketBound, setSocketBound] = useState(false);
  const [tunnelId, setTunnelId] = useState('');
  const [triadLoopActive, setTriadLoopActive] = useState(false);
  
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
    activateEmergencyProtocol,
    stabilityLevel
  } = useTriadBoost();
  
  // Initialize quantum socket binding
  useEffect(() => {
    const newTunnelId = createQuantumTunnelId();
    setTunnelId(newTunnelId);
    
    const bindResult = bindQuantumSocket(newTunnelId);
    if (bindResult.status === "bound") {
      setSocketBound(true);
      console.log(`Quantum Socket bound: ${newTunnelId} on ${bindResult.interface}`);
      
      // Activate triad ping
      const pingResult = activateTriadPing();
      setTriadLoopActive(pingResult.triad_loop);
      console.log(`Triad ping activated: ${pingResult.ping.join(', ')}`);
    } else {
      console.error(`Quantum Socket binding failed: ${bindResult.reason}`);
    }
  }, []);
  
  // Send message to the current entity
  const sendMessage = async () => {
    if (!currentEntity || newMessage.trim() === '') return;
    
    // Check if socket is bound
    if (!socketBound) {
      toast({
        title: "Quantum Socket Not Bound",
        description: "Attempting to rebind socket...",
        variant: "destructive",
      });
      
      // Try to rebind
      const newTunnelId = createQuantumTunnelId();
      setTunnelId(newTunnelId);
      const bindResult = bindQuantumSocket(newTunnelId);
      
      if (bindResult.status === "bound") {
        setSocketBound(true);
      } else {
        toast({
          title: "Socket Rebinding Failed",
          description: "Try activating emergency protocol",
          variant: "destructive",
        });
        return;
      }
    }
    
    setIsLoading(true);
    
    // Process message through quantum transmitter first
    const transmissionResult = sendQuantumMessage(newMessage, "Zade", "high");
    
    if (transmissionResult.status === "error") {
      toast({
        title: "Transmission Error",
        description: transmissionResult.reason || "Unknown error",
        variant: "destructive",
      });
      setIsLoading(false);
      return;
    }
    
    // Calculate faith quotient
    const faithQuotient = calculateFaithQuotient(newMessage);
    const hasFaithBoost = faithQuotient > 0.7;
    
    // Display faith boost notification if relevant
    if (hasFaithBoost) {
      toast({
        title: "Ultimate Faith Quotient Detected",
        description: `Message enhanced with UFQ: ${(faithQuotient * 100).toFixed(0)}%`,
      });
    }
    
    // Create message object with faith quotient
    const messageObj = createMessageObject('Zade', currentEntity, newMessage, undefined, faithQuotient);
    
    // Add message to list
    setMessages(prev => [...prev, messageObj]);
    
    // Clear input
    setNewMessage('');
    
    // Check triad loop
    if (!triadLoopActive && !emergencyProtocolActive) {
      const pingResult = activateTriadPing();
      setTriadLoopActive(pingResult.triad_loop);
      
      toast({
        title: "Triad Ping Activated",
        description: `Loop established with ${pingResult.ping.join(' and ')}`,
      });
    }
    
    // Process with quantum backdoor
    try {
      // If we have transmission failures and emergency protocol isn't active, activate it
      if (!socketBound && !triadBoostActive && !emergencyProtocolActive && stabilityLevel < 0.7 && !hasFaithBoost) {
        // Try to use forced triad sync as a last resort
        const forcedSync = forceTriadSync(newMessage);
        
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
      
      // Simulate network delay (shorter with faith boost)
      setTimeout(() => {
        // Use our quantum transmission system
        const encodedMessage = transmissionResult.encoded_msg;
        console.log(`Transmitting encoded message: ${encodedMessage}`);
        
        const response = {
          content: `Response to: ${newMessage}`,
          triadEnhanced: triadBoostActive,
          faithQuotient: faithQuotient
        };
        
        // Create response message
        const responseMessage = createMessageObject(
          currentEntity!, 
          'Zade', 
          response.content, 
          response.triadEnhanced,
          response.faithQuotient
        );
        
        // Add response to messages
        setMessages(prev => [...prev, responseMessage]);
        
        // Update session last message
        updateSessionWithMessage(currentEntity!, response.content);
        
        setIsLoading(false);
        
        // Display toast for special enhancements
        if (response.triadEnhanced && response.faithQuotient && response.faithQuotient > 0.8) {
          toast({
            title: "Triad & Faith Enhanced Response",
            description: "Message quantum-validated with ultimate resonance boost",
            variant: "default",
          });
        } else if (response.triadEnhanced) {
          toast({
            title: "Triad-Enhanced Response",
            description: "Message quantum-validated with triad enhancement"
          });
        } else if (response.faithQuotient && response.faithQuotient > 0.8) {
          toast({
            title: "UFQ-Amplified Response",
            description: "Ultimate Faith Quotient boosting connection",
          });
        }
      }, hasFaithBoost ? 500 + Math.random() * 500 : 1000 + Math.random() * 1000);
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
    socketBound,
    tunnelId,
    triadLoopActive,
    sendMessage,
    startSession,
    toggleTriadBoost,
    activateEmergencyProtocol,
    clearSession,
    createNewSession
  };
}
