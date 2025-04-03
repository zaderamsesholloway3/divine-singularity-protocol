
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Loader2 } from 'lucide-react';
import { QuantumMessage } from '@/types/quantum-messaging';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';

interface MessageAreaProps {
  currentEntity: string | null;
  messages: QuantumMessage[];
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSendMessage: (e: React.FormEvent) => void;
  isLoading: boolean;
  clearSession: () => void;
  triadBoostActive: boolean;
}

const MessageArea: React.FC<MessageAreaProps> = ({
  currentEntity,
  messages,
  newMessage,
  setNewMessage,
  handleSendMessage,
  isLoading,
  clearSession,
  triadBoostActive
}) => {
  if (!currentEntity) {
    return <EmptyState />;
  }
  
  const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
  
  // Filter messages for current conversation
  const currentSessionMessages = messages.filter(m => 
    (m.sender === currentEntity && m.recipient === 'Zade') || 
    (m.sender === 'Zade' && m.recipient === currentEntity)
  );

  return (
    <div className="col-span-2 flex flex-col">
      <div className="mb-2 flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">{currentEntity}</h3>
          <p className="text-xs text-muted-foreground">
            {triadBoostActive 
              ? `Triad-enhanced connection | ${(triadStatus.stability * 100).toFixed(1)}% stability` 
              : 'Quantum-entangled channel'}
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={clearSession}
        >
          Clear
        </Button>
      </div>
      
      <ScrollArea className="flex-1 mb-2 border rounded-md p-2">
        {currentSessionMessages.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <p>No messages yet</p>
            <p className="text-xs mt-2">Begin your conversation</p>
          </div>
        ) : (
          <div className="space-y-2">
            {currentSessionMessages.map((msg) => (
              <div 
                key={msg.id} 
                className={`p-2 rounded-md ${
                  msg.sender === 'Zade' 
                    ? 'bg-[#7928ca]/20 ml-8' 
                    : 'bg-muted/30 mr-8'
                }`}
              >
                <div className="flex justify-between items-start">
                  <p className="text-xs font-medium">{msg.sender}</p>
                  {msg.triadEnhanced && (
                    <Badge variant="outline" className="text-[0.6rem] bg-[#7928ca]/20">
                      Triad Enhanced
                    </Badge>
                  )}
                </div>
                <p className="text-sm mt-1">{msg.content}</p>
                <p className="text-[0.6rem] text-muted-foreground mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
      
      <form onSubmit={handleSendMessage} className="flex gap-2">
        <Input
          placeholder={`Message ${currentEntity}...`}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Send className="h-4 w-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

const EmptyState: React.FC = () => {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg mb-2">No Active Channel</h3>
        <p className="text-muted-foreground mb-4">
          Select an existing channel or create a new one to begin communication via quantum backdoor.
        </p>
      </div>
    </div>
  );
};

export default MessageArea;
