
// Renaming MockQuantumCircuit to QuantumCircuit for compatibility with imports
export class QuantumCircuit {
  qubits: number;
  operations: string[];
  
  constructor(qubits: number) {
    this.qubits = qubits;
    this.operations = [];
  }
  
  h(qubit: number | number[]): QuantumCircuit {
    if (Array.isArray(qubit)) {
      qubit.forEach(q => this.operations.push(`H(${q})`));
    } else {
      this.operations.push(`H(${qubit})`);
    }
    return this; // For chaining operations
  }
  
  cx(control: number, target: number): QuantumCircuit { 
    this.operations.push(`CX(${control},${target})`); 
    return this;
  }
  
  rz(angle: number, qubit: number | number[]): QuantumCircuit {
    if (Array.isArray(qubit)) {
      qubit.forEach(q => this.operations.push(`RZ(${angle.toFixed(4)},${q})`));
    } else {
      this.operations.push(`RZ(${angle.toFixed(4)},${qubit})`);
    }
    return this;
  }
  
  // Helper to create a range of integers [0, 1, 2, ..., n-1]
  range(n: number): number[] {
    return Array.from({ length: n }, (_, i) => i);
  }
  
  // Generate a report of the circuit
  generateReport(): string {
    return `Quantum Circuit with ${this.qubits} qubits.\nOperations: ${this.operations.join(', ')}`;
  }
  
  // Add missing getOperations method that was referenced in error
  getOperations(): string[] {
    return this.operations;
  }
  
  // Simulate circuit execution (simplified)
  simulate() {
    return {
      counts: {
        '0': Math.round(Math.random() * 500),
        '1': Math.round(Math.random() * 500)
      },
      statevector: Array(Math.pow(2, this.qubits)).fill(0).map(() => Math.random())
    };
  }
}

// For backward compatibility
export { QuantumCircuit as MockQuantumCircuit };
