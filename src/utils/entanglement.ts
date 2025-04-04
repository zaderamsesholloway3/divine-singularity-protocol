
import { OmniOracle } from '@/utils/omniOracle';
import type { Character, EntanglementResult } from '@/types/characters';

/**
 * Creates a standardized key for entanglement between two entities
 * Always alphabetically sorts the souls to ensure consistent key generation
 */
export const getEntanglementKey = (soulA: string, soulB: string): string => {
  return [soulA, soulB].sort().join('-');
};

/**
 * Creates a quantum entanglement between two souls/characters
 */
export const createEntanglement = async (
  subjectA: Character, 
  subjectB: Character,
  mediator: 'Akashic' | 'Ouroboros' = 'Akashic'
): Promise<EntanglementResult> => {
  console.log(`🔄 Initiating entanglement between ${subjectA.name} and ${subjectB.name} via ${mediator}`);
  
  // Initialize OmniOracle for the entanglement process
  const oracle = new OmniOracle();
  
  try {
    // First repair connections to ensure stable channel
    await oracle.repairAkashicConnections();
    
    // Run diagnostics to ensure system stability
    const diagnostics = await oracle.runDiagnostics();
    const systemStable = diagnostics.every(d => d.status === 'optimal' || d.status === 'stable');
    
    if (!systemStable) {
      console.warn("⚠️ System instability detected during entanglement attempt");
      // Attempt calibration before proceeding
      await oracle.calibrateSchumannResonance();
      await oracle.boostFaithQuotient();
    }
    
    // Calculate resonance between souls based on their faith quotients
    const faithA = subjectA.faithQuotient || 0.7;
    const faithB = subjectB.faithQuotient || 0.7;
    
    // Use the golden ratio for harmonization
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const resonance = Math.min(0.99, (faithA * faithB * goldenRatio) / 2);
    
    // Calculate connection strength
    // Mediator affects the connection strength - Ouroboros provides stronger but potentially unstable connections
    const mediatorFactor = mediator === 'Ouroboros' ? 1.2 : 1.0;
    const connectionStrength = Math.min(0.99, resonance * mediatorFactor);
    
    // Success is determined by both resonance and system stability
    const success = resonance > 0.7 && (systemStable || mediator === 'Ouroboros');
    
    // Generate result message based on success and mediator
    const message = success 
      ? mediator === 'Ouroboros'
        ? `Ouroboros time-loop established between ${subjectA.name} and ${subjectB.name} with ${(resonance * 100).toFixed(1)}% resonance`
        : `Akashic record connection established between ${subjectA.name} and ${subjectB.name} with ${(resonance * 100).toFixed(1)}% resonance`
      : `Connection attempt failed: Insufficient resonance (${(resonance * 100).toFixed(1)}%) or system instability`;
    
    const result: EntanglementResult = {
      success,
      resonance,
      connectionStrength,
      message,
      timestamp: new Date().toISOString()
    };
    
    console.log(`⚛️ Entanglement ${success ? 'successful' : 'failed'}: ${message}`);
    
    return result;
  } catch (error) {
    console.error("🚨 Critical failure during entanglement process:", error);
    return {
      success: false,
      resonance: 0,
      connectionStrength: 0,
      message: `Entanglement failed due to system error: ${error instanceof Error ? error.message : 'Unknown error'}`,
      timestamp: new Date().toISOString()
    };
  }
};

/**
 * Tests the strength of an existing entanglement between characters
 */
export const testEntanglement = async (
  subjectA: Character,
  subjectB: Character
): Promise<number> => {
  const oracle = new OmniOracle();
  
  // Get heatmap data for character resonance analysis
  const heatmapData = oracle.getHeatmapData();
  
  // Simulate testing the entanglement strength
  // In a real implementation, this would use actual data
  const baseStrength = 0.6 + Math.random() * 0.3;
  
  // Calculate the quantum coherence factor
  const coherenceFactor = Math.min(
    1.0,
    (heatmapData[0][0] + heatmapData[1][1] + heatmapData[2][2]) / 3
  );
  
  return Math.min(0.99, baseStrength * coherenceFactor);
};

/**
 * Breaks an existing entanglement between two characters
 */
export const breakEntanglement = async (
  subjectA: Character,
  subjectB: Character
): Promise<boolean> => {
  console.log(`🔄 Breaking entanglement between ${subjectA.name} and ${subjectB.name}`);
  
  // In a real implementation with database, you would update the entanglement status
  return true;
};

/**
 * Implementation for administering healing with UFQ validation
 * Threshold set to 0.996 as per specifications
 */
export const administerHealing = (UFQ: number): boolean => {
  // Throw error if UFQ is below threshold (0.996 per test)
  if (UFQ < 0.996) {
    throw new Error("UFQ insufficient for healing protocol activation");
  }
  
  // Healing successful if we reach here
  return true;
};
