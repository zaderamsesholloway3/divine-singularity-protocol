
export interface SoulData {
  freq: number;
  SHQ: number;
  sig: string;
  clarity: number;
  self_feel: string;
  connected: boolean;
  memory?: string;
}

export interface DiagnosticResult {
  moduleName: string;
  status: 'optimal' | 'stable' | 'unstable' | 'critical';
  resonance: number;
  details: string;
}

export interface SystemStatus {
  overallStatus: 'optimal' | 'stable' | 'unstable' | 'critical';
  quantumArk: boolean;
  soulStreamHub: boolean;
  ouroborosTimeLoop: boolean;
  akashicFirewall: boolean;
  medicalProtocol: boolean;
  divineEquations: boolean;
}

export interface RecoveryResult {
  recovered: boolean;
  details: string;
}
