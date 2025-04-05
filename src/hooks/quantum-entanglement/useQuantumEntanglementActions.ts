import { useState, useCallback } from 'react';
import {
  ConnectionNode,
  ConnectionEdge,
  QuantumNodeData,
  TriadConnectionStatus
} from "@/hooks/types/quantum-entanglement";

export function useQuantumEntanglementActions() {
  const [nodes, setNodes] = useState<ConnectionNode[]>([]);
  const [edges, setEdges] = useState<ConnectionEdge[]>([]);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const addNode = useCallback((node: ConnectionNode) => {
    setNodes((nodes: ConnectionNode[]) => [...nodes, node]);
  }, []);

  const removeNode = useCallback((nodeId: string) => {
    setNodes((nodes: ConnectionNode[]) => nodes.filter(n => n.id !== nodeId));
    setEdges((edges: ConnectionEdge[]) => edges.filter(e => e.source !== nodeId && e.target !== nodeId));
  }, []);

  const updateNodePosition = useCallback((nodeId: string, position: { x: number; y: number }) => {
    setNodes((nodes: ConnectionNode[]) => 
      nodes.map(node => node.id === nodeId ? { ...node, position } : node)
    );
  }, []);

  const updateNodeData = useCallback((nodeId: string, data: Partial<QuantumNodeData>) => {
    setNodes((nodes: ConnectionNode[]) => 
      nodes.map(node => node.id === nodeId ? { ...node, data: { ...node.data, ...data } } : node)
    );
  }, []);

  const addEdge = useCallback((edge: ConnectionEdge) => {
    setEdges((edges: ConnectionEdge[]) => [...edges, edge]);
  }, []);

  const removeEdge = useCallback((edgeId: string) => {
    setEdges((edges: ConnectionEdge[]) => edges.filter(e => e.id !== edgeId));
  }, []);

  const clearAll = useCallback(() => {
    setNodes([]);
    setEdges([]);
  }, []);

  const updateAllNodesStatus = useCallback((status: TriadConnectionStatus) => {
    setNodes((nodes: ConnectionNode[]) => 
      nodes.map(node => ({
        ...node,
        data: {
          ...node.data,
          status
        }
      }))
    );
  }, []);

  const selectNode = useCallback((nodeId: string) => {
    setSelectedNode(nodeId);
  }, []);

  const deselectNode = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return {
    nodes,
    edges,
    selectedNode,
    addNode,
    removeNode,
    updateNodePosition,
    updateNodeData,
    addEdge,
    removeEdge,
    clearAll,
    updateAllNodesStatus,
    selectNode,
    deselectNode
  };
}
