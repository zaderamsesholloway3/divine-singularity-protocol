
/**
 * Mock Qiskit-inspired Quantum Circuit Implementation
 * For frontend simulation of quantum operations without backend dependencies
 */

export class QuantumCircuit {
  private numQubits: number;
  private gates: Array<{
    name: string;
    qubits: number[];
    params?: number[];
  }>;
  
  /**
   * Create a new quantum circuit with specified number of qubits
   * @param numQubits Number of qubits in the circuit
   */
  constructor(numQubits: number) {
    this.numQubits = numQubits;
    this.gates = [];
  }
  
  /**
   * Get number of qubits in the circuit
   */
  get qubits(): number {
    return this.numQubits;
  }
  
  /**
   * Apply Hadamard gate to specified qubits
   * @param qubits Qubit indices (can be single number or array)
   */
  h(qubits: number | number[]): void {
    const qubitArray = Array.isArray(qubits) ? qubits : [qubits];
    qubitArray.forEach(q => {
      if (q >= 0 && q < this.numQubits) {
        this.gates.push({
          name: 'h',
          qubits: [q]
        });
      }
    });
  }
  
  /**
   * Apply controlled-X (CNOT) gate
   * @param control Control qubit index
   * @param target Target qubit index
   */
  cx(control: number, target: number): void {
    if (control >= 0 && control < this.numQubits && 
        target >= 0 && target < this.numQubits) {
      this.gates.push({
        name: 'cx',
        qubits: [control, target]
      });
    }
  }
  
  /**
   * Apply rotation around Z-axis
   * @param angle Rotation angle in radians
   * @param qubit Target qubit index
   */
  rz(angle: number, qubit: number): void {
    if (qubit >= 0 && qubit < this.numQubits) {
      this.gates.push({
        name: 'rz',
        qubits: [qubit],
        params: [angle]
      });
    }
  }
  
  /**
   * Apply rotation around Y-axis
   * @param angle Rotation angle in radians
   * @param qubit Target qubit index
   */
  ry(angle: number, qubit: number): void {
    if (qubit >= 0 && qubit < this.numQubits) {
      this.gates.push({
        name: 'ry',
        qubits: [qubit],
        params: [angle]
      });
    }
  }
  
  /**
   * Apply rotation around X-axis
   * @param angle Rotation angle in radians
   * @param qubit Target qubit index
   */
  rx(angle: number, qubit: number): void {
    if (qubit >= 0 && qubit < this.numQubits) {
      this.gates.push({
        name: 'rx',
        qubits: [qubit],
        params: [angle]
      });
    }
  }
  
  /**
   * Get all operations applied to the circuit
   */
  getOperations(): Array<{
    name: string;
    qubits: number[];
    params?: number[];
  }> {
    return [...this.gates];
  }
  
  /**
   * Convert circuit to a string representation
   */
  toString(): string {
    let result = `QuantumCircuit(${this.numQubits} qubits, ${this.gates.length} gates):\n`;
    this.gates.forEach((gate, i) => {
      const params = gate.params ? 
        `(${gate.params.map(p => p.toFixed(2)).join(', ')})` : '';
      result += `  ${i}: ${gate.name}${params} @ q${gate.qubits.join(', q')}\n`;
    });
    return result;
  }
  
  /**
   * Reset the circuit, removing all gates
   */
  reset(): void {
    this.gates = [];
  }
}

export function simulateQuantumCircuit(circuit: QuantumCircuit): { 
  results: Record<string, number>;
  probability: number;
} {
  // This is a simplified mock simulation
  // In a real quantum system, we would actually simulate the circuit
  
  const operations = circuit.getOperations();
  const hadamardCount = operations.filter(op => op.name === 'h').length;
  const cnotCount = operations.filter(op => op.name === 'cx').length;
  
  // More complex circuits have lower probability of success in our mock
  const complexity = (hadamardCount * 0.1) + (cnotCount * 0.15);
  const probability = Math.max(0.1, 1 - complexity);
  
  // Generate mock measurement results
  const shots = 1024;
  const results: Record<string, number> = {};
  
  // Generate some plausible results based on circuit complexity
  if (hadamardCount > 0) {
    // With Hadamard gates, we expect more superposition
    results['0'] = Math.floor(shots * 0.5);
    results['1'] = shots - results['0'];
  } else {
    // Without Hadamard gates, more deterministic
    results['0'] = Math.floor(shots * 0.9);
    results['1'] = shots - results['0'];
  }
  
  return {
    results,
    probability
  };
}
