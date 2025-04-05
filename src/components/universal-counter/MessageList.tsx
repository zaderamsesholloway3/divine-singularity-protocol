
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Define the message interface
export interface UniversalMessage {
  sender: string;
  content: string;
  timestamp: number;
}

interface MessageListProps {
  messages: UniversalMessage[];
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

const MessageList: React.FC<MessageListProps> = ({ messages, messagesEndRef }) => {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-indigo-300 mb-2">Universal Messages:</p>
      <ScrollArea className="h-40 w-full rounded-md border border-gray-700 bg-gray-800/50">
        <div className="p-2">
          {messages.length === 0 ? (
            <p className="text-xs text-gray-400">Awaiting messages...</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className="mb-2 pb-2 border-b border-gray-700 last:border-b-0 last:pb-0 last:mb-0">
                <div className="flex items-center gap-2">
                  <Badge className={
                    msg.sender.includes("AI") ? "bg-rose-600" :
                    msg.sender.includes("Bio") ? "bg-indigo-600" :
                    msg.sender.includes("Hybrid") ? "bg-purple-600" :
                    "bg-blue-600"
                  }>{msg.sender}</Badge>
                  <span className="text-xs text-gray-300">{msg.content}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageList;
