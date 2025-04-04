
/**
 * ArkValidator
 * Validates quantum ark construction and operations
 */

import { QuantumCircuit, simulateQuantumCircuit } from '@/utils/qiskit-mock';
import { ArkBuilder } from './ArkBuilder';

export class ArkValidator {
  /**
   * Validate the construction of the quantum ark
   * @returns Validation message
   */
  static validateArkConstruction(): string {
    try {
      // Create an ark circuit using the ArkBuilder
      const qc = ArkBuilder.createArkCircuit();
      
      // Verify basic properties
      if (qc.qubits !== 433) {
        return "INVALID: Ark must contain exactly 433 qubits";
      }
      
      // Validate the circuit operations
      const ops = qc.getOperations();
      const hadamardOps = ops.filter(op => op.name === 'h');
      const cnotOps = ops.filter(op => op.name === 'cx');
      const rzOps = ops.filter(op => op.name === 'rz');
      
      // Check for required gates
      if (hadamardOps.length === 0) {
        return "INVALID: Ark requires Hadamard gates for superposition";
      }
      
      if (rzOps.length === 0) {
        return "INVALID: Ark requires rotation gates for phase alignment";
      }
      
      // Validate PHI resonance in rotation gates
      const PHI = (1 + Math.sqrt(5)) / 2;
      const hasPhiRotation = rzOps.some(op => 
        op.params && (Math.abs(op.params[0] - Math.PI / PHI) < 0.0001)
      );
      
      if (!hasPhiRotation) {
        return "INVALID: Ark requires PHI resonance rotation";
      }
      
      // Run a simulation to check the ark operation
      const simulation = simulateQuantumCircuit(qc);
      if (simulation.probability < 0.7) {
        return `UNSTABLE: Ark stability at ${(simulation.probability * 100).toFixed(1)}%`;
      }
      
      return `VALID: Ark constructed with ${qc.qubits} qubits and PHI resonance`;
      
    } catch (error) {
      return `ERROR: ${error instanceof Error ? error.message : String(error)}`;
    }
  }
  
  /**
   * Run validation tests on the ark circuit
   * @returns Test results with success flag and message
   */
  static runValidationTests(): { success: boolean; message: string; } {
    try {
      // Create an ark circuit
      const qc = ArkBuilder.createArkCircuit();
      
      // Minimum required properties
      const hasCorrectQubits = qc.qubits === 433;
      const operations = qc.getOperations();
      const hasHadamard = operations.some(op => op.name === 'h');
      const hasCX = operations.some(op => op.name === 'cx');
      const hasRZ = operations.some(op => op.name === 'rz');
      
      // Check all requirements
      if (!hasCorrectQubits) {
        return { 
          success: false, 
          message: `Invalid qubit count: ${qc.qubits} (required: 433)` 
        };
      }
      
      if (!hasHadamard || !hasRZ) {
        return { 
          success: false, 
          message: "Missing required quantum gates" 
        };
      }
      
      // Run simulation
      const { probability } = simulateQuantumCircuit(qc);
      
      if (probability < 0.8) {
        return {
          success: false,
          message: `Ark stability too low: ${(probability * 100).toFixed(1)}%`
        };
      }
      
      return {
        success: true,
        message: "All validation tests passed"
      };
      
    } catch (error) {
      return {
        success: false,
        message: `Validation error: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Test ark construction with specific parameters
   * @param stabilityThreshold Minimum required stability threshold (0.0-1.0)
   * @returns Test results
   */
  static test_ark_construction(stabilityThreshold: number = 0.8): { 
    success: boolean; 
    message: string;
    stability?: number;
  } {
    try {
      // Create an ark circuit
      const qc = ArkBuilder.createArkCircuit();
      
      // Run simulation to get stability
      const { probability } = simulateQuantumCircuit(qc);
      
      // Check if stability meets threshold
      const success = probability >= stabilityThreshold;
      
      return {
        success,
        message: success ? 
          `Ark construction successful with ${(probability * 100).toFixed(1)}% stability` :
          `Ark construction failed with ${(probability * 100).toFixed(1)}% stability (threshold: ${(stabilityThreshold * 100).toFixed(1)}%)`,
        stability: probability
      };
      
    } catch (error) {
      return {
        success: false,
        message: `Test error: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
}
