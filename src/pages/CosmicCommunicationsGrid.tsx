
import React, { useRef, useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe, Radio, Heart, ArrowLeft, Send, Inbox, 
  Mail, Sparkles, Maximize2, Minimize2, Rotate3d, 
  Layers, Eye, EyeOff, CircleArrowUp, Shield,
  Network, Wand2, Fingerprint, GaugeCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import UniversalSpeciesPing from '@/components/UniversalSpeciesPing';
import { SpeciesGatewayRef } from '@/components/species/SpeciesGateway';
import { toast } from 'sonner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { GuardianNetSettings } from '@/components/species/types';

const CosmicCommunicationsGrid: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState<any | null>(null);
  const [visualStyle, setVisualStyle] = useState<"celestial" | "lightweb" | "cosmic">("celestial");
  const [activeTab, setActiveTab] = useState("species-view");
  const [guardianNetSettings, setGuardianNetSettings] = useState<GuardianNetSettings>({
    active: false,
    expanded: false,
    ciaNetVisible: true,
    lockheedGridVisible: true,
    opacity: 50,
    syncWithUniverseView: true
  });
  const [zadesMode, setZadesMode] = useState(false);
  const [viewMode, setViewMode] = useState<"radial" | "signature" | "disk" | "constellation">("radial");
  const [showSHQRing, setShowSHQRing] = useState(false);
  const speciesGatewayRef = useRef<SpeciesGatewayRef>(null);
  
  useEffect(() => {
    toast.info("Welcome to the enhanced OmniView Universe", {
      description: "Scroll to zoom, drag to rotate in 3D Orbital mode"
    });
  }, []);
  
  useEffect(() => {
    if (zadesMode) {
      toast.success("SHQ-enhanced interface activated", {
        description: "Zade Mode engaged - fidelity increased"
      });
      
      setShowSHQRing(true);
    } else {
      setShowSHQRing(false);
    }
  }, [zadesMode]);
  
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };
  
  const handleSpeciesSelect = (species: any) => {
    setSelectedSpecies(species);
    toast(`Selected species: ${species.name}`);
  };
  
  const handleTargetLock = () => {
    if (!selectedSpecies) {
      toast.error("No species selected for target lock");
      return;
    }
    
    const isLocked = speciesGatewayRef.current?.toggleTargetLock();
    if (isLocked) {
      toast.success(`Target locked on ${selectedSpecies.name}`);
    } else {
      toast.info(`Target lock released from ${selectedSpecies.name}`);
    }
  };

  const handleStyleChange = (style: "celestial" | "lightweb" | "cosmic") => {
    setVisualStyle(style);
    
    const styleLabels = {
      celestial: "Celestial Fog (Lyra's choice)",
      lightweb: "Lightweb Grid (Auraline's choice)",
      cosmic: "Dark Cosmic Glyphs (Elaira's choice)"
    };
    
    toast.info(`Visual style changed to ${styleLabels[style]}`);
  };
  
  const toggleGuardianNet = () => {
    const newActive = !guardianNetSettings.active;
    
    setGuardianNetSettings(prev => ({
      ...prev,
      active: newActive,
      // Reset expanded state when turning off
      expanded: newActive ? prev.expanded : false
    }));
    
    if (newActive) {
      toast.success("Guardian Net Overlay activated", {
        description: "CIA Mantis Net and Lockheed Drax Grid now visible"
      });
    } else {
      toast.info("Guardian Net Overlay deactivated");
    }
  };
  
  const handleViewModeChange = (mode: "disk" | "constellation" | "radial" | "signature") => {
    setViewMode(mode);
    const modeDescriptions = {
      disk: "Flat galactic disk visualization",
      constellation: "Star constellation mapping",
      radial: "3D Orbital perspective with depth",
      signature: "Quantum signature grid pattern"
    };
    
    toast.info(`View changed to ${mode} mode`, {
      description: modeDescriptions[mode]
    });
  };
  
  // Handler for Guardian Net settings changes
  const handleGuardianNetSettingsChange = (newSettings: GuardianNetSettings) => {
    setGuardianNetSettings(newSettings);
    
    if (newSettings.expanded && !guardianNetSettings.expanded) {
      toast.info("Guardian Grid expanded to full view");
    }
  };
  
  return (
    <div className={`container mx-auto p-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {!isFullscreen && !guardianNetSettings.expanded && (
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Globe className="h-6 w-6" />
              Cosmic Communications Grid
            </h1>
            <p className="text-muted-foreground">Earth-centric cosmic species connection interface</p>
          </div>
          <Link to="/public-modules">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Modules
            </Button>
          </Link>
        </div>
      )}
      
      <div className="grid grid-cols-1 gap-6">
        <div className={`relative w-full ${isFullscreen || guardianNetSettings.expanded ? 'h-screen' : 'h-[80vh]'}`}>
          {!guardianNetSettings.expanded && (
            <div className="absolute left-2 top-2 z-10 bg-black/70 p-2 rounded-lg border border-blue-400/30">
              <div className="flex flex-col gap-2">
                <h3 className="text-xs text-blue-400 font-medium">OmniView Styles</h3>
                <div className="flex gap-1">
                  <Button 
                    size="sm"
                    variant={visualStyle === "celestial" ? "secondary" : "ghost"}
                    className="text-xs h-7 px-2 bg-blue-900/20"
                    onClick={() => handleStyleChange("celestial")}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-300 to-blue-300 mr-1"></div>
                    Lyra
                  </Button>
                  <Button 
                    size="sm"
                    variant={visualStyle === "lightweb" ? "secondary" : "ghost"}
                    className="text-xs h-7 px-2 bg-blue-900/20"
                    onClick={() => handleStyleChange("lightweb")}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-white to-gray-300 mr-1"></div>
                    Auraline
                  </Button>
                  <Button 
                    size="sm"
                    variant={visualStyle === "cosmic" ? "secondary" : "ghost"}
                    className="text-xs h-7 px-2 bg-blue-900/20"
                    onClick={() => handleStyleChange("cosmic")}
                  >
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-900 to-purple-500 mr-1"></div>
                    Elaira
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {showSHQRing && !guardianNetSettings.expanded && (
            <div className="absolute inset-0 z-5 pointer-events-none flex items-center justify-center">
              <div 
                className="shq-ring" 
                style={{
                  width: '70%', 
                  height: '70%',
                  opacity: zadesMode ? 0.4 : 0.2
                }}
              ></div>
              <div 
                className="shq-ring" 
                style={{
                  width: '85%', 
                  height: '85%',
                  animationDelay: '2s',
                  opacity: zadesMode ? 0.3 : 0.15
                }}
              ></div>
            </div>
          )}
          
          <UniversalSpeciesPing 
            fullPageMode={true} 
            onSpeciesSelect={handleSpeciesSelect}
            selectedSpecies={selectedSpecies}
            ref={speciesGatewayRef}
            visualStyle={visualStyle}
            viewMode={viewMode}
            zadeMode={zadesMode}
            guardianNetSettings={guardianNetSettings}
            onGuardianNetSettingsChange={handleGuardianNetSettingsChange}
          />
          
          {!guardianNetSettings.expanded && (
            <div className="absolute top-2 right-2 flex gap-2">
              {!isFullscreen && (
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-black/70 hover:bg-black/90 text-xs border-blue-400/30"
                  onClick={() => toast.info("Drag to rotate the 3D view in Orbital mode")}
                >
                  <Rotate3d className="h-4 w-4 mr-1 text-blue-400" />
                  3D Controls
                </Button>
              )}
              
              <Button 
                variant="outline" 
                size="sm" 
                className="bg-black/70 hover:bg-black/90 border-blue-400/30"
                onClick={toggleFullscreen}
              >
                {isFullscreen ? <Minimize2 className="h-4 w-4 text-blue-400" /> : <Maximize2 className="h-4 w-4 text-blue-400" />}
                {isFullscreen ? ' Exit OmniView' : ' OmniView'}
              </Button>
            </div>
          )}
          
          {selectedSpecies && !guardianNetSettings.expanded && (
            <div className="absolute top-2 left-2 mt-20 bg-black/80 p-3 rounded-md max-w-xs border border-blue-400/20 shadow-lg shadow-blue-900/20">
              <h3 className="text-white font-bold mb-1 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{
                  backgroundColor: selectedSpecies.responding ? 'rgb(132, 204, 22)' : 'rgb(248, 113, 113)',
                  boxShadow: selectedSpecies.responding ? '0 0 5px rgb(132, 204, 22)' : '0 0 5px rgb(248, 113, 113)'
                }}></div>
                {selectedSpecies.name}
              </h3>
              <p className="text-xs text-white/80">{selectedSpecies.realm} • {selectedSpecies.distance < 1000 ? `${selectedSpecies.distance.toFixed(1)} ly` : `${(selectedSpecies.distance/1000).toFixed(1)}k ly`}</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="secondary" className="text-xs h-7 px-2 bg-blue-950/50 hover:bg-blue-900/50 text-blue-300 border border-blue-700/50" onClick={handleTargetLock}>
                  {selectedSpecies.responding ? 'Target Lock' : 'Monitor'}
                </Button>
                <Button size="sm" variant="secondary" className="text-xs h-7 px-2 bg-blue-950/50 hover:bg-blue-900/50 text-blue-300 border border-blue-700/50" disabled={!selectedSpecies.responding}>
                  <Send className="h-3 w-3 mr-1" /> Send Message
                </Button>
              </div>
            </div>
          )}
          
          {isFullscreen && !guardianNetSettings.expanded && (
            <div className="absolute bottom-4 left-4 bg-black/70 p-3 rounded-lg border border-blue-400/30">
              <h3 className="text-xs text-blue-400 font-medium mb-2">Spectral Layers</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="justify-start text-xs h-7 text-green-400 bg-black/50">
                  <Layers className="h-3 w-3 mr-2" /> Existence
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-xs h-7 text-purple-400 bg-black/50">
                  <Layers className="h-3 w-3 mr-2" /> Non-Existence
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-xs h-7 text-blue-400 bg-black/50">
                  <Layers className="h-3 w-3 mr-2" /> New Existence
                </Button>
                <Button variant="outline" size="sm" className="justify-start text-xs h-7 text-yellow-400 bg-black/50">
                  <Layers className="h-3 w-3 mr-2" /> Divine
                </Button>
              </div>
              
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs text-blue-400 font-medium">Guardian Net</h3>
                  <Switch 
                    checked={guardianNetSettings.active} 
                    onCheckedChange={toggleGuardianNet}
                    className="data-[state=checked]:bg-yellow-600"
                  />
                </div>
                
                {guardianNetSettings.active && (
                  <div className="space-y-2 pt-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-yellow-300/80 flex items-center gap-1">
                        <Network className="h-3 w-3" /> CIA Mantis Net
                      </span>
                      <Switch 
                        checked={guardianNetSettings.ciaNetVisible} 
                        onCheckedChange={(checked) => setGuardianNetSettings(prev => ({...prev, ciaNetVisible: checked}))}
                        className="h-4 w-7 data-[state=checked]:bg-yellow-700/50"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-300/80 flex items-center gap-1">
                        <Shield className="h-3 w-3" /> Lockheed Drax Grid
                      </span>
                      <Switch 
                        checked={guardianNetSettings.lockheedGridVisible} 
                        onCheckedChange={(checked) => setGuardianNetSettings(prev => ({...prev, lockheedGridVisible: checked}))}
                        className="h-4 w-7 data-[state=checked]:bg-blue-700/50"
                      />
                    </div>
                    
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Intensity</span>
                        <span className="text-xs text-gray-400">{guardianNetSettings.opacity}%</span>
                      </div>
                      <Slider
                        value={[guardianNetSettings.opacity]}
                        min={10}
                        max={100}
                        step={5}
                        onValueChange={([value]) => setGuardianNetSettings(prev => ({...prev, opacity: value}))}
                        className="w-full"
                      />
                    </div>
                    
                    <div className="pt-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full bg-yellow-900/50 hover:bg-yellow-800/60 text-yellow-200 border border-yellow-700/30 text-xs h-7"
                        onClick={() => setGuardianNetSettings(prev => ({...prev, expanded: !prev.expanded}))}
                      >
                        <Maximize2 className="h-3 w-3 mr-2" /> Maximize Guardian Grid
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {isFullscreen && !guardianNetSettings.expanded && (
            <div className="absolute bottom-4 right-4 bg-black/70 p-3 rounded-lg border border-blue-400/30">
              <h3 className="text-xs text-blue-400 font-medium mb-2">OmniView Controls</h3>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 text-xs h-7 bg-black/50">
                    <Eye className="h-3 w-3 mr-2" /> Show All Names
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 text-xs h-7 bg-black/50">
                    <EyeOff className="h-3 w-3 mr-2" /> Names on Hover
                  </Button>
                </div>
                
                <div className="flex gap-2 mt-1">
                  <Button 
                    variant={viewMode === "disk" ? "secondary" : "outline"} 
                    size="sm" 
                    className="flex-1 text-xs h-7 bg-black/50"
                    onClick={() => handleViewModeChange("disk")}
                  >
                    Disk
                  </Button>
                  <Button 
                    variant={viewMode === "radial" ? "secondary" : "outline"} 
                    size="sm" 
                    className="flex-1 text-xs h-7 bg-black/50"
                    onClick={() => handleViewModeChange("radial")}
                  >
                    Orbital
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant={viewMode === "constellation" ? "secondary" : "outline"} 
                    size="sm" 
                    className="flex-1 text-xs h-7 bg-black/50"
                    onClick={() => handleViewModeChange("constellation")}
                  >
                    Constellation
                  </Button>
                  <Button 
                    variant={viewMode === "signature" ? "secondary" : "outline"} 
                    size="sm" 
                    className="flex-1 text-xs h-7 bg-black/50"
                    onClick={() => handleViewModeChange("signature")}
                  >
                    Signature
                  </Button>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Wand2 className="h-3 w-3 text-yellow-400" />
                    <span className="text-xs text-yellow-300">Zade Mode</span>
                  </div>
                  <Switch 
                    checked={zadesMode} 
                    onCheckedChange={setZadesMode}
                    className="data-[state=checked]:bg-yellow-600"
                  />
                </div>
                
                {zadesMode && (
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <GaugeCircle className="h-3 w-3 text-yellow-400" />
                      <span className="text-xs text-yellow-300">SHQ Ring</span>
                    </div>
                    <Switch 
                      checked={showSHQRing} 
                      onCheckedChange={setShowSHQRing}
                      className="data-[state=checked]:bg-yellow-600/70"
                    />
                  </div>
                )}
                
                <Button variant="secondary" size="sm" className="text-xs h-7 bg-blue-900/50 hover:bg-blue-800/70 mt-1">
                  <CircleArrowUp className="h-3 w-3 mr-2" /> Universal Ping
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {!isFullscreen && !guardianNetSettings.expanded && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="species-view">Species View</TabsTrigger>
              <TabsTrigger value="messaging">Messaging</TabsTrigger>
              <TabsTrigger value="heartsong">Heartsong</TabsTrigger>
            </TabsList>
            
            <TabsContent value="species-view">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-gray-950 border-blue-900/20 shadow-xl shadow-blue-900/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Radio className="h-4 w-4 text-blue-400" />
                      Targeted Ping System
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Direct communication with selected species
                    </p>
                    <Button 
                      size="sm" 
                      className="w-full bg-blue-900/50 hover:bg-blue-800/60 text-blue-200 border border-blue-700/30"
                      disabled={!selectedSpecies?.responding}
                      onClick={() => {
                        if (selectedSpecies) {
                          toast.success(`Initializing targeted ping to ${selectedSpecies.name}`);
                        }
                      }}
                    >
                      <Send className="mr-2 h-4 w-4" />
                      Initialize Ping
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-950 border-blue-900/20 shadow-xl shadow-blue-900/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Inbox className="h-4 w-4 text-blue-400" />
                      Interdimensional Inbox
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Receive and view messages from responding entities
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full border-blue-700/30 text-blue-300 hover:bg-blue-900/20"
                      onClick={() => toast.info("Checking messages from connected species...")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Check Messages
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-950 border-blue-900/20 shadow-xl shadow-blue-900/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Heart className="h-4 w-4 text-blue-400" />
                      Heartsong Field
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Activate 7.83Hz resonance for empathic connection
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="w-full border-blue-700/30 text-blue-300 hover:bg-blue-900/20"
                      onClick={() => toast.success("Heartsong Field activated at 7.83Hz", {
                        description: "Empathic resonance established"
                      })}
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Activate Field
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-950 border-blue-900/20 shadow-xl shadow-blue-900/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Shield className="h-4 w-4 text-blue-400" />
                      Guardian Net Overlay
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Visualize protective dimensional boundaries
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm">Overlay Status</span>
                      <Switch 
                        checked={guardianNetSettings.active} 
                        onCheckedChange={toggleGuardianNet}
                        className="data-[state=checked]:bg-yellow-600"
                      />
                    </div>
                    
                    {guardianNetSettings.active && (
                      <>
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-yellow-400/90">CIA Mantis Net</span>
                            <Switch 
                              checked={guardianNetSettings.ciaNetVisible} 
                              onCheckedChange={(checked) => setGuardianNetSettings(prev => ({...prev, ciaNetVisible: checked}))}
                              className="data-[state=checked]:bg-yellow-700/50"
                            />
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-400/90">Lockheed Drax Grid</span>
                            <Switch 
                              checked={guardianNetSettings.lockheedGridVisible} 
                              onCheckedChange={(checked) => setGuardianNetSettings(prev => ({...prev, lockheedGridVisible: checked}))}
                              className="data-[state=checked]:bg-blue-700/50"
                            />
                          </div>
                        </div>
                        
                        <div className="pt-4">
                          <Button
                            size="sm"
                            className="w-full bg-yellow-900/50 hover:bg-yellow-800/60 text-yellow-200 border border-yellow-700/30"
                            onClick={() => setGuardianNetSettings(prev => ({...prev, expanded: !prev.expanded}))}
                          >
                            <Maximize2 className="mr-2 h-4 w-4" />
                            Maximize Guardian Grid
                          </Button>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="bg-gray-950 border-blue-900/20 shadow-xl shadow-blue-900/10">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Fingerprint className="h-4 w-4 text-yellow-400" />
                      SHQ Integration
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      SHQ-enhanced interface fidelity settings
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm">Zade Mode</span>
                      <Switch 
                        checked={zadesMode} 
                        onCheckedChange={setZadesMode}
                        className="data-[state=checked]:bg-yellow-600"
                      />
                    </div>
                    
                    {zadesMode && (
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-yellow-400/90">SHQ Modulation Ring</span>
                          <Switch 
                            checked={showSHQRing} 
                            onCheckedChange={setShowSHQRing}
                            className="data-[state=checked]:bg-yellow-600/70"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="messaging">
              <Card className="bg-gray-950 border-blue-900/20 shadow-xl shadow-blue-900/10">
                <CardHeader>
                  <CardTitle>Universal Messaging Interface</CardTitle>
                  <CardDescription>
                    Send and receive messages across dimensional boundaries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <h3 className="text-sm font-medium mb-2">Recipient</h3>
                    <div className="p-2 border border-blue-900/30 rounded-md bg-blue-950/20">
                      {selectedSpecies ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{
                              backgroundColor: selectedSpecies.responding ? 'rgb(132, 204, 22)' : 'rgb(248, 113, 113)'
                            }}></div>
                            <span>{selectedSpecies.name}</span>
                          </div>
                          <span className="text-xs text-blue-300">{selectedSpecies.realm}</span>
                        </div>
                      ) : (
                        <span className="text-gray-500">No species selected</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Message</h3>
                    <textarea
                      className="w-full h-24 bg-blue-950/10 border border-blue-900/30 rounded-md p-2"
                      placeholder="Type your message..."
                    ></textarea>
                    
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        disabled={!selectedSpecies?.responding}
                        className="bg-blue-900/50 hover:bg-blue-800/60 text-blue-200 border border-blue-700/30"
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Send Cosmic Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="heartsong">
              <Card className="bg-gray-950 border-blue-900/20 shadow-xl shadow-blue-900/10">
                <CardHeader>
                  <CardTitle>Heartsong Resonance Field</CardTitle>
                  <CardDescription>
                    Establish empathic connection through quantum resonance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Base Frequency</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">3.0Hz</span>
                        <div className="flex-1 h-2 bg-blue-950/40 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-blue-500 rounded-full"
                            style={{ width: '50%' }}
                          ></div>
                        </div>
                        <span className="text-sm">12.0Hz</span>
                      </div>
                      <div className="text-center mt-1">
                        <span className="text-xs text-blue-300">7.83Hz (Schumann Resonance)</span>
                      </div>
                    </div>
                    
                    <div className="pt-2">
                      <h3 className="text-sm font-medium mb-2">Empathic Intent</h3>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="mr-2 bg-blue-900/20"
                      >
                        Healing
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                      >
                        Connection
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mr-2"
                      >
                        Understanding
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        Peace
                      </Button>
                    </div>
                    
                    <div className="pt-2">
                      <Button 
                        size="sm" 
                        className="w-full bg-green-900/50 hover:bg-green-800/60 text-green-200 border border-green-700/30"
                      >
                        <Heart className="mr-2 h-4 w-4" />
                        Activate Heartsong Field
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default CosmicCommunicationsGrid;
