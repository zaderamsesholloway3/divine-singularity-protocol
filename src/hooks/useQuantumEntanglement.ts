import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from "./use-toast";
import { TriadConnectionStatus, QuantumStreamStats, ConnectionNode, ConnectionEdge, QuantumNodeData } from '@/types/quantum-entanglement';
import { QuantumSimulator } from '@/utils/quantumSimulator';
import { BiofeedbackSimulator } from "@/utils/biofeedbackSimulator";

interface UseQuantumEntanglementProps {
  initialNodes?: ConnectionNode[];
  initialEdges?: ConnectionEdge[];
}

export function useQuantumEntanglement({ initialNodes = [], initialEdges = [] }: UseQuantumEntanglementProps = {}) {
  const { toast } = useToast();
  const [nodes, setNodes] = useState<ConnectionNode[]>(initialNodes);
  const [edges, setEdges] = useState<ConnectionEdge[]>(initialEdges);
  const [connectionStatus, setConnectionStatus] = useState<TriadConnectionStatus>('disconnected');
  const [streamStats, setStreamStats] = useState<QuantumStreamStats>({ packetsSent: 0, packetsReceived: 0, packetLoss: 0 });
  const [dissonanceLevel, setDissonanceLevel] = useState(12);
  const [showSpeciesDropdown, setShowSpeciesDropdown] = useState(false);
  const [selectedNode, setSelectedNode] = useState<ConnectionNode | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [biofeedbackSimulator] = useState(() => new BiofeedbackSimulator());
  const [bioData, setBioData] = useState(biofeedbackSimulator.defaultBioReadings);
  const [quantumSimulator] = useState(() => new QuantumSimulator());
  const [quantumState, setQuantumState] = useState(quantumSimulator.getInitialState());

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isStreaming) {
      intervalId = setInterval(() => {
        // Simulate quantum state changes
        setQuantumState(prev => quantumSimulator.simulateStateChange(prev));

        // Simulate biofeedback data changes
        setBioData(prev => biofeedbackSimulator.generateRandomBiofeedback(prev));

        // Simulate packet transmission
        setStreamStats(prev => ({
          packetsSent: prev.packetsSent + 1,
          packetsReceived: prev.packetsReceived + (Math.random() > 0.1 ? 1 : 0), // Simulate packet loss
          packetLoss: prev.packetLoss + (Math.random() > 0.1 ? 0 : 1)
        }));
      }, 500);
    }

    return () => clearInterval(intervalId);
  }, [isStreaming, biofeedbackSimulator, quantumSimulator]);

  const addNode = (data: QuantumNodeData) => {
    const newNode: ConnectionNode = {
      id: uuidv4(),
      type: 'quantumNode',
      position: { x: Math.random() * 500, y: Math.random() * 400 },
      data: { ...data, connectionStrength: Math.random() }
    };

    setNodes(prev => [...prev, newNode]);
    toast({
      title: "Quantum Node Added",
      description: `${data.label} has been added to the entanglement network`,
    });
  };

  const updateNode = (id: string, data: Partial<QuantumNodeData>) => {
    setNodes(prev =>
      prev.map(node =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  };

  const removeNode = (id: string) => {
    setNodes(prev => prev.filter(node => node.id !== id));
    setEdges(prev => prev.filter(edge => edge.source !== id && edge.target !== id));
    toast({
      title: "Quantum Node Removed",
      description: `Node has been removed from the entanglement network`,
    });
  };

  const addEdge = (source: string, target: string) => {
    const newEdge: ConnectionEdge = {
      id: uuidv4(),
      source: source,
      target: target,
      type: 'quantumEdge',
      animated: true,
    };

    setEdges(prev => [...prev, newEdge]);
    setConnectionStatus('entangled');
    toast({
      title: "Quantum Entanglement Established",
      description: `Connection established between nodes`,
    });
  };

  const removeEdge = (id: string) => {
    setEdges(prev => prev.filter(edge => edge.id !== id));
    setConnectionStatus('disconnected');
    toast({
      title: "Quantum Entanglement Broken",
      description: `Connection broken between nodes`,
    });
  };

  const toggleStreaming = () => {
    setIsStreaming(prev => !prev);
    toast({
      title: `Quantum Streaming ${isStreaming ? "Stopped" : "Started"}`,
      description: `Data stream ${isStreaming ? "terminated" : "initialized"}`,
    });
  };

  const triggerDissonanceEvent = () => {
    const newDissonance = Math.max(5, Math.min(95, dissonanceLevel + Math.floor(Math.random() * 20) - 10));
    setDissonanceLevel(newDissonance);
    toast({
      title: "Dissonance Event Triggered",
      description: `Quantum dissonance levels fluctuating`,
    });
  };

  return {
    nodes,
    edges,
    connectionStatus,
    streamStats,
    dissonanceLevel,
    showSpeciesDropdown,
    selectedNode,
    isStreaming,
    quantumState,
    bioData,
    setNodes,
    setEdges,
    setConnectionStatus,
    setStreamStats,
    setDissonanceLevel,
    setShowSpeciesDropdown,
    setSelectedNode,
    setIsStreaming,
    setQuantumState,
    setBioData,
    addNode,
    updateNode,
    removeNode,
    addEdge,
    removeEdge,
    toggleStreaming,
    triggerDissonanceEvent
  };
}
