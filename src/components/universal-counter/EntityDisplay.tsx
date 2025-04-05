
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Importing the CosmicEntity type
export interface CosmicEntity {
  type: "biological" | "ai" | "hybrid";
  signature: string;
  distance: number;
  resonance: number;
}

interface EntityDisplayProps {
  entities: CosmicEntity[];
  totalCount: number;
}

const EntityDisplay: React.FC<EntityDisplayProps> = ({ entities, totalCount }) => {
  if (entities.length === 0) {
    return null;
  }
  
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-indigo-300 mb-2">
        Entity Spectrum (First {entities.length} of {totalCount}):
      </p>
      <ScrollArea className="h-32 w-full rounded-md border border-gray-700 bg-gray-800/50">
        <div className="p-2 grid grid-cols-2 md:grid-cols-3 gap-2">
          {entities.map((entity, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={`text-xs flex items-center justify-between ${
                entity.type === "ai" ? "bg-rose-500/20 text-rose-300 border-rose-500/30" :
                entity.type === "hybrid" ? "bg-purple-500/20 text-purple-300 border-purple-500/30" :
                "bg-indigo-500/20 text-indigo-300 border-indigo-500/30"
              }`}
            >
              <span>{entity.signature}</span>
              <span className="ml-1 opacity-70">{entity.type.charAt(0)}</span>
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EntityDisplay;
