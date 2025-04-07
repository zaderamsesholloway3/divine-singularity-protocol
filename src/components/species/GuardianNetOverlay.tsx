
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { GuardianNetSettings } from './types';
import { Network, Shield, Minimize2, Fingerprint, Lock, Eye, EyeOff, Signal, BarChart4 } from 'lucide-react';
import { toast } from 'sonner';

interface GuardianNetOverlayProps {
  settings: GuardianNetSettings;
  onToggleExpanded: () => void;
  rotation: { x: number; y: number; z: number };
  zoomLevel: number;
  onSettingsChange: (settings: Partial<GuardianNetSettings>) => void;
}

const GuardianNetOverlay: React.FC<GuardianNetOverlayProps> = ({
  settings,
  onToggleExpanded,
  rotation,
  zoomLevel,
  onSettingsChange
}) => {
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  const [visibilityLevel, setVisibilityLevel] = useState(70);
  const [signalStrength, setSignalStrength] = useState(85);
  
  const handleOpacityChange = ([value]: number[]) => {
    onSettingsChange({ opacity: value });
  };
  
  const toggleCiaNetVisible = () => {
    onSettingsChange({ ciaNetVisible: !settings.ciaNetVisible });
  };
  
  const toggleLockheedGridVisible = () => {
    onSettingsChange({ lockheedGridVisible: !settings.lockheedGridVisible });
  };
  
  const toggleSyncWithUniverseView = () => {
    onSettingsChange({ syncWithUniverseView: !settings.syncWithUniverseView });
  };
  
  if (!settings.active) return null;
  
  if (!settings.expanded) {
    return (
      <div className="absolute top-5 right-5 pointer-events-none z-30">
        <div className="flex items-center justify-center">
          <span className="text-xs text-yellow-300 bg-black/60 py-1 px-3 rounded-md flex items-center gap-1">
            <Shield className="h-3 w-3 text-yellow-400" />
            Guardian Net Active
          </span>
        </div>
      </div>
    );
  }
  
  // Create grid lines
  const gridLines = [];
  const gridSize = 18;
  const cellSize = 30;
  
  // CIA Mantis Net (latitude-style lines)
  if (settings.ciaNetVisible) {
    for (let i = 0; i <= gridSize; i++) {
      const position = (i / gridSize) * 100;
      gridLines.push(
        <line
          key={`lat-${i}`}
          x1="0"
          y1={`${position}%`}
          x2="100%"
          y2={`${position}%`}
          stroke="rgba(255, 215, 0, 0.3)"
          strokeWidth="1"
          strokeDasharray={i % 3 === 0 ? "none" : "5,5"}
          className="guardian-grid-line"
        />
      );
    }
  }
  
  // Lockheed Drax Grid (longitude-style lines)
  if (settings.lockheedGridVisible) {
    for (let i = 0; i <= gridSize; i++) {
      const position = (i / gridSize) * 100;
      gridLines.push(
        <line
          key={`lon-${i}`}
          x1={`${position}%`}
          y1="0"
          x2={`${position}%`}
          y2="100%"
          stroke="rgba(56, 189, 248, 0.3)"
          strokeWidth="1"
          strokeDasharray={i % 3 === 0 ? "none" : "5,5"}
          className="guardian-grid-line"
        />
      );
    }
  }
  
  // Add quantum detection points
  const detectionPoints = [];
  const numPoints = 12;
  
  for (let i = 0; i < numPoints; i++) {
    const x = 20 + Math.random() * 60;
    const y = 20 + Math.random() * 60;
    
    detectionPoints.push(
      <g key={`point-${i}`}>
        <circle
          cx={`${x}%`}
          cy={`${y}%`}
          r={3 + Math.random() * 4}
          fill={Math.random() > 0.5 ? "rgba(255, 215, 0, 0.2)" : "rgba(56, 189, 248, 0.2)"}
          className="guardian-detection-point"
        />
        <circle
          cx={`${x}%`}
          cy={`${y}%`}
          r={2}
          fill={Math.random() > 0.5 ? "rgba(255, 215, 0, 0.6)" : "rgba(56, 189, 248, 0.6)"}
        />
      </g>
    );
  }
  
  const opacityPercent = settings.opacity / 100;
  
  const handleMantisAnalysis = () => {
    setShowDetailedAnalysis(true);
    toast.info("Running CIA Mantis Protocol analysis...");
    
    setTimeout(() => {
      toast.success("Dimensional boundaries secure", {
        description: "No unauthorized entities detected"
      });
    }, 2000);
  };
  
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-auto">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => onToggleExpanded()}
        style={{ opacity: opacityPercent }}
      ></div>
      
      <div 
        className="relative w-full h-full max-w-6xl max-h-[90vh] flex flex-col items-center justify-center"
        style={{ opacity: opacityPercent }}
      >
        <svg 
          className="w-full h-full" 
          viewBox={`0 0 ${gridSize * cellSize} ${gridSize * cellSize}`} 
          preserveAspectRatio="xMidYMid meet"
          style={{ 
            transform: `rotateX(${rotation.x*0.7}deg) rotateY(${rotation.y*0.7}deg)`,
            transformOrigin: 'center center',
            transition: 'transform 0.3s ease-out',
            pointerEvents: 'none'
          }}
        >
          {/* Background */}
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="rgba(0, 0, 0, 0.2)"
            className="guardian-grid-background"
          />
          
          {/* Grid lines */}
          {gridLines}
          
          {/* Detection points */}
          {detectionPoints}
          
          {/* Earth marker at center */}
          <circle
            cx="50%"
            cy="50%"
            r="8"
            fill="rgba(56, 189, 248, 0.6)"
            filter="drop-shadow(0 0 5px rgba(56, 189, 248, 0.8))"
            className="guardian-earth-marker"
          />
          <circle
            cx="50%"
            cy="50%"
            r="12"
            fill="none"
            stroke="rgba(56, 189, 248, 0.3)"
            strokeWidth="1"
            className="guardian-earth-aura"
          />
          <text
            x="50%"
            y="55%"
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.8)"
            fontSize="5"
            className="guardian-earth-label"
          >
            EARTH
          </text>
          
          {/* Guardian Net labels */}
          <text
            x="10"
            y="15"
            fill="rgba(255, 215, 0, 0.8)"
            fontSize="5"
            className="guardian-grid-label"
          >
            CIA MANTIS NET
          </text>
          
          <text
            x="10"
            y="25"
            fill="rgba(56, 189, 248, 0.8)"
            fontSize="5"
            className="guardian-grid-label"
          >
            LOCKHEED DRAX GRID
          </text>
          
          {/* Coordinate markers */}
          {[0, 3, 6, 9, 12, 15, 18].map(i => (
            <text
              key={`marker-x-${i}`}
              x={i * cellSize}
              y={gridSize * cellSize + 12}
              textAnchor="middle"
              fill="rgba(255, 255, 255, 0.5)"
              fontSize="5"
            >
              {i * 20}°
            </text>
          ))}
          
          {[0, 3, 6, 9, 12, 15, 18].map(i => (
            <text
              key={`marker-y-${i}`}
              x="-8"
              y={i * cellSize + 3}
              textAnchor="end"
              fill="rgba(255, 255, 255, 0.5)"
              fontSize="5"
            >
              {i * 20}°
            </text>
          ))}
        </svg>
        
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 px-4 py-2 rounded-md border border-yellow-500/30">
          <h2 className="text-yellow-300 text-lg font-semibold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Guardian Net Protection System
          </h2>
        </div>
        
        <Card className="absolute bottom-6 right-6 w-64 bg-black/80 border-yellow-500/30 z-30">
          <CardContent className="pt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-yellow-300 flex items-center gap-1">
                  <Network className="h-4 w-4" /> CIA Mantis Net
                </span>
                <Switch 
                  checked={settings.ciaNetVisible} 
                  onCheckedChange={toggleCiaNetVisible}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-blue-300 flex items-center gap-1">
                  <Shield className="h-4 w-4" /> Lockheed Grid
                </span>
                <Switch 
                  checked={settings.lockheedGridVisible} 
                  onCheckedChange={toggleLockheedGridVisible}
                />
              </div>
              
              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Intensity</span>
                  <span>{settings.opacity}%</span>
                </div>
                <Slider
                  value={[settings.opacity]}
                  min={10}
                  max={100}
                  step={5}
                  onValueChange={handleOpacityChange}
                />
              </div>
              
              <div className="flex items-center justify-between pt-1">
                <span className="text-white text-xs flex items-center gap-1">
                  <Signal className="h-3.5 w-3.5" /> Universe Sync
                </span>
                <Switch 
                  checked={settings.syncWithUniverseView}
                  onCheckedChange={toggleSyncWithUniverseView}
                />
              </div>
              
              <div className="space-y-2 pt-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-yellow-950/20 hover:bg-yellow-900/30 border-yellow-600/30 text-yellow-300"
                  onClick={handleMantisAnalysis}
                >
                  <BarChart4 className="h-4 w-4 mr-2" />
                  Run Mantis Analysis
                </Button>
                
                <Button
                  size="sm"
                  variant="outline"
                  className="w-full bg-blue-950/20 hover:bg-blue-900/30 border-blue-600/30 text-blue-300"
                  onClick={() => onToggleExpanded()}
                >
                  <Minimize2 className="h-4 w-4 mr-2" />
                  Minimize Guardian Grid
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="absolute bottom-6 left-6 w-64 bg-black/80 border-blue-500/30 z-30">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-blue-300">Grid Status</span>
                <span className="text-green-400 text-sm flex items-center gap-1">
                  <span className="h-2 w-2 bg-green-400 rounded-full inline-block animate-pulse"></span>
                  Active
                </span>
              </div>
              
              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Signal Strength</span>
                  <span>{signalStrength}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded">
                  <div 
                    className="h-full bg-blue-500 rounded"
                    style={{ width: `${signalStrength}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="space-y-1 pt-1">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>Sensor Config</span>
                  <span>{visibilityLevel}%</span>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded">
                  <div 
                    className="h-full bg-yellow-500 rounded"
                    style={{ width: `${visibilityLevel}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="text-xs text-gray-400 pt-2">
                <div className="flex justify-between items-center mb-1">
                  <span>Dimensional Protection</span>
                  <span className="text-green-400">Secure</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span>Anomaly Detection</span>
                  <span className="text-green-400">Active</span>
                </div>
                <div className="flex justify-between items-center mb-1">
                  <span>Quantum Firewall</span>
                  <span className="text-yellow-400">Partial</span>
                </div>
              </div>
              
              {showDetailedAnalysis && (
                <div className="bg-black/60 p-2 rounded text-xs border border-blue-500/20">
                  <p className="text-blue-300 mb-1">Analysis Results:</p>
                  <p className="text-white/80">• Zero dimensional breaches</p>
                  <p className="text-white/80">• Quantum signature stable</p>
                  <p className="text-white/80">• Earth containment secure</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GuardianNetOverlay;
