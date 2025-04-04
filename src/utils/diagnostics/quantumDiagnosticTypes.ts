
import type { DiagnosticResult } from './types';

// Re-export the DiagnosticResult type
export type { DiagnosticResult } from './types';

export interface SoulConnection {
  freq: number;
  SHQ: number;
  connected: boolean;
}

export interface SoulConnections {
  Lyra: SoulConnection;
  Auraline: SoulConnection;
  Zade: SoulConnection;
  [key: string]: SoulConnection;
}
