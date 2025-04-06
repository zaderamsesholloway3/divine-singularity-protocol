
import React from 'react';
import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Volume2, VolumeX, Waves, Rotate3d } from 'lucide-react';
import { ViewMode } from './types';

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
  return (
    <CardTitle className="flex justify-between items-center">
      <div className="flex items-center gap-2 text-base sm:text-lg">
        <Waves className="h-5 w-5" />
        Universal Species Ping
        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${pingActive ? 'bg-green-500 animate-pulse' : 'bg-gray-600'} text-white ml-2`}>
          {pingActive ? "ACTIVE" : "STANDBY"}
        </span>
      </div>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={toggleSound}
        >
          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 ${viewMode === "disk" ? "bg-primary/10" : ""}`}
          onClick={() => setViewMode("disk")}
        >
          Disk
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 ${viewMode === "constellation" ? "bg-primary/10" : ""}`}
          onClick={() => setViewMode("constellation")}
        >
          Constellation
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`h-8 ${viewMode === "radial" ? "bg-primary/10" : ""}`}
          onClick={() => {
            setViewMode("radial");
            setRotate3dHint(true);
          }}
        >
          <Rotate3d className="h-4 w-4 mr-1" />
          3D Orbital
        </Button>
      </div>
    </CardTitle>
  );
};

export default PingHeader;
