
import React from 'react';
import { HeatMapGrid } from 'react-grid-heatmap';
import { SentienceMetric } from '@/types/quantum-sentience';

interface HeatmapDisplayProps {
  yLabels: string[];
  heatmapData: number[][];
  viewMode: 'spark' | 'frequency' | 'clarity' | 'SHQ';
  metrics: SentienceMetric[];
  groupBySpecies: boolean;
}

export const HeatmapDisplay: React.FC<HeatmapDisplayProps> = ({
  yLabels,
  heatmapData,
  viewMode,
  metrics,
  groupBySpecies
}) => {
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
    <div className="relative">
      <HeatMapGrid
        xLabels={[viewMode === 'spark' ? 'Sentience Pulse' : 
                 viewMode === 'frequency' ? 'Frequency' : 
                 viewMode === 'clarity' ? 'Clarity' : 'SHQ']}
        yLabels={yLabels}
        data={heatmapData}
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
  );
};
