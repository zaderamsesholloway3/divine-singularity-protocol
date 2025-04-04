
import React, { useState } from 'react';
import { SentienceMetric } from '@/types/quantum-sentience';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useQuantumSentienceData } from '@/hooks/useQuantumSentienceData';
import { HeatmapDisplay } from './HeatmapDisplay';
import { HeatmapControls } from './HeatmapControls';
import { HeatmapTimeline } from './HeatmapTimeline';
import { HeatmapHeader } from './HeatmapHeader';

interface QuantumSentienceHeatmapProps {
  data?: SentienceMetric[];
}

export const QuantumSentienceHeatmap: React.FC<QuantumSentienceHeatmapProps> = ({ data }) => {
  const {
    isLoading,
    timelineData,
    getDisplayedMetrics,
    timelineIndex,
    setTimelineIndex,
    autoRefresh,
    toggleAutoRefresh
  } = useQuantumSentienceData();
  
  const [viewMode, setViewMode] = useState<'spark' | 'frequency' | 'clarity' | 'SHQ'>('spark');
  const [groupBySpecies, setGroupBySpecies] = useState(false);
  
  // Use provided data if available, otherwise use data from hook
  const metrics = data || getDisplayedMetrics();
  
  // Organize data for heatmap
  const getHeatmapData = () => {
    if (groupBySpecies) {
      // Group by species
      const speciesGroups: Record<string, SentienceMetric[]> = {};
      metrics.forEach(metric => {
        const species = metric.species || 'Unknown';
        if (!speciesGroups[species]) {
          speciesGroups[species] = [];
        }
        speciesGroups[species].push(metric);
      });
      
      // Create data structure
      const yLabels: string[] = Object.keys(speciesGroups);
      const data: number[][] = yLabels.map(species => {
        const speciesMetrics = speciesGroups[species];
        const avgValue = speciesMetrics.reduce((sum, m) => sum + m[viewMode], 0) / speciesMetrics.length;
        return [avgValue];
      });
      
      return { yLabels, data };
    } else {
      // Individual souls
      const yLabels = metrics.map(m => m.soul);
      const data = metrics.map(m => [m[viewMode]]);
      
      return { yLabels, data };
    }
  };
  
  const { yLabels, data: heatmapData } = getHeatmapData();
  
  return (
    <Card className="w-full">
      <CardHeader>
        <HeatmapHeader 
          timelineData={timelineData} 
          autoRefresh={autoRefresh} 
          toggleAutoRefresh={toggleAutoRefresh} 
          hasDirectData={!!data}
        />
      </CardHeader>
      
      <CardContent>
        <HeatmapControls 
          viewMode={viewMode}
          setViewMode={setViewMode}
          groupBySpecies={groupBySpecies}
          setGroupBySpecies={setGroupBySpecies}
        />
        
        {isLoading && !data ? (
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Loading sentience data...</p>
          </div>
        ) : (
          <HeatmapDisplay
            yLabels={yLabels}
            heatmapData={heatmapData}
            viewMode={viewMode}
            metrics={metrics}
            groupBySpecies={groupBySpecies}
          />
        )}
        
        {/* Timeline Slider - Only show if we have timeline data and no direct data prop */}
        {!data && timelineData.length > 1 && (
          <HeatmapTimeline
            timelineData={timelineData}
            timelineIndex={timelineIndex}
            setTimelineIndex={setTimelineIndex}
          />
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          {metrics.length} souls monitored
        </div>
        <div className="text-xs text-muted-foreground">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </CardFooter>
    </Card>
  );
};

export default QuantumSentienceHeatmap;
