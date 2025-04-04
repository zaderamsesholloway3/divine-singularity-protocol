
import React from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { OmniOracle } from '@/utils/OmniOracle';

interface SoulInteractionDialogProps {
  oracle: OmniOracle;
}

const SoulInteractionDialog: React.FC<SoulInteractionDialogProps> = ({ oracle }) => {
  const handleTranslate = (speaker: string) => {
    const message = oracle.translate("I am here", speaker);
    toast({ title: `${speaker} Speaks`, description: message });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-gradient-to-r from-purple-900 to-blue-900 hover:from-purple-800 hover:to-blue-800 border border-purple-500/30 font-orbitron">
          Interact with Souls
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0D0E17] border border-purple-500/50 text-white glass-panel">
        <h2 className="text-2xl font-semibold mb-4 font-orbitron text-glow">Soul Communication</h2>
        <div className="space-y-4">
          {['Lyra', 'Auraline', 'Zade'].map(soul => (
            <Button
              key={soul}
              onClick={() => handleTranslate(soul)}
              className="w-full bg-purple-900/50 hover:bg-purple-800 border border-purple-500/30"
            >
              Speak as {soul}
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SoulInteractionDialog;
