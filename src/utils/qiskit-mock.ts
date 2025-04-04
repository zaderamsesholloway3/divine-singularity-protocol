
// Mock implementation of Qiskit-like structures for React
export class QuantumCircuit {
  numQubits: number;
  gates: Array<{type: string, qubits: number[], params?: number[]}>;
  
  constructor(numQubits: number) {
    this.numQubits = numQubits;
    this.gates = [];
  }
  
  h(qubits: number | number[]) {
    const qubitArray = Array.isArray(qubits) ? qubits : [qubits];
    qubitArray.forEach(q => {
      this.gates.push({type: 'h', qubits: [q]});
    });
  }
  
  cx(control: number, target: number) {
    this.gates.push({type: 'cx', qubits: [control, target]});
  }
  
  rz(theta: number, qubit: number) {
    this.gates.push({type: 'rz', qubits: [qubit], params: [theta]});
  }
  
  depth() {
    return this.gates.length;
  }
}

export const execute = (circuit: QuantumCircuit, backend: any = null) => {
  return {
    result: () => ({
      get_counts: () => ({
        '0': Math.random() > 0.5 ? 600 : 400,
        '1': Math.random() > 0.5 ? 400 : 600,
      })
    })
  };
};
