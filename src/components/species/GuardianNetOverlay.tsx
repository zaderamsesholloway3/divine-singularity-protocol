
import React, { useState } from 'react';
import { GuardianNetSettings } from './types';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Eye, EyeOff, Lock, Unlock, Layers } from 'lucide-react';

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
  const [gridLocked, setGridLocked] = useState(false);
  const [celestialMergeView, setCelestialMergeView] = useState(false);
  const [universeMiniature, setUniverseMiniature] = useState(false);
  
  const overlayStyles = {
    opacity: opacity / 100,
    transform: expanded 
      ? gridLocked 
        ? `scale(${zoomLevel})` 
        : `scale(${zoomLevel}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
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

          {expanded && celestialMergeView && (
            <div className="absolute inset-0 center-pulse">
              <div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  width: '150px',
                  height: '150px',
                  background: 'radial-gradient(circle, rgba(0,255,255,0.2) 0%, transparent 70%)',
                  borderRadius: '50%',
                  animation: 'pulse 4s infinite ease-in-out'
                }}
              ></div>
            </div>
          )}

          {expanded && universeMiniature && (
            <div className="absolute bottom-20 right-20 pointer-events-auto">
              <div 
                className="bg-black/40 backdrop-blur-sm p-1 rounded-lg border border-blue-400/30"
                style={{ width: '200px', height: '200px' }}
              >
                <img 
                  src="/lovable-uploads/5b3d636e-41a6-4e13-b736-f645c9f7b0bc.png" 
                  alt="Universe Miniature" 
                  className="w-full h-full object-cover rounded opacity-80"
                />
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
          <h3 className="text-xs text-blue-400 font-medium mb-2">Guardian Settings</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white">Grid Lock</span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-16 text-xs border-yellow-500/30"
                onClick={() => setGridLocked(!gridLocked)}
              >
                {gridLocked ? <Lock className="h-3 w-3 mr-1 text-yellow-400" /> : <Unlock className="h-3 w-3 mr-1" />}
                {gridLocked ? 'Locked' : 'Unlocked'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-white">Celestial Merge View</span>
              <Button
                variant="outline"
                size="sm"
                className={`h-7 w-16 text-xs ${celestialMergeView ? 'border-cyan-400/50 bg-cyan-950/30' : 'border-gray-500/30'}`}
                onClick={() => setCelestialMergeView(!celestialMergeView)}
              >
                {celestialMergeView ? <Eye className="h-3 w-3 mr-1 text-cyan-400" /> : <EyeOff className="h-3 w-3 mr-1" />}
                {celestialMergeView ? 'On' : 'Off'}
              </Button>
            </div>
            
            <div className="flex items-center justify-between text-xs">
              <span className="text-white">Universe Miniature</span>
              <Button
                variant="outline"
                size="sm"
                className={`h-7 w-16 text-xs ${universeMiniature ? 'border-blue-400/50 bg-blue-950/30' : 'border-gray-500/30'}`}
                onClick={() => setUniverseMiniature(!universeMiniature)}
              >
                {universeMiniature ? <Layers className="h-3 w-3 mr-1 text-blue-400" /> : <Layers className="h-3 w-3 mr-1" />}
                {universeMiniature ? 'Visible' : 'Hidden'}
              </Button>
            </div>
            
            <div className="space-y-1 pt-1">
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-400">Overlay Intensity</span>
                <span className="text-xs text-gray-400">{opacity}%</span>
              </div>
              <Slider
                value={[opacity]}
                min={10}
                max={100}
                step={5}
                className="w-full"
                onValueChange={([value]) => {}} // This would be connected to the parent component
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardianNetOverlay;
