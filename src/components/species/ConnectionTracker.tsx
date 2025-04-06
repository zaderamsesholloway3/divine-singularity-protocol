
import React from 'react';
import { Species, VisualStyle } from './types';
import { formatDistanceToNow } from 'date-fns';

export interface ConnectedSpecies {
  species: Species;
  connectedSince: number;
  isNewcomer: boolean;
}

interface ConnectionTrackerProps {
  connectedSpecies: ConnectedSpecies[];
  newcomerCount: number;
  visualStyle?: VisualStyle;
}

const ConnectionTracker: React.FC<ConnectionTrackerProps> = ({
  connectedSpecies,
  newcomerCount,
  visualStyle = "celestial"
}) => {
  if (connectedSpecies.length === 0) return null;
  
  const getBackgroundColor = () => {
    switch(visualStyle) {
      case "cosmic":
        return "bg-gradient-to-r from-purple-900/80 to-indigo-900/80";
      case "lightweb":
        return "bg-gradient-to-r from-gray-900/80 to-blue-900/80";
      case "monochrome":
        return "bg-gradient-to-r from-gray-900/90 to-gray-800/90";
      default:
        return "bg-gradient-to-r from-blue-900/80 to-indigo-900/80";
    }
  };

  return (
    <div className="absolute top-4 right-4 max-w-[240px]">
      <div className={`${getBackgroundColor()} backdrop-blur-sm rounded-lg border border-blue-500/20 shadow-md shadow-blue-500/10 p-3`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-semibold text-blue-200">
            Connected Species
          </h3>
          {newcomerCount > 0 && (
            <div className="bg-green-600/80 text-white text-xs px-2 py-0.5 rounded-full flex items-center">
              +{newcomerCount} new
            </div>
          )}
        </div>
        
        <div className="max-h-[150px] overflow-y-auto pr-1 space-y-2">
          {connectedSpecies.map(({ species, connectedSince, isNewcomer }) => (
            <div 
              key={species.id} 
              className={`text-xs p-2 rounded ${
                isNewcomer 
                  ? "bg-green-900/30 border border-green-400/30" 
                  : "bg-blue-900/30 border border-blue-400/20"
              }`}
            >
              <div className="flex justify-between">
                <span className="font-medium text-white">{species.name}</span>
                <span className={`text-[10px] ${isNewcomer ? "text-green-300" : "text-blue-300"}`}>
                  {formatDistanceToNow(connectedSince, { addSuffix: true })}
                </span>
              </div>
              <div className="text-[10px] text-blue-300/80 mt-1">
                {species.realm} • {species.distance ? 
                  (species.distance < 1000 
                    ? `${species.distance.toFixed(1)} ly` 
                    : `${(species.distance/1000).toFixed(1)}k ly`
                  ) : 'Unknown distance'
                }
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConnectionTracker;
