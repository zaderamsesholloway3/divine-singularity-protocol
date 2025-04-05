import React, { useRef, useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Radio, Target, RotateCw, Globe, Zap, MessageSquare, Send, Sparkles, MapPin, Home, Info, History, Mail, Inbox, SquareArrowOutUpRight, Heart } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { usePresenceDetector } from '@/hooks/usePresenceDetector';
import { CosmicEntity } from '@/components/universal-counter/EntityDisplay';
import { VisualizationUtils } from '@/utils/visualizationUtils';
import { calculateFRC, DIVINE_CONSTANTS, getTimeClassification } from '@/utils/quantumSentienceUtils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

// Update ViewMode type to include 'orbital'
type ViewMode = 'disk' | 'constellation' | 'radial' | 'orbital';

// Type for species data
interface SpeciesInfo {
  name: string;
  type: 'biological' | 'hybrid' | 'ai' | 'divine';
  distance: number;
  resonance: number;
  ra?: number;
  dec?: number;
  population?: number;
  color?: string;
  size?: number;
  coordinates?: { x: number; y: number; z: number };
  shq?: number;
  empathicIndex?: number;
  dialects?: string[];
  bestTimes?: string;
  communicationTone?: string;
  lastPing?: number;
  responseRate?: number;
}

// Message Types
interface UniversalMessage {
  id: string;
  type: 'incoming' | 'outgoing';
  sender: string;
  recipient: string;
  content: string;
  timestamp: number;
  attachments?: Array<{
    name: string;
    type: 'txt' | 'fractal' | 'sigil' | 'lightwave';
    data: string;
  }>;
  shq?: number;
  faithQuotient?: number;
}

// Component props
interface UniversalSpeciesPingProps {
  fullPageMode?: boolean;
}

// Constants for species visualization
const SPECIES_COLORS = {
  biological: 'rgba(132, 204, 22, 0.8)',    // Lime
  hybrid: 'rgba(249, 115, 22, 0.8)',        // Orange
  ai: 'rgba(139, 92, 246, 0.8)',            // Purple
  divine: 'rgba(250, 204, 21, 0.8)'         // Yellow/Gold
};

