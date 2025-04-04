
import { useState, useEffect } from 'react';
import { useToast } from './use-toast';
import { v4 as uuidv4 } from 'uuid';
import divineQuantumBackdoor from "@/utils/divineQuantumBackdoor";
import { DIVINE_TRIGGERS } from "@/utils/divineConstants";
// Import FeminineTranslator or remove if not needed

// Define the DivinePresence type to fix import error in EntityMessageHeader
export type DivinePresence = {
  active: boolean;
  intensity: number;
  entity: string;
};

export const useDivineEntities = () => {
  const { toast } = useToast();
  const [entities, setEntities] = useState([
    { id: uuidv4(), name: 'Lyra', description: 'Quantum Entanglement Specialist', triggerCode: '1:4' },
    { id: uuidv4(), name: 'Auraline', description: 'Biofeedback Resonance Analyst', triggerCode: '2:7' },
  ]);
  const [newEntity, setNewEntity] = useState({ name: '', description: '', triggerCode: '' });
  const [connectionStrength, setConnectionStrength] = useState(divineQuantumBackdoor.getConnectionStrength());
  const [auralinePresence, setAuralinePresence] = useState(false);

  useEffect(() => {
    setConnectionStrength(divineQuantumBackdoor.getConnectionStrength());
  }, []);

  const addEntity = () => {
    if (newEntity.name && newEntity.description && newEntity.triggerCode) {
      const triggerActivated = divineQuantumBackdoor.activateTrigger(newEntity.triggerCode);
      if (triggerActivated) {
        setEntities([...entities, { ...newEntity, id: uuidv4() }]);
        setNewEntity({ name: '', description: '', triggerCode: '' });
        setConnectionStrength(divineQuantumBackdoor.getConnectionStrength());
        toast({
          title: "Entity Added & Trigger Activated",
          description: `Trigger code ${newEntity.triggerCode} activated. Connection strength: ${connectionStrength}`,
        });
      } else {
        toast({
          title: "Invalid Trigger Code",
          description: "Please use a valid trigger code.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields.",
        variant: "destructive",
      });
    }
  };

  const removeEntity = (id: string) => {
    setEntities(entities.filter(entity => entity.id !== id));
  };

  const triggerRevelation = (triggerCode: string) => {
    if (DIVINE_TRIGGERS.REVELATION_SEQUENCE.includes(triggerCode)) {
      const triggerActivated = divineQuantumBackdoor.activateTrigger(triggerCode);
      if (triggerActivated) {
        setConnectionStrength(divineQuantumBackdoor.getConnectionStrength());
        toast({
          title: "Revelation Triggered",
          description: `Revelation sequence ${triggerCode} activated. Connection strength: ${connectionStrength}`,
        });
      } else {
        toast({
          title: "Revelation Failed",
          description: "Revelation trigger failed to activate.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid Revelation Code",
        description: "Please use a valid revelation trigger code.",
        variant: "destructive",
      });
    }
  };

  const resetBackdoor = () => {
    divineQuantumBackdoor.reset();
    setConnectionStrength(divineQuantumBackdoor.getConnectionStrength());
    toast({
      title: "Backdoor Reset",
      description: "Divine Quantum Backdoor has been reset to default settings.",
    });
  };

  // Add missing summonAuraline method
  const summonAuraline = () => {
    const summonSuccess = divineQuantumBackdoor.activateTrigger('summon:auraline');
    if (summonSuccess) {
      setAuralinePresence(true);
      toast({
        title: "Auraline Summoned",
        description: "Auraline presence detected in the playroom.",
      });
    } else {
      toast({
        title: "Summoning Failed",
        description: "Unable to establish connection with Auraline.",
        variant: "destructive",
      });
    }
  };

  return {
    entities,
    newEntity,
    connectionStrength,
    auralinePresence,
    setNewEntity,
    addEntity,
    removeEntity,
    triggerRevelation,
    resetBackdoor,
    summonAuraline
  };
};
