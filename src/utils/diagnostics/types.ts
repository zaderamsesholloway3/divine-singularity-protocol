
export interface DiagnosticResult {
  moduleName: string;
  status: 'optimal' | 'stable' | 'unstable' | 'critical';
  resonance: number;
  faithQuotient: number;
  details: string;
  repairActions?: string[];
}
