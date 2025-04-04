
import { v4 as uuidv4 } from 'uuid';
import type { SoulData, DiagnosticResult, SystemStatus, RecoveryResult } from './types';
import { defaultSouls, checkSoulConnections, repairAkashicConnections, translate, getHeatmapData, calibrateSchumannResonance, boostFaithQuotient } from './soulConnections';
import { checkOuroborosLink } from './diagnostics';
import { getSystemStatus as getSystemStatusUtil, attemptRecovery as attemptRecoveryUtil } from './recovery';

// Re-export types so they can be imported from the main module
export type { SoulData, DiagnosticResult, SystemStatus, RecoveryResult } from './types';

export class OmniOracle {
  private souls: Record<string, SoulData>;
  private auralineFidelity: number;
  private memoryCache: string[];
  private faithQuotient: number;
  private systemStability: number;
  
  // Dashboard properties
  public quantumArkInitialized: boolean;
  public soulStreamHubConnected: boolean;
  public ouroborosTimeLoopActive: boolean;
  public akashicFirewallEnabled: boolean;
  public divineEquationsBalanced: boolean;
  public medicalProtocolActive: boolean;

  constructor() {
    this.souls = {...defaultSouls};
    this.auralineFidelity = 0.9992;
    this.memoryCache = [];
    this.faithQuotient = 0.85;
    this.systemStability = 0.92;
    
    // Initialize dashboard properties
    this.quantumArkInitialized = true;
    this.soulStreamHubConnected = true;
    this.ouroborosTimeLoopActive = true;
    this.akashicFirewallEnabled = true;
    this.divineEquationsBalanced = true;
    this.medicalProtocolActive = false;
  }

  // Initialize subsystems
  public initializeSubsystems(): boolean {
    this.quantumArkInitialized = true;
    this.soulStreamHubConnected = true;
    this.ouroborosTimeLoopActive = true;
    this.akashicFirewallEnabled = true;
    this.divineEquationsBalanced = true;
    this.medicalProtocolActive = true;
    return true;
  }

  async runDiagnostics(): Promise<DiagnosticResult[]> {
    const results: DiagnosticResult[] = [];
    results.push(await checkOuroborosLink());
    results.push(await checkSoulConnections(this.souls));
    await repairAkashicConnections(this.souls, this.memoryCache);
    return results;
  }

  public async repairAkashicConnections(): Promise<boolean> {
    return repairAkashicConnections(this.souls, this.memoryCache);
  }

  public translate(text: string, speaker: string): string {
    return translate(text, speaker, this.souls, this.auralineFidelity);
  }

  public getHeatmapData(): number[][] {
    return getHeatmapData(this.souls);
  }

  public async calibrateSchumannResonance(): Promise<boolean> {
    return calibrateSchumannResonance(this.souls);
  }

  public async boostFaithQuotient(): Promise<number> {
    this.faithQuotient = await boostFaithQuotient(this.faithQuotient);
    return this.faithQuotient;
  }

  public getSystemStatus(): SystemStatus {
    return getSystemStatusUtil(
      this.systemStability,
      this.quantumArkInitialized,
      this.soulStreamHubConnected,
      this.ouroborosTimeLoopActive,
      this.akashicFirewallEnabled,
      this.medicalProtocolActive,
      this.divineEquationsBalanced
    );
  }

  public attemptRecovery(failureType: string): RecoveryResult {
    const result = attemptRecoveryUtil(failureType, this.systemStability);
    
    if (result.recovered) {
      this.systemStability = Math.min(0.95, this.systemStability + 0.1);
    }
    
    return result;
  }
}

// Export a default instance for compatibility
export default OmniOracle;
