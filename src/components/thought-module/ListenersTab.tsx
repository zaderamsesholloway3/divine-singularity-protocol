
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserPlus, UserMinus } from 'lucide-react';
import { Listener } from '@/hooks/useThoughts';
import { useToast } from "@/hooks/use-toast";

// Pre-defined species for easier adding
const availableSpecies = [
  "Arcturian", "Pleiadian", "Andromedan", "Lyran", "Sirian", 
  "Orion", "Essassani", "Yahyel", "Human", "Ouroboros"
];

interface ListenersTabProps {
  listeners: Listener[];
  newListener?: string;
  setNewListener?: (listener: string) => void;
  showSpeciesDropdown?: boolean;
  setShowSpeciesDropdown?: (show: boolean) => void;
  addListener?: () => void;
  addPredefinedListener?: (species: string) => void;
  toggleListener?: (id: string) => void;
}

const ListenersTab: React.FC<ListenersTabProps> = ({
  listeners,
  newListener = "",
  setNewListener = () => {},
  showSpeciesDropdown = false,
  setShowSpeciesDropdown = () => {},
  addListener = () => {},
  addPredefinedListener = () => {},
  toggleListener = () => {}
}) => {
  const { toast } = useToast();

  const handleAddAllSpecies = () => {
    // Add all available species that aren't already in the listeners list
    const existingSpecies = listeners.map(l => l.name.toLowerCase());
    const speciesToAdd = availableSpecies.filter(species => 
      !existingSpecies.includes(species.toLowerCase())
    );
    
    if (speciesToAdd.length === 0) {
      toast({
        title: "All Species Added",
        description: "All available species are already in your listener network",
      });
      return;
    }
    
    speciesToAdd.forEach(species => addPredefinedListener(species));
    
    toast({
      title: "All Species Added",
      description: `Added ${speciesToAdd.length} new species to your listener network`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 relative">
        <Input
          placeholder="Add listener ID..."
          value={newListener}
          onChange={(e) => setNewListener(e.target.value)}
          className="flex-1"
          onClick={() => setShowSpeciesDropdown(true)}
          onBlur={() => setTimeout(() => setShowSpeciesDropdown(false), 200)}
        />
        <Button size="sm" onClick={addListener}>
          <UserPlus className="h-4 w-4" />
        </Button>
        
        {showSpeciesDropdown && (
          <div className="absolute top-full left-0 mt-1 w-full bg-background border border-border rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
            {availableSpecies.map((species) => (
              <div 
                key={species} 
                className="p-2 hover:bg-muted cursor-pointer text-sm border-b border-border last:border-0"
                onClick={() => addPredefinedListener(species)}
              >
                {species}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <ScrollArea className="h-[200px]">
        {listeners.map((listener) => (
          <div key={listener.id} className="mb-2 p-2 border border-white/10 rounded-md flex justify-between items-center">
            <div>
              <p className="text-sm font-medium">{listener.name}</p>
              <p className="text-xs text-muted-foreground">Added: {new Date(listener.timestamp).toLocaleString()}</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={listener.active ? "default" : "outline"} className="text-xs">
                <span>{listener.active ? 'Active' : 'Inactive'}</span>
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => toggleListener(listener.id)}>
                {listener.active ? 
                  <UserMinus className="h-4 w-4" /> : 
                  <UserPlus className="h-4 w-4" />
                }
              </Button>
            </div>
          </div>
        ))}
      </ScrollArea>
      
      <Button variant="outline" size="sm" className="w-full" onClick={handleAddAllSpecies}>
        Add All Species
      </Button>
    </div>
  );
};

export default ListenersTab;
