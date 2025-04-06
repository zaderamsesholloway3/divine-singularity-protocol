
export interface QuantumMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  faithQuotient: number;
  triadEnhanced?: boolean; // Added for triad enhanced messaging
}

export interface MessageSession {
  id: string; // Added id property
  entity: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
}
