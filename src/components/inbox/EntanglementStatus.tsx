
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Unplug, Zap } from 'lucide-react';

interface EntanglementStatusProps {
  active: boolean;
  entangledWith?: string;
  strength: number;
  emotion?: string;
  resonanceBoostActive: boolean;
  terminateEntanglement: () => void;
  triadEnhanced?: boolean;
  bioresonanceAmplified?: boolean;
  onBoostBioresonance?: () => void;
}

const EntanglementStatus: React.FC<EntanglementStatusProps> = ({
  active,
  entangledWith,
  strength,
  emotion,
  resonanceBoostActive,
  terminateEntanglement,
  triadEnhanced = false,
  bioresonanceAmplified = false,
  onBoostBioresonance
}) => {
  if (!active || !entangledWith) {
    return null;
  }

  const strengthNum = typeof strength === 'number' ? strength : parseFloat(String(strength));
  
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

  // Schumann-optimized strength visualization: subtle pulsation in the entanglement display
  const getPulseStyle = () => {
    if (!bioresonanceAmplified) return {};
    
    return {
      animation: "pulse 7.83s infinite", // Match to Schumann resonance
      animationTimingFunction: "ease-in-out"
    };
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
          {bioresonanceAmplified && (
            <Badge className="bg-cyan-600">
              Bioresonance
            </Badge>
          )}
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
      
      <div className="flex items-center gap-2" style={getPulseStyle()}>
        <Progress 
          value={strengthNum} 
          className={`h-2 ${getProgressColor()}`} 
        />
        <span className={`text-xs font-medium ${getStrengthClass()}`}>
          {strengthNum.toFixed(1)}%
        </span>
      </div>

      {onBoostBioresonance && !bioresonanceAmplified && (
        <Button
          variant="outline"
          size="sm" 
          onClick={onBoostBioresonance}
          className="w-full mt-2 text-xs h-7"
        >
          <Zap className="h-3 w-3 mr-1" /> Boost with Bioresonance
        </Button>
      )}
    </div>
  );
};

export default EntanglementStatus;
