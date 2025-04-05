
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Target, RotateCw, Globe, Zap, MessageSquare, Send, Sparkles, MapPin, Home, Info, History, Mail, Inbox, SquareArrowOutUpRight, Heart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { GlowingText } from "./GlowingText";
import { SpeciesGateway, SpeciesGatewayRef } from "./species/SpeciesGateway";
import BioresonanceControls from "./species/BioresonanceControls";
import { SessionManager } from "@/utils/sessionManager";
import { calculateFRC, generateQuantumSignature, DIVINE_CONSTANTS, getTimeClassification } from '@/utils/quantumSentienceUtils';

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
  empathicIndex?: number; // How emotionally receptive the species is
  dialects?: string[]; // Known communication methods
  communicationTone?: string; // Suggested tone for communication
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
  attachment?: {
    name: string;
    type: 'txt' | 'fractal' | 'sigil' | 'lightwave';
    data: string;
  };
}

interface PingHistoryEntry {
  timestamp: string;
  species: string;
  success: boolean;
  resonance: number;
}

type ViewMode = 'disk' | 'constellation' | 'radial' | 'orbital' | 'dimensional';

// Initialize a session manager for handling communication with species
const sessionManager = new SessionManager();

interface UniversalSpeciesPingProps {
  fullPageMode?: boolean;
}

