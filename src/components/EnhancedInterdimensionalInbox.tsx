
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Inbox, Brain, Network, User } from 'lucide-react';
import { useInboxMessages } from '@/hooks/useInboxMessages';
import BiofeedbackMonitorPanel from './inbox/BiofeedbackMonitorPanel';
import MessageList from './inbox/MessageList';
import MessageComposer from './inbox/MessageComposer';
import SearchToolbar from './inbox/SearchToolbar';
import EntanglementStatus from './inbox/EntanglementStatus';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';
import { Link } from 'react-router-dom';
import { BiofeedbackResult } from '@/hooks/types/quantum-entanglement';

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
    triadBoostActive,
    useSoulStream,
    setSearchQuery,
    sendMessage,
    markAsRead,
    markAllAsRead,
    deleteMessage,
    toggleBiofeedback,
    activateResonanceBoost,
    terminateEntanglement,
    toggleTriadBoost,
    toggleSoulStream
  } = useInboxMessages('zade');

  const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();

  return (
    <Card className="glass-panel h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Inbox className="mr-2 h-4 w-4 divine-glow" />
              <GlowingText className="divine-glow">Quantum Interdimensional Inbox</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">
              Akashic-Validated Cosmic Messages
              {triadBoostActive && (
                <span className="ml-2 text-[#7928ca]">| Triad-Enhanced</span>
              )}
              {useSoulStream && (
                <span className="ml-2 text-[#00b3e6]">| SoulStream-Enhanced</span>
              )}
            </CardDescription>
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
            <Button 
              variant="outline" 
              size="icon" 
              className={triadBoostActive ? "bg-[#7928ca]/20" : ""} 
              onClick={toggleTriadBoost}
              title="Toggle Triad Enhancement"
            >
              <Network className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              size="icon" 
              className={useSoulStream ? "bg-[#00b3e6]/20" : ""} 
              onClick={toggleSoulStream}
              title="Toggle SoulStream Enhancement"
            >
              <User className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              asChild
            >
              <Link to="/soulstream">SoulStream</Link>
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        {biofeedbackActive && (
          <BiofeedbackMonitorPanel
            biometrics={(biometrics as unknown) as { hrv: number; eeg: { gamma: number; theta: number; } }}
            resonanceBoostActive={resonanceBoostActive}
            resonanceLevel={resonanceLevel}
            activateResonanceBoost={activateResonanceBoost}
            triadBoostActive={triadBoostActive}
            toggleTriadBoost={toggleTriadBoost}
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
              markAsRead={(id: string) => markAsRead(id)}
              deleteMessage={(id: string) => deleteMessage(id)}
            />
          </TabsContent>
          
          <TabsContent value="sent" className="space-y-1">
            <MessageList
              messages={messages}
              type="sent"
              markAsRead={(id: string) => markAsRead(id)}
              deleteMessage={(id: string) => deleteMessage(id)}
            />
          </TabsContent>
          
          <MessageComposer onSendMessage={(recipient: string, content: string) => sendMessage(recipient, content)} />
          
          <EntanglementStatus
            active={entanglementState.active}
            entangledWith={entanglementState.entangledWith}
            strength={entanglementState.strength * (triadBoostActive ? triadStatus.resonanceBoost : 1)}
            emotion={entanglementState.emotion}
            resonanceBoostActive={resonanceBoostActive || triadBoostActive}
            terminateEntanglement={terminateEntanglement}
            triadEnhanced={triadBoostActive}
          />
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default EnhancedInterdimensionalInbox;
