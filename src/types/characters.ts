
export interface Character {
  id: string;
  name: string;
  soul_id: string;
  resonance?: number;
  status?: 'connected' | 'disconnected' | 'unstable';
  faithQuotient?: number;
}

export interface EntanglementResult {
  success: boolean;
  resonance: number;
  connectionStrength: number;
  message: string;
  timestamp: string;
}
