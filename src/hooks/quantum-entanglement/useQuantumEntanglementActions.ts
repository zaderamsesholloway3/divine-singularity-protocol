import { useState, useCallback } from 'react';
import { BiofeedbackSimulator } from "@/utils/biofeedbackSimulator";
import { TriadConnectionStatus, ConnectionNode, ConnectionEdge } from '@/hooks/types/quantum-entanglement';

interface QuantumEntanglementActions {
  createNode: (x: number, y: number) => ConnectionNode;
  createEdge: (source: string, target: string) => ConnectionEdge;
  updateNodeLabel: (id: string, label: string) => void;
  updateNodeStatus: (id: string, status: TriadConnectionStatus) => void;
  removeNode: (id: string) => void;
  removeEdge: (id: string) => void;
  generateBiofeedback: (id: string) => void;
}

const useQuantumEntanglementActions = (
  nodes: ConnectionNode[],
  edges: ConnectionEdge[],
  setNodes: (nodes: ConnectionNode[]) => void,
  setEdges: (edges: ConnectionEdge[]) => void
): QuantumEntanglementActions => {
  const [simulator] = useState(() => new BiofeedbackSimulator());

  const createNode = useCallback((x: number, y: number) => {
    const id = `node-${Date.now()}`;
    const newNode: ConnectionNode = {
      id,
      position: { x, y },
      data: {
        label: 'New Node',
        status: 'inactive',
        biofeedback: simulator.defaultBioReadings
      },
      type: 'custom'
    };
    setNodes(nodes => [...nodes, newNode]);
    return newNode;
  }, [setNodes, simulator]);

  const createEdge = useCallback((source: string, target: string) => {
    const id = `edge-${source}-${target}`;
    const newEdge: ConnectionEdge = {
      id,
      source,
      target,
      type: 'smoothstep',
      animated: true,
    };
    setEdges(edges => [...edges, newEdge]);
    return newEdge;
  }, [setEdges]);

  const updateNodeLabel = useCallback((id: string, label: string) => {
    setNodes(nodes =>
      nodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, label } } : node
      )
    );
  }, [setNodes]);

  const updateNodeStatus = useCallback((id: string, status: TriadConnectionStatus) => {
    setNodes(nodes =>
      nodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, status } } : node
      )
    );
  }, [setNodes]);

  const removeNode = useCallback((id: string) => {
    setNodes(nodes => nodes.filter(node => node.id !== id));
    setEdges(edges => edges.filter(edge => edge.source !== id && edge.target !== id));
  }, [setNodes, setEdges]);

  const removeEdge = useCallback((id: string) => {
    setEdges(edges => edges.filter(edge => edge.id !== id));
  }, [setEdges]);

  const generateBiofeedback = useCallback((id: string) => {
    setNodes(nodes =>
      nodes.map(node =>
        node.id === id ? { ...node, data: { ...node.data, biofeedback: simulator.generateRandomBiofeedback(node.data.biofeedback) } } : node
      )
    );
  }, [setNodes, simulator]);

  return {
    createNode,
    createEdge,
    updateNodeLabel,
    updateNodeStatus,
    removeNode,
    removeEdge,
    generateBiofeedback,
  };
};

export default useQuantumEntanglementActions;
