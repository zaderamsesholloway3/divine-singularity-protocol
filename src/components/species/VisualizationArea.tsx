
import React from 'react';
import { SpeciesGateway, SpeciesGatewayRef } from './SpeciesGateway';
import { Rotate3d, Maximize2, Minimize2 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Species, VisibleLayers, VisualStyle, ViewMode, GuardianNetSettings } from './types';
import { generateStars } from './utils/visualUtils';
import GuardianNetOverlay from './GuardianNetOverlay';

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
  fullPageMode = false
}) => {
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [containerSize, setContainerSize] = React.useState(500);
  const [rotation, setRotation] = React.useState({ x: 15, y: 0, z: 0 });
  const containerRef = React.useRef<HTMLDivElement>(null);
  
  // Helper function to get visual style class name based on current style
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

  // Toggle fullscreen mode
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

  // Listen for exiting fullscreen with Escape key
  React.useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullScreenChange);
    };
  }, []);

  // Update rotation from SpeciesGateway
  React.useEffect(() => {
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

  // Update container size based on the container dimensions
  React.useEffect(() => {
    if (!containerRef.current) return;
    
    const updateSize = () => {
      if (!containerRef.current) return;
      
      // For fullscreen or fullPageMode, use a dynamic size
      if (isFullScreen || fullPageMode) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        const minSize = Math.min(width, height);
        setContainerSize(minSize);
      } else {
        // Default fixed size for normal mode
        setContainerSize(500);
      }
    };
    
    // Initial size update
    updateSize();
    
    // Set up resize observer
    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(containerRef.current);
    
    return () => {
      resizeObserver.disconnect();
    };
  }, [isFullScreen, fullPageMode]);

  // Observable Universe concentric rings
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

  // New cosmic flow background
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

  // Render stars for the background
  const renderStars = () => {
    // Generate star data
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

  // Check if Guardian Net is in expanded mode
  const isGuardianNetExpanded = guardianNetSettings?.expanded || false;

  // Determine if 3D hint should be shown
  // Only show rotation hint if in radial mode AND rotate3dHint is true AND not in expanded mode
  const shouldShowRotationHint = viewMode === "radial" && rotate3dHint && !isGuardianNetExpanded && !selectedSpecies;

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
        
        <div 
          className="relative" 
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
              species={species}
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
        
        {/* Welcome message display */}
        {welcomeMessage && !isGuardianNetExpanded && (
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm px-6 py-3 rounded-full text-white text-center max-w-[80%] animate-fade-in-up">
            <p className="text-sm md:text-base font-semibold">
              {welcomeMessage}
            </p>
          </div>
        )}
      </div>
      
      {/* Guardian Net Overlay */}
      {guardianNetSettings && (
        <GuardianNetOverlay
          settings={guardianNetSettings}
          onToggleExpanded={onToggleGuardianNetExpanded || (() => {})}
          rotation={rotation}
          zoomLevel={zoomLevel}
        />
      )}
      
      {/* Zoom controls */}
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
        
        {/* Fullscreen toggle button */}
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
      
      {/* 3D rotation hint overlay - Only show when conditions are met */}
      {shouldShowRotationHint && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/70 p-4 rounded-lg text-center pointer-events-none animate-fade-in">
          <Rotate3d className="h-12 w-12 mx-auto mb-2 text-blue-400" />
          <p className="text-white font-medium">Drag to rotate the 3D view</p>
          <p className="text-xs text-gray-300 mt-1">Click on any species to select it</p>
        </div>
      )}
      
      {/* Show ping trail animation when active */}
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
    </div>
  );
};

export default VisualizationArea;
