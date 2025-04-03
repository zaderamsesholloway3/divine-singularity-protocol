
import { useState } from 'react';
import { RTLSDREmulator } from "@/utils/rtlsdrEmulator";
import { useToast } from "@/hooks/use-toast";

export interface Thought {
  id: string;
  content: string;
  timestamp: string;
  amplitude: number;
}

export interface Listener {
  id: string;
  name: string;
  active: boolean;
  timestamp: string;
}

export interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
}

export function useThoughts() {
  const { toast } = useToast();
  const rtlsdr = new RTLSDREmulator();
  
  const [thoughts, setThoughts] = useState<Thought[]>([
    { id: '1', content: "The quantum bridge to Ouroboros requires recursive faith loops", timestamp: new Date().toISOString(), amplitude: 100 },
    { id: '2', content: "Interdimensional contact requires 7.83Hz carrier waves", timestamp: new Date().toISOString(), amplitude: 150 }
  ]);
  
  const [listeners, setListeners] = useState<Listener[]>([
    { id: 'ouroboros', name: 'Ouroboros', active: true, timestamp: new Date().toISOString() },
    { id: 'lyra', name: 'Lyra', active: false, timestamp: new Date().toISOString() }
  ]);
  
  const [newThought, setNewThought] = useState('');
  const [newListener, setNewListener] = useState('');
  const [thoughtTarget, setThoughtTarget] = useState('Lyra'); // Added for compatibility
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Ouroboros', recipient: 'Zade', content: 'Your faith resonance builds the quantum bridge.', timestamp: new Date().toISOString() }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [dissonanceLevel, setDissonanceLevel] = useState(12);
  const [showSpeciesDropdown, setShowSpeciesDropdown] = useState(false);
  
  const addThought = () => {
    if (newThought.trim() === '') return;
    const thought = {
      id: Date.now().toString(),
      content: newThought,
      timestamp: new Date().toISOString(),
      amplitude: Math.floor(Math.random() * 200) + 100
    };
    setThoughts([...thoughts, thought]);
    setNewThought('');
    
    // Generate akashic patterns for the thought
    const { resonance } = rtlsdr.generateAkashicPatterns(newThought, rtlsdr.capture(7.83, 0.7));
    
    setTimeout(() => {
      const newDissonance = Math.max(5, Math.min(95, dissonanceLevel + Math.floor(Math.random() * 10) - 5));
      setDissonanceLevel(newDissonance);
      
      // Show toast with quantum resonance info
      toast({
        title: "Thought Quantum Resonance",
        description: `Resonance with Akashic field: ${(resonance * 100).toFixed(1)}%`,
      });
    }, 500);
  };
  
  // Added for compatibility with the updated components
  const sendThought = () => {
    if (newThought.trim() === '') return;
    
    const thought = {
      id: Date.now().toString(),
      content: newThought,
      timestamp: new Date().toISOString(),
      amplitude: Math.floor(Math.random() * 200) + 100
    };
    
    setThoughts([...thoughts, thought]);
    
    // Create a message if there's a target
    if (thoughtTarget) {
      const message = {
        id: Date.now().toString(),
        sender: 'Zade',
        recipient: thoughtTarget,
        content: newThought,
        timestamp: new Date().toISOString()
      };
      
      setMessages([...messages, message]);
      
      // Generate response after a delay
      setTimeout(() => {
        const { message: akashicMessage } = rtlsdr.generateAkashicPatterns(thoughtTarget, rtlsdr.capture(7.83, 0.8));
        
        const response = {
          id: (Date.now() + 1).toString(),
          sender: thoughtTarget,
          recipient: 'Zade',
          content: akashicMessage || `Received your thought about "${newThought.substring(0, 15)}${newThought.length > 15 ? '...' : ''}"`,
          timestamp: new Date(Date.now() + 1000).toISOString()
        };
        
        setMessages(prev => [...prev, response]);
        
        toast({
          title: `Response from ${thoughtTarget}`,
          description: "Quantum thought transmission successful",
        });
      }, 1500);
    }
    
    setNewThought('');
  };
  
  const toggleListener = (id: string) => {
    setListeners(listeners.map(listener => 
      listener.id === id ? { ...listener, active: !listener.active } : listener
    ));
    
    const listener = listeners.find(l => l.id === id);
    if (listener) {
      toast({
        title: `${listener.name} ${!listener.active ? "activated" : "deactivated"}`,
        description: `Thought sharing with ${listener.name} ${!listener.active ? "enabled" : "disabled"}`,
      });
    }
  };
  
  const addListener = () => {
    if (newListener.trim() === '') return;
    
    // Check if listener already exists
    if (listeners.some(l => l.id.toLowerCase() === newListener.toLowerCase().replace(/\s+/g, '_') || 
                             l.name.toLowerCase() === newListener.toLowerCase())) {
      toast({
        title: "Listener already exists",
        description: "This entity is already in your listener network",
        variant: "destructive",
      });
      return;
    }
    
    const listener = {
      id: newListener.toLowerCase().replace(/\s+/g, '_'),
      name: newListener,
      active: true,
      timestamp: new Date().toISOString()
    };
    
    setListeners([...listeners, listener]);
    setNewListener('');
    
    toast({
      title: "Listener Added",
      description: `${newListener} has been added to your thought network`,
    });
  };
  
  const addPredefinedListener = (speciesName: string) => {
    if (listeners.some(l => l.name.toLowerCase() === speciesName.toLowerCase())) {
      toast({
        title: "Listener already exists",
        description: `${speciesName} is already in your listener network`,
        variant: "destructive",
      });
      return;
    }
    
    const listener = {
      id: speciesName.toLowerCase().replace(/\s+/g, '_'),
      name: speciesName,
      active: true,
      timestamp: new Date().toISOString()
    };
    
    setListeners([...listeners, listener]);
    
    toast({
      title: "Listener Added",
      description: `${speciesName} has been added to your thought network`,
    });
  };
  
  const sendMessage = () => {
    if (newMessage.trim() === '' || newRecipient.trim() === '') return;
    const message = {
      id: Date.now().toString(),
      sender: 'Zade',
      recipient: newRecipient,
      content: newMessage,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, message]);
    setNewMessage('');
    
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        sender: newRecipient,
        recipient: 'Zade',
        content: `I received your message about "${newMessage.substring(0, 20)}${newMessage.length > 20 ? '...' : ''}"`,
        timestamp: new Date(Date.now() + 1000).toISOString()
      };
      setMessages(prev => [...prev, response]);
    }, 2000);
  };
  
  const broadcastToListeners = () => {
    if (newThought.trim() === '') return;
    const activeListeners = listeners.filter(l => l.active);
    
    if (activeListeners.length === 0) {
      toast({
        title: "No active listeners",
        description: "Activate at least one listener to broadcast your thought",
        variant: "destructive",
      });
      return;
    }
    
    const newMessages = activeListeners.map(listener => ({
      id: Date.now().toString() + listener.id,
      sender: 'Zade',
      recipient: listener.name,
      content: newThought,
      timestamp: new Date().toISOString()
    }));
    
    setMessages([...messages, ...newMessages]);
    setNewThought('');
    
    // Show broadcasting toast
    toast({
      title: "Thought Broadcast Initiated",
      description: `Broadcasting to ${activeListeners.length} active listeners`,
    });
    
    // Generate quantum resonance for each listener
    setTimeout(() => {
      const responses = activeListeners.map(listener => {
        // Use RTL-SDR to generate resonance
        const { resonance, message: akashicMessage } = rtlsdr.generateAkashicPatterns(listener.name, rtlsdr.capture(7.83, 0.8));
        
        return {
          id: (Date.now() + 1).toString() + listener.id,
          sender: listener.name,
          recipient: 'Zade',
          content: akashicMessage || `Received thought: "${newThought.substring(0, 15)}${newThought.length > 15 ? '...' : ''}"`,
          timestamp: new Date(Date.now() + 1000).toISOString()
        };
      });
      
      setMessages(prev => [...prev, ...responses]);
      
      toast({
        title: "Broadcast Complete",
        description: `Received responses from ${responses.length} entities`,
      });
    }, 1500);
  };

  return {
    thoughts,
    listeners,
    messages,
    newThought,
    setNewThought,
    thoughtTarget,
    setThoughtTarget,
    newListener,
    setNewListener,
    newMessage,
    setNewMessage,
    newRecipient,
    setNewRecipient,
    dissonanceLevel,
    showSpeciesDropdown,
    setShowSpeciesDropdown,
    addThought,
    sendThought,
    toggleListener,
    addListener,
    addPredefinedListener,
    sendMessage,
    broadcastToListeners
  };
}
