
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, Loader2, MessageSquare, Infinity, Sparkles } from 'lucide-react';
import { QuantumMessage } from '@/types/quantum-messaging';
import { Badge } from "@/components/ui/badge";

interface MessageAreaProps {
  currentEntity: string;
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
  // Filter messages for current entity
  const entityMessages = messages.filter(
    msg => 
      (msg.sender === currentEntity && msg.recipient === 'Zade') || 
      (msg.sender === 'Zade' && msg.recipient === currentEntity)
  );
  
  // Helper function to display faith indicator
  const getFaithIndicator = (faithQuotient?: number) => {
    if (!faithQuotient || faithQuotient < 0.7) return null;
    
    const faithClass = faithQuotient > 0.9 ? "text-indigo-500" : 
                      faithQuotient > 0.8 ? "text-purple-500" : "text-blue-500";
    
    return (
      <span className={`flex items-center gap-1 ${faithClass}`}>
        {faithQuotient > 0.9 ? <Infinity className="h-3 w-3" /> : <Sparkles className="h-3 w-3" />}
        {faithQuotient > 0.9 ? "∞" : "UFQ"}
      </span>
    );
  };
  
  return (
    <div className="col-span-2 h-full flex flex-col">
      {/* Entity header */}
      <div className="flex justify-between items-center mb-4 pb-2 border-b">
        <div>
          <h3 className="text-lg font-medium">{currentEntity}</h3>
          <p className="text-xs text-muted-foreground">
            Quantum backdoor{triadBoostActive ? ' (Triad-Enhanced)' : ''}
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={clearSession}
        >
          Close
        </Button>
      </div>
      
      {/* Messages area */}
      <ScrollArea className="flex-1 pr-4">
        {entityMessages.length > 0 ? (
          <div className="space-y-4">
            {entityMessages.map((message, idx) => (
              <div 
                key={idx}
                className={`flex ${message.sender === 'Zade' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'Zade' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted'
                  } ${message.triadEnhanced ? 'border border-purple-500' : ''}`}
                >
                  <p>{message.content}</p>
                  <div className="text-xs mt-1 opacity-70 text-right flex justify-end items-center gap-2">
                    <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                    {message.triadEnhanced && (
                      <Badge variant="outline" className="h-4 px-1 text-[0.6rem] bg-purple-500/10 text-purple-600 border-purple-500">
                        Triad
                      </Badge>
                    )}
                    {getFaithIndicator(message.faithQuotient)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-center p-8">
            <div>
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h4 className="text-lg mb-2">No messages yet</h4>
              <div className="text-muted-foreground text-sm">
                Send a message to begin communicating with {currentEntity} via quantum backdoor.
              </div>
            </div>
          </div>
        )}
      </ScrollArea>
      
      {/* Message input */}
      <form onSubmit={handleSendMessage} className="mt-4 flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`Message ${currentEntity}...`}
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </Button>
      </form>
    </div>
  );
};

export default MessageArea;
