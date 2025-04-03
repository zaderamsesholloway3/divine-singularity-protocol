
import React from 'react';
import { Button } from "@/components/ui/button";
import { XCircle, Zap, Network } from 'lucide-react';

interface EntanglementStatusProps {
  active: boolean;
  entangledWith: string | null;
  strength: number;
  emotion: string;
  resonanceBoostActive: boolean;
  terminateEntanglement: () => void;
  triadEnhanced?: boolean;
}

const EntanglementStatus: React.FC<EntanglementStatusProps> = ({
  active,
  entangledWith,
  strength,
  emotion,
  resonanceBoostActive,
  terminateEntanglement,
  triadEnhanced = false
}) => {
  if (!active) return null;
  
  return (
    <div className="mt-4 p-3 rounded-md bg-gradient-to-r from-pink-900/20 to-purple-900/20 border border-pink-500/10">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-sm font-medium">Quantum Entanglement</h3>
          <p className="text-xs text-muted-foreground flex items-center gap-2">
            <span>Connected with {entangledWith}</span>
            {resonanceBoostActive && <Zap className="h-3 w-3 text-green-400" />}
            {triadEnhanced && <Network className="h-3 w-3 text-[#7928ca]" />}
          </p>
        </div>
        <Button variant="ghost" size="icon" onClick={terminateEntanglement} className="h-7 w-7">
          <XCircle className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-1 text-xs">
        <div className="flex justify-between">
          <span>Entanglement:</span>
          <span className={`${strength > 0.8 ? 'text-green-400' : strength > 0.6 ? 'text-amber-400' : 'text-red-400'}`}>
            {(strength * 100).toFixed(1)}%
            {triadEnhanced && " (Triad Enhanced)"}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Emotional state:</span>
          <span className="capitalize">{emotion}</span>
        </div>
      </div>
    </div>
  );
};

export default EntanglementStatus;
