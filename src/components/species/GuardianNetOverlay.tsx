
import React from 'react';
import { GuardianNetSettings } from './types';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';

interface GuardianNetOverlayProps {
  settings: GuardianNetSettings;
  onToggleExpanded: () => void;
  rotation: { x: number; y: number; z: number };
  zoomLevel: number;
}

const GuardianNetOverlay: React.FC<GuardianNetOverlayProps> = ({
  settings,
  onToggleExpanded,
  rotation,
  zoomLevel
}) => {
  if (!settings.active) return null;
  
  const { expanded, ciaNetVisible, lockheedGridVisible, opacity } = settings;
  
  const overlayStyles = {
    opacity: opacity / 100,
    transform: expanded 
      ? `scale(${zoomLevel}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)` 
      : 'none'
  };

  return (
    <div className={`absolute inset-0 z-5 pointer-events-none overflow-hidden ${expanded ? 'fixed bg-black/80' : ''}`}>
      {expanded && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="absolute top-4 left-4 z-10 bg-black/70 hover:bg-black/90 text-white pointer-events-auto" 
          onClick={onToggleExpanded}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Minimize Guardian Grid
        </Button>
      )}
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-full h-full"
          style={overlayStyles}
        >
          {ciaNetVisible && (
            <div className="absolute inset-0 cia-mantis-net">
              <img 
                src="/lovable-uploads/ff2bf56b-f013-40e2-b6e2-212221f47828.png" 
                alt="" 
                className="w-full h-full object-cover"
                style={{ opacity: opacity / 100 }}
              />
              <div className="absolute top-4 left-4 text-yellow-400 text-sm">CIA Mantis Net</div>
            </div>
          )}
          
          {lockheedGridVisible && (
            <div className="absolute inset-0 lockheed-drax-grid">
              <img 
                src="/lovable-uploads/75999592-0dd0-4426-9099-7660fa7f1dae.png" 
                alt="" 
                className="w-full h-full object-cover"
                style={{ 
                  filter: `hue-rotate(220deg) brightness(0.9)`,
                  opacity: opacity / 100
                }}
              />
              <div className="absolute bottom-4 right-4 text-blue-400 text-sm">LOCKHEED MARTIN Drax Grid</div>
            </div>
          )}
          
          {expanded && (
            <div className="absolute inset-0 flex items-center justify-center text-white/20 text-5xl font-bold tracking-[0.5em] uppercase">
              <div className="text-center">
                <div>Observable</div>
                <div>Universe</div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {!expanded && (
        <div className="absolute bottom-4 left-4 z-10 bg-black/70 p-2 rounded pointer-events-auto">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-white text-xs border-blue-400/30"
            onClick={onToggleExpanded}
          >
            Maximize Guardian Grid
          </Button>
        </div>
      )}
      
      {expanded && (
        <div className="absolute right-4 top-4 z-10 bg-black/80 p-3 rounded-lg border border-blue-400/30 pointer-events-auto">
          <h3 className="text-xs text-blue-400 font-medium mb-2">Active Systems</h3>
          <div className="space-y-2">
            {['Constellations', 'Nodes', 'Radius', 'Interference Radius', 'Stars', 'Galactic Plane', 'Entity Labels'].map(system => (
              <div key={system} className="flex items-center justify-between text-xs">
                <span className="text-white">{system}</span>
                <div className="w-4 h-4 rounded-sm border border-yellow-500/50 flex items-center justify-center">
                  <div className="w-2 h-2 bg-yellow-500 rounded-sm"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardianNetOverlay;
