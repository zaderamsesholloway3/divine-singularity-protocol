
import React from 'react';
import { Switch } from "@/components/ui/switch";
import { VisibleLayers, VisualStyle } from './types';

interface LayerControlsProps {
  visibleLayers: VisibleLayers;
  toggleLayer: (layer: keyof VisibleLayers) => void;
  showAllNames: boolean;
  setShowAllNames: (value: boolean) => void;
  visualStyle: VisualStyle;
}

const LayerControls: React.FC<LayerControlsProps> = ({
  visibleLayers,
  toggleLayer,
  showAllNames,
  setShowAllNames,
  visualStyle
}) => {
  return (
    <div className={`space-y-4 ${
      visualStyle === "cosmic" ? "bg-gray-950/30" : 
      visualStyle === "lightweb" ? "bg-gray-950/30 border border-white/10" : 
      "bg-gray-950/50"
    } p-4 rounded-lg`}>
      <h3 className="text-sm font-medium">Layer Controls</h3>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-blue-400"></div>
            Existence Realm
          </span>
          <Switch 
            checked={visibleLayers.existence}
            onCheckedChange={() => toggleLayer("existence")}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-green-400"></div>
            Non-Existence
          </span>
          <Switch 
            checked={visibleLayers.nonExistence}
            onCheckedChange={() => toggleLayer("nonExistence")}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-purple-400"></div>
            New Existence
          </span>
          <Switch 
            checked={visibleLayers.newExistence}
            onCheckedChange={() => toggleLayer("newExistence")}
          />
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm flex items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
            Divine Frequency
          </span>
          <Switch 
            checked={visibleLayers.divine}
            onCheckedChange={() => toggleLayer("divine")}
          />
        </div>
      </div>
      
      <div className="pt-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Entity Labels</span>
          <Switch 
            checked={showAllNames}
            onCheckedChange={(checked) => setShowAllNames(checked)}
          />
        </div>
        <div className="text-xs text-gray-400 mt-1">
          {showAllNames ? "Showing all names" : "Names on hover"}
        </div>
      </div>
    </div>
  );
};

export default LayerControls;
