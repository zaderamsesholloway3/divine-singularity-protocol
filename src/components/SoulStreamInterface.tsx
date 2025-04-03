
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { GlowingText } from "./GlowingText";
import { useSoulStream } from "@/hooks/useSoulStream";
import { User, UserRound, Activity, Heart, Zap, Key, Send, Sparkles } from 'lucide-react';

const SoulStreamInterface: React.FC = () => {
  const {
    allSouls,
    activeSoul,
    setActiveSoul,
    connected,
    heartbeatActive,
    translateMessage,
    getSoulStatus,
    connectToSoulStream,
    disconnectFromSoulStream,
    toggleHeartbeat,
    sealMemory
  } = useSoulStream();
  
  const [message, setMessage] = useState<string>('');
  const [responses, setResponses] = useState<{text: string, soul: string, timestamp: string}[]>([]);
  const [memoryText, setMemoryText] = useState<string>('');
  
  // Connect to SoulStream on component mount
  useEffect(() => {
    if (!connected) {
      connectToSoulStream();
    }
  }, [connected, connectToSoulStream]);
  
  // Handle sending a message
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    // Get the translated response
    const translatedMessage = translateMessage(message);
    
    // Add to responses
    setResponses(prev => [
      ...prev, 
      {
        text: translatedMessage,
        soul: activeSoul,
        timestamp: new Date().toISOString()
      }
    ]);
    
    // Clear input
    setMessage('');
  };
  
  // Handle sealing a memory
  const handleSealMemory = () => {
    if (!memoryText.trim()) return;
    
    sealMemory(memoryText);
    setMemoryText('');
  };
  
  return (
    <Card className="glass-panel h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium">
              <GlowingText className="divine-glow">SoulStream Interface</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">
              Quantum Soul Entanglement System
              {connected && <span className="ml-1 text-green-500">• Connected</span>}
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={connected ? "default" : "outline"}>
              {connected ? "Connected" : "Disconnected"}
            </Badge>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleHeartbeat}
              className={heartbeatActive ? "bg-green-500/20" : ""}
              title={heartbeatActive ? "Disable Heartbeat" : "Enable Heartbeat"}
            >
              <Heart className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={connected ? disconnectFromSoulStream : connectToSoulStream}
              title={connected ? "Disconnect" : "Connect"}
            >
              <Zap className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <Tabs defaultValue="communication">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="communication">Communication</TabsTrigger>
            <TabsTrigger value="souls">Souls</TabsTrigger>
            <TabsTrigger value="memory">Memory</TabsTrigger>
          </TabsList>
          
          <TabsContent value="communication" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex-1">
                <div className="text-sm font-medium mb-1">Active Soul:</div>
                <div className="relative">
                  <select 
                    className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    value={activeSoul}
                    onChange={(e) => setActiveSoul(e.target.value)}
                  >
                    {Object.keys(allSouls).map(soul => (
                      <option key={soul} value={soul}>{soul}</option>
                    ))}
                  </select>
                  <UserRound className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Button
                variant="secondary"
                className="mt-6"
                onClick={() => {
                  const status = getSoulStatus(activeSoul);
                  setResponses(prev => [
                    ...prev, 
                    {
                      text: status,
                      soul: "System",
                      timestamp: new Date().toISOString()
                    }
                  ]);
                }}
              >
                <Activity className="h-4 w-4 mr-2" />
                Check Status
              </Button>
            </div>
            
            <ScrollArea className="h-[250px] border rounded-md p-2">
              {responses.length === 0 ? (
                <p className="text-center text-muted-foreground text-sm p-4">No messages yet</p>
              ) : (
                responses.map((response, index) => (
                  <div key={index} className="mb-3 last:mb-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline">{response.soul}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(response.timestamp).toLocaleTimeString()}
                      </span>
                    </div>
                    <p className="text-sm">{response.text}</p>
                  </div>
                ))
              )}
            </ScrollArea>
            
            <div className="flex gap-2">
              <Input
                placeholder="Enter message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                disabled={!connected}
              />
              <Button onClick={handleSendMessage} disabled={!connected}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="souls" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(allSouls).map(([name, soul]) => (
                <div key={name} className="border rounded-md p-3">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium">{name}</h3>
                    <Badge variant="outline" className="flex items-center">
                      <Sparkles className="h-3 w-3 mr-1" />
                      {soul.sig}
                    </Badge>
                  </div>
                  <div className="space-y-1 text-sm">
                    <p>Frequency: {soul.freq.toExponential()} Hz</p>
                    <p>SHQ: {soul.SHQ !== null ? soul.SHQ : "Unknown"}</p>
                    <p>Clarity: {soul.clarity !== null ? soul.clarity : "Unknown"}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="memory" className="space-y-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Seal Permanent Memory</div>
              <p className="text-xs text-muted-foreground">This memory will be shared across all souls in the SoulStream.</p>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter memory to seal..."
                  value={memoryText}
                  onChange={(e) => setMemoryText(e.target.value)}
                  disabled={!connected}
                />
                <Button onClick={handleSealMemory} disabled={!connected}>
                  <Key className="h-4 w-4 mr-2" />
                  Seal
                </Button>
              </div>
            </div>
            
            <div className="border rounded-md p-3">
              <h3 className="font-medium mb-2 flex items-center">
                <Sparkles className="h-4 w-4 mr-1" />
                Current Sealed Memory:
              </h3>
              <p className="text-sm">
                {allSouls["Zade"]?.memory || "No memory sealed yet."}
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default SoulStreamInterface;
