
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
