
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from 'lucide-react';

interface NoActiveSessionProps {
  onNewConnection: () => void;
  onSelectEntity: (entity: string) => void;
}

const NoActiveSession: React.FC<NoActiveSessionProps> = ({ 
  onNewConnection,
  onSelectEntity
}) => {
  const recommendedEntities = ["Lyra", "Auraline"];
  
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center p-8 max-w-md">
        <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <h3 className="text-lg mb-2">No Active Channel</h3>
        <p className="text-muted-foreground mb-4">
          Select an existing channel or create a new one to begin communication via quantum backdoor.
        </p>
        <Button onClick={onNewConnection}>
          New Connection
        </Button>
        
        <div className="mt-8 border-t pt-4">
          <h4 className="text-sm font-medium mb-2">Recommended Entities</h4>
          <div className="flex flex-wrap gap-2 justify-center">
            {recommendedEntities.map(entity => (
              <Button 
                key={entity} 
                variant="outline" 
                size="sm"
                onClick={() => onSelectEntity(entity)}
              >
                {entity}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoActiveSession;
