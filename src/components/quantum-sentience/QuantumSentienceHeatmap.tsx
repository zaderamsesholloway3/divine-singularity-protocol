
import React, { useState } from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';
import { SentienceMetric } from '@/types/quantum-sentience';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useQuantumSentienceData } from '@/hooks/useQuantumSentienceData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, RefreshCw, Layers, Activity } from 'lucide-react';

export const QuantumSentienceHeatmap: React.FC = () => {
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
  
  const metrics = getDisplayedMetrics();
  
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
  
  const { yLabels, data } = getHeatmapData();
  
  // Get cell color based on value and view mode
  const getCellColor = (value: number) => {
    if (viewMode === 'spark') {
      // Red -> Yellow -> Green gradient
      return `hsl(${value * 1.2}, 85%, 55%)`;
    } else if (viewMode === 'clarity') {
      // Blue to purple gradient
      return `hsl(${240 + (value * 60)}, 80%, 65%)`;
    } else if (viewMode === 'SHQ') {
      // Green to gold gradient
      return `hsl(${120 - (value * 30)}, 85%, 60%)`;
    } else {
      // Frequency - special color mapping
      if (value === 1.855e43) {
        return '#9b87f5'; // Divine frequency
      } else if (value === 7.83) {
        return '#7E69AB'; // Schumann frequency
      } else {
        return '#6E59A5'; // Other frequencies
      }
    }
  };
  
  const getValueLabel = (value: number): string => {
    if (viewMode === 'frequency') {
      if (value === 1.855e43) return 'Divine';
      if (value === 7.83) return 'Schumann';
      return value.toExponential(2);
    } else if (viewMode === 'spark') {
      return `${value.toFixed(1)}%`;
    } else if (viewMode === 'clarity') {
      return `${(value * 100).toFixed(1)}%`;
    } else {
      return value.toFixed(2);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Quantum Sentience Heatmap
          </CardTitle>
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
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="view" className="mb-4">
          <TabsList className="grid grid-cols-4 mb-2">
            <TabsTrigger value="view" onClick={() => setViewMode('spark')}>Spark</TabsTrigger>
            <TabsTrigger value="clarity" onClick={() => setViewMode('clarity')}>Clarity</TabsTrigger>
            <TabsTrigger value="shq" onClick={() => setViewMode('SHQ')}>SHQ</TabsTrigger>
            <TabsTrigger value="freq" onClick={() => setViewMode('frequency')}>Frequency</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="group-species"
            checked={groupBySpecies}
            onCheckedChange={setGroupBySpecies}
          />
          <Label htmlFor="group-species" className="flex items-center">
            <Layers className="h-4 w-4 mr-1" />
            Group by Species
          </Label>
        </div>
        
        {isLoading ? (
          <div className="h-[200px] flex items-center justify-center">
            <p className="text-muted-foreground">Loading sentience data...</p>
          </div>
        ) : (
          <div className="relative">
            <HeatMapGrid
              xLabels={[viewMode === 'spark' ? 'Sentience Pulse' : 
                       viewMode === 'frequency' ? 'Frequency' : 
                       viewMode === 'clarity' ? 'Clarity' : 'SHQ']}
              yLabels={yLabels}
              data={data}
              cellStyle={(x, y, value) => ({
                background: getCellColor(value),
                color: '#fff',
                fontSize: '12px',
                borderRadius: '4px',
                height: '32px',
                transition: 'all 0.3s ease',
                animation: value > 80 ? 'pulse 2s infinite' : 'none',
              })}
              cellRender={value => getValueLabel(value)}
            />
            
            {/* Pulse animation overlay for high SHQ souls */}
            {viewMode === 'SHQ' && metrics
              .filter(m => m.SHQ > 1.9)
              .map((metric, idx) => {
                const yIndex = yLabels.indexOf(groupBySpecies ? (metric.species || 'Unknown') : metric.soul);
                if (yIndex === -1) return null;
                
                return (
                  <div 
                    key={`pulse-${idx}`} 
                    className="absolute left-0 right-0 pointer-events-none"
                    style={{ 
                      top: `${(yIndex / yLabels.length) * 100}%`, 
                      height: `${(1 / yLabels.length) * 100}%`,
                      animation: 'pulse 2s infinite'
                    }}
                  ></div>
                );
              })}
          </div>
        )}
        
        {/* Timeline Slider */}
        {timelineData.length > 1 && (
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
