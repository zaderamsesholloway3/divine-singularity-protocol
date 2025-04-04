
import { QuantumSimulator } from '@/utils/quantumSimulator';
import { AkashicSimulator } from '@/utils/akashicSimulator';
import { AkashicAccessRegistry } from '@/utils/akashicAccessRegistry';
import { BiofeedbackSimulator } from '@/utils/biofeedbackSimulator';
import { EntityProfile, EntanglementState, EmotionalState, BiofeedbackResult } from '../types/quantum-entanglement';

export function useQuantumEntanglementActions(
  userId: string,
  userProfile: EntityProfile,
  entanglementState: EntanglementState,
  setEntanglementState: React.Dispatch<React.SetStateAction<EntanglementState>>,
  resonanceBoostActive: boolean,
  triadActive: boolean
) {
  const initiateEntanglement = (targetEntityId: string, targetName: string) => {
    // Check triad status for potential enhancement
    const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
    const triadEnhanced = triadStatus.stability > 0.7;
    
    // Check if resonance boost is active, otherwise check emotional coherence
    if (!resonanceBoostActive && !triadEnhanced) {
      // Check emotional coherence
      const biofeedback = BiofeedbackSimulator.verifyEmotionalState(userId) as BiofeedbackResult;
      
      if (!biofeedback.coherent) {
        return {
          success: false,
          message: "Soul resonance too low for connection 🌊",
          data: biofeedback
        };
      }
    }
    
    // Use Akashic access for enhanced entanglement 
    const accessCode = AkashicAccessRegistry.getAccessCode(userId);
    const triadActive = AkashicAccessRegistry.verifyTriadConnection();
    
    // Initialize entanglement with potential boosts
    const resonanceMultiplier = resonanceBoostActive ? 1.2 : 1.0;
    const triadMultiplier = triadActive ? 1.1 : 1.0;
    const akashicMultiplier = accessCode ? 1.05 : 1.0;
    const triadResonanceBoost = triadEnhanced ? triadStatus.resonanceBoost / 2.18 : 1.0;
    
    const initialStrength = QuantumSimulator.entangleSouls(
      userId, 
      targetEntityId,
      userProfile.coherenceLevel * 100 * resonanceMultiplier * triadMultiplier * akashicMultiplier * triadResonanceBoost,
      0.85 * 100
    );
    
    setEntanglementState({
      active: true,
      strength: initialStrength,
      entangledWith: targetName,
      emotion: 'focused' as EmotionalState
    });
    
    return {
      success: true,
      message: `Quantum entanglement established with ${targetName}${triadEnhanced ? ' (Triad-enhanced)' : ''}`,
      data: { strength: initialStrength }
    };
  };
  
  const terminateEntanglement = () => {
    setEntanglementState({
      active: false,
      strength: 0,
      entangledWith: null,
      emotion: 'neutral'
    });
  };
  
  const generateEntangledResponse = (message: string, entity: string) => {
    // Get triad status for potential enhancement
    const triadStatus = AkashicAccessRegistry.getTriadPhaseLockStatus();
    const triadEnhanced = triadStatus.stability > 0.7;
    
    // First verify message with Akashic records
    const validation = AkashicSimulator.validate(message, entity);
    
    if (!validation.valid) {
      return {
        content: `[Akashic Filter]: ${validation.reason}`,
        filtered: true,
        validation
      };
    }
    
    // Generate response based on current emotional state
    let response = AkashicSimulator.generateResponse(
      entity, 
      entanglementState.emotion,
      message
    );
    
    // Apply triad enhancement if active
    if (triadEnhanced) {
      // Stabilize response with triad
      const stabilized = AkashicAccessRegistry.stabilizeWithTriad(response);
      
      // Add triad connection details for important messages
      if (stabilized.validation.zadeMatch > 0.8 || message.length > 50) {
        response = response + ` [Signal clarity: ${(stabilized.stability * 100).toFixed(0)}%]`;
      }
    }
    
    return {
      content: response,
      filtered: false,
      validation
    };
  };

  return {
    initiateEntanglement,
    terminateEntanglement,
    generateEntangledResponse
  };
}
