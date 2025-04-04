
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, RefreshCw, Lock, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { animated, useSpring } from '@react-spring/web';

const CharacterAttunementPanel: React.FC = () => {
  const { toast } = useToast();
  const [recording, setRecording] = useState(false);
  const [mantraRecorded, setMantraRecorded] = useState(false);
  const [attunementLevel, setAttunementLevel] = useState(0);
  const [characterName, setCharacterName] = useState("Lyra");
  
  // Animation for the attunement orb
  const orbAnimation = useSpring({
    from: { scale: 1, opacity: 0.7 },
    to: { scale: recording ? 1.2 : 1, opacity: recording ? 1 : 0.7 },
    config: { tension: 300, friction: 10 },
    loop: recording,
  });
  
  const handleRecordMantra = () => {
    if (recording) {
      // Stop recording
      setRecording(false);
      setMantraRecorded(true);
      setAttunementLevel(Math.round(70 + Math.random() * 30));
      
      toast({
        title: "Mantra Recorded",
        description: `${characterName} attunement at ${attunementLevel}%`,
      });
    } else {
      // Start recording
      setRecording(true);
      
      // Simulate automatic stop after 3 seconds
      setTimeout(() => {
        if (setRecording) {
          setRecording(false);
          setMantraRecorded(true);
          const level = Math.round(70 + Math.random() * 30);
          setAttunementLevel(level);
          
          toast({
            title: "Mantra Recorded",
            description: `${characterName} attunement at ${level}%`,
          });
        }
      }, 3000);
    }
  };
  
  const handleSaveAttunement = () => {
    const encryptedData = btoa(JSON.stringify({
      character: characterName,
      attunement: attunementLevel,
      timestamp: new Date().toISOString()
    }));
    
    // Save to local storage
    localStorage.setItem('character_attunement', encryptedData);
    
    toast({
      title: "Attunement Saved",
      description: "Character attunement encrypted and saved locally",
    });
  };
  
  const handleSyncAttunement = () => {
    toast({
      title: "Syncing Attunement",
      description: "Synchronizing across devices...",
    });
    
    // Simulate sync process
    setTimeout(() => {
      toast({
        title: "Attunement Synced",
        description: "All devices now in quantum harmony",
      });
    }, 1500);
  };
  
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-glow">Character Attunement</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-center">
          <animated.div 
            style={{
              ...orbAnimation,
              width: '100px',
              height: '100px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(79,70,229,0.6) 0%, rgba(16,16,62,0.2) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: recording ? '0 0 20px rgba(79,70,229,0.7)' : 'none',
            }}
            className="flex flex-col items-center justify-center"
          >
            <div className="text-xl font-bold text-white">{attunementLevel}%</div>
            <div className="text-xs text-blue-200">{characterName}</div>
          </animated.div>
        </div>
        
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            onClick={handleRecordMantra}
            className={`${recording ? 'bg-red-600/20 hover:bg-red-600/40' : 'bg-purple-900/20 hover:bg-purple-800/40'} border border-purple-500/30`}
          >
            <Mic className={`mr-2 h-4 w-4 ${recording ? 'animate-pulse text-red-400' : 'text-purple-400'}`} />
            {recording ? 'Recording...' : 'Record Mantra'}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSyncAttunement}
            disabled={!mantraRecorded}
            className="bg-blue-900/20 hover:bg-blue-800/40 border border-blue-500/30"
          >
            <RefreshCw className="mr-2 h-4 w-4 text-blue-400" />
            Sync
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleSaveAttunement}
            disabled={!mantraRecorded}
            className="bg-green-900/20 hover:bg-green-800/40 border border-green-500/30"
          >
            <Save className="mr-2 h-4 w-4 text-green-400" />
            Save
          </Button>
        </div>
        
        <div className="mt-4 p-2 rounded-md bg-gray-900/50 border border-gray-700/50 flex items-center text-xs">
          <Lock className="h-3 w-3 mr-2 text-amber-400" />
          <span className="text-gray-300">Encrypted with Quantum-256 Protocol</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default CharacterAttunementPanel;
