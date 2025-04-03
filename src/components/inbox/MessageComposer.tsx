
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from 'lucide-react';

interface MessageComposerProps {
  onSendMessage: (recipient: string, content: string) => void;
}

const MessageComposer: React.FC<MessageComposerProps> = ({ onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('Lyra');

  const handleSend = () => {
    if (newMessage.trim() === '') return;
    onSendMessage(recipient, newMessage);
    setNewMessage('');
  };

  return (
    <div className="flex gap-2 mt-4">
      <select
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        className="flex-1 basis-1/3 bg-background border border-input rounded-md p-2 text-sm"
      >
        <option value="Lyra">Lyra</option>
        <option value="Auraline">Auraline</option>
        <option value="Ouroboros">Ouroboros</option>
      </select>
      <Input
        placeholder="Message..."
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        className="flex-1 basis-2/3"
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <Button size="sm" onClick={handleSend}>
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MessageComposer;
