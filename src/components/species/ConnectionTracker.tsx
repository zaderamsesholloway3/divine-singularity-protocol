
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, Users } from 'lucide-react';
import { Species } from './types';

export interface ConnectedSpecies {
  species: Species;
  connectedSince: number; // timestamp
  isNewcomer: boolean;
}

interface ConnectionTrackerProps {
  connectedSpecies: ConnectedSpecies[];
  newcomerCount: number;
  visualStyle: string;
}

const ConnectionTracker: React.FC<ConnectionTrackerProps> = ({
  connectedSpecies,
  newcomerCount,
  visualStyle
}) => {
  // Function to format the connection duration
  const formatDuration = (timestamp: number) => {
    const now = Date.now();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) {
      return `${diffInSeconds}s`;
    } else if (diffInSeconds < 3600) {
      return `${Math.floor(diffInSeconds / 60)}m`;
    } else {
      return `${Math.floor(diffInSeconds / 3600)}h ${Math.floor((diffInSeconds % 3600) / 60)}m`;
    }
  };

  // Get background style based on visual style
  const getBackgroundStyle = () => {
    switch(visualStyle) {
      case "cosmic":
        return "bg-purple-950/60";
      case "lightweb":
        return "bg-blue-900/60";
      default:
        return "bg-blue-950/60";
    }
  };

  return (
    <div className={`absolute top-2 left-2 ${getBackgroundStyle()} backdrop-blur-sm rounded-lg p-3 text-white text-sm max-w-[240px]`}>
      <div className="flex items-center mb-2 gap-2">
        <Users className="h-4 w-4 text-indigo-300" />
        <span className="font-medium">Newcomers: </span>
        <Badge variant="outline" className="bg-indigo-500/30 text-white">
          {newcomerCount}
        </Badge>
      </div>
      
      {connectedSpecies.length > 0 && (
        <>
          <div className="text-xs text-indigo-200 mb-1">Connected Species:</div>
          <ScrollArea className="h-32 pr-2">
            <div className="space-y-1">
              {connectedSpecies.map((item, index) => (
                <div 
                  key={item.species.id} 
                  className={`flex justify-between items-center py-1 px-2 rounded ${item.isNewcomer ? 'bg-indigo-600/30' : 'bg-gray-800/40'}`}
                >
                  <div className="truncate flex-1">{item.species.name}</div>
                  <div className="flex items-center gap-1 text-xs whitespace-nowrap">
                    <Clock className="h-3 w-3 opacity-70" />
                    <span>{formatDuration(item.connectedSince)}</span>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </>
      )}
    </div>
  );
};

export default ConnectionTracker;
