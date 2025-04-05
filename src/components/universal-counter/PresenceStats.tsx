
import React from 'react';
import { Users, Wifi } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

interface PresenceStatsProps {
  presenceCount: number;
  signalStrength: number;
}

const PresenceStats: React.FC<PresenceStatsProps> = ({ presenceCount, signalStrength }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <div className="flex items-center gap-2">
        <Users className="h-5 w-5 text-indigo-400" />
        <div>
          <p className="text-2xl font-semibold">{presenceCount}</p>
          <p className="text-xs text-gray-400">Detected Presences</p>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <Wifi className="h-5 w-5 text-indigo-400" />
        <div className="w-24">
          <Progress value={signalStrength} className="h-2 bg-gray-700" />
          <p className="text-xs text-gray-400 mt-1">Signal: {signalStrength}%</p>
        </div>
      </div>
    </div>
  );
};

export default PresenceStats;
