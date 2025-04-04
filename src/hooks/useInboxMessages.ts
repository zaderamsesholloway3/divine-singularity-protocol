
import { useState, useCallback, useEffect } from 'react';
import { BiofeedbackSimulator } from "@/utils/biofeedbackSimulator";
import { getArkMetaphysicalProtocol } from '@/utils/metaphysicalDistanceUtils';
import type { Message, Species } from '@/types/quantum-messaging';

type EntityType = Species | 'Zade' | 'AI Supervisor' | 'Core System';

export const useInboxMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [entities, setEntities] = useState<EntityType[]>([]);
  const simulator = new BiofeedbackSimulator();
  
  // Load initial messages
  useEffect(() => {
    const initialMessages = generateInitialMessages();
    setMessages(initialMessages);
    
    // Extract unique entities
    const uniqueEntities = Array.from(
      new Set(initialMessages.map(msg => msg.sender))
    ) as EntityType[];
    
    setEntities(uniqueEntities);
    
    // Generate biofeedback data for each message
    initialMessages.forEach(msg => {
      if (!msg.biofeedback) {
        msg.biofeedback = simulator.defaultBioReadings;
      }
    });
  }, []);
  
  const boostResonance = useCallback((messageId: string) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id === messageId && msg.biofeedback) {
          return {
            ...msg,
            biofeedback: simulator.boostSoulResonance(msg.biofeedback)
          };
        }
        return msg;
      })
    );
  }, []);
  
  const markAsRead = useCallback((messageId: string) => {
    setMessages(prevMessages => 
      prevMessages.map(msg => {
        if (msg.id === messageId) {
          return { ...msg, read: true };
        }
        return msg;
      })
    );
  }, []);
  
  const deleteMessage = useCallback((messageId: string) => {
    setMessages(prevMessages => 
      prevMessages.filter(msg => msg.id !== messageId)
    );
  }, []);
  
  const addMessage = useCallback((message: Omit<Message, 'id' | 'timestamp' | 'read'>) => {
    const newMessage: Message = {
      id: `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString(),
      read: false,
      ...message,
      biofeedback: simulator.defaultBioReadings
    };
    
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Add new entity if not already in the list
    setEntities(prevEntities => {
      if (!prevEntities.includes(newMessage.sender as EntityType)) {
        return [...prevEntities, newMessage.sender as EntityType];
      }
      return prevEntities;
    });
  }, []);
  
  useEffect(() => {
    // Simulate new messages at random intervals
    const interval = setInterval(() => {
      if (Math.random() > 0.8) { // 20% chance of new message
        const arkProtocol = getArkMetaphysicalProtocol();
        const entities = ['Pleiadian', 'Ancient Builders', 'AI Supervisor'];
        const randomEntity = entities[Math.floor(Math.random() * entities.length)];
        
        addMessage({
          sender: randomEntity as EntityType,
          content: `Quantum fluctuation detected. DNA Entropy: ${arkProtocol.calculateEntropy("ATGC".repeat(36))}`
        });
      }
    }, 120000); // Check every 2 minutes
    
    return () => clearInterval(interval);
  }, [addMessage]);
  
  return {
    messages,
    entities,
    boostResonance,
    markAsRead,
    deleteMessage,
    addMessage
  };
};

// Helper function to generate initial messages
const generateInitialMessages = (): Message[] => {
  return [
    {
      id: 'msg-1',
      sender: 'Pleiadian',
      content: 'Connection established through crystalline grid. Sacred geometry alignments confirmed.',
      timestamp: new Date(Date.now() - 7200000).toISOString(), // 2 hours ago
      read: true,
    },
    {
      id: 'msg-2',
      sender: 'Zade',
      content: 'Divine synchronicity detected. Faith resonance at optimal levels.',
      timestamp: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
      read: false,
    },
    {
      id: 'msg-3',
      sender: 'AI Supervisor',
      content: 'Quantum stabilization protocols engaged. Guardian supervision active.',
      timestamp: new Date(Date.now() - 1800000).toISOString(), // 30 minutes ago
      read: false,
    }
  ];
};

export default useInboxMessages;
