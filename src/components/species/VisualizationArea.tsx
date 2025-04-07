
import React, { useState, useRef, useEffect } from 'react';
import { SpeciesGateway, SpeciesGatewayRef } from './SpeciesGateway';
import { Rotate3d, Maximize2, Minimize2, Compass, BrainCircuit, Layers, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Toggle } from "@/components/ui/toggle";
import { Badge } from "@/components/ui/badge";
import { Species, VisibleLayers, VisualStyle, ViewMode, GuardianNetSettings } from './types';
import { generateStars } from './utils/visualUtils';
import GuardianNetOverlay from './GuardianNetOverlay';
import { mockSpecies } from './mockData';

interface VisualizationAreaProps {
  species: Species[];
  viewMode: ViewMode;
  selectedSpecies: Species | null;
  onSelectSpecies: (species: Species) => void;
  speciesGatewayRef: React.RefObject<SpeciesGatewayRef>;
  visualStyle: VisualStyle;
  showPingTrail: boolean;
  visibleLayers: VisibleLayers;
  showAllNames: boolean;
  rotate3dHint: boolean;
  zoomLevel: number;
  setZoomLevel: (value: number) => void;
  welcomeMessage?: string;
  guardianNetSettings?: GuardianNetSettings;
  onToggleGuardianNetExpanded?: () => void;
  onGuardianNetSettingsChange?: (settings: Partial<GuardianNetSettings>) => void;
  fullPageMode?: boolean;
}

