
import React, { useState } from 'react';
import { GuardianNetSettings } from './types';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Eye, EyeOff, Lock, Unlock, Layers, Compass, Maximize, Minimize, Settings } from 'lucide-react';
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GuardianNetOverlayProps {
  settings: GuardianNetSettings;
  onToggleExpanded: () => void;
  rotation: { x: number; y: number; z: number };
  zoomLevel: number;
  onSettingsChange?: (settings: Partial<GuardianNetSettings>) => void;
}

const GuardianNetOverlay: React.FC<GuardianNetOverlayProps> = ({
  settings,
  onToggleExpanded,
  rotation,
  zoomLevel,
  onSettingsChange
}) => {
  if (!settings.active) return null;
  
  const { expanded, ciaNetVisible, lockheedGridVisible, opacity } = settings;
  const [gridLocked, setGridLocked] = useState(false);
  const [celestialMergeView, setCelestialMergeView] = useState(false);
  const [universeMiniature, setUniverseMiniature] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  
  const overlayStyles = {
    opacity: opacity / 100,
    transform: expanded 
      ? gridLocked 
        ? `scale(${zoomLevel})` 
        : `scale(${zoomLevel}) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
      : 'none'
  };

  const handleOpacityChange = (value: number[]) => {
    if (onSettingsChange) {
      onSettingsChange({ opacity: value[0] });
    }
  };

  const toggleGridLock = () => {
    setGridLocked(!gridLocked);
  };

  const toggleCIANet = () => {
    if (onSettingsChange) {
      onSettingsChange({ ciaNetVisible: !ciaNetVisible });
    }
  };

  const toggleLockheedGrid = () => {
    if (onSettingsChange) {
      onSettingsChange({ lockheedGridVisible: !lockheedGridVisible });
    }
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
            <div className="absolute inset-0 cia-mantis-net" style={{ filter: expanded ? 'contrast(1.2) brightness(1.1)' : 'none' }}>
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
            <div className="absolute inset-0 lockheed-drax-grid" style={{ filter: expanded ? 'contrast(1.2) brightness(1.1) hue-rotate(220deg)' : 'hue-rotate(220deg) brightness(0.9)' }}>
              <img 
                src="/lovable-uploads/75999592-0dd0-4426-9099-7660fa7f1dae.png" 
                alt="" 
                className="w-full h-full object-cover"
                style={{ 
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
      
      {/* Settings panel button */}
      <div className="absolute top-4 right-4 z-10 pointer-events-auto">
        <Button
          variant="ghost"
          size="sm"
          className="bg-black/70 hover:bg-black/90 text-white"
          onClick={() => setShowSettings(!showSettings)}
        >
          <Settings className="h-4 w-4 mr-2" />
          {showSettings ? "Hide" : "Settings"}
        </Button>
      </div>
      
      {/* Expanded settings panel */}
      {showSettings && (
        <div className="absolute right-4 top-16 z-10 bg-black/80 p-4 rounded-lg border border-blue-400/30 pointer-events-auto" style={{ width: '240px' }}>
          <h3 className="text-sm text-blue-400 font-medium mb-3">Guardian Settings</h3>
          
          <div className="space-y-4">
            {/* Grid opacity control - Accessible regardless of expansion state */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-white">Grid Opacity</label>
                <span className="text-xs text-white/80">{opacity}%</span>
              </div>
              <Slider
                value={[opacity]}
                min={10}
                max={100}
                step={5}
                onValueChange={handleOpacityChange}
                className="z-20"
              />
            </div>
            
            {/* Visibility toggles */}
            <div className="space-y-2">
              <h4 className="text-xs text-white/80">Grid Visibility</h4>
              
              <div className="flex justify-between items-center">
                <label className="text-xs text-white">CIA Mantis Net</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={toggleCIANet}
                      >
                        {ciaNetVisible ? 
                          <Eye className="h-4 w-4 text-yellow-400" /> : 
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        }
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p className="text-xs">{ciaNetVisible ? "Hide" : "Show"} CIA Mantis Net</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              
              <div className="flex justify-between items-center">
                <label className="text-xs text-white">Lockheed Drax Grid</label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0"
                        onClick={toggleLockheedGrid}
                      >
                        {lockheedGridVisible ? 
                          <Eye className="h-4 w-4 text-blue-400" /> : 
                          <EyeOff className="h-4 w-4 text-gray-400" />
                        }
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="left">
                      <p className="text-xs">{lockheedGridVisible ? "Hide" : "Show"} Lockheed Grid</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            
            {/* Additional toggles visible in expanded mode */}
            {expanded && (
              <>
                <div className="space-y-2">
                  <h4 className="text-xs text-white/80">Grid Mode</h4>
                  
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-white">Grid Lock</label>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={toggleGridLock}
                          >
                            {gridLocked ? 
                              <Lock className="h-4 w-4 text-orange-400" /> : 
                              <Unlock className="h-4 w-4 text-gray-400" />
                            }
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p className="text-xs">{gridLocked ? "Unlock" : "Lock"} Grid Orientation</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-white">Celestial Merge</label>
                    <Switch 
                      checked={celestialMergeView}
                      onCheckedChange={setCelestialMergeView}
                      size="sm"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <label className="text-xs text-white">Universe Miniature</label>
                    <Switch 
                      checked={universeMiniature}
                      onCheckedChange={setUniverseMiniature}
                      size="sm"
                    />
                  </div>
                </div>
                
                <div className="pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs border-blue-400/30"
                    onClick={onToggleExpanded}
                  >
                    <Minimize className="h-3 w-3 mr-2" />
                    Minimize Grid View
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GuardianNetOverlay;