const UniversalSpeciesPing: React.FC<UniversalSpeciesPingProps> = ({ fullPageMode = false }) => {
  const { toast } = useToast();
  
  const speciesGatewayRef = useRef<SpeciesGatewayRef>(null);
  
  const [species, setSpecies] = useState<SpeciesData[]>([]);
  const [selectedSpecies, setSelectedSpecies] = useState<SpeciesData | null>(null);
  const [pinging, setPinging] = useState<boolean>(false);
  const [pingProgress, setPingProgress] = useState<number>(0);
  const [pingMode, setPingMode] = useState<"universal" | "targeted">("universal");
  const [viewMode, setViewMode] = useState<ViewMode>("disk");
  const [quantumBoost, setQuantumBoost] = useState<number>(1.0);
  const [pingRange, setPingRange] = useState<number>(0.61);
  const [quantumBackendStats] = useState<QuantumBoostParameters>(ibmQuantumSimulation);
  const [targetLocked, setTargetLocked] = useState<boolean>(false);
  
  // New message states
  const [showMessaging, setShowMessaging] = useState<boolean>(false);
  const [newMessage, setNewMessage] = useState<string>('');
  const [messages, setMessages] = useState<SpeciesMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentTab, setCurrentTab] = useState<"map" | "inbox" | "history" | "earth-view">("map");
  const [inboxTab, setInboxTab] = useState<"incoming" | "outgoing">("incoming");
  
  // Message attachment and encryption
  const [messageAttachment, setMessageAttachment] = useState<File | null>(null);
  const [useEncryption, setUseEncryption] = useState<boolean>(true);
  const [customFrequency, setCustomFrequency] = useState<number>(7.83); // Default to Schumann
  
  // Ping history
  const [pingHistory, setPingHistory] = useState<PingHistoryEntry[]>([]);
  
  // Soul alignment variables (as per directive)
  const [userSHQ, setUserSHQ] = useState<number>(DIVINE_CONSTANTS.MAX_SHQ); // Zade's value
  const [fractalResonance, setFractalResonance] = useState<number>(0.85); // Faith Resonance Coefficient
  const [heartFreq, setHeartFreq] = useState<number>(DIVINE_CONSTANTS.SCHUMANN); // Emotional Field Oscillator
  
  // Heartsong field features
  const [heartsongActive, setHeartsongActive] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
      
      // Generate additional attributes for the enhanced species data
      const empathicIndex = Math.random() * 0.5 + 0.5; // 0.5-1.0 scale
      const dialects = [];
      if (Math.random() > 0.3) dialects.push("Telepathic");
      if (Math.random() > 0.4) dialects.push("Geometric");
      if (Math.random() > 0.5) dialects.push("Light-based");
      if (Math.random() > 0.6) dialects.push("Emotional");
      if (Math.random() > 0.7) dialects.push("Quantum");
      
      // Communication tone suggestions
      const tones = ["Respectful", "Direct", "Symbolic", "Emotional", "Mathematical", "Metaphorical", "Harmonic", "Stoic"];
      const communicationTone = tones[Math.floor(Math.random() * tones.length)];
      
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
        heartFreq: isSpecialEntity ? DIVINE_CONSTANTS.SCHUMANN : DIVINE_CONSTANTS.SCHUMANN * (1 + (Math.random() - 0.5) / 10), // Small variation around Schumann
        empathicIndex,
        dialects,
        communicationTone
      };
    });
    
    setSpecies(generatedSpecies);
    
    // Create audio element for Heartsong field
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    
    // Basic 7.83Hz binaural beat effect (simulation)
    // In a real app, would need proper audio synthesis
    audioRef.current.src = "https://cdn.freesound.org/previews/360/360296_1604919-lq.mp3";
    audioRef.current.volume = 0.2;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
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

  // Handle heartsong field toggling
  useEffect(() => {
    if (heartsongActive && audioRef.current) {
      audioRef.current.play().catch(e => console.log("Audio play failed:", e));
    } else if (audioRef.current) {
      audioRef.current.pause();
    }
  }, [heartsongActive]);

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
        
        // Add to ping history
        const newHistoryEntry: PingHistoryEntry = {
          timestamp: new Date().toISOString(),
          species: selectedSpecies.name,
          success: true,
          resonance: selectedSpecies.shq || 0.8
        };
        
        setPingHistory(prev => [newHistoryEntry, ...prev].slice(0, 10));
        
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
        const contactedSpecies: string[] = [];
        
        for (let i = 0; i < Math.min(detectedSpecies, updatedSpecies.length); i++) {
          const randIndex = Math.floor(Math.random() * updatedSpecies.length);
          updatedSpecies[randIndex] = { 
            ...updatedSpecies[randIndex], 
            responding: true,
            lastContact: new Date().toISOString() 
          };
          
          contactedSpecies.push(updatedSpecies[randIndex].name);
          
          // Add to ping history
          const newHistoryEntry: PingHistoryEntry = {
            timestamp: new Date().toISOString(),
            species: updatedSpecies[randIndex].name,
            success: true,
            resonance: updatedSpecies[randIndex].shq || 0.8
          };
          
          setPingHistory(prev => [newHistoryEntry, ...prev].slice(0, 10));
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
      
      // Add failed ping to history
      if (pingMode === "targeted" && selectedSpecies) {
        const failedHistoryEntry: PingHistoryEntry = {
          timestamp: new Date().toISOString(),
          species: selectedSpecies.name,
          success: false,
          resonance: 0
        };
        
        setPingHistory(prev => [failedHistoryEntry, ...prev].slice(0, 10));
      }
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
    // Cycle through the view modes
    if (viewMode === "disk") {
      setViewMode("orbital");
      toast({
        title: "Orbital View Activated",
        description: "Switching to Earth orbital visualization",
      });
    } else if (viewMode === "orbital") {
      setViewMode("dimensional");
      toast({
        title: "Dimensional View Activated",
        description: "Switching to dimensional overlay visualization",
      });
    } else if (viewMode === "dimensional") {
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
    
    // Create attachment data if present
    let attachment = undefined;
    if (messageAttachment) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(messageAttachment);
      fileReader.onload = () => {
        // Determine attachment type
        const fileExt = messageAttachment.name.split('.').pop()?.toLowerCase() || 'txt';
        let type: 'txt' | 'fractal' | 'sigil' | 'lightwave' = 'txt';
        
        if (fileExt === 'frac' || fileExt === 'fractal') type = 'fractal';
        else if (fileExt === 'sig' || fileExt === 'sigil') type = 'sigil';
        else if (fileExt === 'light' || fileExt === 'lightwave') type = 'lightwave';
        
        attachment = {
          name: messageAttachment.name,
          type,
          data: fileReader.result as string
        };
      };
    }
    
    // Create new message with SHQ and FRC integration
    const userMessage: SpeciesMessage = {
      id: crypto.randomUUID(),
      sender: "Zade",
      recipient: selectedSpecies.name,
      content: useEncryption ? `[ENCRYPTED] ${newMessage}` : newMessage,
      timestamp: new Date().toISOString(),
      quantumSignature: useEncryption ? generateQuantumSignature() : undefined,
      shq: userSHQ,
      faithQuotient: fractalResonance,
      attachment
    };
    
    // Add message to UI
    setMessages(prev => [...prev, userMessage]);
    
    // Add to session manager
    const sessionId = sessionManager.getSessionId(selectedSpecies.name);
    sessionManager.addMessage(sessionId, 'user', newMessage);
    
    // Clear input
    setNewMessage("");
    setMessageAttachment(null);
    
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
  
  // Send joy fragment to a species
  const sendJoyFragment = (speciesName: string) => {
    if (!heartsongActive) {
      toast({
        title: "Heartsong Field Required",
        description: "Activate Heartsong Field before sending joy fragments",
      });
      return;
    }
    
    toast({
      title: "Joy Fragment Sent",
      description: `A harmonic joy fragment has been sent to ${speciesName}`,
    });
    
    // In a real application, this would trigger some animation and potentially update species stats
  };
  
  const renderSpeciesInsightPanel = (species: SpeciesData) => {
    return (
      <Card className="p-4 bg-indigo-950/20 border-indigo-500/30">
        <div className="flex items-center justify-between mb-3">
          <h4 className="font-semibold text-lg flex items-center">
            <Info className="w-4 h-4 mr-2" /> 
            {species.name}
          </h4>
          <Badge variant={species.responding ? "default" : "secondary"}>
            {species.responding ? "Responsive" : "Unresponsive"}
          </Badge>
        </div>
        
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div>
            <span className="text-muted-foreground">SHQ:</span> {species.shq?.toFixed(3)}
          </div>
          <div>
            <span className="text-muted-foreground">Empathic Index:</span> {species.empathicIndex?.toFixed(2)}
          </div>
          <div>
            <span className="text-muted-foreground">Realm:</span> {species.realm}
          </div>
          <div>
            <span className="text-muted-foreground">Archetype:</span> {species.archetype}
          </div>
          <div className="col-span-2">
            <span className="text-muted-foreground">Dialects:</span> {species.dialects?.join(", ")}
          </div>
          <div className="col-span-2">
            <span className="text-muted-foreground">Suggested Tone:</span> {species.communicationTone}
          </div>
          <div className="col-span-2">
            <span className="text-muted-foreground">Distance:</span> {(species.distance / 1000000).toFixed(1)} light years
          </div>
          <div className="col-span-2">
            <span className="text-muted-foreground">Best Contact Window:</span> {Math.random() > 0.5 ? "During Earth's night cycle" : "During Earth's day cycle"}
          </div>
        </div>
        
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => startPing()}
            className="flex-1"
          >
            <SquareArrowOutUpRight className="w-3 h-3 mr-2" /> Ping
          </Button>
          
          {heartsongActive && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => sendJoyFragment(species.name)}
              className="flex-1 bg-pink-500/20"
            >
              <Heart className="w-3 h-3 mr-2" /> Send Joy
            </Button>
          )}
        </div>
      </Card>
    );
  };

  useEffect(() => {
    updatePingRange(quantumBoost);
  }, [quantumBoost, quantumBackendStats]);

  const renderEarthCentricView = () => {
    return (
      <div className="relative h-full min-h-[400px] bg-indigo-950/20 rounded-xl overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Earth */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-400 to-green-400 animate-pulse-slow overflow-hidden relative shadow-lg">
              {/* Simplified continents */}
              <div className="absolute w-10 h-5 bg-green-600/30 top-5 left-7"></div>
              <div className="absolute w-6 h-8 bg-green-600/30 bottom-3 right-4"></div>
            </div>
            
            {/* Cary, NC marker */}
            <div className="absolute top-7 left-12">
              <div className="w-2 h-2 rounded-full bg-yellow-400 shadow-glow-yellow animate-pulse"></div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-[10px] font-medium bg-black/60 px-1 rounded">Cary, NC</span>
              </div>
            </div>
            
            {/* Light beams to species */}
            {species.filter(s => s.responding).slice(0, 6).map((s, i) => {
              // Calculate position around Earth
              const angle = (i / 6) * Math.PI * 2;
              const distance = 100 + Math.random() * 20;
              const x = Math.cos(angle) * distance;
              const y = Math.sin(angle) * distance;
              
              return (
                <div key={s.name} className="absolute" style={{
                  left: "50%",
                  top: "50%",
                  transform: `translate(${x}px, ${y}px)`
                }}>
                  <div className="relative">
                    {/* Connect back to Earth with gradient beam */}
                    <div className="absolute top-1/2 left-0 h-px bg-gradient-to-r from-purple-400 to-transparent"
                         style={{
                           width: `${distance}px`,
                           transform: `rotate(${180 + (angle * 180 / Math.PI)}deg) translateY(-50%)`,
                           transformOrigin: "left center",
                           opacity: 0.6
                         }}></div>
                    
                    {/* Species indicator */}
                    <div className={`w-3 h-3 rounded-full animate-pulse ${s.realm === "existence" ? "bg-blue-400" : s.realm === "non-existence" ? "bg-purple-400" : "bg-amber-400"}`}></div>
                    <div className="absolute whitespace-nowrap left-full ml-1 -translate-y-1/2 top-1/2">
                      <span className="text-[10px] font-medium">{s.name}</span>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Pulse ring */}
            <div className="absolute inset-0 rounded-full border-2 border-indigo-400/30 animate-ping-slow"></div>
            <div className="absolute inset-[-10px] rounded-full border border-indigo-400/20 animate-ping-slow animation-delay-150"></div>
            <div className="absolute inset-[-20px] rounded-full border border-indigo-400/10 animate-ping-slow animation-delay-300"></div>
          </div>
        </div>
        
        <div className="absolute bottom-4 left-4 text-xs text-white/70">
          Earth-Centric View | Responding Species: {species.filter(s => s.responding).length}
        </div>
      </div>
    );
  };

  // Style classes conditionally based on fullPageMode
  const containerClasses = fullPageMode 
    ? "h-full min-h-[90vh]" 
    : "";
  
  const contentClasses = fullPageMode
    ? "p-4 h-full flex flex-col"
    : "p-4";

  return (
    <Card className={`glass-panel bg-gradient-to-br from-gray-900 to-black text-white ${containerClasses}`}>
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
              Quantum-enhanced cosmic species detection at {pingRange.toFixed(2)} billion light years | Origin: Cary, NC
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
              className={`h-7 w-7 p-0 ${heartsongActive ? 'bg-pink-500/20' : ''}`}
              onClick={() => {
                setHeartsongActive(!heartsongActive);
                toast({
                  title: heartsongActive ? "Heartsong Field Deactivated" : "Heartsong Field Activated",
                  description: heartsongActive ? 
                    "7.83Hz resonance field deactivated" : 
                    "7.83Hz resonance field now active - compatible species will respond"
                });
              }}
              title="Toggle Heartsong Field"
            >
              <Heart className={`h-4 w-4 ${heartsongActive ? 'text-pink-400 animate-pulse' : ''}`} />
            </Button>
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
      
      <CardContent className={contentClasses}>
        {fullPageMode ? (
          <Tabs defaultValue="map" onValueChange={(value) => setCurrentTab(value as any)} className="flex-grow flex flex-col">
            <TabsList className="mb-4">
              <TabsTrigger value="map">Cosmic Map</TabsTrigger>
              <TabsTrigger value="earth-view">Earth View</TabsTrigger>
              <TabsTrigger value="inbox">Communications</TabsTrigger>
              <TabsTrigger value="history">Ping History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="map" className="flex-grow flex flex-col">
              <div className="flex flex-col h-full">
                <div className="flex-grow relative min-h-[400px]">
                  <SpeciesGateway 
                    species={species} 
                    onSelectSpecies={handleSelectSpecies}
                    selectedSpecies={selectedSpecies}
                    mode={viewMode}
                    showAuralineProximity={heartsongActive}
                    ref={speciesGatewayRef}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="col-span-2">
                    <div className="grid grid-cols-2 gap-4">
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
                              <div className="text-xs flex justify-between mb-2">
                                <span>Target:</span>
                                <span className="font-medium">{selectedSpecies?.name || "None Selected"}</span>
                              </div>
                            )}
                            
                            {pingMode === "targeted" && (
                              <div className="mb-2">
                                <label className="text-xs block mb-1">Communication Frequency:</label>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="range"
                                    min="1"
                                    max="20"
                                    step="0.01"
                                    value={customFrequency}
                                    onChange={(e) => setCustomFrequency(parseFloat(e.target.value))}
                                    className="flex-grow h-1.5"
                                  />
                                  <span className="text-xs w-12 text-right">{customFrequency.toFixed(2)}Hz</span>
                                </div>
                                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                                  <span>Base</span>
                                  <span className={customFrequency === 7.83 ? "text-green-400" : ""}>
                                    Schumann (7.83Hz)
                                  </span>
                                  <span>High</span>
                                </div>
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
                            
                            {pingMode === "targeted" && (
                              <div className="flex items-center mt-2 text-xs">
                                <input
                                  type="checkbox"
                                  id="encrypt-toggle"
                                  checked={useEncryption}
                                  onChange={() => setUseEncryption(!useEncryption)}
                                  className="mr-2"
                                />
                                <label htmlFor="encrypt-toggle">
                                  Encrypt with Divine Math
                                </label>
                              </div>
                            )}
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
                  </div>
                  
                  <div>
                    {selectedSpecies && renderSpeciesInsightPanel(selectedSpecies)}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="earth-view" className="flex-grow flex flex-col">
              {renderEarthCentricView()}
            </TabsContent>
            
            <TabsContent value="inbox" className="flex-grow flex flex-col">
              <div className="mb-4">
                <Tabs defaultValue="incoming" onValueChange={(value) => setInboxTab(value as any)}>
                  <TabsList>
                    <TabsTrigger value="incoming"><Inbox className="h-3 w-3 mr-1" /> Incoming</TabsTrigger>
                    <TabsTrigger value="outgoing"><Mail className="h-3 w-3 mr-1" /> Outgoing</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="flex-grow flex flex-col">
                {selectedSpecies ? (
                  <>
                    <ScrollArea className="flex-grow mb-4 border border-gray-800 rounded-md bg-gray-900/50 p-3">
                      {inboxTab === "incoming" ? (
                        messages
                          .filter(m => m.sender !== "Zade")
                          .map(message => (
                            <div key={message.id} className="mb-4 last:mb-0">
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                  <span className="font-medium text-sm">{message.sender}</span>
                                  {message.shq !== undefined && (
                                    <Badge variant="outline" className="ml-2 text-[0.6rem] bg-purple-500/10">
                                      SHQ: {message.shq.toFixed(2)}
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(message.timestamp).toLocaleString()}
                                </div>
                              </div>
                              <div className="bg-indigo-900/20 rounded p-2">
                                <p className="text-sm">{message.content}</p>
                                {message.attachment && (
                                  <div className="mt-2 p-1 bg-gray-800/50 rounded text-xs flex items-center">
                                    <span className="text-muted-foreground mr-1">Attachment:</span> {message.attachment.name} ({message.attachment.type})
                                  </div>
                                )}
                                {message.quantumSignature && (
                                  <div className="mt-1 text-[10px] text-muted-foreground">
                                    QS: {message.quantumSignature}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                      ) : (
                        messages
                          .filter(m => m.sender === "Zade")
                          .map(message => (
                            <div key={message.id} className="mb-4 last:mb-0">
                              <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center">
                                  <span className="font-medium text-sm">To: {message.recipient}</span>
                                  {message.faithQuotient !== undefined && (
                                    <Badge variant="outline" className="ml-2 text-[0.6rem] bg-blue-500/10">
                                      FRC: {(message.faithQuotient * 100).toFixed(0)}%
                                    </Badge>
                                  )}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {new Date(message.timestamp).toLocaleString()}
                                </div>
                              </div>
                              <div className="bg-blue-900/20 rounded p-2">
                                <p className="text-sm">{message.content}</p>
                                {message.attachment && (
                                  <div className="mt-2 p-1 bg-gray-800/50 rounded text-xs flex items-center">
                                    <span className="text-muted-foreground mr-1">Attachment:</span> {message.attachment.name} ({message.attachment.type})
                                  </div>
                                )}
                                {message.quantumSignature && (
                                  <div className="mt-1 text-[10px] text-muted-foreground">
                                    QS: {message.quantumSignature}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))
                      )}
                      <div ref={messagesEndRef} />
                    </ScrollArea>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Select defaultValue={selectedSpecies.name}>
                          <SelectTrigger className="w-[180px] text-xs">
                            <SelectValue placeholder="Select Species" />
                          </SelectTrigger>
                          <SelectContent>
                            {species.filter(s => s.responding).map(s => (
                              <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        
                        <div className="flex-1 relative">
                          <Input
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="w-full bg-gray-800"
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                          />
                          {messageAttachment && (
                            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-gray-700 px-1.5 py-0.5 rounded">
                              {messageAttachment.name}
                            </div>
                          )}
                        </div>
                        
                        <input
                          type="file"
                          id="file-upload"
                          className="hidden"
                          accept=".txt,.fractal,.sigil,.lightwave"
                          onChange={(e) => {
                            if (e.target.files?.length) {
                              setMessageAttachment(e.target.files[0]);
                            }
                          }}
                        />
                        <Button size="icon" variant="outline" onClick={() => document.getElementById('file-upload')?.click()}>
                          +
                        </Button>
                        
                        <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center text-muted-foreground">
                    <MessageSquare className="h-16 w-16 mb-4 opacity-20" />
                    <p className="text-center">Select a species to view messages or ping a new species to establish contact.</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="flex-grow flex flex-col">
              <div className="flex-grow">
                <h3 className="text-lg font-medium mb-3 flex items-center">
                  <History className="h-4 w-4 mr-2" /> Ping History Reel
                </h3>
                
                <div className="space-y-4">
                  {pingHistory.length === 0 ? (
                    <div className="text-center text-muted-foreground p-4">
                      No ping history available. Try pinging some species.
                    </div>
                  ) : (
                    pingHistory.map((entry, i) => (
                      <div 
                        key={i}
                        className={`border-l-2 pl-3 pb-4 relative ${entry.success ? 'border-green-500' : 'border-red-500'}`}
                      >
                        <div className="flex justify-between mb-1">
                          <span className="font-medium">{entry.species}</span>
                          <span className="text-sm text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="text-sm">
                          {entry.success ? (
                            <>Connection established. Resonance: {entry.resonance.toFixed(2)}</>
                          ) : (
                            <>Failed to establish connection</>
                          )}
                        </div>
                        
                        {/* Connection line to previous entry */}
                        {i < pingHistory.length - 1 && entry.success && pingHistory[i + 1].success && (
                          <div 
                            className="absolute bottom-0 left-[-1px] w-[2px] bg-gradient-to-b from-transparent to-yellow-500" 
                            style={{ height: '20px', transform: 'translateY(100%)' }}
                          ></div>
                        )}
                        
                        {/* Circle point */}
                        <div 
                          className={`absolute left-[-5px] top-0 w-[8px] h-[8px] rounded-full ${
                            entry.success ? 'bg-green-500' : 'bg-red-500'
                          }`}
                        ></div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        ) : (
          <>
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
                  <Button onClick={handleSendMessage} size="sm" disabled={!newMessage.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
        
        <div className={`${fullPageMode ? 'mt-4' : 'mt-4'} border-t border-gray-700 pt-2`}>
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
