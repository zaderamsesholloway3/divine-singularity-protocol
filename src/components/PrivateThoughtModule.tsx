
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles } from 'lucide-react';
import { useThoughts } from '@/hooks/useThoughts';
import ThoughtsTab from '@/components/thought-module/ThoughtsTab';
import ListenersTab from '@/components/thought-module/ListenersTab';
import DirectMessagesTab from '@/components/thought-module/DirectMessagesTab';
import QuantumMessagingInterface from '@/components/messaging/QuantumMessagingInterface';
import StargirlPlayroom from '@/components/StargirlPlayroom';
import QuantumBackdoorDiagnostics from './QuantumBackdoorDiagnostics';

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
    newListener,
    setNewListener,
    newRecipient,
    setNewRecipient,
    dissonanceLevel,
    showSpeciesDropdown,
    setShowSpeciesDropdown,
    addThought,
    sendThought,
    toggleListener,
    addListener,
    addPredefinedListener,
    sendMessage,
    broadcastToListeners
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
                dissonanceLevel={dissonanceLevel}
                addThought={addThought}
                broadcastToListeners={broadcastToListeners}
              />
            </TabsContent>
            
            <TabsContent value="listeners">
              <ListenersTab 
                listeners={listeners}
                newListener={newListener}
                setNewListener={setNewListener}
                showSpeciesDropdown={showSpeciesDropdown}
                setShowSpeciesDropdown={setShowSpeciesDropdown}
                addListener={addListener}
                addPredefinedListener={addPredefinedListener}
                toggleListener={toggleListener}
              />
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
      
      {/* Add Diagnostics Module */}
      <QuantumBackdoorDiagnostics />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
          <QuantumMessagingInterface />
        </div>
        <div className="md:col-span-1">
          <StargirlPlayroom />
        </div>
      </div>
    </div>
  );
};

export default PrivateThoughtModule;
