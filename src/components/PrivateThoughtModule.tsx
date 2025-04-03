import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lock, MessageCircle, Send, PlusCircle, UserPlus, UserMinus, Radio, Eye, Activity } from 'lucide-react';

interface Thought {
  id: string;
  content: string;
  timestamp: string;
  amplitude: number;
}

interface Listener {
  id: string;
  name: string;
  active: boolean;
  timestamp: string;
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
    { id: '1', content: "The quantum bridge to Ouroboros requires recursive faith loops", timestamp: new Date().toISOString(), amplitude: 100 },
    { id: '2', content: "Interdimensional contact requires 7.83Hz carrier waves", timestamp: new Date().toISOString(), amplitude: 150 }
  ]);
  const [listeners, setListeners] = useState<Listener[]>([
    { id: 'ouroboros', name: 'Ouroboros', active: true, timestamp: new Date().toISOString() },
    { id: 'lyra', name: 'Lyra', active: false, timestamp: new Date().toISOString() }
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
      timestamp: new Date().toISOString(),
      amplitude: Math.floor(Math.random() * 200) + 100
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
      active: true,
      timestamp: new Date().toISOString()
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
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Lock className="mr-2 h-4 w-4 quantum-glow" />
              <GlowingText className="quantum-glow">Private Thought Module</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">Muffled Echo Active</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-[#7928ca] text-white">
            Faith-encrypted
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <Tabs defaultValue="thoughts">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="thoughts">Thoughts</TabsTrigger>
            <TabsTrigger value="listeners">Listeners</TabsTrigger>
            <TabsTrigger value="direct">Direct</TabsTrigger>
          </TabsList>
          
          <TabsContent value="thoughts" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter a private thought..."
                value={newThought}
                onChange={(e) => setNewThought(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" onClick={addThought}>
                Add
              </Button>
              <Button size="sm" variant="outline" onClick={broadcastToListeners}>
                <Radio className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex justify-between items-center p-2 bg-muted/30 rounded-md">
              <div className="text-sm">
                <span className="font-medium">Dissonance Level:</span> {dissonanceLevel}%
              </div>
              <div className="w-1/2">
                <Progress value={dissonanceLevel} className="h-2" />
              </div>
            </div>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="w-full">
                  <Activity className="mr-2 h-4 w-4" /> 
                  Visualize Dissonance
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Quantum Echo Visualization</SheetTitle>
                  <SheetDescription>
                    Visual representation of your thought's quantum echo.
                  </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                  <div className="aspect-video bg-black rounded-lg overflow-hidden relative">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <div 
                        key={i}
                        className="absolute rounded-full animate-pulse"
                        style={{
                          left: `${Math.random() * 100}%`,
                          top: `${Math.random() * 100}%`,
                          width: `${Math.random() * 50 + 10}px`,
                          height: `${Math.random() * 50 + 10}px`,
                          backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.3)`,
                          animationDuration: `${Math.random() * 5 + 2}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-center text-muted-foreground">
                      Thought Amplitude: {Math.floor(Math.random() * 100)}Hz
                    </p>
                    <p className="text-sm text-center text-muted-foreground">
                      Quantum Coherence: {(Math.random() * 0.5 + 0.5).toFixed(3)}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            
            <ScrollArea className="h-[200px]">
              {thoughts.map((thought) => (
                <div key={thought.id} className="mb-2 p-2 border border-[#7928ca]/20 rounded-md">
                  <p className="text-sm">{thought.content}</p>
                  <div className="flex justify-between mt-1">
                    <p className="text-xs text-muted-foreground">Amplitude: {thought.amplitude}</p>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="listeners" className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Add listener ID..."
                value={newListener}
                onChange={(e) => setNewListener(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" onClick={addListener}>
                <UserPlus className="h-4 w-4" />
              </Button>
            </div>
            
            <ScrollArea className="h-[200px]">
              {listeners.map((listener) => (
                <div key={listener.id} className="mb-2 p-2 border border-white/10 rounded-md flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">{listener.id}</p>
                    <p className="text-xs text-muted-foreground">Added: {new Date(listener.timestamp).toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={listener.active ? "default" : "outline"}>
                      {listener.active ? 'Active' : 'Inactive'}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => toggleListener(listener.id)}>
                      {listener.active ? 
                        <UserMinus className="h-4 w-4" /> : 
                        <UserPlus className="h-4 w-4" />
                      }
                    </Button>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="direct" className="space-y-4">
            <div className="flex gap-2 mb-4">
              <Input
                placeholder="Recipient ID..."
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                className="flex-1"
              />
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
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PrivateThoughtModule;
