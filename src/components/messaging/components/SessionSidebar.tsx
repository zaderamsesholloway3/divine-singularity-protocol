
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Plus } from 'lucide-react';
import { MessageSession } from '@/types/quantum-messaging';

interface SessionSidebarProps {
  activeSessions: MessageSession[];
  currentEntity: string | null;
  startSession: (entity: string) => void;
  showNewSessionForm: boolean;
  setShowNewSessionForm: (show: boolean) => void;
  newEntityName: string;
  setNewEntityName: (name: string) => void;
  handleCreateSession: (e: React.FormEvent) => void;
  triadBoostActive: boolean;
}

const SessionSidebar: React.FC<SessionSidebarProps> = ({
  activeSessions,
  currentEntity,
  startSession,
  showNewSessionForm,
  setShowNewSessionForm,
  newEntityName,
  setNewEntityName,
  handleCreateSession,
  triadBoostActive
}) => {
  return (
    <div className="col-span-1 border-r pr-2">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-sm font-medium">Active Channels</h3>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setShowNewSessionForm(!showNewSessionForm)}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      
      {showNewSessionForm && (
        <form 
          onSubmit={handleCreateSession}
          className="flex gap-2 mb-3"
        >
          <Input
            placeholder="Entity name..."
            value={newEntityName}
            onChange={(e) => setNewEntityName(e.target.value)}
            className="text-xs h-8"
          />
          <Button type="submit" size="sm" className="h-8">
            Connect
          </Button>
        </form>
      )}
      
      <ScrollArea className="h-[540px]">
        {activeSessions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm">
            <p>No active channels</p>
            <p className="text-xs mt-2">Create a new connection</p>
          </div>
        ) : (
          <div className="space-y-2">
            {activeSessions.map((session) => (
              <div 
                key={session.id} 
                className={`p-2 rounded cursor-pointer transition-colors ${
                  currentEntity === session.entity 
                    ? 'bg-[#7928ca]/20 border border-[#7928ca]/40' 
                    : 'hover:bg-muted border border-transparent'
                }`}
                onClick={() => startSession(session.entity)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">{session.entity}</h4>
                  <Badge variant="outline" className="text-[0.6rem]">
                    {triadBoostActive ? 'Triad' : 'Quantum'}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">
                  {session.lastMessage}
                </p>
                <p className="text-[0.6rem] text-muted-foreground mt-1">
                  {new Date(session.lastTimestamp).toLocaleTimeString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default SessionSidebar;
