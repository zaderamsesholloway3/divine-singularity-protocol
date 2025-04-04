import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowUpDown, Link, Link2Off, RefreshCw } from 'lucide-react';
import { useEntanglement } from '@/hooks/useEntanglement';
import type { Character } from '@/types/characters';
import { Badge } from "@/components/ui/badge";

const SoulEntanglementPanel: React.FC = () => {
  const { isLoading, activeEntanglements, entangle, testConnection, disconnect } = useEntanglement();
  
  // Mock characters for demonstration
  const characters: Character[] = [
    { id: '1', name: 'Lyra', soul_id: 'lyra-01', faithQuotient: 0.85 },
    { id: '2', name: 'Auraline', soul_id: 'auraline-01', faithQuotient: 0.92 },
    { id: '3', name: 'Zade', soul_id: 'zade-01', faithQuotient: 0.88 }
  ];
  
  const [selectedA, setSelectedA] = useState<string>(characters[0].id);
  const [selectedB, setSelectedB] = useState<string>(characters[1].id);
  const [mediator, setMediator] = useState<'Akashic' | 'Ouroboros'>('Akashic');
  
  const handleEntangle = async () => {
    const subjectA = characters.find(c => c.id === selectedA);
    const subjectB = characters.find(c => c.id === selectedB);
    
    if (subjectA && subjectB) {
      await entangle(subjectA, subjectB, mediator);
    }
  };
  
  const handleTestConnection = async () => {
    const subjectA = characters.find(c => c.id === selectedA);
    const subjectB = characters.find(c => c.id === selectedB);
    
    if (subjectA && subjectB) {
      await testConnection(subjectA, subjectB);
    }
  };
  
  const handleDisconnect = async () => {
    const subjectA = characters.find(c => c.id === selectedA);
    const subjectB = characters.find(c => c.id === selectedB);
    
    if (subjectA && subjectB) {
      await disconnect(subjectA, subjectB);
    }
  };
  
  // Check if there's an active entanglement between selected characters
  const getEntanglementKey = () => {
    const subjectA = characters.find(c => c.id === selectedA);
    const subjectB = characters.find(c => c.id === selectedB);
    
    if (subjectA && subjectB) {
      return `${subjectA.soul_id}-${subjectB.soul_id}`;
    }
    return null;
  };
  
  const activeEntanglement = getEntanglementKey() ? activeEntanglements[getEntanglementKey()!] : undefined;
  
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-glow">Soul Entanglement Protocol</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="text-sm font-medium mb-1 block">Subject A</label>
            <Select value={selectedA} onValueChange={setSelectedA} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select character" />
              </SelectTrigger>
              <SelectContent>
                {characters.map(character => (
                  <SelectItem key={character.id} value={character.id}>{character.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-center">
            <ArrowUpDown className="h-5 w-5 opacity-70" />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 block">Subject B</label>
            <Select value={selectedB} onValueChange={setSelectedB} disabled={isLoading}>
              <SelectTrigger>
                <SelectValue placeholder="Select character" />
              </SelectTrigger>
              <SelectContent>
                {characters.map(character => (
                  <SelectItem key={character.id} value={character.id}>{character.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <label className="text-sm font-medium mb-1 block">Mediator Protocol</label>
          <Select 
            value={mediator} 
            onValueChange={(val) => setMediator(val as 'Akashic' | 'Ouroboros')}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select mediator" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Akashic">Akashic Records (Stable)</SelectItem>
              <SelectItem value="Ouroboros">Ouroboros (Powerful)</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {activeEntanglement && (
          <div className="bg-purple-900/30 p-3 rounded-md border border-purple-500/30">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Connection Status:</span>
              <Badge variant="outline" className="bg-green-900/30 border-green-500/50">
                Active
              </Badge>
            </div>
            <div className="mt-2">
              <div className="text-xs flex justify-between">
                <span>Resonance:</span>
                <span>{(activeEntanglement.resonance * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700/50 h-1 mt-1 rounded-full overflow-hidden">
                <div 
                  className="bg-green-500 h-full rounded-full"
                  style={{ width: `${activeEntanglement.resonance * 100}%` }}
                />
              </div>
            </div>
            <div className="mt-2">
              <div className="text-xs flex justify-between">
                <span>Connection Strength:</span>
                <span>{(activeEntanglement.connectionStrength * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700/50 h-1 mt-1 rounded-full overflow-hidden">
                <div 
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: `${activeEntanglement.connectionStrength * 100}%` }}
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-3 gap-2">
          <Button 
            variant="outline" 
            onClick={handleEntangle} 
            disabled={isLoading || selectedA === selectedB}
            className="bg-purple-900/30 hover:bg-purple-800/50 border-purple-500/30"
          >
            <Link className="mr-2 h-4 w-4" />
            Entangle
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleTestConnection}
            disabled={isLoading || !activeEntanglement || selectedA === selectedB}
            className="bg-blue-900/30 hover:bg-blue-800/50 border-blue-500/30"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Test
          </Button>
          
          <Button 
            variant="outline" 
            onClick={handleDisconnect}
            disabled={isLoading || !activeEntanglement || selectedA === selectedB}
            className="bg-red-900/30 hover:bg-red-800/50 border-red-500/30"
          >
            <Link2Off className="mr-2 h-4 w-4" />
            Disconnect
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoulEntanglementPanel;
