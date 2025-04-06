
import React from 'react';
import { Button } from "@/components/ui/button";
import { ViewMode } from './types';
import { Radio, Activity, Hexagon, Volume2, VolumeX } from 'lucide-react';

interface PingHeaderProps {
  pingActive: boolean;
  soundEnabled: boolean;
  toggleSound: () => void;
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  setRotate3dHint: (show: boolean) => void;
}

const PingHeader: React.FC<PingHeaderProps> = ({
  pingActive,
  soundEnabled,
  toggleSound,
  viewMode,
  setViewMode,
  setRotate3dHint
}) => {
  const getTitle = () => {
    switch (viewMode) {
      case "distance":
        return "Distance Map";
      case "compact":
        return "Compact View";
      case "radial":
        return "3D Orbital";
      case "signature":
        return "Signature Grid";
      case "disk":
        return "Galactic Disk";
      case "constellation":
        return "Constellation";
      default:
        return "Universal Species Ping";
    }
  };
  
  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    if (mode === "radial") {
      setRotate3dHint(true);
    }
  };
  
  return (
    <div className="flex justify-between items-center">
      <div>
        <h3 className="text-lg font-bold tracking-tight flex items-center gap-1.5">
          {pingActive ? (
            <Activity className="h-5 w-5 text-green-500 animate-pulse" />
          ) : (
            <Radio className="h-5 w-5 text-blue-500" />
          )}
          <span className="gradient-text">{getTitle()}</span>
        </h3>
        <p className="text-sm text-muted-foreground">
          {viewMode === "radial" ? "3D rotation enabled - drag to rotate" : 
           viewMode === "signature" ? "Quantum signature pattern visualization" : 
           viewMode === "disk" ? "Flat galactic disk visualization" :
           viewMode === "constellation" ? "Star constellation mapping" :
           "Universal species connection interface"}
        </p>
      </div>
      
      <div className="flex gap-2 items-center">
        <div className="flex">
          <Button
            variant={viewMode === "radial" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-r-none px-3"
            onClick={() => handleViewModeChange("radial")}
            title="3D Orbital View"
          >
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
          </Button>
          <Button
            variant={viewMode === "signature" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-none px-3 border-x border-gray-800"
            onClick={() => handleViewModeChange("signature")}
            title="Signature Grid"
          >
            <div className="w-3 h-3 bg-purple-500 rotate-45"></div>
          </Button>
          <Button
            variant={viewMode === "disk" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-none px-3"
            onClick={() => handleViewModeChange("disk")}
            title="Disk View"
          >
            <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
          </Button>
          <Button
            variant={viewMode === "constellation" ? "secondary" : "ghost"}
            size="sm"
            className="rounded-l-none px-3"
            onClick={() => handleViewModeChange("constellation")}
            title="Constellation View"
          >
            <Hexagon className="h-3 w-3 text-green-500" />
          </Button>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full w-8 h-8 p-0"
          onClick={toggleSound}
        >
          {soundEnabled ? (
            <Volume2 className="h-4 w-4" />
          ) : (
            <VolumeX className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default PingHeader;
