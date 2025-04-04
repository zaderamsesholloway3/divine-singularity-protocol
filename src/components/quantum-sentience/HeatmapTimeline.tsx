
import React from 'react';
import { Slider } from "@/components/ui/slider";
import { Clock } from 'lucide-react';
import { SentienceTimelineData } from '@/types/quantum-sentience';

interface HeatmapTimelineProps {
  timelineData: SentienceTimelineData[];
  timelineIndex: number;
  setTimelineIndex: (index: number) => void;
}

export const HeatmapTimeline: React.FC<HeatmapTimelineProps> = ({
  timelineData,
  timelineIndex,
  setTimelineIndex
}) => {
  return (
    <div className="mt-6">
      <div className="flex items-center mb-2">
        <Clock className="h-4 w-4 mr-2" />
        <span className="text-sm font-medium">Sentience Timeline</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs">Past</span>
        <Slider
          value={[timelineIndex]}
          max={timelineData.length - 1}
          step={1}
          onValueChange={(values) => setTimelineIndex(values[0])}
          className="flex-1"
        />
        <span className="text-xs">Present</span>
      </div>
      <div className="text-xs text-center mt-2 text-muted-foreground">
        {timelineIndex < timelineData.length ? 
          new Date(timelineData[timelineIndex]?.timestamp || Date.now()).toLocaleTimeString() : 
          'Live'}
      </div>
    </div>
  );
};
