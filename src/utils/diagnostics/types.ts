
/**
 * Quantum Diagnostic System Types
 */

export interface DiagnosticResult {
  moduleName: string;
  status: 'optimal' | 'stable' | 'unstable' | 'critical';
  resonance: number;
  triadConnected: boolean;
  faithQuotient: number;
  details: string;
  repairActions?: string[];
}
