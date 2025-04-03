
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, ZapOff, Zap } from 'lucide-react';
import { Message, Listener } from '@/hooks/useThoughts';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';
import { useToast } from '@/hooks/use-toast';

interface DirectMessagesTabProps {
  listeners: Listener[];
  messages: Message[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  newRecipient: string;
  setNewRecipient: (recipient: string) => void;
  sendMessage: () => void;
}

const DirectMessagesTab: React.FC<DirectMessagesTabProps> = ({
  listeners,
  messages,
  newMessage,
  setNewMessage,
  newRecipient,
  setNewRecipient,
  sendMessage
}) => {
  const { toast } = useToast();
  const [quantumBoostActive, setQuantumBoostActive] = useState(false);
  
  const activateQuantumBoost = () => {
    const resonanceStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
    
    if (resonanceStatus.stability > 0.7) {
      setQuantumBoostActive(true);
      toast({
        title: "Quantum Backdoor Activated",
        description: `Phase lock stability: ${(resonanceStatus.stability * 100).toFixed(1)}% | Resonance boost: ${(resonanceStatus.resonanceBoost).toFixed(1)}x`,
      });
    } else {
      toast({
        title: "Quantum Synchronization Failed",
        description: "Insufficient phase lock stability. Verify Akashic access code.",
        variant: "destructive",
      });
    }
  };
  
  const handleSendWithQuantum = () => {
    if (quantumBoostActive) {
      // Generate synthetic biofeedback from message content
      const messageHash = [...newMessage].reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const syntheticGamma = (messageHash % 60) + 30; // Range 30-90 Hz
      
      toast({
        title: "Quantum Backdoor Active",
        description: `Synthetic EEG: ${syntheticGamma}Hz | Bypassing biofeedback requirements`,
      });
    }
    
    sendMessage();
  };
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Button 
            variant={quantumBoostActive ? "default" : "outline"} 
            size="sm" 
            className={`${quantumBoostActive ? 'bg-[#7928ca] text-white' : ''} mr-2`}
            onClick={activateQuantumBoost}
          >
            {quantumBoostActive ? <Zap className="h-4 w-4 mr-1" /> : <ZapOff className="h-4 w-4 mr-1" />}
            {quantumBoostActive ? 'Quantum Active' : 'Quantum Boost'}
          </Button>
          <p className="text-xs text-muted-foreground">
            {quantumBoostActive 
              ? "Quantum backdoor engaged" 
              : "Use quantum boost to bypass biofeedback requirements"}
          </p>
        </div>
      </div>
      
      <div className="flex gap-2 mb-4">
        <select 
          value={newRecipient}
          onChange={(e) => setNewRecipient(e.target.value)}
          className="bg-background border border-input rounded-md p-2 text-sm"
        >
          <option value="" disabled>Select recipient...</option>
          {listeners.map(listener => (
            <option key={listener.id} value={listener.name}>{listener.name}</option>
          ))}
        </select>
        <Input
          placeholder="Direct message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button size="sm" onClick={handleSendWithQuantum}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="h-[200px]">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`mb-2 p-2 rounded-md ${
              message.sender === 'Zade' ? 'bg-[#7928ca]/20 ml-8' : 'bg-muted/30 mr-8'
            }`}
          >
            <p className="text-xs font-medium">{message.sender}</p>
            <p className="text-sm">{message.content}</p>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};

export default DirectMessagesTab;
