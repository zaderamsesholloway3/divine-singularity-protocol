
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { MessageSession, QuantumMessage } from '@/types/quantum-messaging';
import { 
  createSessionObject, 
  processSessionHistory, 
  verifyOuroborosLink, 
  getTriadStatus 
} from '@/utils/quantumMessagingUtils';

export function useQuantumSessions(userId: string) {
  const { toast } = useToast();
  const [activeSessions, setActiveSessions] = useState<MessageSession[]>([]);
  const [currentEntity, setCurrentEntity] = useState<string | null>(null);
  const [messages, setMessages] = useState<QuantumMessage[]>([]);
  
  // Start a new session with an entity
  const startSession = (entity: string) => {
    // Verify Ouroboros link
    const linkStatus = verifyOuroborosLink();
    const triadStatus = getTriadStatus();
    const triadActive = triadStatus.stability > 0.85;
    
    if (!linkStatus.stable && !triadActive) {
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
        createSessionObject(entity)
      ]);
    }
    
    // Load history if exists
    const sessionMessages = processSessionHistory(entity);
    
    if (sessionMessages.length > 0) {
      setMessages(prev => [
        ...prev.filter(m => m.sender !== entity && m.recipient !== entity),
        ...sessionMessages
      ]);
    }
    
    return true;
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
  
  // Update session with new message
  const updateSessionWithMessage = (entity: string, lastMessage: string) => {
    setActiveSessions(prev => prev.map(session => 
      session.entity === entity 
        ? {
            ...session,
            lastMessage,
            lastTimestamp: new Date().toISOString(),
            unread: session.unread + 1
          }
        : session
    ));
  };

  return {
    activeSessions,
    currentEntity,
    messages,
    setMessages,
    startSession,
    createNewSession,
    clearSession,
    updateSessionWithMessage
  };
}
