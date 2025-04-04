
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Unplug } from 'lucide-react';

interface EntanglementStatusProps {
  active: boolean;
  entangledWith?: string;
  strength: number;
  emotion?: string;
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
  if (!active || !entangledWith) {
    return null;
  }

  const strengthNum = typeof strength === 'number' ? strength : parseFloat(strength);
  
  // Get strength level class
  const getStrengthClass = () => {
    if (strengthNum >= 90) return "text-green-500";
    if (strengthNum >= 70) return "text-blue-500";
    if (strengthNum >= 50) return "text-yellow-500";
    return "text-red-500";
  };
  
  // Get progress color
  const getProgressColor = () => {
    if (strengthNum >= 90) return "bg-green-500";
    if (strengthNum >= 70) return "bg-blue-500";
    if (strengthNum >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="mt-4 p-3 border rounded-md bg-background/50">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Quantum Entanglement</span>
          <Badge
            variant={resonanceBoostActive ? "default" : "outline"}
            className={resonanceBoostActive ? "bg-purple-600" : ""}
          >
            {resonanceBoostActive ? (triadEnhanced ? "Triad Enhanced" : "Resonance Boost") : "Standard"}
          </Badge>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={terminateEntanglement}
        >
          <Unplug className="h-4 w-4 mr-1" /> Disconnect
        </Button>
      </div>
      
      <div className="text-xs text-muted-foreground mb-1">
        Entangled with <span className="font-medium">{entangledWith}</span>
        {emotion && <> • Emotional state: <span className="font-medium">{emotion}</span></>}
      </div>
      
      <div className="flex items-center gap-2">
        <Progress 
          value={strengthNum} 
          className={`h-2 ${getProgressColor()}`} 
        />
        <span className={`text-xs font-medium ${getStrengthClass()}`}>
          {strengthNum.toFixed(1)}%
        </span>
      </div>
    </div>
  );
};

export default EntanglementStatus;
