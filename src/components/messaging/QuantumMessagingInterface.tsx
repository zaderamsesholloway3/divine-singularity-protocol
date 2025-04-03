import React, { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { useUser } from '@/context/UserContext';
import MessageHeader from './MessageHeader';
import { GlowingText } from "@/components/GlowingText";
import { Network, AlertTriangle, Infinity, Zap } from 'lucide-react';
import { Badge } from "@/components/ui/badge";

// Define the QuantumMessage type
export type QuantumMessage = {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  faithQuotient: number;
};

const QuantumMessagingInterface: React.FC = () => {
  const { toast } = useToast();
  const { userData, updateUserData } = useUser();
  const [messages, setMessages] = useState<QuantumMessage[]>([]);
  const [newMessageText, setNewMessageText] = useState<string>('');
  const [activeEntity, setActiveEntity] = useState<string>("Lyra");
  const [triadBoostActive, setTriadBoostActive] = useState<boolean>(false);
  const [emergencyProtocolActive, setEmergencyProtocolActive] = useState<boolean>(false);
  
  // Mock translateMessage function (replace with actual logic)
  const translateMessage = (message: string): string => {
    return `[${activeEntity}]: ${message}`;
  };
  
  // Mock function to simulate emergency protocol activation
  const activateEmergencyProtocol = () => {
    setEmergencyProtocolActive(true);
    
    toast({
      title: "Emergency Protocol Activated",
      description: "Ouroboros Sync Initiated",
    });
  };
  
  // Toggle Triad Boost
  const toggleTriadBoost = () => {
    setTriadBoostActive(prev => !prev);
    
    toast({
      title: "Triad Boost",
      description: triadBoostActive ? "Deactivated" : "Activated",
    });
    
    // Simulate faith quotient increase (replace with actual logic)
    if (!triadBoostActive) {
      const newFaithQuotient = Math.min(1, userData.faithQuotient + 0.15);
      updateUserData({ ...userData, faithQuotient: newFaithQuotient });
    }
  };
  
  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    // Add timestamp to the message object
    const translatedMessage = translateMessage(text);
    const newMessage: QuantumMessage = {
      id: uuidv4(),
      sender: activeEntity,
      recipient: "User",
      content: translatedMessage,
      faithQuotient: userData.faithQuotient,
      timestamp: new Date().toISOString() // Add timestamp
    };

    setMessages(prev => [...prev, newMessage]);
    setNewMessageText('');
  };
  
  // Mock function to simulate receiving a message
  const receiveMessage = useCallback((incomingMessage: QuantumMessage) => {
    setMessages(prev => [...prev, incomingMessage]);
  }, []);
  
  // Simulate incoming messages (replace with actual logic)
  useEffect(() => {
    const mockIncomingMessages = [
      {
        id: uuidv4(),
        sender: "Lyra",
        recipient: "User",
        content: "Quantum entanglement established. Ready for secure communication.",
        timestamp: new Date().toISOString(),
        faithQuotient: 0.92
      },
      {
        id: uuidv4(),
        sender: "Auraline",
        recipient: "User",
        content: "Verifying quantum key exchange...",
        timestamp: new Date().toISOString(),
        faithQuotient: 0.92
      },
    ];
    
    mockIncomingMessages.forEach((msg, index) => {
      setTimeout(() => {
        receiveMessage(msg);
      }, (index + 1) * 2000); // Simulate staggered arrival
    });
  }, [receiveMessage]);
  
  return (
    <Card className="glass-panel">
      <CardContent className="p-4">
        <MessageHeader 
          triadBoostActive={triadBoostActive}
          toggleTriadBoost={toggleTriadBoost}
          emergencyProtocolActive={emergencyProtocolActive}
          activateEmergencyProtocol={activateEmergencyProtocol}
          faithQuotient={userData.faithQuotient}
        />
        
        <ScrollArea className="h-[300px] mt-4 mb-2">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex items-start gap-2 py-2 ${message.sender === "User" ? 'justify-end' : ''}`}
            >
              {message.sender !== "User" && (
                <Avatar>
                  <AvatarImage src={`https://i.pravatar.cc/150?img=${message.sender.length}`} alt={message.sender} />
                  <AvatarFallback>{message.sender.substring(0, 2)}</AvatarFallback>
                </Avatar>
              )}
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <div className="text-xs font-bold">{message.sender}</div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                  {message.faithQuotient > 0.8 && (
                    <Badge variant="outline" className="h-4 px-1 text-[0.6rem] bg-indigo-500/10 text-indigo-600 border-indigo-500">
                      <Infinity className="h-2 w-2 mr-0.5" /> 
                      <span>FQ</span>
                    </Badge>
                  )}
                </div>
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          ))}
        </ScrollArea>
        
        <div className="flex gap-2">
          <Input
            placeholder="Enter message..."
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(newMessageText)}
          />
          <Button onClick={() => handleSendMessage(newMessageText)}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumMessagingInterface;
