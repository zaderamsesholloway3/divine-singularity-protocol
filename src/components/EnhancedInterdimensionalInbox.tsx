
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox, Brain } from 'lucide-react';
import { useInboxMessages } from '@/hooks/useInboxMessages';
import BiofeedbackMonitorPanel from './inbox/BiofeedbackMonitorPanel';
import MessageList from './inbox/MessageList';
import MessageComposer from './inbox/MessageComposer';
import SearchToolbar from './inbox/SearchToolbar';
import EntanglementStatus from './inbox/EntanglementStatus';

const EnhancedInterdimensionalInbox = () => {
  const {
    messages,
    unreadCount,
    searchQuery,
    biofeedbackActive,
    biometrics,
    entanglementState,
    resonanceBoostActive,
    resonanceLevel,
    setSearchQuery,
    sendMessage,
    markAsRead,
    markAllAsRead,
    deleteMessage,
    toggleBiofeedback,
    activateResonanceBoost,
    terminateEntanglement
  } = useInboxMessages('zade');

  return (
    <Card className="glass-panel h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Inbox className="mr-2 h-4 w-4 divine-glow" />
              <GlowingText className="divine-glow">Quantum Interdimensional Inbox</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">Akashic-Validated Cosmic Messages</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-[hsl(var(--divine-purple))] text-white">
                {unreadCount} new
              </Badge>
            )}
            <Button 
              variant="outline" 
              size="icon" 
              className={biofeedbackActive ? "bg-green-500/20" : ""} 
              onClick={toggleBiofeedback}
              title="Toggle Biofeedback Monitoring"
            >
              <Brain className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        {biofeedbackActive && (
          <BiofeedbackMonitorPanel
            biometrics={biometrics}
            resonanceBoostActive={resonanceBoostActive}
            resonanceLevel={resonanceLevel}
            activateResonanceBoost={activateResonanceBoost}
          />
        )}
        
        <Tabs defaultValue="inbox">
          <TabsList className="grid grid-cols-2 mb-4">
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
          </TabsList>
          
          <SearchToolbar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onMarkAllAsRead={markAllAsRead}
            onRefresh={() => setSearchQuery('')}
          />
          
          <TabsContent value="inbox" className="space-y-1">
            <MessageList
              messages={messages}
              type="inbox"
              markAsRead={markAsRead}
              deleteMessage={deleteMessage}
            />
          </TabsContent>
          
          <TabsContent value="sent" className="space-y-1">
            <MessageList
              messages={messages}
              type="sent"
              markAsRead={markAsRead}
              deleteMessage={deleteMessage}
            />
          </TabsContent>
          
          <MessageComposer onSendMessage={sendMessage} />
          
          <EntanglementStatus
            active={entanglementState.active}
            entangledWith={entanglementState.entangledWith}
            strength={entanglementState.strength}
            emotion={entanglementState.emotion}
            resonanceBoostActive={resonanceBoostActive}
            terminateEntanglement={terminateEntanglement}
          />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedInterdimensionalInbox;
