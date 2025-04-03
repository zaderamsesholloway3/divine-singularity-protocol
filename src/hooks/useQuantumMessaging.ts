
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { QuantumBackdoor } from '@/utils/quantumBackdoor';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';
import { v4 as uuidv4 } from 'uuid';

export interface QuantumMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  triadEnhanced?: boolean;
}

export interface MessageSession {
  id: string;
  entity: string;
  lastMessage: string;
  lastTimestamp: string;
}

export function useQuantumMessaging(userId: string) {
  const { toast } = useToast();
  const [messages, setMessages] = useState<QuantumMessage[]>([]);
  const [activeSessions, setActiveSessions] = useState<MessageSession[]>([]);
  const [currentEntity, setCurrentEntity] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [triadBoostActive, setTriadBoostActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize quantum backdoor
  const quantumBackdoor = new QuantumBackdoor();
  
  // Check triad status on initialization
  useEffect(() => {
    const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
    if (triadStatus.stability > 0.85) {
      setTriadBoostActive(true);
      toast({
        title: "Triad Quantum Backdoor Ready",
        description: `Phase lock: ${(triadStatus.stability * 100).toFixed(1)}% | Boost: ${triadStatus.resonanceBoost.toFixed(1)}x`,
      });
    }
  }, [toast]);
  
  // Verify Ouroboros link periodically
  useEffect(() => {
    if (!currentEntity) return;
    
    const intervalId = setInterval(() => {
      const linkStatus = quantumBackdoor.verifyOuroborosLink();
      if (!linkStatus.stable) {
        toast({
          title: "Ouroboros Connection",
          description: linkStatus.message,
          variant: "destructive",
        });
      }
    }, 30000); // Check every 30 seconds
    
    return () => clearInterval(intervalId);
  }, [currentEntity, toast]);
  
  // Start a new session with an entity
  const startSession = (entity: string) => {
    // Verify Ouroboros link
    const linkStatus = quantumBackdoor.verifyOuroborosLink();
    
    if (!linkStatus.stable && !triadBoostActive) {
      toast({
        title: "Divine Bridge Unstable",
        description: "Ouroboros link below 85% stability. Try activating Triad Boost.",
        variant: "destructive",
      });
      return false;
    }
    
    // Set as current entity
    setCurrentEntity(entity);
    
    // Add to active sessions if not exists
    if (!activeSessions.some(session => session.entity === entity)) {
      setActiveSessions(prev => [
        ...prev,
        {
          id: uuidv4(),
          entity,
          lastMessage: "Session initialized",
          lastTimestamp: new Date().toISOString()
        }
      ]);
    }
    
    // Load history if exists
    const history = quantumBackdoor.getSessionHistory(entity);
    if (history && history.length > 1) {
      // Convert history to messages format (skip system message)
      const sessionMessages = history.slice(1).map((msg, index) => ({
        id: `history-${entity}-${index}`,
        sender: msg.role === 'user' ? 'Zade' : entity,
        recipient: msg.role === 'user' ? entity : 'Zade',
        content: msg.role === 'user' 
          ? msg.content.replace(/\[Zade @ [\d\.]+ HRV\]: /, '') 
          : msg.content,
        timestamp: msg.timestamp || new Date().toISOString(),
        triadEnhanced: msg.content.includes('[Signal clarity:')
      }));
      
      setMessages(prev => [
        ...prev.filter(m => m.sender !== entity && m.recipient !== entity),
        ...sessionMessages
      ]);
    }
    
    return true;
  };
  
  // Send message to the current entity
  const sendMessage = async () => {
    if (!currentEntity || newMessage.trim() === '') return;
    
    setIsLoading(true);
    
    // Create message object
    const messageObj: QuantumMessage = {
      id: uuidv4(),
      sender: 'Zade',
      recipient: currentEntity,
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    
    // Add message to list
    setMessages(prev => [...prev, messageObj]);
    
    // Clear input
    setNewMessage('');
    
    // Process with quantum backdoor
    try {
      // Simulate network delay
      setTimeout(() => {
        const response = quantumBackdoor.sendMessage(currentEntity!, messageObj.content);
        
        // Create response message
        const responseMessage: QuantumMessage = {
          id: uuidv4(),
          sender: currentEntity!,
          recipient: 'Zade',
          content: response.content,
          timestamp: new Date().toISOString(),
          triadEnhanced: response.triadEnhanced
        };
        
        // Add response to messages
        setMessages(prev => [...prev, responseMessage]);
        
        // Update session last message
        setActiveSessions(prev => prev.map(session => 
          session.entity === currentEntity 
            ? {
                ...session,
                lastMessage: response.content,
                lastTimestamp: new Date().toISOString()
              }
            : session
        ));
        
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
  
  // Toggle triad boost
  const toggleTriadBoost = () => {
    const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
    
    if (!triadBoostActive) {
      // Try to activate
      if (triadStatus.stability > 0.7) {
        setTriadBoostActive(true);
        toast({
          title: "Triad Quantum Backdoor Activated",
          description: `Phase lock: ${(triadStatus.stability * 100).toFixed(1)}% | Enhanced quantum access enabled`,
        });
      } else {
        toast({
          title: "Triad Synchronization Failed",
          description: `Phase lock: ${(triadStatus.stability * 100).toFixed(1)}% - Below 70% threshold`,
          variant: "destructive",
        });
      }
    } else {
      // Deactivate
      setTriadBoostActive(false);
      toast({
        title: "Triad Quantum Backdoor Disabled",
        description: "Reverting to standard quantum operations",
      });
    }
  };
  
  // Clear current session
  const clearSession = () => {
    if (!currentEntity) return;
    
    // Filter out messages for this entity
    setMessages(prev => prev.filter(m => 
      m.sender !== currentEntity && m.recipient !== currentEntity
    ));
    
    // Reset current entity
    setCurrentEntity(null);
  };
  
  // Create a new session with a new entity
  const createNewSession = (entity: string) => {
    if (!entity.trim()) return;
    
    // Check if entity already exists
    if (activeSessions.some(session => session.entity === entity)) {
      startSession(entity);
      return;
    }
    
    // Start new session
    startSession(entity);
    
    toast({
      title: "New Connection Established",
      description: `Quantum channel opened with ${entity}`,
    });
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
