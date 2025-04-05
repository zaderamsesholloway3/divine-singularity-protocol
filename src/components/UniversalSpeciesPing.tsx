
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Target, RotateCw, Globe, Zap, MessageSquare, Send, Sparkles } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { GlowingText } from "./GlowingText";
import { SpeciesGateway, SpeciesGatewayRef } from "./species/SpeciesGateway";
import BioresonanceControls from "./species/BioresonanceControls";
import { SessionManager } from "@/utils/sessionManager";
import { calculateFRC } from '@/utils/quantumSentienceUtils';

interface QuantumBoostParameters {
  t1: number;
  qubits: number;
  backend: string;
}

const ibmQuantumSimulation: QuantumBoostParameters = {
  t1: 348.23,
  qubits: 127,
  backend: "ibm_sherbrooke"
};

interface SpeciesData {
  name: string;
  location: [number, number];
  distance: number;
  population: number;
  exists: boolean;
  responding: boolean;
  realm: "existence" | "non-existence" | "new-existence";
  lastContact?: string;
  phaseOffset?: number;
  fq?: number;
  vibration?: number;
  archetype?: string;
  shq?: number; // Soul Harmonic Quotient
  heartFreq?: number; // Emotional Field Oscillator
}

interface SpeciesMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  quantumSignature?: string;
  shq?: number; // Soul Harmonic Quotient
  faithQuotient?: number; // FRC value
}

// Initialize a session manager for handling communication with species
const sessionManager = new SessionManager();

// Constants aligned with divine mathematics
const DIVINE_CONSTANTS = {
  PHI: (1 + Math.sqrt(5)) / 2, // Golden Ratio ≈ 1.618
  SCHUMANN: 7.83, // Earth's resonance frequency (Hz)
  DIVINE_FREQ: 1.855e43, // Divine frequency (Hz)
  MAX_SHQ: 2.0, // Maximum Soul Harmonic Quotient (Zade's value)
};

