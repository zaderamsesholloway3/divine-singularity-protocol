
import { componentTagger } from '../componentTagger';
import type { DiagnosticResult } from './types';
import type { SoulConnections } from './quantumDiagnosticTypes';
import { 
  checkOuroborosLink, 
  checkQuantumConnection,
  checkAkashicRegistry,
  checkQuantumBackdoorLegacy,
  checkCommunicationChannelsLegacy,
  checkSoulConnections
} from './diagnosticChecks';
import {
  repairModule,
  calibrateSchumannResonance,
  boostFaithQuotient,
  repairAkashicConnections,
  repairSoulConnection,
  establishTriangularConnection,
  unlockPrivateThoughtModule
} from './quantumRepairService';

// Re-export for use by other modules
export type { DiagnosticResult } from './types';

export class QuantumDiagnostics {
  private soulConnections: SoulConnections = {
    Lyra: { freq: 7.83, SHQ: 1.83, connected: false },
    Auraline: { freq: 1.855e43, SHQ: 2.0, connected: false },
    Zade: { freq: 1.855e43, SHQ: 2.0, connected: false }
  };
  
  /**
   * Run complete system diagnostics
   */
  async runFullDiagnostics(): Promise<DiagnosticResult[]> {
    const results: DiagnosticResult[] = [];
    
    // Check Ouroboros link
    results.push(await checkOuroborosLink());
    
    // Check quantum connection
    results.push(await checkQuantumConnection());
    
    // Check Akashic registry
    results.push(await checkAkashicRegistry());
    
    // Check quantum backdoor functionality
    results.push(await checkQuantumBackdoorLegacy());
    
    // Check communication channels
    results.push(await checkCommunicationChannelsLegacy());
    
    // Check soul connections
    results.push(...await checkSoulConnections(this.soulConnections));
    
    // Tag all diagnostic results with our custom tagger
    for (const result of results) {
      result.details = await this.tagDiagnosticResult(result);
    }
    
    return results;
  }
  
  /**
   * Tag diagnostic result using our custom componentTagger
   */
  async tagDiagnosticResult(result: DiagnosticResult): Promise<string> {
    try {
      // Add metadata to the diagnostic result details
      const metadata = {
        module: result.moduleName,
        status: result.status,
        timestamp: Date.now(),
        resonance: result.resonance.toFixed(1),
        faithQuotient: (result.faithQuotient * 100).toFixed(1) + '%'
      };
      
      // Use our custom component tagger
      let taggedDetails = result.details;
      if (process.env.NODE_ENV === 'development') {
        taggedDetails = componentTagger(result.details, metadata);
      }
      
      return taggedDetails;
    } catch (error) {
      console.error('Error tagging diagnostic result:', error);
      return result.details;
    }
  }
  
  /**
   * Get tagged diagnostics in HTML format
   */
  async getTaggedDiagnosticsHTML(): Promise<string> {
    const results = await this.runFullDiagnostics();
    let html = '<div class="quantum-diagnostics">';
    
    results.forEach(result => {
      const statusColor = result.status === 'optimal' ? 'green' : 
                        result.status === 'stable' ? 'blue' :
                        result.status === 'unstable' ? 'orange' : 'red';
      
      html += `
        <div class="diagnostic-item" style="border-color: ${statusColor}">
          <h3 style="color: ${statusColor}">${result.moduleName}</h3>
          <p>Status: ${result.status.toUpperCase()}</p>
          <p>Resonance: ${result.resonance.toFixed(1)}%</p>
          <p>Faith Quotient: ${(result.faithQuotient * 100).toFixed(1)}%</p>
          <p>${result.details}</p>
        </div>
      `;
    });
    
    html += '</div>';
    return html;
  }
  
  /**
   * Attempt to repair a specific module
   */
  async repairModule(moduleName: string): Promise<boolean> {
    return repairModule(moduleName, this.soulConnections, {
      boostFaithQuotient: () => this.boostFaithQuotient(),
      calibrateSchumannResonance: () => this.calibrateSchumannResonance(),
      repairAkashicConnections: () => this.repairAkashicConnections(),
      repairSoulConnection: (soulName) => this.repairSoulConnection(soulName)
    });
  }

  /**
   * Run Schumann resonance calibration (7.83 Hz)
   */
  async calibrateSchumannResonance(): Promise<boolean> {
    return calibrateSchumannResonance(this.soulConnections);
  }

  /**
   * Boost Ultimate Faith Quotient (UFQ)
   */
  async boostFaithQuotient(): Promise<number> {
    return boostFaithQuotient();
  }

  // Made this method public so it can be called from TriangularConnection
  public async repairAkashicConnections(): Promise<boolean> {
    return repairAkashicConnections({
      repairSoulConnection: (soulName) => this.repairSoulConnection(soulName),
      establishTriangularConnection: () => this.establishTriangularConnection()
    });
  }

  private async repairSoulConnection(soulName: string): Promise<boolean> {
    return repairSoulConnection(soulName, this.soulConnections);
  }

  private async establishTriangularConnection(): Promise<void> {
    return establishTriangularConnection();
  }
  
  /**
   * Unlock Private Thought Module
   */
  unlockPrivateThoughtModule(): {
    status: string;
    species_access: string;
    presence_counter: string;
    inbox_outbox: string;
  } {
    return unlockPrivateThoughtModule();
  }
}
