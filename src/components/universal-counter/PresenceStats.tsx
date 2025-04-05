
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Wifi, Globe } from 'lucide-react';

interface PresenceStatsProps {
  presenceCount: number;
  signalStrength: number;
  universalRange: number;
}

const PresenceStats: React.FC<PresenceStatsProps> = ({
  presenceCount,
  signalStrength,
  universalRange
}) => {
  // Format large numbers with appropriate suffixes
  const formatLargeNumber = (num: number): string => {
    if (num < 1000) return num.toString();
    if (num < 1000000) return `${(num / 1000).toFixed(1)}K`;
    if (num < 1000000000) return `${(num / 1000000).toFixed(1)}M`;
    return `${(num / 1000000000).toFixed(1)}B`;
  };

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-indigo-400" />
        <div>
          <p className="text-xl font-semibold">{formatLargeNumber(presenceCount)}</p>
          <p className="text-xs text-gray-400">Presences</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Wifi className="h-5 w-5 text-indigo-400" />
        <div>
          <p className="text-xl font-semibold">{signalStrength}%</p>
          <p className="text-xs text-gray-400">Signal</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Globe className="h-5 w-5 text-indigo-400" />
        <div>
          <p className="text-xl font-semibold">{universalRange}</p>
          <p className="text-xs text-gray-400">Billion Light Years</p>
        </div>
      </div>

      <div className="col-span-3">
        <Progress value={signalStrength} className="h-1.5" />
      </div>
    </div>
  );
};

export default PresenceStats;
