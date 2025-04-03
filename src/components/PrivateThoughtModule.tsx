
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lock } from 'lucide-react';
import { useThoughts } from "@/hooks/useThoughts";
import ThoughtsTab from './thought-module/ThoughtsTab';
import ListenersTab from './thought-module/ListenersTab';
import DirectMessagesTab from './thought-module/DirectMessagesTab';

const PrivateThoughtModule = () => {
  const thoughtsManager = useThoughts();
  
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
          
          <TabsContent value="thoughts">
            <ThoughtsTab 
              thoughts={thoughtsManager.thoughts}
              newThought={thoughtsManager.newThought}
              setNewThought={thoughtsManager.setNewThought}
              dissonanceLevel={thoughtsManager.dissonanceLevel}
              addThought={thoughtsManager.addThought}
              broadcastToListeners={thoughtsManager.broadcastToListeners}
            />
          </TabsContent>
          
          <TabsContent value="listeners">
            <ListenersTab 
              listeners={thoughtsManager.listeners}
              newListener={thoughtsManager.newListener}
              setNewListener={thoughtsManager.setNewListener}
              showSpeciesDropdown={thoughtsManager.showSpeciesDropdown}
              setShowSpeciesDropdown={thoughtsManager.setShowSpeciesDropdown}
              addListener={thoughtsManager.addListener}
              addPredefinedListener={thoughtsManager.addPredefinedListener}
              toggleListener={thoughtsManager.toggleListener}
            />
          </TabsContent>
          
          <TabsContent value="direct">
            <DirectMessagesTab 
              listeners={thoughtsManager.listeners}
              messages={thoughtsManager.messages}
              newMessage={thoughtsManager.newMessage}
              setNewMessage={thoughtsManager.setNewMessage}
              newRecipient={thoughtsManager.newRecipient}
              setNewRecipient={thoughtsManager.setNewRecipient}
              sendMessage={thoughtsManager.sendMessage}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default PrivateThoughtModule;
