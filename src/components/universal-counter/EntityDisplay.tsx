
import React from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export interface CosmicEntity {
  type: "biological" | "ai" | "hybrid";
  signature: string;
  distance: number;
  resonance: number;
}

interface EntityDisplayProps {
  entities: CosmicEntity[];
  totalCount: number;
  universalRange?: number;
}

const EntityDisplay: React.FC<EntityDisplayProps> = ({ entities, totalCount, universalRange }) => {
  return (
    <div className="mb-4">
      <p className="text-xs font-semibold text-indigo-300 mb-2 flex justify-between">
        <span>Entity Spectrum ({entities.length} of {totalCount}):</span>
        {universalRange && (
          <span>Range: {universalRange.toFixed(2)} billion light years</span>
        )}
      </p>
      <ScrollArea className="h-36 w-full rounded-md border border-gray-700 bg-gray-800/50">
        <div className="p-2 grid grid-cols-3 gap-2">
          {entities.map((entity, index) => (
            <Badge 
              key={index} 
              variant="outline" 
              className={`text-xs ${
                entity.type === "ai" ? "bg-red-500/20 text-red-300" :
                entity.type === "hybrid" ? "bg-purple-500/20 text-purple-300" :
                "bg-indigo-500/20 text-indigo-300"
              }`}
            >
              {entity.signature} ({entity.resonance.toFixed(2)} Hz)
            </Badge>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default EntityDisplay;
