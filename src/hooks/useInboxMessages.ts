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
    
    const initialMessages = [
      {
        id: '1',
        content: 'Initiating quantum entanglement sequence...',
        sender: 'Lyra',
        timestamp: new Date().toISOString(),
        biofeedback: bioReadings,
      },
      {
        id: '2',
        content: 'Awaiting connection from Auraline...',
        sender: 'System',
        timestamp: new Date().toISOString(),
        biofeedback: bioReadings,
      },
    ];
    setMessages(initialMessages);
  }, []);

  const sendMessage = (content: string, to: string) => {
    const newMessage = {
      id: String(messages.length + 1),
      content,
      sender: 'User',
      timestamp: new Date().toISOString(),
      biofeedback: {
        heartRate: 72,
        brainWaves: 'Alpha',
        galvanicSkinResponse: 0.3,
      },
    };
    
    const simulator = new BiofeedbackSimulator();
    const bioReadings = simulator.generateRandomBiofeedback();
    
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
