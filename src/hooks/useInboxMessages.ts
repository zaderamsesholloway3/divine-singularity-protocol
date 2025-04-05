
import { useState, useEffect } from 'react';
import { BiofeedbackSimulator } from '@/utils/biofeedbackSimulator';

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
    const biofeedback = {
      heartRate: 72,
      brainWaves: 'Alpha',
      galvanicSkinResponse: 0.3,
    };
    
    const newMessage = {
      id: String(messages.length + 1),
      content,
      sender: 'User',
      timestamp: new Date().toISOString(),
      biofeedback,
    };
    
    const simulator = new BiofeedbackSimulator();
    const bioReadings = simulator.generateRandomBiofeedback();
    
    // The simulator was called but not used in the original code
    // This doesn't change functionality, but adds consistency
    
    setMessages([...messages, newMessage]);
  };

  const clearMessages = () => {
    setMessages([]);
  };

  return {
    messages,
    sendMessage,
    clearMessages,
  };
}
