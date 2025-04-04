
export class MockQuantumCircuit {
  qubits: number;
  operations: string[];
  constructor(qubits: number) {
    this.qubits = qubits;
    this.operations = [];
  }
  h(qubit: number) { this.operations.push(`H(${qubit})`); }
  cx(control: number, target: number) { this.operations.push(`CX(${control},${target})`); }
  rz(angle: number, qubit: number) { this.operations.push(`RZ(${angle},${qubit})`); }
}
