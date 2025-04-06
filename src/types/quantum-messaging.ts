
export interface QuantumMessage {
  id: string;
  sender: string;
  recipient: string;
  content: string;
  timestamp: string;
  faithQuotient: number;
}

export interface MessageSession {
  entity: string;
  lastMessage: string;
  lastTimestamp: string;
  unread: number;
}
