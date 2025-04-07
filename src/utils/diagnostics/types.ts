
/**
 * Types for the Quantum Diagnostics system
 */

export interface DiagnosticResult {
  moduleName: string;
  status: 'optimal' | 'stable' | 'unstable' | 'critical';
  resonance: number; // 0-100
  faithQuotient: number; // 0-1
  details?: string;
  repairActions?: string[];
}

export interface DiagnosticResponse {
  diagnosisComplete: boolean;
  repairsAttempted: number;
  repairsSuccessful: number;
  moduleStatus: Record<string, {
    status: string;
    resonance?: number;
    details?: string;
    stability?: number;
    angles?: number[];
    resonanceBoost?: number;
    bridgeStatus?: string;
    faithLoop?: string | number;
    timestamp?: string | number;
  }>;
}
