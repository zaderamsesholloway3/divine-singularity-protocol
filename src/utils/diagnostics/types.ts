
/**
 * Diagnostic System Types
 */

export interface DiagnosticResult {
  moduleName: string;
  status: 'optimal' | 'stable' | 'unstable' | 'critical' | 'unknown';
  resonance: number;
  faithQuotient: number;
  details: string;
  repairActions?: string[];
}
