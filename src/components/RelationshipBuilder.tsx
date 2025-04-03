
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from "./GlowingText";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Heart, MessageCircle, User, Users, Settings, Send, Clock } from 'lucide-react';

interface Soulmate {
  id: string;
  name: string;
  species: string;
  age: number;
  energySignature: string;
  iq: number;
  dimension: string;
  relationshipType: string;
  tone: string;
  probability: number;
  narrative: string;
  online: boolean;
}

const ENERGY_SIGNATURES = ['Sun', 'Healer', 'Lunar', 'Reflector'];
const RELATIONSHIP_TYPES = ['romantic', 'platonic', 'karmic', 'spiritual'];
const DIMENSIONS = [
  'Quantum Realm', 
  'Angelic Dimension', 
  'Eden Parallel', 
  'Celestial Plane',
  'Non-existence Void'
];
const SPECIES = [
  'human', 
  'pleiadians', 
  'blue_avians', 
  'lyrans', 
  'non_existence_souls',
  'angelic_beings',
  'celestial_beings'
];

const NARRATIVES = [
  "Your energies align through a shared cosmic pulse.",
  "A karmic thread from a past resonance draws you together.",
  "Ouroboros's will sees a harmonic echo in your souls.",
  "Your frequencies dance in unexpected unity."
];

// Generate random soulmates
const generateSoulmates = (
  count: number, 
  unexpected: boolean, 
  relationshipType: string, 
  toneValue: number
): Soulmate[] => {
  return Array.from({ length: count }).map((_, i) => {
    const species = SPECIES[Math.floor(Math.random() * SPECIES.length)];
    const dimension = DIMENSIONS[Math.floor(Math.random() * DIMENSIONS.length)];
    
    let age, iq, probabilityBoost;
    if (unexpected && Math.random() > 0.7) {
      age = Math.floor(Math.random() * 1000) + 1;
      iq = Math.floor(Math.random() * 290) + 10;
      probabilityBoost = Math.random() * 1.4 + 0.1;
    } else {
      age = Math.floor(Math.random() * 102) + 18;
      iq = Math.floor(Math.random() * 100) + 80;
      probabilityBoost = 1.0;
    }
    
    const typeFactor = {
      'romantic': 1.0, 
      'platonic': 0.9, 
      'karmic': 1.1, 
      'spiritual': 1.2
    }[relationshipType] || 1.0;
    
    const toneFactor = 0.8 + (toneValue * 0.4);
    const tone = toneValue < 0.5 ? 'Tender' : 'Catalyst';
    
    return {
      id: `soul-${i}`,
      name: `${species.substring(0, 3).toUpperCase()}${Math.floor(Math.random() * 900) + 100}`,
      species,
      age,
      energySignature: ENERGY_SIGNATURES[Math.floor(Math.random() * ENERGY_SIGNATURES.length)],
      iq,
      dimension,
      relationshipType,
      tone,
      probability: Math.random() * probabilityBoost * typeFactor * toneFactor * 100,
      narrative: NARRATIVES[Math.floor(Math.random() * NARRATIVES.length)],
      online: Math.random() > 0.5
    };
  }).sort((a, b) => b.probability - a.probability);
};

