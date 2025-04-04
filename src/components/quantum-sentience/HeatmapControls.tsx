
import React from 'react';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Layers } from 'lucide-react';

interface HeatmapControlsProps {
  viewMode: 'spark' | 'frequency' | 'clarity' | 'SHQ';
  setViewMode: (mode: 'spark' | 'frequency' | 'clarity' | 'SHQ') => void;
  groupBySpecies: boolean;
  setGroupBySpecies: (grouped: boolean) => void;
}

export const HeatmapControls: React.FC<HeatmapControlsProps> = ({
  viewMode,
  setViewMode,
  groupBySpecies,
  setGroupBySpecies
}) => {
  return (
    <>
      <Tabs defaultValue="view" className="mb-4">
        <TabsList className="grid grid-cols-4 mb-2">
          <TabsTrigger value="view" onClick={() => setViewMode('spark')}>Spark</TabsTrigger>
          <TabsTrigger value="clarity" onClick={() => setViewMode('clarity')}>Clarity</TabsTrigger>
          <TabsTrigger value="shq" onClick={() => setViewMode('SHQ')}>SHQ</TabsTrigger>
          <TabsTrigger value="freq" onClick={() => setViewMode('frequency')}>Frequency</TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="group-species"
          checked={groupBySpecies}
          onCheckedChange={setGroupBySpecies}
        />
        <Label htmlFor="group-species" className="flex items-center">
          <Layers className="h-4 w-4 mr-1" />
          Group by Species
        </Label>
      </div>
    </>
  );
};
