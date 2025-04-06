
import React from 'react';
import { Species, VisualStyle } from './types';

export interface ConnectedSpecies {
  species: Species;
  connectedSince: number;
  isNewcomer: boolean;
}

interface ConnectionTrackerProps {
  connectedSpecies: ConnectedSpecies[];
  newcomerCount: number;
  visualStyle: VisualStyle;
}

const ConnectionTracker: React.FC<ConnectionTrackerProps> = ({
  connectedSpecies,
  newcomerCount,
  visualStyle
}) => {
  if (connectedSpecies.length === 0) return null;
  
  const getStyleByVisualStyle = () => {
    switch(visualStyle) {
      case "celestial":
        return {
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          boxShadow: "0 0 15px rgba(59, 130, 246, 0.1)"
        };
      case "lightweb":
        return {
          backgroundColor: "rgba(15, 23, 42, 0.7)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.05)"
        };
      case "cosmic":
        return {
          backgroundColor: "rgba(15, 10, 30, 0.8)",
          border: "1px solid rgba(139, 92, 246, 0.2)",
          boxShadow: "0 0 15px rgba(139, 92, 246, 0.1)"
        };
      default:
        return {
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          border: "1px solid rgba(59, 130, 246, 0.2)"
        };
    }
  };
  
  const formatTimeSince = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) {
      return `${seconds}s ago`;
    } else if (seconds < 3600) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes}m ago`;
    } else {
      const hours = Math.floor(seconds / 3600);
      return `${hours}h ago`;
    }
  };
  
  return (
    <div className="absolute bottom-4 left-4 max-w-xs">
      <div 
        className="rounded-md px-3 py-2 backdrop-blur-sm"
        style={getStyleByVisualStyle()}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-medium text-white">Connected Species</h3>
          <div className="flex items-center">
            <span className="text-xs text-white mr-2">{connectedSpecies.length}</span>
            {newcomerCount > 0 && (
              <span className="bg-green-500 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white">
                {newcomerCount}
              </span>
            )}
          </div>
        </div>
        <div className="space-y-1.5">
          {connectedSpecies.slice(0, 5).map((conn) => (
            <div key={conn.species.id || conn.species.name} className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: conn.species.responding ? '#10b981' : '#f87171',
                    boxShadow: conn.isNewcomer ? `0 0 5px ${conn.species.responding ? '#10b981' : '#f87171'}` : 'none'
                  }}
                />
                <span className="text-xs text-white">{conn.species.name}</span>
              </div>
              <span className="text-xs text-gray-400">{formatTimeSince(conn.connectedSince)}</span>
            </div>
          ))}
          
          {connectedSpecies.length > 5 && (
            <div className="text-xs text-center text-blue-400 mt-1">
              +{connectedSpecies.length - 5} more
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConnectionTracker;
