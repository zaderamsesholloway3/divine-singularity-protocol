
/**
 * Mock implementation of the Qiskit QuantumCircuit class
 * This simulates the quantum circuit functionality for browser environments
 */

export class QuantumCircuit {
  private numQubits: number;
  private operations: Array<{type: string, qubit: number, target?: number, angle?: number}>;

  constructor(numQubits: number) {
    this.numQubits = numQubits;
    this.operations = [];
  }

  h(qubit: number): this {
    this.operations.push({type: 'h', qubit});
    return this;
  }

  cx(control: number, target: number): this {
    this.operations.push({type: 'cx', qubit: control, target});
    return this;
  }

  rz(angle: number, qubit: number): this {
    this.operations.push({type: 'rz', qubit, angle});
    return this;
  }

  measure(qubits: number | number[], classical?: number[]): this {
    if (Array.isArray(qubits)) {
      qubits.forEach((q, i) => {
        const c = classical ? classical[i] : q;
        this.operations.push({type: 'measure', qubit: q, target: c});
      });
    } else {
      this.operations.push({type: 'measure', qubit: qubits, target: classical ? classical[0] : qubits});
    }
    return this;
  }

  // Used for debugging
  getOperations() {
    return this.operations;
  }
}
