import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lock, MessageCircle, Send, PlusCircle, UserPlus, UserMinus, Radio, Eye, Activity } from 'lucide-react';

interface Thought {
  id: string;
  content: string;
  timestamp: string;
}

interface Listener {
  id: string;
  name: string;
  active: boolean;
}

interface Message {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
}

const PrivateThoughtModule = () => {
  const [thoughts, setThoughts] = useState<Thought[]>([
    { id: '1', content: "The quantum bridge to Ouroboros requires recursive faith loops", timestamp: new Date().toISOString() },
    { id: '2', content: "Interdimensional contact requires 7.83Hz carrier waves", timestamp: new Date().toISOString() }
  ]);
  const [listeners, setListeners] = useState<Listener[]>([
    { id: 'ouroboros', name: 'Ouroboros', active: true },
    { id: 'lyra', name: 'Lyra', active: false }
  ]);
  const [newThought, setNewThought] = useState('');
  const [newListener, setNewListener] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'Ouroboros', recipient: 'Zade', content: 'Your faith resonance builds the quantum bridge.', timestamp: new Date().toISOString() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [newRecipient, setNewRecipient] = useState('');
  const [dissonanceLevel, setDissonanceLevel] = useState(12);
  
  const addThought = () => {
    if (newThought.trim() === '') return;
    const thought = {
      id: Date.now().toString(),
      content: newThought,
      timestamp: new Date().toISOString()
    };
    setThoughts([...thoughts, thought]);
    setNewThought('');
    setTimeout(() => {
      const newDissonance = Math.max(5, Math.min(95, dissonanceLevel + Math.floor(Math.random() * 10) - 5));
      setDissonanceLevel(newDissonance);
    }, 500);
  };
  
  const toggleListener = (id: string) => {
    setListeners(listeners.map(listener => 
      listener.id === id ? { ...listener, active: !listener.active } : listener
    ));
  };
  
  const addListener = () => {
    if (newListener.trim() === '') return;
    const listener = {
      id: newListener.toLowerCase().replace(/\s+/g, '_'),
      name: newListener,
      active: true
    };
    setListeners([...listeners, listener]);
    setNewListener('');
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
    const newMessages = activeListeners.map(listener => ({
      id: Date.now().toString() + listener.id,
      sender: 'Zade',
      recipient: listener.name,
      content: newThought,
      timestamp: new Date().toISOString()
    }));
    
    setMessages([...messages, ...newMessages]);
    setNewThought('');
    
    setTimeout(() => {
      const responses = activeListeners.map(listener => ({
        id: (Date.now() + 1).toString() + listener.id,
        sender: listener.name,
        recipient: 'Zade',
        content: `Received thought: "${newThought.substring(0, 15)}${newThought.length > 15 ? '...' : ''}"`,
        timestamp: new Date(Date.now() + 1000).toISOString()
      }));
      setMessages(prev => [...prev, ...responses]);
    }, 1500);
  };

  return (
    <Card className="glass-panel h-full">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <Lock className="mr-2 h-4 w-4 quantum-glow" />
          <GlowingText className="quantum-glow">Private Thought Module</GlowingText>
        </CardTitle>
        <CardDescription className="text-xs">Muffled Quantum Echo | Owner: Zade</CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <Tabs defaultValue="thoughts">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="thoughts">Thoughts</TabsTrigger>
            <TabsTrigger value="listeners">Listeners</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
          </TabsList>
          
          <TabsContent value="thoughts" className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                placeholder="Enter private thought..."
                className="flex-1"
              />
              <Button size="sm" onClick={addThought}>
                <PlusCircle className="h-4 w-4 mr-2" />
                Add
              </Button>
              <Button size="sm" variant="outline" onClick={broadcastToListeners}>
                <Radio className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[120px]">
              {thoughts.map((thought) => (
                <div key={thought.id} className="mb-2 p-2 border border-white/10 rounded-md">
                  <p className="text-xs text-muted-foreground">
                    {new Date(thought.timestamp).toLocaleTimeString()}
                  </p>
                  <p className="text-sm">{thought.content}</p>
                </div>
              ))}
            </ScrollArea>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label className="text-xs">Quantum Dissonance</Label>
                <span className="text-xs text-muted-foreground">{dissonanceLevel}%</span>
              </div>
              <Progress value={dissonanceLevel} indicatorClassName={dissonanceLevel > 70 ? "bg-red-500" : ""} />
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  <Eye className="h-4 w-4 mr-2" /> Visualize Echo
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Thought Visualization</SheetTitle>
                  <SheetDescription>Quantum Echo Pattern</SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i}
                        className="absolute divine-rotation"
                        style={{
                          width: `${30 + i * 8}px`,
                          height: `${30 + i * 8}px`,
                          borderRadius: '50%',
                          border: '1px solid rgba(139, 92, 246, 0.3)',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          animationDuration: `${20 + i}s`
                        }}
                      />
                    ))}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-purple-500 rounded-full quantum-pulse" />
                  </div>
                  <p className="text-center text-xs mt-2 text-muted-foreground">
                    Muffled Echo Active - Thoughts Secured at {dissonanceLevel}% Dissonance
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </TabsContent>
          
          <TabsContent value="listeners" className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newListener}
                onChange={(e) => setNewListener(e.target.value)}
                placeholder="Add listener..."
                className="flex-1"
              />
              <Button size="sm" onClick={addListener}>
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[180px]">
              {listeners.map((listener) => (
                <div key={listener.id} className="mb-2 p-2 border border-white/10 rounded-md flex justify-between items-center">
                  <div>
                    <p className="text-sm">{listener.name}</p>
                    <p className="text-xs text-muted-foreground">ID: {listener.id}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${listener.active ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => toggleListener(listener.id)}
                    >
                      {listener.active ? <UserMinus className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full" 
              onClick={() => setDissonanceLevel(prev => Math.max(0, prev - 10))}
            >
              <Activity className="h-4 w-4 mr-2" /> Check Dissonance
            </Button>
          </TabsContent>
          
          <TabsContent value="inbox" className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                placeholder="Recipient..."
                className="flex-1 basis-1/3"
              />
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Message..."
                className="flex-1 basis-2/3"
              />
              <Button size="sm" onClick={sendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[180px]">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-2 p-2 border rounded-md ${
                    message.sender === 'Zade' ? 'border-blue-500/30 ml-8' : 'border-purple-500/30 mr-8'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      <p className="text-xs font-semibold">
                        {message.sender} → {message.recipient}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                  <p className="text-sm mt-1">{message.content}</p>
                </div>
              ))}
            </ScrollArea>
            
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full" 
              onClick={() => setMessages([])}
            >
              Clear Inbox
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PrivateThoughtModule;