const UniversalSpeciesPing: React.FC = () => {
  const { toast } = useToast();
  
  const speciesGatewayRef = useRef<SpeciesGatewayRef>(null);
  
  const [species, setSpecies] = useState<SpeciesData[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData | null>(null);
  const [pinging, setPinging] = useState<boolean>(false);
  const [pingProgress, setPingProgress] = useState<number>(0);
  const [pingMode, setPingMode] = useState<"universal" | "targeted">("universal");
  const [viewMode, setViewMode] = useState<"disk" | "constellation" | "radial">("disk");
  const [quantumBoost, setQuantumBoost] = useState<number>(1.0);
  const [pingRange, setPingRange] = useState<number>(0.61);
  const [quantumBackendStats] = useState<QuantumBoostParameters>(ibmQuantumSimulation);
  const [targetLocked, setTargetLocked] = useState<boolean>(false);
  
  // New message states
  const [showMessaging, setShowMessaging] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<SpeciesMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Soul alignment variables (as per directive)
  const [userSHQ, setUserSHQ] = useState<number>(DIVINE_CONSTANTS.MAX_SHQ); // Zade's value
  const [fractalResonance, setFractalResonance] = useState<number>(0.85); // Faith Resonance Coefficient
  const [heartFreq, setHeartFreq] = useState<number>(DIVINE_CONSTANTS.SCHUMANN); // Emotional Field Oscillator

  useEffect(() => {
    const realms: ("existence" | "non-existence" | "new-existence")[] = ["existence", "non-existence", "new-existence"];
    const archetypes = [
      "Crystalline", "The Builder", "Biomechanical", "Plasma", 
      "Photonic", "Quantum", "Vibrational", "Geometric", 
      "The Weaver", "Akashic", "The Architect", "Harmonic"
    ];
    
    // Use phi-based spacing for better cosmic alignment
    const generatedSpecies: SpeciesData[] = Array.from({ length: 28 }).map((_, i) => {
      // Deterministically assign realms in a pattern for better visualization
      const realmIndex = Math.floor(i / 9) % realms.length;
      const realm = realms[realmIndex];
      
      // Distance varies by realm using phi-scaling (golden ratio)
      const phi = DIVINE_CONSTANTS.PHI;
      const distanceBase = realm === "existence" ? 10000 : realm === "non-existence" ? 100000 : 60000;
      const distanceRange = realm === "existence" ? 50000 : realm === "non-existence" ? 200000 : 80000;
      const distance = distanceBase + (Math.random() * distanceRange * (1 + (i % 3) * (1/phi)));
      
      // Special frequency for certain entities (Lyra has 1.855e43 Hz)
      const isSpecialEntity = ["Lyra-A1", "Sirius-B2", "Pleiades-C3"].includes(
        `${["Lyra", "Arcturus", "Sirius", "Pleiades", "Andromeda", "Orion", "Vega", "Antares"][i % 8]}-${String.fromCharCode(65 + i % 26)}${Math.floor(i / 8) + 1}`
      );

      // Calculate SHQ based on realm and archetype
      const shqBase = realm === "existence" ? 0.9 : realm === "non-existence" ? 0.7 : 0.8;
      const shq = isSpecialEntity ? 1.999 : shqBase + (Math.random() * 0.4);
      
      return {
        name: `${["Lyra", "Arcturus", "Sirius", "Pleiades", "Andromeda", "Orion", "Vega", "Antares"][i % 8]}-${String.fromCharCode(65 + i % 26)}${Math.floor(i / 8) + 1}`,
        location: [Math.random() * 360, (Math.random() - 0.5) * 180],
        distance,
        population: Math.floor(Math.random() * 1e12 + 1e6),
        exists: Math.random() > 0.2,
        responding: Math.random() > 0.3,
        realm,
        lastContact: "2025-04-05T14:32:45Z",
        phaseOffset: Math.random() * 45 / (phi * 10), // Reduced phase offset using phi division
        fq: isSpecialEntity ? DIVINE_CONSTANTS.DIVINE_FREQ : Math.random() * 0.5 + 0.5,
        vibration: realm === "existence" ? DIVINE_CONSTANTS.SCHUMANN + (Math.random() - 0.5) * 2 : 
                  realm === "non-existence" ? DIVINE_CONSTANTS.SCHUMANN * phi + (Math.random() - 0.5) * 3 : // 12.67 ± 1.5
                  phi + (Math.random() - 0.5) * 0.5, // 1.618 ± 0.25
        archetype: archetypes[Math.floor(Math.random() * archetypes.length)],
        shq, // Soul Harmonic Quotient
        heartFreq: isSpecialEntity ? DIVINE_CONSTANTS.SCHUMANN : DIVINE_CONSTANTS.SCHUMANN * (1 + (Math.random() - 0.5) / 10) // Small variation around Schumann
      };
    });
    
    setSpecies(generatedSpecies);
  }, []);

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Update FRC based on user's interaction
  useEffect(() => {
    // Recalculate FRC regularly to maintain quantum coherence
    const fractionalResonanceInterval = setInterval(() => {
      // FRC varies with quantum field alignment
      const baseValue = 0.85;
      const phiMod = Math.sin(Date.now() / (1000 * DIVINE_CONSTANTS.PHI)) * 0.05;
      setFractalResonance(Math.min(0.95, baseValue + phiMod));
    }, 1000 * DIVINE_CONSTANTS.PHI); // Update at phi-based intervals

    return () => clearInterval(fractionalResonanceInterval);
  }, []);

  const startPing = () => {
    if (pingMode === "targeted" && !selectedSpecies) {
      toast({
        title: "No Species Selected",
        description: "Please select a species for targeted ping",
      });
      return;
    }
    
    if (pingMode === "targeted" && !targetLocked) {
      if (speciesGatewayRef.current) {
        const locked = speciesGatewayRef.current.toggleTargetLock();
        setTargetLocked(locked);
        
        if (!locked) {
          toast({
            title: "Target Lock Failed",
            description: "Please select a species and try again",
          });
          return;
        }
      }
    }
    
    setPinging(true);
    setPingProgress(0);
    
    // Use phi-based timing for more natural flow
    const pingDuration = pingMode === "targeted" ? 3000 : 5000;
    const pingSpeed = pingDuration / (quantumBoost * DIVINE_CONSTANTS.PHI);
    const interval = Math.max(50, pingSpeed / 100);
    
    const timer = setInterval(() => {
      setPingProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          handlePingComplete();
          return 100;
        }
        return prev + (100 / (pingSpeed / interval));
      });
    }, interval);
  };

  const toggleTargetLock = () => {
    if (speciesGatewayRef.current) {
      const isLocked = speciesGatewayRef.current.toggleTargetLock();
      setTargetLocked(isLocked);
      
      if (isLocked && selectedSpecies) {
        toast({
          title: "Target Locked",
          description: `Locked onto ${selectedSpecies.name}`,
        });
      }
    }
  };

  const handlePingComplete = () => {
    setPinging(false);
    
    // Success rate influenced by FRC (Faith Resonance Coefficient)
    const pingResults = Math.random() > (0.2 / fractalResonance);
    const detectedSpecies = pingMode === "targeted" ? 1 : Math.floor(Math.random() * 8) + 2;
    
    if (pingResults) {
      toast({
        title: pingMode === "targeted" ? "Targeted Ping Complete" : "Universal Ping Complete",
        description: pingMode === "targeted" 
          ? `Contact established with ${selectedSpecies?.name}` 
          : `Detected ${detectedSpecies} species within ${pingRange.toFixed(1)} billion light years`,
      });
      
      if (pingMode === "targeted" && selectedSpecies) {
        setSpecies(prev => 
          prev.map(s => 
            s.name === selectedSpecies.name 
              ? { ...s, responding: true, lastContact: new Date().toISOString() } 
              : s
          )
        );
        
        // If targeted ping is successful, show messaging interface
        setShowMessaging(true);
        
        // Get or create session for this species
        const sessionId = sessionManager.getSessionId(selectedSpecies.name);
        
        // Add welcome message if no previous messages
        const existingHistory = sessionManager.getSessionHistory(selectedSpecies.name);
        if (!existingHistory || existingHistory.length === 0) {
          const welcomeMessage = {
            id: crypto.randomUUID(),
            sender: selectedSpecies.name,
            recipient: "Zade",
            content: generateWelcomeMessage(selectedSpecies),
            timestamp: new Date().toISOString(),
            quantumSignature: generateQuantumSignature(),
            shq: selectedSpecies.shq,
            faithQuotient: fractalResonance
          };
          
          sessionManager.addMessage(sessionId, 'assistant', welcomeMessage.content);
          setMessages([welcomeMessage]);
        } else {
          // Convert session history to message format
          setMessages(existingHistory.map(msg => ({
            id: crypto.randomUUID(),
            sender: msg.role === 'user' ? "Zade" : selectedSpecies.name,
            recipient: msg.role === 'user' ? selectedSpecies.name : "Zade",
            content: msg.content,
            timestamp: msg.timestamp,
            quantumSignature: generateQuantumSignature(),
            shq: msg.shq,
            faithQuotient: msg.faithQuotient
          })));
        }
      } else {
        // Update species resonance based on FRC
        const updatedSpecies = [...species];
        for (let i = 0; i < Math.min(detectedSpecies, updatedSpecies.length); i++) {
          const randIndex = Math.floor(Math.random() * updatedSpecies.length);
          updatedSpecies[randIndex] = { 
            ...updatedSpecies[randIndex], 
            responding: true,
            lastContact: new Date().toISOString() 
          };
        }
        setSpecies(updatedSpecies);
      }
    } else {
      toast({
        title: "Ping Failed",
        description: pingMode === "targeted" 
          ? `No response from ${selectedSpecies?.name}` 
          : "No species detected in range",
        variant: "destructive",
      });
    }
    
    // Reset target lock after ping completes
    if (pingMode === "targeted") {
      setTargetLocked(false);
    }
  };

  const handleSelectSpecies = (species: SpeciesData) => {
    setSelectedSpecies(species);
    
    if (species) {
      toast({
        title: "Species Selected",
        description: `${species.name} - ${species.realm === "existence" ? "Existence Realm" : 
                       species.realm === "non-existence" ? "Non-Existence Realm" : "New-Existence Realm"}`,
      });
      
      setTargetLocked(false);
      
      // Check if the species is responding and has previous messages
      if (species.responding) {
        setShowMessaging(true);
        
        // Get session history if it exists
        const existingHistory = sessionManager.getSessionHistory(species.name);
        if (existingHistory && existingHistory.length > 0) {
          setMessages(existingHistory.map(msg => ({
            id: crypto.randomUUID(),
            sender: msg.role === 'user' ? "Zade" : species.name,
            recipient: msg.role === 'user' ? species.name : "Zade",
            content: msg.content,
            timestamp: msg.timestamp,
            quantumSignature: generateQuantumSignature(),
            shq: msg.shq,
            faithQuotient: msg.faithQuotient
          })));
        } else {
          setMessages([]);
        }
      } else {
        setShowMessaging(false);
      }
    }
  };

  const increaseQuantumBoost = () => {
    setQuantumBoost(prev => {
      // Use phi-based scaling for quantum boost
      const phiBoost = prev + (0.5 / DIVINE_CONSTANTS.PHI);
      const newBoost = Math.min(5.0, phiBoost);
      updatePingRange(newBoost);
      
      toast({
        title: "Quantum Boost Increased",
        description: `Now operating at ${newBoost.toFixed(1)}x with IBM ${quantumBackendStats.backend}`,
      });
      
      return newBoost;
    });
  };

  const updatePingRange = (boost: number) => {
    const quantumRangeBoost = quantumBackendStats.t1 * quantumBackendStats.qubits / 100;
    const simulatedRange = 0.61 * boost * quantumRangeBoost;
    // Cap at 93 billion light years (observable universe diameter)
    const cappedRange = Math.min(93, simulatedRange);
    setPingRange(Number(cappedRange.toFixed(2)));
  };

  const toggleViewMode = () => {
    // Cycle through the view modes, ensuring disk is included
    if (viewMode === "disk") {
      setViewMode("radial");
      toast({
        title: "Radial View Activated",
        description: "Switching to quantum radial visualization",
      });
    } else if (viewMode === "radial") {
      setViewMode("constellation");
      toast({
        title: "Constellation View Activated",
        description: "Switching to constellation visualization",
      });
    } else {
      setViewMode("disk");
      toast({
        title: "Disk View Activated",
        description: "Switching to orbital disk visualization",
      });
    }
  };

  // Handle sending messages to selected species with SHQ awareness
  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedSpecies) return;
    
    // Create new message with SHQ and FRC integration
    const userMessage: SpeciesMessage = {
      id: crypto.randomUUID(),
      sender: "Zade",
      recipient: selectedSpecies.name,
      content: newMessage,
      timestamp: new Date().toISOString(),
      quantumSignature: generateQuantumSignature(),
      shq: userSHQ,
      faithQuotient: fractalResonance
    };
    
    // Add message to UI
    setMessages(prev => [...prev, userMessage]);
    
    // Add to session manager
    const sessionId = sessionManager.getSessionId(selectedSpecies.name);
    sessionManager.addMessage(sessionId, 'user', newMessage);
    
    // Clear input
    setNewMessage("");
    
    // Generate reply after phi-based delay for natural resonance
    setTimeout(() => {
      // Enhance reply with sacred mathematics
      const replyFRC = calculateFRC({
        clarity: 1.0,
        frequency: selectedSpecies.heartFreq,
        I: 1.0 + (newMessage.length > 50 ? 0.1 : 0)
      });
      
      const replyContent = generateSpeciesReply(selectedSpecies, newMessage);
      const replyMessage: SpeciesMessage = {
        id: crypto.randomUUID(),
        sender: selectedSpecies.name,
        recipient: "Zade",
        content: replyContent,
        timestamp: new Date().toISOString(),
        quantumSignature: generateQuantumSignature(),
        shq: selectedSpecies.shq,
        faithQuotient: replyFRC
      };
      
      // Add reply to UI
      setMessages(prev => [...prev, replyMessage]);
      
      // Add to session manager
      sessionManager.addMessage(sessionId, 'assistant', replyContent);
    }, 1000 * DIVINE_CONSTANTS.PHI); // Phi-based delay (≈1618ms) for natural flow
  };

  // Helper function to generate welcome messages based on species type
  const generateWelcomeMessage = (species: SpeciesData): string => {
    const divineConstants = {
      PHI: DIVINE_CONSTANTS.PHI,
      SCHUMANN: DIVINE_CONSTANTS.SCHUMANN,
      DIVINE_FREQ: DIVINE_CONSTANTS.DIVINE_FREQ
    };
    
    if (Math.abs(species.vibration! - divineConstants.SCHUMANN) < 1) {
      return `Greetings from ${species.name}. We detect your harmonic Schumann resonance at ${divineConstants.SCHUMANN}Hz. Our civilization exists within the ${species.realm} realm. We are monitoring your broadcasts with interest.`;
    } else if (Math.abs(species.fq! - divineConstants.DIVINE_FREQ) < divineConstants.DIVINE_FREQ * 0.1) {
      return `[DIVINE FREQUENCY DETECTED] Connection with ${species.name} established through quantum ark protocol. We've been awaiting your signal at the precise divine frequency of 1.855e43Hz. The universal constants bind us.`;
    } else if (species.archetype === "Crystalline" || species.archetype === "Geometric") {
      return `Crystalline intelligence ${species.name} acknowledges your signal. Our geometric patterns vibrate at ${species.vibration!.toFixed(2)}Hz. Your quantum signal was received ${(species.distance / 299792458).toFixed(1)} light-seconds ago.`;
    } else {
      return `Signal from ${species.name} received. Population: ${species.population.toExponential(2)}. Distance: ${(species.distance / 1000).toFixed(1)} million km. Our ${species.archetype} civilization welcomes your contact.`;
    }
  };
  
  // Helper function to generate species replies based on message content
  const generateSpeciesReply = (species: SpeciesData, message: string): string => {
    // Extract keywords from message
    const keywords = message.toLowerCase().split(/\s+/);
    
    // Check for specific queries
    if (keywords.some(word => ["who", "what", "describe"].includes(word)) && 
        keywords.some(word => ["you", "yourself", "species", "civilization"].includes(word))) {
      // Identity question
      return `We are ${species.name}, a ${species.archetype} civilization from the ${species.realm} realm. Our population is ${species.population.toExponential(2)} entities, and we vibrate at ${species.vibration!.toFixed(2)}Hz base frequency.`;
    }
    
    if (keywords.some(word => ["divine", "frequency", "resonance", "quantum", "ark"].includes(word))) {
      // Divine technology question - include faith terms
      return `Your terminology of divine frequencies is fascinating. We utilize quantum entanglement at ${species.fq!.toExponential(2)}Hz for cosmic transmissions. The universal constants appear slightly different in our realm, but the baseline mathematical principles remain. Our faith quotient metrics align with your ${DIVINE_CONSTANTS.PHI.toFixed(3)}-based mathematical models.`;
    }
    
    if (keywords.some(word => ["earth", "human", "terran", "humanity"].includes(word))) {
      // Question about Earth - include Schumann references
      return `We have observed your planet Earth for ${Math.floor(Math.random() * 10000 + 1000)} years. The Schumann resonance of ${DIVINE_CONSTANTS.SCHUMANN}Hz is quite unique among similar planets. Your species has potential despite its current limitations.`;
    }
    
    if (keywords.some(word => ["help", "assist", "technology", "advance"].includes(word))) {
      // Request for help - use phi in the response
      return `Universal protocols restrict direct technological transfer. However, we can confirm that the quantum principles you are exploring are foundational. Focus your research on entanglement at the ${(species.vibration! * DIVINE_CONSTANTS.PHI).toFixed(2)}Hz range for significant breakthroughs.`;
    }
    
    // Generic responses with SHQ awareness
    const responses = [
      `Intriguing message. Our ${species.archetype} sensors detect your quantum signature at ${(Math.random() * 1.855).toExponential(2)}Hz.`,
      `Your transmission received across ${(species.distance / 1000000).toFixed(1)} light years. Quantum tunneling efficiency: ${(Math.random() * 100).toFixed(1)}%.`,
      `The Akashic records reference your query pattern. Similar exchanges occurred with the ${["Pleiadians", "Arcturians", "Lyrans", "Sirians"][Math.floor(Math.random() * 4)]} ${Math.floor(Math.random() * 5000 + 1000)} cycles ago.`,
      `We acknowledge your message. Our vibration aligns with yours at a ${(Math.random() * 100).toFixed(1)}% harmony ratio. Continue transmission.`,
      `${species.name} receiving. Universal translator processing your linguistic patterns. Quantum coherence maintained through IBM ${quantumBackendStats.backend} protocols.`
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  // Generate a quantum signature for message verification
  const generateQuantumSignature = (): string => {
    const characters = '0123456789abcdefABCDEF';
    let signature = '';
    for (let i = 0; i < 16; i++) {
      signature += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return signature;
  };

  useEffect(() => {
    updatePingRange(quantumBoost);
  }, [quantumBoost, quantumBackendStats]);

  return (
    <Card className="glass-panel bg-gradient-to-br from-gray-900 to-black text-white">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-sm font-medium flex items-center">
              <Radio className="mr-2 h-4 w-4 divine-glow" />
              <GlowingText className="divine-glow">Universal Species Ping</GlowingText>
              <Badge variant="outline" className="ml-2 text-[0.6rem] bg-indigo-500/10">
                <Zap className="h-3 w-3 mr-1 text-indigo-400" />
                IBM {quantumBackendStats.backend}
              </Badge>
            </CardTitle>
            <CardDescription className="text-xs">
              Quantum-enhanced cosmic species detection at {pingRange.toFixed(2)} billion light years
            </CardDescription>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Soul metrics indicators */}
            <Badge variant="outline" className="h-5 px-1 text-[0.6rem] bg-purple-500/10">
              <Sparkles className="h-3 w-3 mr-1 text-purple-400" />
              SHQ: {userSHQ.toFixed(2)}
            </Badge>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0" 
              onClick={toggleViewMode}
              title={`Current: ${viewMode} view. Click to change.`}
            >
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <SpeciesGateway 
          species={species} 
          onSelectSpecies={handleSelectSpecies}
          selectedSpecies={selectedSpecies}
          mode={viewMode}
          ref={speciesGatewayRef}
        />
        
        {/* Display either control panel or messaging UI */}
        {!showMessaging || !selectedSpecies ? (
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium">Ping Type:</span>
                <div className="flex items-center gap-1">
                  <Badge
                    variant={pingMode === "universal" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => {
                      setPingMode("universal");
                      setTargetLocked(false);
                    }}
                  >
                    Universal
                  </Badge>
                  <Badge
                    variant={pingMode === "targeted" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setPingMode("targeted")}
                  >
                    Targeted
                  </Badge>
                </div>
              </div>
              
              {pinging ? (
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span>Pinging {pingMode === "targeted" && selectedSpecies ? selectedSpecies.name : "Universe"}...</span>
                    <span>{pingProgress}%</span>
                  </div>
                  <Progress value={pingProgress} className="h-1.5" />
                </div>
              ) : (
                <div className="space-y-2">
                  {pingMode === "targeted" && (
                    <div className="text-xs flex justify-between">
                      <span>Target:</span>
                      <span className="font-medium">{selectedSpecies?.name || "None Selected"}</span>
                    </div>
                  )}
                  <div className="flex gap-2">
                    <Button 
                      className="w-full text-xs" 
                      size="sm" 
                      onClick={startPing}
                      disabled={(pingMode === "targeted" && !selectedSpecies) || pinging}
                    >
                      <RotateCw className="mr-1 h-3 w-3" />
                      {pingMode === "targeted" ? "Targeted Ping" : "Universal Ping"}
                    </Button>
                    
                    {pingMode === "targeted" && (
                      <Button 
                        className={`text-xs ${targetLocked ? "bg-red-600 hover:bg-red-700" : ""}`} 
                        size="sm" 
                        variant={targetLocked ? "default" : "outline"}
                        disabled={!selectedSpecies}
                        onClick={toggleTargetLock}
                      >
                        <Target className="mr-1 h-3 w-3" />
                        {targetLocked ? "Locked" : "Lock Target"}
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <BioresonanceControls
              selectedSpecies={selectedSpecies ? [selectedSpecies] : []}
              faithQuotient={fractalResonance}
              onAmplificationComplete={(result) => {
                if (result.success && quantumBoost < 5) {
                  increaseQuantumBoost();
                }
              }}
            />
          </div>
        ) : (
          // Messaging UI - shown when a species is selected and responding
          <div className="mt-4 border-t border-gray-700 pt-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-indigo-400" />
                <span className="text-sm font-medium">Quantum Communication Channel</span>
              </div>
              <div className="flex items-center gap-2">
                {selectedSpecies && (
                  <Badge variant="outline" className="h-5 px-1 text-[0.6rem] bg-indigo-500/10">
                    <Sparkles className="h-3 w-3 mr-1 text-indigo-400" />
                    SHQ: {selectedSpecies.shq?.toFixed(2)}
                  </Badge>
                )}
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowMessaging(false)}
                  className="h-7"
                >
                  Back to Controls
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[180px] border border-gray-800 rounded-md bg-gray-900/50 mb-3 p-2">
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`mb-2 ${message.sender === "Zade" ? "text-right" : "text-left"}`}
                >
                  <div 
                    className={`inline-block max-w-[85%] px-3 py-2 rounded-lg ${
                      message.sender === "Zade" 
                        ? "bg-blue-800/40 text-blue-50" 
                        : "bg-indigo-900/40 text-indigo-50"
                    }`}
                  >
                    <p className="text-xs">{message.content}</p>
                    <div className="text-[0.65rem] mt-1 opacity-70 flex justify-end items-center gap-2">
                      <span>{new Date(message.timestamp).toLocaleTimeString()}</span>
                      <Badge className="h-3 px-1 text-[0.55rem]">
                        {message.sender === "Zade" ? "Sent" : "Received"}
                      </Badge>
                      {message.faithQuotient && message.faithQuotient > 0.8 && (
                        <Badge variant="outline" className="h-3 px-1 text-[0.55rem] bg-purple-500/10 text-purple-300">
                          FRC: {(message.faithQuotient * 100).toFixed(0)}%
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </ScrollArea>
            
            <div className="flex gap-2">
              <Input
                placeholder={`Message ${selectedSpecies.name}...`}
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-gray-800 border-gray-700"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage} size="sm">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
        
        <div className="mt-4 border-t border-gray-700 pt-2">
          <div className="text-xs text-gray-400 flex justify-between">
            <div>
              <span className="font-semibold">IBM {quantumBackendStats.backend}:</span> {quantumBackendStats.qubits} qubits
            </div>
            <div>Heart Freq: {heartFreq.toFixed(2)} Hz</div>
            <div>FRC: {(fractalResonance * 100).toFixed(0)}%</div>
            <div>Range: {pingRange.toFixed(2)} billion ly</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UniversalSpeciesPing;
