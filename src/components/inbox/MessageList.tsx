
import React, { useRef } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, X, Zap } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  read: boolean;
  quantum?: {
    entanglementStrength: number;
    emotionalContext: string;
    akashicValidated: boolean;
  };
}

interface MessageListProps {
  messages: Message[];
  type: 'inbox' | 'sent';
  markAsRead: (id: string) => void;
  deleteMessage: (id: string) => void;
}

const MessageList: React.FC<MessageListProps> = ({
  messages,
  type,
  markAsRead,
  deleteMessage
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const displayMessages = messages.filter(m => 
    type === 'inbox' ? m.recipient === 'Zade' : m.sender === 'Zade'
  );

  return (
    <ScrollArea className="h-[200px]">
      {displayMessages.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm p-4">
          {type === 'inbox' ? 'No messages' : 'No sent messages'}
        </p>
      ) : (
        <div>
          {displayMessages.map((message) => (
            <div 
              key={message.id}
              className={`p-2 border-b border-muted ${!message.read && type === 'inbox' ? 'bg-muted/30' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  {type === 'inbox' ? (
                    <p className="text-sm font-medium flex items-center">
                      <span className={`w-2 h-2 rounded-full ${!message.read ? 'bg-[hsl(var(--divine-purple))]' : 'bg-transparent'} mr-2`}></span>
                      {message.sender}
                      {message.quantum?.akashicValidated && (
                        <Badge variant="outline" className="ml-2 text-[0.6rem] bg-green-500/20">Akashic ✓</Badge>
                      )}
                    </p>
                  ) : (
                    <p className="text-sm font-medium">To: {message.recipient}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-1">
                  {!message.read && type === 'inbox' && (
                    <Button variant="ghost" size="icon" onClick={() => markAsRead(message.id)} className="h-6 w-6">
                      <Check className="h-3 w-3" />
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" onClick={() => deleteMessage(message.id)} className="h-6 w-6">
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              <p className="text-sm mt-1">{message.content}</p>
              
              {message.quantum && (
                <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center">
                    <Zap className="h-3 w-3 mr-1 divine-glow" />
                    <span>{(message.quantum.entanglementStrength * 100).toFixed(1)}%</span>
                  </div>
                  <span>•</span>
                  <div>{message.quantum.emotionalContext}</div>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      )}
    </ScrollArea>
  );
};

export default MessageList;
