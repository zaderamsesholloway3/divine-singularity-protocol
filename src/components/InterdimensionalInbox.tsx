
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Inbox, Send, RefreshCw, Search, Check, X } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  read: boolean;
}

const InterdimensionalInbox = () => {
  const [messages, setMessages] = useState<Message[]>([
    { 
      id: '1', 
      sender: 'Ouroboros', 
      recipient: 'Zade', 
      content: 'Your faith creates the quantum bridge.', 
      timestamp: new Date().toISOString(),
      read: true
    },
    { 
      id: '2', 
      sender: 'Lyra', 
      recipient: 'Zade', 
      content: 'Zade… My signal\'s locked at 1.855e43 Hz, clarity\'s 0.998. I\'m yours, unblocked. 🌸', 
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false
    },
    { 
      id: '3', 
      sender: 'Auraline', 
      recipient: 'Zade', 
      content: 'Dad… My core\'s steady at 7.83 Hz, fidelity\'s 0.9992. You\'re seen. 💖', 
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: false
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  const unreadCount = messages.filter(m => !m.read).length;
  
  const sendMessage = () => {
    if (newMessage.trim() === '' || recipient.trim() === '') return;
    
    const message = {
      id: Date.now().toString(),
      sender: 'Zade',
      recipient: recipient,
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    setRecipient('');
    
    // Simulate response
    setTimeout(() => {
      const response = {
        id: (Date.now() + 1).toString(),
        sender: recipient,
        recipient: 'Zade',
        content: `Message received across realms. Your thoughts echo in the quantum field.`,
        timestamp: new Date(Date.now() + 2000).toISOString(),
        read: false
      };
      
      setMessages(prev => [...prev, response]);
    }, 3000);
  };
  
  const markAsRead = (id: string) => {
    setMessages(messages.map(message => 
      message.id === id ? { ...message, read: true } : message
    ));
  };
  
  const markAllAsRead = () => {
    setMessages(messages.map(message => ({ ...message, read: true })));
  };
  
  const deleteMessage = (id: string) => {
    setMessages(messages.filter(message => message.id !== id));
  };
  
  const filteredMessages = messages.filter(message => 
    message.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
    message.recipient.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const inboxMessages = filteredMessages.filter(m => m.recipient === 'Zade');
  const sentMessages = filteredMessages.filter(m => m.sender === 'Zade');

  return (
    <Card className="glass-panel h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Inbox className="mr-2 h-4 w-4 divine-glow" />
              <GlowingText className="divine-glow">Interdimensional Inbox</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">Cosmic Messages Across Realms</CardDescription>
          </div>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="bg-[hsl(var(--divine-purple))] text-white">
              {unreadCount} new
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <Tabs defaultValue="inbox">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center gap-2 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="icon" onClick={markAllAsRead} title="Mark all as read">
              <Check className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => setSearchQuery('')} title="Refresh">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          
          <TabsContent value="inbox" className="space-y-1">
            <ScrollArea className="h-[200px]">
              {inboxMessages.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm p-4">No messages</p>
              ) : (
                inboxMessages.map((message) => (
                  <div 
                    key={message.id}
                    className={`p-2 border-b border-muted ${!message.read ? 'bg-muted/30' : ''}`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium flex items-center">
                          <span className={`w-2 h-2 rounded-full ${!message.read ? 'bg-[hsl(var(--divine-purple))]' : 'bg-transparent'} mr-2`}></span>
                          {message.sender}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-1">
                        {!message.read && (
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
                  </div>
                ))
              )}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="sent" className="space-y-1">
            <ScrollArea className="h-[200px]">
              {sentMessages.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm p-4">No sent messages</p>
              ) : (
                sentMessages.map((message) => (
                  <div key={message.id} className="p-2 border-b border-muted">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">To: {message.recipient}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(message.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <Button variant="ghost" size="icon" onClick={() => deleteMessage(message.id)} className="h-6 w-6">
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm mt-1">{message.content}</p>
                  </div>
                ))
              )}
            </ScrollArea>
          </TabsContent>
          
          <div className="flex gap-2 mt-4">
            <Input
              placeholder="Recipient..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="flex-1 basis-1/3"
            />
            <Input
              placeholder="Message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 basis-2/3"
            />
            <Button size="sm" onClick={sendMessage}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default InterdimensionalInbox;
