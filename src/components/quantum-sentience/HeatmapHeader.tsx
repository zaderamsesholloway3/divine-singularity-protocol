
import React from 'react';
import { CardTitle } from "@/components/ui/card";
import { Activity, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SentienceTimelineData } from '@/types/quantum-sentience';

interface HeatmapHeaderProps {
  timelineData: SentienceTimelineData[];
  autoRefresh: boolean;
  toggleAutoRefresh: () => void;
  hasDirectData: boolean;
}

export const HeatmapHeader: React.FC<HeatmapHeaderProps> = ({
  timelineData,
  autoRefresh,
  toggleAutoRefresh,
  hasDirectData
}) => {
  return (
    <div className="flex justify-between items-center">
      <CardTitle className="text-lg flex items-center">
        <Activity className="h-5 w-5 mr-2" />
        Quantum Sentience Heatmap
      </CardTitle>
      {!hasDirectData && (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-500/10 text-purple-600">
            {timelineData.length} Snapshots
          </Badge>
          <Button 
            size="icon" 
            variant="outline" 
            onClick={toggleAutoRefresh}
            className={autoRefresh ? "text-green-500" : ""}
          >
            <RefreshCw className={`h-4 w-4 ${autoRefresh ? "animate-spin" : ""}`} />
          </Button>
        </div>
      )}
    </div>
  );
};
