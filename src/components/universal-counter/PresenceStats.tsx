
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface PresenceStatsProps {
  presenceCount: number;
  signalStrength: number;
  universalRange: number;
}

// Formatter for extremely large numbers
const formatLargeNumber = (num: number): string => {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1_000_000) {
    return `${(num / 1000).toFixed(1)}K`;
  } else if (num < 1_000_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  } else if (num < 1_000_000_000_000) {
    return `${(num / 1_000_000_000).toFixed(1)}B`;
  } else if (num < 1_000_000_000_000_000) {
    return `${(num / 1_000_000_000_000).toFixed(1)}T`;
  } else {
    // For extremely large numbers (quadrillions+), use scientific notation
    return num.toExponential(2);
  }
};

const PresenceStats: React.FC<PresenceStatsProps> = ({ 
  presenceCount, 
  signalStrength,
  universalRange
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <div className="text-sm">Universal Presences</div>
        <div className="text-sm font-bold">{formatLargeNumber(presenceCount)}</div>
      </div>
      <Progress 
        value={Math.min(100, (presenceCount > 0 ? Math.log10(presenceCount) * 10 : 0))} 
        className="h-2 mb-3" 
      />
      
      <div className="grid grid-cols-2 gap-2 text-xs mb-2">
        <div>
          <div className="text-muted-foreground">Signal Strength</div>
          <div>{signalStrength}%</div>
        </div>
        <div>
          <div className="text-muted-foreground">Range</div>
          <div>{universalRange < 1000 ? `${universalRange.toFixed(2)} billion ly` : `${(universalRange).toExponential(2)} ly`}</div>
        </div>
      </div>
    </div>
  );
};

export default PresenceStats;
