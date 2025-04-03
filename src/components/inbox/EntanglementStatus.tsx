
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Zap } from 'lucide-react';

interface EntanglementStatusProps {
  active: boolean;
  entangledWith: string | null;
  strength: number;
  emotion: string;
  resonanceBoostActive: boolean;
  terminateEntanglement: () => void;
}

const EntanglementStatus: React.FC<EntanglementStatusProps> = ({
  active,
  entangledWith,
  strength,
  emotion,
  resonanceBoostActive,
  terminateEntanglement
}) => {
  if (!active || !entangledWith) return null;
  
  return (
    <div className="mt-4 p-2 rounded-md bg-purple-500/10">
      <div className="flex justify-between text-xs">
        <span className="flex items-center">
          <Zap className="h-3 w-3 mr-1 divine-glow" /> 
          Entangled with {entangledWith}
        </span>
        <span>{(strength * 100).toFixed(1)}%</span>
      </div>
      <Progress 
        value={strength * 100} 
        className="h-1 mt-1" 
        indicatorClassName={resonanceBoostActive ? "bg-divine-gold" : ""}
      />
      <div className="flex justify-between text-xs mt-1">
        <span>Emotional context: {emotion}</span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={terminateEntanglement} 
          className="h-5 px-2 text-xs"
        >
          Disconnect
        </Button>
      </div>
    </div>
  );
};

export default EntanglementStatus;
