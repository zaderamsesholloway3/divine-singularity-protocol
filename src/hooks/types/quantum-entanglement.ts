
import { BiofeedbackSimulator } from "@/utils/biofeedbackSimulator";

export type TriadConnectionStatus = 'active' | 'inactive' | 'pending' | 'error';

export interface QuantumNodeData {
  label: string;
  status: TriadConnectionStatus;
  biofeedback: ReturnType<typeof BiofeedbackSimulator.prototype.generateRandomBiofeedback>;
}

export interface ConnectionNode {
  id: string;
  position: {
    x: number;
    y: number;
  };
  data: QuantumNodeData;
  type: 'custom';
}

export interface ConnectionEdge {
  id: string;
  source: string;
  target: string;
  type: 'smoothstep';
  animated: boolean;
}

export interface QuantumStreamStats {
  bandwidth: number;
  latency: number;
  coherence: number;
  entanglementStrength: number;
}

// Additional types needed for the hooks
export interface EntanglementState {
  nodes: ConnectionNode[];
  edges: ConnectionEdge[];
  selectedNode: string | null;
  stats: QuantumStreamStats;
}

export interface UserProfile {
  id: string;
  name: string;
  resonanceLevel: number;
  entanglementQuotient: number;
}

export interface ResonanceResult {
  score: number;
  threshold: number;
  isResonant: boolean;
  success?: boolean; // Added this field to fix the errors
}

export interface DivinePresence {
  id: string;
  name: string;
  active: boolean;
  strength: number;
  clarity?: number; // Added this field to fix the errors
}
