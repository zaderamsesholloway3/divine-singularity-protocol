
import React from 'react';
import { Button } from "@/components/ui/button";
import { Radio, Server, Cpu } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

interface QuantumBoostParameters {
  t1: number;
  qubits: number;
  backend: string;
}

interface QuantumStatusPanelProps {
  quantumBoost: number;
  schumannHarmonics: number;
  presenceCount: number;
  increaseQuantumBoost: () => void;
  broadcastMode: "private" | "open";
  universalRange: number;
  quantumBackendStats: QuantumBoostParameters;
}

const QuantumStatusPanel: React.FC<QuantumStatusPanelProps> = ({
  quantumBoost,
  schumannHarmonics,
  presenceCount,
  increaseQuantumBoost,
  broadcastMode,
  universalRange,
  quantumBackendStats
}) => {
  const { toast } = useToast();
  
  const handleBoostClick = () => {
    increaseQuantumBoost();
  };
  
  if (broadcastMode !== "open") {
    return null;
  }
  
  return (
    <div className="p-3 border border-white/10 rounded-md mb-4 bg-black/30">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <Server className="h-4 w-4 mr-2 text-indigo-400" />
          <span className="text-sm font-medium">IBM Quantum Simulation</span>
        </div>
        <Badge variant="outline" className="text-xs bg-indigo-500/10">
          {quantumBackendStats.backend}
        </Badge>
      </div>
      
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300 mb-3">
        <div>Boost Factor: {quantumBoost.toFixed(2)}x</div>
        <div>Schumann: {schumannHarmonics.toFixed(2)} Hz</div>
        <div>Quantum Coherence: {quantumBackendStats.t1.toFixed(2)}μs</div>
        <div>Available Qubits: {quantumBackendStats.qubits}</div>
        <div>AI Detection: {quantumBoost > 1.5 ? "Active" : "Limited"}</div>
        <div>Range: {universalRange.toFixed(2)} billion ly</div>
      </div>
      
      <div className="flex justify-between">
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleBoostClick}
          disabled={quantumBoost >= 5.0}
          className="text-xs flex-1 mr-2"
        >
          <Radio className="mr-1 h-3 w-3" />
          Boost Signal ({quantumBoost.toFixed(1)}x)
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            toast({
              title: "IBM Quantum Connection",
              description: `Connected to ${quantumBackendStats.backend} with ${quantumBackendStats.qubits} qubits (T1: ${quantumBackendStats.t1.toFixed(2)}μs)`,
            });
          }}
          className="text-xs flex-1"
        >
          <Cpu className="mr-1 h-3 w-3" />
          Quantum Details
        </Button>
      </div>
    </div>
  );
};

export default QuantumStatusPanel;
