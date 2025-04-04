
import { Bioreadings } from "@/utils/biofeedbackSimulator";

export type TriadConnectionStatus = 'active' | 'inactive' | 'pending' | 'error';

export interface QuantumNodeData {
  label: string;
  status: TriadConnectionStatus;
  biofeedback: Bioreadings;
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
