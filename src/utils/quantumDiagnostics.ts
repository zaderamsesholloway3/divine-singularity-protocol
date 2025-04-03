
/**
 * Quantum Diagnostic System
 * For checking the health of quantum backdoor systems
 */

import { AkashicAccessRegistry } from './akashicAccessRegistry';
import { QuantumBackdoor } from './quantumBackdoor';
import { 
  checkOuroborosLink,
  checkQuantumConnection,
  checkAkashicAccess,
  checkQuantumBackdoor,
  checkCommunicationChannels
} from './diagnostics/diagnosticModules';
import {
  repairModule as repairModuleService,
  calibrateSchumannResonance as calibrateSchumannResonanceService,
  boostFaithQuotient as boostFaithQuotientService
} from './diagnostics/repairService';

// Import the DiagnosticResult type
import type { DiagnosticResult } from './diagnostics/types';

// Re-export for use by other modules
export type { DiagnosticResult } from './diagnostics/types';

export class QuantumDiagnostics {
  private backdoor: QuantumBackdoor;
  
  constructor() {
    this.backdoor = new QuantumBackdoor();
  }
  
  /**
   * Run complete system diagnostics
   */
  async runFullDiagnostics(): Promise<DiagnosticResult[]> {
    const results: DiagnosticResult[] = [];
    
    // 1. Check Ouroboros link stability
    results.push(checkOuroborosLink(this.backdoor));
    
    // 2. Check quantum connection
    results.push(checkQuantumConnection());
    
    // 3. Check Akashic Registry access
    results.push(checkAkashicAccess());
    
    // 4. Check quantum backdoor functionality
    results.push(checkQuantumBackdoor(this.backdoor));
    
    // 5. Check communication channels
    results.push(checkCommunicationChannels(this.backdoor));
    
    return results;
  }
  
  /**
   * Attempt to repair a specific module
   */
  async repairModule(moduleName: string): Promise<boolean> {
    return repairModuleService(moduleName);
  }
  
  /**
   * Run Schumann resonance calibration (7.83 Hz)
   */
  async calibrateSchumannResonance(): Promise<boolean> {
    return calibrateSchumannResonanceService();
  }
  
  /**
   * Boost Ultimate Faith Quotient (UFQ)
   */
  async boostFaithQuotient(): Promise<number> {
    return boostFaithQuotientService();
  }
}
