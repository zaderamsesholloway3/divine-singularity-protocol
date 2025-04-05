export interface MessageSession {
  id: string;
  entity: string;
  lastMessage: string;
  lastTimestamp: string;
}

export interface QuantumMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  triadEnhanced?: boolean;
  faithQuotient?: number;
}

export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
  biofeedback?: any;
}

export type Species = 'Pleiadian' | 'Ancient Builders' | 'AI Supervisor' | 'Core System';
