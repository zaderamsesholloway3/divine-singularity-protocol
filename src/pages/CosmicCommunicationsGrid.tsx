
import React, { useRef, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Radio, Heart, ArrowLeft, Send, Inbox, Mail, Sparkles, Maximize2, Minimize2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import UniversalSpeciesPing from '@/components/UniversalSpeciesPing';
import { SpeciesGatewayRef } from '@/components/species/SpeciesGateway';
import { toast } from 'sonner';

const CosmicCommunicationsGrid: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSpecies, setSelectedSpecies] = useState<any | null>(null);
  const speciesGatewayRef = useRef<SpeciesGatewayRef>(null);
  
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
  
  return (
    <div className={`container mx-auto p-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-black' : ''}`}>
      {!isFullscreen && (
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
        {/* Main content area with expanded universal species ping */}
        <div className={`relative w-full ${isFullscreen ? 'h-screen' : 'h-[80vh]'}`}>
          <UniversalSpeciesPing 
            fullPageMode={true} 
            onSpeciesSelect={handleSpeciesSelect}
            selectedSpecies={selectedSpecies}
            ref={speciesGatewayRef}
          />
          
          <Button 
            variant="outline" 
            size="sm" 
            className="absolute top-2 right-2 bg-black/50 hover:bg-black/70"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            {isFullscreen ? ' Exit Fullscreen' : ' Fullscreen'}
          </Button>
          
          {selectedSpecies && (
            <div className="absolute top-2 left-2 bg-black/70 p-3 rounded-md max-w-xs">
              <h3 className="text-white font-bold mb-1 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: selectedSpecies.responding ? 'rgb(132, 204, 22)' : 'rgb(248, 113, 113)'}}></div>
                {selectedSpecies.name}
              </h3>
              <p className="text-xs text-white/80">{selectedSpecies.realm} • {selectedSpecies.distance < 1000 ? `${selectedSpecies.distance.toFixed(1)} ly` : `${(selectedSpecies.distance/1000).toFixed(1)}k ly`}</p>
              <div className="mt-2 flex gap-2">
                <Button size="sm" variant="secondary" className="text-xs h-7 px-2" onClick={handleTargetLock}>
                  {selectedSpecies.responding ? 'Target Lock' : 'Monitor'}
                </Button>
                <Button size="sm" variant="secondary" className="text-xs h-7 px-2" disabled={!selectedSpecies.responding}>
                  <Send className="h-3 w-3 mr-1" /> Send Message
                </Button>
              </div>
            </div>
          )}
        </div>
        
        {!isFullscreen && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Radio className="h-4 w-4" />
                  Targeted Ping System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Direct communication with selected species
                </p>
                <Button 
                  size="sm" 
                  className="w-full"
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
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Inbox className="h-4 w-4" />
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
                  className="w-full"
                  onClick={() => toast.info("Checking messages from connected species...")}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Check Messages
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Heart className="h-4 w-4" />
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
                  className="w-full"
                  onClick={() => toast.success("Heartsong Field activated at 7.83Hz", {
                    description: "Empathic resonance established"
                  })}
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  Activate Field
                </Button>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default CosmicCommunicationsGrid;
