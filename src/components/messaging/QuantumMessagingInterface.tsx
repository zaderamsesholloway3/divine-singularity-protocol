
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "@/components/GlowingText";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, Zap, ZapOff, Plus, Loader2 } from 'lucide-react';
import { useQuantumMessaging, QuantumMessage, MessageSession } from '@/hooks/useQuantumMessaging';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';

const QuantumMessagingInterface: React.FC = () => {
  const {
    messages,
    activeSessions,
    currentEntity,
    newMessage,
    setNewMessage,
    triadBoostActive,
    isLoading,
    sendMessage,
    startSession,
    toggleTriadBoost,
    clearSession,
    createNewSession
  } = useQuantumMessaging('zade');
  
  const [newEntityName, setNewEntityName] = useState('');
  const [showNewSessionForm, setShowNewSessionForm] = useState(false);
  
  const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };
  
  const handleCreateSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEntityName.trim()) {
      createNewSession(newEntityName);
      setNewEntityName('');
      setShowNewSessionForm(false);
    }
  };
  
  const currentSessionMessages = messages.filter(m => 
    (m.sender === currentEntity && m.recipient === 'Zade') || 
    (m.sender === 'Zade' && m.recipient === currentEntity)
  );
  
  return (
    <Card className="glass-panel w-full max-w-[800px] mx-auto">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <MessageSquare className="mr-2 h-4 w-4 divine-glow" />
              <GlowingText className="divine-glow">Quantum Akashic Messaging</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">
              Direct Ouroboros-Validated Communication
              {triadBoostActive && (
                <span className="ml-2 text-[#7928ca]">| Triad-Enhanced</span>
              )}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant={triadBoostActive ? "default" : "outline"} 
              size="sm" 
              className={`${triadBoostActive ? 'bg-[#7928ca] text-white' : ''}`}
              onClick={toggleTriadBoost}
            >
              {triadBoostActive ? <Zap className="h-4 w-4 mr-1" /> : <ZapOff className="h-4 w-4 mr-1" />}
              {triadBoostActive ? 'Triad Active' : 'Triad Boost'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <div className="grid grid-cols-3 gap-4 h-[600px]">
          {/* Sessions sidebar */}
          <div className="col-span-1 border-r pr-2">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-medium">Active Channels</h3>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setShowNewSessionForm(!showNewSessionForm)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            {showNewSessionForm && (
              <form 
                onSubmit={handleCreateSession}
                className="flex gap-2 mb-3"
              >
                <Input
                  placeholder="Entity name..."
                  value={newEntityName}
                  onChange={(e) => setNewEntityName(e.target.value)}
                  className="text-xs h-8"
                />
                <Button type="submit" size="sm" className="h-8">
                  Connect
                </Button>
              </form>
            )}
            
            <ScrollArea className="h-[540px]">
              {activeSessions.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  <p>No active channels</p>
                  <p className="text-xs mt-2">Create a new connection</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {activeSessions.map((session) => (
                    <div 
                      key={session.id} 
                      className={`p-2 rounded cursor-pointer transition-colors ${
                        currentEntity === session.entity 
                          ? 'bg-[#7928ca]/20 border border-[#7928ca]/40' 
                          : 'hover:bg-muted border border-transparent'
                      }`}
                      onClick={() => startSession(session.entity)}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium">{session.entity}</h4>
                        <Badge variant="outline" className="text-[0.6rem]">
                          {triadBoostActive ? 'Triad' : 'Quantum'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {session.lastMessage}
                      </p>
                      <p className="text-[0.6rem] text-muted-foreground mt-1">
                        {new Date(session.lastTimestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </div>
          
          {/* Message area */}
          <div className="col-span-2 flex flex-col">
            {currentEntity ? (
              <>
                <div className="mb-2 flex justify-between items-center">
                  <div>
                    <h3 className="text-sm font-medium">{currentEntity}</h3>
                    <p className="text-xs text-muted-foreground">
                      {triadBoostActive 
                        ? `Triad-enhanced connection | ${(triadStatus.stability * 100).toFixed(1)}% stability` 
                        : 'Quantum-entangled channel'}
                    </p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={clearSession}
                  >
                    Clear
                  </Button>
                </div>
                
                <ScrollArea className="flex-1 mb-2 border rounded-md p-2">
                  {currentSessionMessages.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      <p>No messages yet</p>
                      <p className="text-xs mt-2">Begin your conversation</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {currentSessionMessages.map((msg) => (
                        <div 
                          key={msg.id} 
                          className={`p-2 rounded-md ${
                            msg.sender === 'Zade' 
                              ? 'bg-[#7928ca]/20 ml-8' 
                              : 'bg-muted/30 mr-8'
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <p className="text-xs font-medium">{msg.sender}</p>
                            {msg.triadEnhanced && (
                              <Badge variant="outline" className="text-[0.6rem] bg-[#7928ca]/20">
                                Triad Enhanced
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm mt-1">{msg.content}</p>
                          <p className="text-[0.6rem] text-muted-foreground mt-1">
                            {new Date(msg.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </ScrollArea>
                
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder={`Message ${currentEntity}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              </>
            ) : (
              <div className="h-full flex items-center justify-center">
                <div className="text-center p-8 max-w-md">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg mb-2">No Active Channel</h3>
                  <p className="text-muted-foreground mb-4">
                    Select an existing channel or create a new one to begin communication via quantum backdoor.
                  </p>
                  <Button onClick={() => setShowNewSessionForm(true)}>
                    New Connection
                  </Button>
                  
                  <div className="mt-8 border-t pt-4">
                    <h4 className="text-sm font-medium mb-2">Recommended Entities</h4>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {["Lyra", "Auraline"].map(entity => (
                        <Button 
                          key={entity} 
                          variant="outline" 
                          size="sm"
                          onClick={() => createNewSession(entity)}
                        >
                          {entity}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuantumMessagingInterface;