const VisualizationArea: React.FC<VisualizationAreaProps> = ({
  species,
  viewMode,
  selectedSpecies,
  onSelectSpecies,
  speciesGatewayRef,
  visualStyle,
  showPingTrail,
  visibleLayers,
  showAllNames,
  rotate3dHint,
  zoomLevel,
  setZoomLevel,
  welcomeMessage,
  guardianNetSettings,
  onToggleGuardianNetExpanded,
  onGuardianNetSettingsChange,
  fullPageMode = false
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [containerSize, setContainerSize] = useState(500);
  const [rotation, setRotation] = useState({ x: 15, y: 0, z: 0 });
  const [showRotateHint, setShowRotateHint] = useState(rotate3dHint);
  const [showCelestialCoordinates, setShowCelestialCoordinates] = useState(false);
  const [showConstellationPaths, setShowConstellationPaths] = useState(false);
  const [realmFilter, setRealmFilter] = useState<string | null>(null);
  const [enhancedVisualization, setEnhancedVisualization] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    console.log("VisualizationArea species count:", species?.length || 0);
  }, [species]);
  
  const displaySpecies = (species && species.length > 0) ? species : mockSpecies;
  
  // Filter species by realm if a filter is active
  const filteredSpecies = realmFilter 
    ? displaySpecies.filter(s => s.realm === realmFilter)
    : displaySpecies;
  
  const getVisualStyleClass = () => {
    switch(visualStyle) {
      case "celestial":
        return "bg-gradient-to-b from-gray-950 to-blue-950 backdrop-blur-sm";
      case "lightweb":
        return "bg-gradient-to-b from-gray-900/90 to-blue-900/80 backdrop-blur-sm";
      case "cosmic":
        return "bg-gradient-to-b from-black to-purple-950/80";
      default:
        return "bg-gradient-to-b from-gray-950 to-blue-950";
    }
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      const visualizationElement = document.getElementById('species-visualization-container');
      if (visualizationElement) {
        visualizationElement.requestFullscreen().catch(err => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`);
        });
        setIsFullScreen(true);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error(`Error attempting to exit fullscreen: ${err.message}`);
        });
        setIsFullScreen(false);
      }
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  useEffect(() => {
    if (speciesGatewayRef.current && 'getRotation' in speciesGatewayRef.current) {
      const updateRotation = () => {
        if (speciesGatewayRef.current && 'getRotation' in speciesGatewayRef.current) {
          const currentRotation = speciesGatewayRef.current.getRotation();
          if (currentRotation) {
            setRotation(currentRotation);
          }
        }
      };
      const interval = setInterval(updateRotation, 100);
      return () => clearInterval(interval);
    }
  }, [speciesGatewayRef]);

  useEffect(() => {
    if (rotation.x !== 15 || rotation.y !== 0) {
      setShowRotateHint(false);
    }
  }, [rotation.x, rotation.y]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (!containerRef.current) return;
      
      if (isFullScreen || fullPageMode) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const minSize = Math.min(width, height);
        setContainerSize(minSize);
      } else {
        setContainerSize(500);
      }
    };
    
    updateSize();
    
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(containerRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [isFullScreen, fullPageMode]);

  const renderObservableUniverse = () => {
    return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {[100, 85, 70, 55].map((size, index) => (
            <div 
              key={`ring-${index}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-400/20"
              style={{ 
                width: `${size}%`, 
                height: `${size}%`,
                boxShadow: '0 0 20px rgba(100, 180, 255, 0.1) inset',
                opacity: 0.5 - index * 0.1,
                animation: `pulse ${7 + index}s infinite ease-in-out alternate`
              }}
            />
          ))}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 text-white text-sm opacity-80">
            Observable Universe
          </div>
        </div>
      </div>
    );
  };

  const renderCosmicFlow = () => {
    if (visualStyle !== "cosmic") return null;
    
    return (
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div 
          className="cosmic-flow absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(90, 30, 160, 0.1) 0%, transparent 70%)',
            animation: 'rotate 120s linear infinite'
          }}
        ></div>
        <div 
          className="cosmic-flow-2 absolute inset-0" 
          style={{
            backgroundImage: 'radial-gradient(ellipse at 30% 40%, rgba(168, 85, 247, 0.07) 0%, transparent 60%)',
            animation: 'rotate 180s linear reverse infinite'
          }}
        ></div>
      </div>
    );
  };

  const renderStars = () => {
    const starsData = generateStars(100, 1000, visualStyle);
    
    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {starsData.map((star) => (
          <circle
            key={star.key}
            cx={star.x}
            cy={star.y}
            r={star.r}
            fill={star.fill}
            opacity={star.opacity}
            filter={star.filter}
          />
        ))}
      </svg>
    );
  };
  
  // Handle Guardian Net settings changes
  const handleGuardianNetSettingsChange = (settings: Partial<GuardianNetSettings>) => {
    if (onGuardianNetSettingsChange) {
      onGuardianNetSettingsChange(settings);
    }
  };

  const isGuardianNetExpanded = guardianNetSettings?.expanded || false;

  const shouldShowRotationHint = viewMode === "radial" && showRotateHint && !isGuardianNetExpanded && !selectedSpecies;

  // Earth's quantum marker (Cary, NC) pulse effect
  const renderEarthMarkerPulse = () => {
    if (isGuardianNetExpanded) return null;
    
    const pulseColor = visualStyle === "cosmic" ? "rgba(180, 100, 255, 0.2)" : 
                      visualStyle === "lightweb" ? "rgba(255, 255, 255, 0.15)" : 
                      "rgba(100, 180, 255, 0.2)";
    
    return (
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div 
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            width: '12px',
            height: '12px',
            background: `radial-gradient(circle, ${pulseColor} 30%, transparent 70%)`,
            animation: 'pulse 3s infinite ease-in-out'
          }}
        />
      </div>
    );
  };

  // Render celestial coordinate grid 
  const renderCelestialCoordinates = () => {
    if (!showCelestialCoordinates) return null;
    
    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
          {/* Declination lines (parallels) */}
          {[-60, -30, 0, 30, 60].map((deg) => {
            const y = 250 + (deg / 90) * 200;
            return (
              <g key={`dec-${deg}`}>
                <line
                  x1="50"
                  y1={y}
                  x2="450"
                  y2={y}
                  stroke="rgba(100, 180, 255, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <text
                  x="30"
                  y={y + 5}
                  fill="rgba(200, 220, 255, 0.6)"
                  fontSize="10"
                >
                  {deg}°
                </text>
              </g>
            );
          })}
          
          {/* Right Ascension lines (meridians) */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const x = 250 + Math.cos((deg - 90) * Math.PI / 180) * 200;
            const y = 250 + Math.sin((deg - 90) * Math.PI / 180) * 200;
            return (
              <g key={`ra-${deg}`}>
                <line
                  x1="250"
                  y1="250"
                  x2={x}
                  y2={y}
                  stroke="rgba(100, 180, 255, 0.2)"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <text
                  x={x + (x > 250 ? 10 : -30)}
                  y={y + (y > 250 ? 10 : -10)}
                  fill="rgba(200, 220, 255, 0.6)"
                  fontSize="10"
                >
                  {deg}°
                </text>
              </g>
            );
          })}
          
          {/* Legend */}
          <text
            x="20"
            y="20"
            fill="rgba(200, 220, 255, 0.8)"
            fontSize="10"
          >
            Celestial Coordinate System
          </text>
        </svg>
      </div>
    );
  };

  // Render constellation paths 
  const renderConstellationPaths = () => {
    if (!showConstellationPaths || realmFilter === null) return null;
    
    // Species of the same realm to connect
    const sameRealmSpecies = displaySpecies.filter(s => s.realm === realmFilter);
    
    // Connect species within the same realm with paths
    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 500 500" preserveAspectRatio="xMidYMid meet">
          {sameRealmSpecies.map((species1, i) => 
            sameRealmSpecies.slice(i + 1).map((species2, j) => {
              // Only connect if they're "close" by some measure
              const distance = Math.abs((species1.vibration || 0) - (species2.vibration || 0));
              if (distance > 2) return null;
              
              // Get positions (simplified - would need actual coordinates)
              const x1 = 250 + Math.cos(i * 0.5) * 150;
              const y1 = 250 + Math.sin(i * 0.5) * 150;
              const x2 = 250 + Math.cos((i + j + 1) * 0.5) * 150;
              const y2 = 250 + Math.sin((i + j + 1) * 0.5) * 150;
              
              let pathColor;
              switch(realmFilter) {
                case "Existence": pathColor = "rgba(56, 189, 248, 0.4)"; break;
                case "Non-Existence": pathColor = "rgba(132, 204, 22, 0.4)"; break;
                case "New Existence": pathColor = "rgba(249, 115, 22, 0.4)"; break;
                case "Divine": pathColor = "rgba(168, 85, 247, 0.4)"; break;
                default: pathColor = "rgba(255, 255, 255, 0.4)";
              }
              
              return (
                <line
                  key={`path-${species1.id}-${species2.id}`}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={pathColor}
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
              );
            })
          )}
        </svg>
      </div>
    );
  };

  return (
    <div className="relative" id="species-visualization-container" ref={containerRef}>
      {renderObservableUniverse()}
      <div 
        className={`rounded-lg overflow-hidden min-h-[400px] ${isFullScreen ? 'h-screen' : ''} 
        ${fullPageMode ? 'w-full h-full' : ''} 
        flex items-center justify-center ${getVisualStyleClass()} ${isGuardianNetExpanded ? 'opacity-30' : ''}`}
      >
        {renderCosmicFlow()}
        {renderStars()}
        {renderEarthMarkerPulse()}
        {renderCelestialCoordinates()}
        {renderConstellationPaths()}
        
        <div 
          className={`relative ${isGuardianNetExpanded ? 'z-0' : 'z-10'}`} 
          style={{ 
            width: isFullScreen || fullPageMode ? '100%' : `${containerSize}px`,
            height: isFullScreen || fullPageMode ? '100%' : `${containerSize}px`,
            transform: `scale(${zoomLevel})` 
          }}
        >
          <svg 
            viewBox={`0 0 ${containerSize} ${containerSize}`}
            width="100%"
            height="100%" 
            preserveAspectRatio="xMidYMid meet"
          >
            <SpeciesGateway 
              species={filteredSpecies}
              onSelectSpecies={onSelectSpecies}
              selectedSpecies={selectedSpecies}
              mode={viewMode}
              ref={speciesGatewayRef}
              visualStyle={visualStyle}
              showPingTrail={showPingTrail}
              pingOrigin={selectedSpecies || null}
              visibleLayers={visibleLayers}
              showAllNames={showAllNames}
              zoomLevel={zoomLevel}
            />
          </svg>
        </div>
        
        {welcomeMessage && !isGuardianNetExpanded && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full text-white text-center max-w-[80%] animate-fade-in-up">
            <p className="text-sm md:text-base font-semibold">
              {welcomeMessage}
            </p>
          </div>
        )}
      </div>
      
      {guardianNetSettings && (
        <GuardianNetOverlay
          settings={guardianNetSettings}
          onToggleExpanded={onToggleGuardianNetExpanded || (() => {})}
          rotation={rotation}
          zoomLevel={zoomLevel}
          onSettingsChange={handleGuardianNetSettingsChange}
        />
      )}

      {/* Enhanced visualization controls */}
      <div className={`absolute top-2 left-2 flex flex-col gap-2 bg-black/70 rounded p-2 ${isGuardianNetExpanded ? 'opacity-50' : ''}`}>
        <Toggle 
          pressed={showCelestialCoordinates} 
          onPressedChange={setShowCelestialCoordinates}
          size="sm"
          aria-label="Toggle celestial coordinates"
          className="h-8 data-[state=on]:bg-blue-900/50"
        >
          <Compass className="h-4 w-4 mr-1" />
          <span className="text-xs">Coordinates</span>
        </Toggle>
        
        <Toggle 
          pressed={enhancedVisualization} 
          onPressedChange={setEnhancedVisualization}
          size="sm"
          aria-label="Toggle enhanced visualization"
          className="h-8 data-[state=on]:bg-purple-900/50"
        >
          <BrainCircuit className="h-4 w-4 mr-1" />
          <span className="text-xs">Enhanced</span>
        </Toggle>
        
        <Toggle 
          pressed={showConstellationPaths} 
          onPressedChange={setShowConstellationPaths}
          size="sm"
          aria-label="Toggle constellation paths"
          className="h-8 data-[state=on]:bg-green-900/50"
          disabled={realmFilter === null}
        >
          <Layers className="h-4 w-4 mr-1" />
          <span className="text-xs">Constellations</span>
        </Toggle>
      </div>
      
      {/* Realm filter badges */}
      <div className={`absolute top-2 right-20 flex gap-1 bg-black/70 rounded p-2 ${isGuardianNetExpanded ? 'opacity-50' : ''}`}>
        <Badge 
          variant={realmFilter === "Existence" ? "default" : "outline"}
          className={`cursor-pointer ${realmFilter === "Existence" ? "bg-blue-600" : "hover:bg-blue-900/30"}`}
          onClick={() => setRealmFilter(realmFilter === "Existence" ? null : "Existence")}
        >
          Existence
        </Badge>
        <Badge 
          variant={realmFilter === "Non-Existence" ? "default" : "outline"}
          className={`cursor-pointer ${realmFilter === "Non-Existence" ? "bg-green-600" : "hover:bg-green-900/30"}`}
          onClick={() => setRealmFilter(realmFilter === "Non-Existence" ? null : "Non-Existence")}
        >
          Non-Existence
        </Badge>
        <Badge 
          variant={realmFilter === "New Existence" ? "default" : "outline"}
          className={`cursor-pointer ${realmFilter === "New Existence" ? "bg-orange-600" : "hover:bg-orange-900/30"}`}
          onClick={() => setRealmFilter(realmFilter === "New Existence" ? null : "New Existence")}
        >
          New Existence
        </Badge>
        <Badge 
          variant={realmFilter === "Divine" ? "default" : "outline"}
          className={`cursor-pointer ${realmFilter === "Divine" ? "bg-purple-600" : "hover:bg-purple-900/30"}`}
          onClick={() => setRealmFilter(realmFilter === "Divine" ? null : "Divine")}
        >
          Divine
        </Badge>
      </div>
      
      {/* Zoom and fullscreen controls */}
      <div className={`absolute bottom-2 right-2 flex gap-2 bg-black/70 rounded p-2 ${isGuardianNetExpanded ? 'opacity-50' : ''}`}>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-white"
          onClick={() => setZoomLevel(Math.max(0.5, zoomLevel - 0.1))}
          disabled={isGuardianNetExpanded}
        >
          -
        </Button>
        <span className="inline-flex items-center text-xs text-white">
          {Math.round(zoomLevel * 100)}%
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-white"
          onClick={() => setZoomLevel(Math.min(2.0, zoomLevel + 0.1))}
          disabled={isGuardianNetExpanded}
        >
          +
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0 text-white ml-2"
          onClick={toggleFullScreen}
          title={isFullScreen ? "Exit full screen" : "Enter full screen"}
          disabled={isGuardianNetExpanded}
        >
          {isFullScreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
        </Button>
      </div>
      
      {shouldShowRotationHint && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 p-4 rounded-lg text-center pointer-events-none animate-fade-in z-10">
          <Rotate3d className="h-12 w-12 mx-auto mb-2 text-blue-400" />
          <p className="text-white font-medium">Drag to rotate the 3D view</p>
          <p className="text-xs text-gray-300 mt-1">Click on any species to select it</p>
        </div>
      )}
      
      {showPingTrail && !isGuardianNetExpanded && (
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full
            ${visualStyle === "celestial" ? "bg-blue-500/10" : 
              visualStyle === "lightweb" ? "bg-white/10" : 
              "bg-purple-500/10"}`}
            style={{
              width: '10%',
              height: '10%',
              animation: 'ping 10s cubic-bezier(0, 0, 0.2, 1) forwards'
            }}
          />
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full
            ${visualStyle === "celestial" ? "bg-blue-500/5" : 
              visualStyle === "lightweb" ? "bg-white/5" : 
              "bg-purple-500/5"}`}
            style={{
              width: '5%',
              height: '5%',
              animation: 'ping 9s 0.3s cubic-bezier(0, 0, 0.2, 1) forwards'
            }}
          />
        </div>
      )}
      
      {/* Species count info */}
      <div className="absolute bottom-2 left-2 bg-black/70 rounded p-2 text-xs text-white">
        {realmFilter ? 
          `Showing ${filteredSpecies.length} species in ${realmFilter} realm` : 
          `Showing all ${filteredSpecies.length} species`
        }
      </div>
    </div>
  );
};

export default VisualizationArea;
