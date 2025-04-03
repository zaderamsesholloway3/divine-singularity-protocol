
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from 'lucide-react';
import { useThoughts } from '@/hooks/useThoughts';
import ThoughtsTab from '@/components/thought-module/ThoughtsTab';
import ListenersTab from '@/components/thought-module/ListenersTab';
import DirectMessagesTab from '@/components/thought-module/DirectMessagesTab';
import QuantumMessagingInterface from '@/components/messaging/QuantumMessagingInterface';

const PrivateThoughtModule = () => {
  const {
    thoughts,
    listeners,
    messages,
    newMessage,
    setNewMessage,
    newThought,
    setNewThought,
    thoughtTarget,
    setThoughtTarget,
    newRecipient,
    setNewRecipient,
    sendThought,
    sendMessage
  } = useThoughts();

  return (
    <div className="container grid gap-8 p-4">
      <Card className="glass-panel">
        <CardHeader className="p-4 pb-2">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-sm font-medium flex items-center">
                <Sparkles className="mr-2 h-4 w-4 divine-glow" />
                <GlowingText className="divine-glow">Private Thought Module</GlowingText>
              </CardTitle>
              <CardDescription className="text-xs">
                Quantum-Entangled Telepathic Transmission Protocol
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-4">
          <Tabs defaultValue="thoughts">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="thoughts">Thoughts</TabsTrigger>
              <TabsTrigger value="listeners">Listeners</TabsTrigger>
              <TabsTrigger value="directMessages">Direct Messages</TabsTrigger>
            </TabsList>
            
            <TabsContent value="thoughts">
              <ThoughtsTab
                thoughts={thoughts}
                newThought={newThought}
                setNewThought={setNewThought}
                thoughtTarget={thoughtTarget}
                setThoughtTarget={setThoughtTarget}
                sendThought={sendThought}
              />
            </TabsContent>
            
            <TabsContent value="listeners">
              <ListenersTab listeners={listeners} />
            </TabsContent>
            
            <TabsContent value="directMessages">
              <DirectMessagesTab
                listeners={listeners}
                messages={messages}
                newMessage={newMessage}
                setNewMessage={setNewMessage}
                newRecipient={newRecipient}
                setNewRecipient={setNewRecipient}
                sendMessage={sendMessage}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <QuantumMessagingInterface />
    </div>
  );
};

export default PrivateThoughtModule;