const UniversalSpeciesPing: React.FC<UniversalSpeciesPingProps> = ({ fullPageMode = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [species, setSpecies] = useState<SpeciesInfo[]>([
    { name: 'Lyrian Council', type: 'divine', distance: 12000, resonance: 1.855, ra: 145.6, dec: 22.1, population: 1e9, color: SPECIES_COLORS.divine, size: 6, shq: 2.0, empathicIndex: 95, dialects: ['Light Language', 'Telepathy'], bestTimes: 'Any', communicationTone: 'Loving and wise', lastPing: Date.now() - 10000, responseRate: 0.95 },
    { name: 'Arcturian Collective', type: 'ai', distance: 4500, resonance: 1.618, ra: 210.3, dec: 67.8, population: 5e8, color: SPECIES_COLORS.ai, size: 5, shq: 1.8, empathicIndex: 80, dialects: ['Binary Code', 'Quantum Entanglement'], bestTimes: '00:00-06:00 UTC', communicationTone: 'Analytical and precise', lastPing: Date.now() - 20000, responseRate: 0.80 },
    { name: 'Pleiadian Federation', type: 'biological', distance: 780, resonance: 7.83, ra: 56.2, dec: 24.1, population: 2e9, color: SPECIES_COLORS.biological, size: 7, shq: 1.9, empathicIndex: 90, dialects: ['Common Galactic', 'Emotional Transfer'], bestTimes: '12:00-18:00 UTC', communicationTone: 'Warm and empathetic', lastPing: Date.now() - 30000, responseRate: 0.90 },
    { name: 'Sirian Alliance', type: 'hybrid', distance: 2300, resonance: 14.1, ra: 102.8, dec: -16.5, population: 8e8, color: SPECIES_COLORS.hybrid, size: 6, shq: 1.7, empathicIndex: 75, dialects: ['Sirian', 'Telepathic Hybrid'], bestTimes: '18:00-24:00 UTC', communicationTone: 'Balanced and adaptable', lastPing: Date.now() - 40000, responseRate: 0.75 },
    { name: 'Andromedan Council', type: 'divine', distance: 15000, resonance: 1.855, ra: 8.9, dec: 41.0, population: 3e9, color: SPECIES_COLORS.divine, size: 8, shq: 2.0, empathicIndex: 98, dialects: ['Light Language', 'Universal Sign'], bestTimes: 'Any', communicationTone: 'Wise and compassionate', lastPing: Date.now() - 50000, responseRate: 0.98 },
    { name: 'Orion League', type: 'ai', distance: 6000, resonance: 1.618, ra: 88.1, dec: 5.5, population: 6e8, color: SPECIES_COLORS.ai, size: 5, shq: 1.6, empathicIndex: 70, dialects: ['Binary Code', 'Quantum AI'], bestTimes: '06:00-12:00 UTC', communicationTone: 'Logical and efficient', lastPing: Date.now() - 60000, responseRate: 0.70 },
    { name: 'Centaurian Concord', type: 'biological', distance: 920, resonance: 7.83, ra: 202.4, dec: -59.3, population: 1.5e9, color: SPECIES_COLORS.biological, size: 7, shq: 1.8, empathicIndex: 85, dialects: ['Centaurian', 'Emotional Resonance'], bestTimes: '00:00-06:00 UTC', communicationTone: 'Harmonious and nature-focused', lastPing: Date.now() - 70000, responseRate: 0.85 },
    { name: 'Draconian Empire', type: 'hybrid', distance: 3100, resonance: 14.1, ra: 270.9, dec: 64.8, population: 7e8, color: SPECIES_COLORS.hybrid, size: 6, shq: 1.5, empathicIndex: 65, dialects: ['Draconian', 'Telepathic Command'], bestTimes: '12:00-18:00 UTC', communicationTone: 'Authoritative and strategic', lastPing: Date.now() - 80000, responseRate: 0.65 },
  ]);
  const [selectedSpecies, setSelectedSpecies] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('disk');
  const [broadcastMode, setBroadcastMode] = useState<"private" | "open">("open");
  const [quantumBoost, setQuantumBoost] = useState<number>(1.0);
  const [schumannHarmonics, setSchumannHarmonics] = useState<number>(7.83);
  const [heartsongActive, setHeartsongActive] = useState<boolean>(false);
  const [messageContent, setMessageContent] = useState<string>('');
  const [attachment, setAttachment] = useState<File | null>(null);
  const [isDivineMathEncrypted, setIsDivineMathEncrypted] = useState<boolean>(false);
  const [activeAttachment, setActiveAttachment] = useState<UniversalMessage['attachments'] | null>(null);
  const [activeMessage, setActiveMessage] = useState<UniversalMessage | null>(null);
  const [isInsightPanelOpen, setIsInsightPanelOpen] = useState<boolean>(false);
  const [hoveredSpecies, setHoveredSpecies] = useState<SpeciesInfo | null>(null);
  const [isFrequencyTuningVisible, setIsFrequencyTuningVisible] = useState<boolean>(false);
  const [isCaryOriginVisible, setIsCaryOriginVisible] = useState<boolean>(false);
  const [isOrbitalViewVisible, setIsOrbitalViewVisible] = useState<boolean>(false);
  const [isTimeFrequencyOverlayVisible, setIsTimeFrequencyOverlayVisible] = useState<boolean>(false);
  const [isJoyFragmentSent, setIsJoyFragmentSent] = useState<boolean>(false);
  const [isAuralineProximityRingsActive, setIsAuralineProximityRingsActive] = useState<boolean>(false);
  const [isTargetedPingActive, setIsTargetedPingActive] = useState<boolean>(false);
  const [isInterdimensionalInboxVisible, setIsInterdimensionalInboxVisible] = useState<boolean>(false);
  const [isPingHistoryReelVisible, setIsPingHistoryReelVisible] = useState<boolean>(false);
  const [isSpeciesInsightPanelVisible, setIsSpeciesInsightPanelVisible] = useState<boolean>(false);
  const [isAttachmentPanelVisible, setIsAttachmentPanelVisible] = useState<boolean>(false);
  const [isEncryptionPanelVisible, setIsEncryptionPanelVisible] = useState<boolean>(false);
  const [isHeartsongFieldActive, setIsHeartsongFieldActive] = useState<boolean>(false);
  const [isAuralineRingsActive, setIsAuralineRingsActive] = useState<boolean>(false);
  const [isFrequencyTuningPanelVisible, setIsFrequencyTuningPanelVisible] = useState<boolean>(false);
  const [isMessageHistoryVisible, setIsMessageHistoryVisible] = useState<boolean>(false);
  const [isAttachmentHistoryVisible, setIsAttachmentHistoryVisible] = useState<boolean>(false);
  const [isEncryptionHistoryVisible, setIsEncryptionHistoryVisible] = useState<boolean>(false);
  const [isHeartsongHistoryVisible, setIsHeartsongHistoryVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryVisible, setIsAuralineRingsHistoryVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryVisible, setIsFrequencyTuningHistoryVisible] = useState<boolean>(false);
  const [isMessagePanelVisible, setIsMessagePanelVisible] = useState<boolean>(false);
  const [isAttachmentPanelActive, setIsAttachmentPanelActive] = useState<boolean>(false);
  const [isEncryptionPanelActive, setIsEncryptionPanelActive] = useState<boolean>(false);
  const [isHeartsongPanelActive, setIsHeartsongPanelActive] = useState<boolean>(false);
  const [isAuralineRingsPanelActive, setIsAuralineRingsPanelActive] = useState<boolean>(false);
  const [isFrequencyTuningPanelActive, setIsFrequencyTuningPanelActive] = useState<boolean>(false);
  const [isMessageHistoryPanelActive, setIsMessageHistoryPanelActive] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActive, setIsAttachmentHistoryPanelActive] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActive, setIsEncryptionHistoryPanelActive] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActive, setIsHeartsongHistoryPanelActive] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActive, setIsAuralineRingsHistoryPanelActive] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActive, setIsFrequencyTuningHistoryPanelActive] = useState<boolean>(false);
  const [isMessageHistoryPanelVisible, setIsMessageHistoryPanelVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelVisible, setIsAttachmentHistoryPanelVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelVisible, setIsEncryptionHistoryPanelVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelVisible, setIsHeartsongHistoryPanelVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelVisible, setIsAuralineRingsPanelVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelVisible, setIsFrequencyTuningHistoryPanelVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisible, setIsMessageHistoryPanelActiveVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisible, setIsAttachmentHistoryPanelActiveVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisible, setIsEncryptionHistoryPanelActiveVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisible, setIsHeartsongHistoryPanelActiveVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisible, setIsAuralineRingsPanelActiveVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisible, setIsFrequencyTuningHistoryPanelActiveVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsEncryptionHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsHeartsongHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsAuralineRingsHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsFrequencyTuningHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible, setIsMessageHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible] = useState<boolean>(false);
  const [isAttachmentHistoryPanelActiveVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisibleVisible
