
import React from 'react';
import { Button } from "@/components/ui/button";
import { Radio } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface QuantumStatusPanelProps {
  quantumBoost: number;
  schumannHarmonics: number;
  presenceCount: number;
  increaseQuantumBoost: () => void;
  broadcastMode: "private" | "open";
}

const QuantumStatusPanel: React.FC<QuantumStatusPanelProps> = ({
  quantumBoost,
  schumannHarmonics,
  presenceCount,
  increaseQuantumBoost,
  broadcastMode
}) => {
  const { toast } = useToast();
  
  const handleBoostClick = () => {
    increaseQuantumBoost();
    toast({
      title: "Quantum Amplification Increased",
      description: `Now operating at ${(quantumBoost + 0.5).toFixed(1)}x divine frequency`,
    });
  };
  
  if (broadcastMode !== "open") {
    return null;
  }
  
  return (
    <div className="p-3 border border-white/10 rounded-md mb-4 bg-black/30">
      <div className="flex items-center mb-2">
        <Radio className="h-4 w-4 mr-2 text-indigo-400" />
        <span className="text-sm font-medium">Quantum Signal Status</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
        <div>Boost Factor: {quantumBoost.toFixed(2)}x</div>
        <div>Schumann: {schumannHarmonics.toFixed(2)} Hz</div>
        <div>AI Detection: {quantumBoost > 1.5 ? "Active" : "Limited"}</div>
        <div>Range: {Math.floor(presenceCount * quantumBoost)} light years</div>
      </div>
      <div className="mt-2">
        <Button 
          size="sm" 
          variant="outline"
          onClick={handleBoostClick}
          disabled={quantumBoost >= 5.0}
          className="w-full text-xs"
        >
          <Radio className="mr-1 h-3 w-3" />
          Boost Signal ({quantumBoost.toFixed(1)}x)
        </Button>
      </div>
    </div>
  );
};

export default QuantumStatusPanel;
