
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from 'lucide-react';
import { Message, Listener } from '@/hooks/useThoughts';

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
  return (
    <div className="space-y-4">
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
        <Button size="sm" onClick={sendMessage}>
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