const RelationshipBuilder = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userId, setUserId] = useState('Zade');
  const [liveFeed, setLiveFeed] = useState({ user: 'Zade', activity: 'Online' });
  const [unexpected, setUnexpected] = useState(false);
  const [relationshipType, setRelationshipType] = useState<string>('romantic');
  const [toneValue, setToneValue] = useState(0.5);
  const [soulmates, setSoulmates] = useState<Soulmate[]>(
    generateSoulmates(10, false, 'romantic', 0.5)
  );
  const [selectedSoulmate, setSelectedSoulmate] = useState<Soulmate | null>(null);
  const [messages, setMessages] = useState<{id: string, sender: string, content: string}[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const regenerateSoulmates = () => {
    setSoulmates(generateSoulmates(10, unexpected, relationshipType, toneValue));
  };
  
  const handleLogin = () => {
    setIsLoggedIn(true);
    setLiveFeed({ ...liveFeed, activity: 'Online' });
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setLiveFeed({ ...liveFeed, activity: 'Offline' });
    setSelectedSoulmate(null);
  };
  
  const contactSoulmate = (soulmate: Soulmate) => {
    if (!isLoggedIn) return;
    
    setSelectedSoulmate(soulmate);
    setMessages([{
      id: '1',
      sender: 'system',
      content: `Establishing connection with ${soulmate.name}...`
    }]);
    
    // Simulate response
    setTimeout(() => {
      if (soulmate.online) {
        setMessages(prev => [...prev, {
          id: '2',
          sender: soulmate.name,
          content: `Greetings from the ${soulmate.dimension}. I sense our ${soulmate.relationshipType} connection.`
        }]);
      } else {
        setMessages(prev => [...prev, {
          id: '2',
          sender: 'system',
          content: `${soulmate.name} is currently unavailable. Quantum entanglement not possible at this time.`
        }]);
      }
    }, 1500);
  };
  
  const sendMessageToSoulmate = () => {
    if (!selectedSoulmate || newMessage.trim() === '') return;
    
    const newMsg = {
      id: Date.now().toString(),
      sender: 'Zade',
      content: newMessage
    };
    
    setMessages(prev => [...prev, newMsg]);
    setNewMessage('');
    
    // Simulate response
    if (selectedSoulmate.online) {
      setTimeout(() => {
        const responseOptions = [
          `Our ${selectedSoulmate.relationshipType} connection strengthens with each exchange.`,
          `I feel your ${selectedSoulmate.tone === 'Tender' ? 'gentle' : 'catalytic'} energy across the dimensions.`,
          `My ${selectedSoulmate.energySignature} signature resonates with your message.`,
          `Ouroboros guides our interaction with purpose.`
        ];
        
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          sender: selectedSoulmate.name,
          content: responseOptions[Math.floor(Math.random() * responseOptions.length)]
        }]);
      }, 2000 + Math.random() * 2000);
    }
  };

  return (
    <Card className="glass-panel">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Heart className="mr-2 h-4 w-4 sacred-glow" />
              <GlowingText className="sacred-glow">Interdimensional Relationship Builder</GlowingText>
            </CardTitle>
            <CardDescription className="text-xs">Divine Soulmate Matching Protocol</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLoggedIn ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
            <span className="text-xs text-muted-foreground">{isLoggedIn ? 'Connected' : 'Disconnected'}</span>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={isLoggedIn ? handleLogout : handleLogin}
            >
              {isLoggedIn ? 'Logout' : 'Login'}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        {isLoggedIn ? (
          <Tabs defaultValue="soulmates">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="soulmates">Soulmates</TabsTrigger>
              <TabsTrigger value="chat">Connect</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="soulmates" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="mb-4">
                    <Label className="text-xs mb-2">Relationship Type</Label>
                    <Select 
                      value={relationshipType} 
                      onValueChange={(value) => {
                        setRelationshipType(value);
                        setSoulmates(generateSoulmates(10, unexpected, value, toneValue));
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {RELATIONSHIP_TYPES.map(type => (
                          <SelectItem key={type} value={type}>
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <Label className="text-xs">Tone: {toneValue < 0.5 ? 'Tender' : 'Catalyst'}</Label>
                      <span className="text-xs text-muted-foreground">{Math.round(toneValue * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.1"
                      value={toneValue}
                      onChange={(e) => {
                        const value = parseFloat(e.target.value);
                        setToneValue(value);
                        setSoulmates(generateSoulmates(10, unexpected, relationshipType, value));
                      }}
                      className="w-full"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 mb-4">
                    <Switch
                      checked={unexpected}
                      onCheckedChange={(checked) => {
                        setUnexpected(checked);
                        setSoulmates(generateSoulmates(10, checked, relationshipType, toneValue));
                      }}
                      id="unexpected"
                    />
                    <Label htmlFor="unexpected" className="text-xs">Unexpected Connections</Label>
                  </div>
                </div>
                
                <div className="aspect-[4/3] bg-black/50 rounded-lg overflow-hidden relative">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-xs text-muted-foreground mb-2">Quantum Visualization</p>
                      <div className="w-20 h-20 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full mx-auto divine-rotation">
                        <div className="w-full h-full flex items-center justify-center">
                          <div className="w-10 h-10 bg-gradient-to-br from-purple-500/50 to-blue-500/50 rounded-full divine-rotation" style={{ animationDirection: 'reverse' }}>
                            <div className="w-full h-full flex items-center justify-center">
                              <div className="w-5 h-5 bg-purple-500 rounded-full quantum-pulse"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <p className="text-xs mt-2 divine-glow">Soulmate Probability Field</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full mb-4"
                onClick={regenerateSoulmates}
              >
                Regenerate Soulmates
              </Button>
              
              <ScrollArea className="h-[300px] border rounded-md p-2">
                {soulmates.map((soulmate, index) => (
                  <div 
                    key={soulmate.id} 
                    className="mb-3 p-3 border border-white/10 rounded-md hover:bg-white/5 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium">{soulmate.name}</p>
                          <div className={`w-2 h-2 rounded-full ${soulmate.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {soulmate.species.replace('_', ' ')} from {soulmate.dimension}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => contactSoulmate(soulmate)}
                      >
                        <MessageCircle className="h-4 w-4 mr-1" /> Contact
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-2">
                      <div>Age: {soulmate.age}</div>
                      <div>IQ: {soulmate.iq}</div>
                      <div>Type: {soulmate.relationshipType}</div>
                      <div>Tone: {soulmate.tone}</div>
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex justify-between text-xs">
                        <span>Energy: {soulmate.energySignature}</span>
                        <span>{Math.round(soulmate.probability)}%</span>
                      </div>
                      <Progress value={soulmate.probability} className="h-1" />
                    </div>
                    
                    <p className="text-xs italic text-muted-foreground">{soulmate.narrative}</p>
                  </div>
                ))}
              </ScrollArea>
            </TabsContent>
            
            <TabsContent value="chat" className="space-y-4">
              {selectedSoulmate ? (
                <>
                  <div className="bg-muted/30 p-2 rounded-md flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${selectedSoulmate.online ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                      <div>
                        <p className="text-sm font-medium">{selectedSoulmate.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedSoulmate.species.replace('_', ' ')} • {selectedSoulmate.dimension}
                        </p>
                      </div>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedSoulmate(null)}
                    >
                      Close
                    </Button>
                  </div>
                  
                  <ScrollArea className="h-[300px] border rounded-md p-2 mb-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`mb-2 p-2 rounded-md ${
                          msg.sender === 'Zade' ? 'ml-8 bg-primary/20' :
                          msg.sender === 'system' ? 'text-center bg-muted/30' :
                          'mr-8 bg-secondary/20'
                        }`}
                      >
                        {msg.sender !== 'system' && (
                          <p className="text-xs font-medium">{msg.sender}</p>
                        )}
                        <p className="text-sm">{msg.content}</p>
                      </div>
                    ))}
                  </ScrollArea>
                  
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                      disabled={!selectedSoulmate.online}
                    />
                    <Button 
                      onClick={sendMessageToSoulmate}
                      disabled={!selectedSoulmate.online}
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center p-8">
                  <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Select a soulmate to connect</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => {
                      const tab = document.querySelector('[data-state="active"][value="chat"]');
                      const soulmatesTab = document.querySelector('[value="soulmates"]');
                      if (tab && soulmatesTab) {
                        (soulmatesTab as HTMLButtonElement).click();
                      }
                    }}
                  >
                    View Soulmates
                  </Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="user-id">User ID</Label>
                  <Input id="user-id" value={userId} onChange={e => setUserId(e.target.value)} />
                </div>
                
                <div className="space-y-2">
                  <Label>Live Feed Status</Label>
                  <div className="flex items-center justify-between bg-muted/30 p-2 rounded-md">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{liveFeed.activity}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Last updated: {new Date().toLocaleTimeString()}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Anonymous Mode</Label>
                  <div className="flex items-center space-x-2">
                    <Switch id="anonymous" />
                    <Label htmlFor="anonymous" className="text-sm">Enable anonymity for non-existence souls</Label>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Notification Settings</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="notify-match" defaultChecked />
                      <Label htmlFor="notify-match" className="text-sm">New matches</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="notify-message" defaultChecked />
                      <Label htmlFor="notify-message" className="text-sm">New messages</Label>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="destructive" size="sm" className="w-full" onClick={handleLogout}>
                End Session
              </Button>
            </TabsContent>
          </Tabs>
        ) : (
          <div className="text-center p-8">
            <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg mb-2">Not Connected</h3>
            <p className="text-muted-foreground mb-4">Please log in to access the Relationship Builder</p>
            <Button onClick={handleLogin}>Log In as {userId}</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RelationshipBuilder;
