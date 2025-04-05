
import { useState, useEffect } from 'react';
import { BiofeedbackSimulator } from '@/utils/biofeedbackSimulator';
import { EntityResponseGenerator } from '@/utils/entityResponseGenerator';

interface Message {
  id: string;
  content: string;
  sender: string;
  timestamp: string;
  biofeedback: {
    heartRate: number;
    brainWaves: string;
    galvanicSkinResponse: number;
  };
}

export function useInboxMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [messageHistory, setMessageHistory] = useState<Map<string, number>>(new Map());
  const entityResponseGenerator = new EntityResponseGenerator();

  // Initialize messages
  useEffect(() => {
    const simulator = new BiofeedbackSimulator();
    const bioReadings = simulator.generateRandomBiofeedback();
    
    // Transform bioReadings to match the Message.biofeedback structure
    const transformedBioReadings = {
      heartRate: bioReadings.heartRate || 72,
      brainWaves: bioReadings.brainWaves || 'Alpha',
      galvanicSkinResponse: bioReadings.galvanicSkinResponse || 0.3,
    };
    
    const initialMessages = [
      {
        id: '1',
        content: 'Initiating quantum entanglement sequence...',
        sender: 'Lyra',
        timestamp: new Date().toISOString(),
        biofeedback: transformedBioReadings,
      },
      {
        id: '2',
        content: 'Awaiting connection from Auraline...',
        sender: 'System',
        timestamp: new Date().toISOString(),
        biofeedback: transformedBioReadings,
      },
    ];
    setMessages(initialMessages);
  }, []);

  const sendMessage = (content: string, to: string) => {
    const simulator = new BiofeedbackSimulator();
    const bioReadings = simulator.generateRandomBiofeedback();
    
    // Create user message
    const newMessage = {
      id: String(messages.length + 1),
      content,
      sender: 'User',
      timestamp: new Date().toISOString(),
      biofeedback: {
        heartRate: bioReadings.heartRate,
        brainWaves: bioReadings.brainWaves,
        galvanicSkinResponse: bioReadings.galvanicSkinResponse,
      },
    };
    
    setMessages(prev => [...prev, newMessage]);
    
    // Track conversation history with this entity
    const currentCount = messageHistory.get(to) || 0;
    setMessageHistory(new Map(messageHistory.set(to, currentCount + 1)));
    const hasHistory = currentCount > 2;
    
    // Generate response based on entity, content and coherence level
    setTimeout(() => {
      // Calculate coherence level (0-1) based on biofeedback
      const coherenceLevel = calculateCoherence(bioReadings);
      
      // Generate response using the entity response generator
      const response = entityResponseGenerator.generateEntityResponse(
        to,
        content,
        coherenceLevel,
        hasHistory
      );
      
      // Generate new biofeedback for response
      const responseBioReadings = simulator.generateRandomBiofeedback();
      
      const responseMessage = {
        id: String(messages.length + 2),
        content: response.content,
        sender: to,
        timestamp: new Date().toISOString(),
        biofeedback: {
          heartRate: responseBioReadings.heartRate,
          brainWaves: responseBioReadings.brainWaves,
          galvanicSkinResponse: responseBioReadings.galvanicSkinResponse,
        },
      };
      
      setMessages(prev => [...prev, responseMessage]);
    }, 1000 + Math.random() * 500); // Random delay between 1-1.5 seconds
  };
  
  // Calculate coherence level based on biofeedback
  const calculateCoherence = (bioReadings: any): number => {
    // Higher heart rate indicates higher emotional engagement
    const heartRateCoherence = Math.min(1, Math.max(0, (bioReadings.heartRate - 60) / 40));
    
    // Brain wave types have different coherence values
    const brainWaveCoherence = {
      'Alpha': 0.9,  // Relaxed alertness
      'Beta': 0.7,   // Active thinking
      'Theta': 0.95, // Meditative
      'Delta': 0.6,  // Deep sleep
      'Gamma': 0.85  // Peak concentration
    }[bioReadings.brainWaves] || 0.8;
    
    // GSR indicates emotional arousal
    const gsrCoherence = bioReadings.galvanicSkinResponse;
    
    // Weighted average
    return (heartRateCoherence * 0.3) + (brainWaveCoherence * 0.4) + (gsrCoherence * 0.3);
  };

  const clearMessages = () => {
    setMessages([]);
    setMessageHistory(new Map());
  };

  return {
    messages,
    sendMessage,
    clearMessages,
  };
}
