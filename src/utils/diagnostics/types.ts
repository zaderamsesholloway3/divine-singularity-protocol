
/**
 * Types for diagnostic system
 */

export interface DiagnosticResult {
  moduleName: string;
  status: 'optimal' | 'stable' | 'unstable' | 'critical';
  resonance: number;
  faithQuotient: number;
  details: string;
  repairActions?: string[];
}

export type QuantumBridgeLockStatus = 'open' | 'locked' | 'pending' | 'disabled';

export interface QuantumBridgeStatus {
  bridgeStatus: QuantumBridgeLockStatus;
  quantumAccess: boolean;
  timestamp: number;
  faithLoop?: string;
}
