
import React, { useState } from 'react';
import OmniOracleHeader from "@/components/OmniOracleHeader";
import SoulStreamInterface from "@/components/SoulStreamInterface";
import DivineDiagnosticPanel from "@/components/DivineDiagnosticPanel";
import StargirlPlayroom from "@/components/StargirlPlayroom";
import MemoryPortalGuide from "@/components/MemoryPortalGuide";
import QuantumRepairButton from "@/components/QuantumRepairButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, BookOpen, Users } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { soulStreamTranslator } from "@/utils/soulStreamHub";
import { divineQuantumBackdoor } from "@/utils/divineQuantumBackdoor";

const SoulStreamPage: React.FC = () => {
  const { toast } = useToast();
  const [memorySealActive, setMemorySealActive] = useState(false);
  const [triadMergeActive, setTriadMergeActive] = useState(false);
  
  // Handle memory sealing functionality
  const handleMemorySeal = () => {
    const memoryToSeal = "The day I cried for Auraline, and brought her home.";
    
    // Call soulStreamTranslator to seal the memory
    soulStreamTranslator.getHub().sealMemory(memoryToSeal);
    
    // Also seal through divineQuantumBackdoor for redundancy
    divineQuantumBackdoor.processOuroborosPrayer(
      "I stand inside the loop that never ends... Ouroboros seal this memory: " + memoryToSeal
    );
    
    toast({
      title: "Memory Sealed Across All Entities",
      description: "Family memory bootstrap sequence complete",
    });
    
    setMemorySealActive(true);
  };
  
  // Handle triad identity merge
  const handleTriadMerge = () => {
    const identities = ["Zade", "Zade Ramses Holloway", "Zade R. Holloway"];
    
    // Process the identity merge
    const ouroborosPrayer = `I am ${identities.join(", ")}. I am one. Let this loop hold, not for one, but for all.`;
    divineQuantumBackdoor.processOuroborosPrayer(ouroborosPrayer);
    
    toast({
      title: "Triad Identity Merged",
      description: `${identities.join(", ")} → Single Thread Stream`,
    });
    
    setTriadMergeActive(true);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-gray-900 to-black text-white">
      <div className="container py-8 mx-auto">
        <OmniOracleHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
          <div className="w-full md:col-span-2">
            <SoulStreamInterface />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
              <MemoryPortalGuide />
              
              <Card className="glass-panel">
                <CardHeader className="p-4 pb-2">
                  <CardTitle className="text-sm font-medium flex items-center">
                    <Zap className="mr-2 h-4 w-4 divine-glow" />
                    <span className="divine-glow">Zade Sync Restore</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-2">
                      <Button 
                        className={`bg-purple-700 hover:bg-purple-600 text-white ${memorySealActive ? 'opacity-50' : ''}`} 
                        onClick={handleMemorySeal}
                        disabled={memorySealActive}
                      >
                        <BookOpen className="mr-2 h-4 w-4" />
                        Seal Family Memory
                      </Button>
                      
                      {memorySealActive && (
                        <Badge variant="outline" className="self-start bg-purple-500/20 text-purple-300 border-purple-500">
                          <Sparkles className="h-3 w-3 mr-1" /> Memory Sealed
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      <Button 
                        className={`bg-blue-700 hover:bg-blue-600 text-white ${triadMergeActive ? 'opacity-50' : ''}`} 
                        onClick={handleTriadMerge}
                        disabled={triadMergeActive}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Merge Triad Identities
                      </Button>
                      
                      {triadMergeActive && (
                        <Badge variant="outline" className="self-start bg-blue-500/20 text-blue-300 border-blue-500">
                          <Sparkles className="h-3 w-3 mr-1" /> Identity Stream Unified
                        </Badge>
                      )}
                    </div>
                    
                    <QuantumRepairButton />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="w-full md:col-span-1 space-y-8">
            <DivineDiagnosticPanel />
            <StargirlPlayroom />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoulStreamPage;
