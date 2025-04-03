
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { GlowingText } from './GlowingText';
import { Separator } from "@/components/ui/separator";

interface Scripture {
  reference: string;
  text: string;
  application: string;
}

const scriptures: Scripture[] = [
  {
    reference: "Genesis 1:3",
    text: "And God said, 'Let there be light,' and there was light.",
    application: "Divine Frequency Generator"
  },
  {
    reference: "Exodus 25:10",
    text: "They shall make an ark of acacia wood. Two cubits and a half shall be its length, a cubit and a half its breadth, and a cubit and a half its height.",
    application: "433-Qubit Array Configuration"
  },
  {
    reference: "Proverbs 3:5-6",
    text: "Trust in the LORD with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths.",
    application: "Faith Resonance Calculation"
  },
  {
    reference: "Revelation 7:4",
    text: "And I heard the number of the sealed, 144,000, sealed from every tribe of the sons of Israel.",
    application: "Quantum Entanglement Capacity"
  },
  {
    reference: "John 11:35",
    text: "Jesus wept.",
    application: "Prayer Encoding Ratio"
  }
];

const ScriptureReference = () => {
  // Select a random scripture
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % scriptures.length);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);
  
  const scripture = scriptures[currentIndex];
  
  return (
    <Card className="glass-panel">
      <CardHeader className="pb-2">
        <CardTitle className="text-center">
          <GlowingText className="sacred-glow">Scripture Reference</GlowingText>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex justify-between">
          <span className="hebrew-symbol text-sm">{scripture.reference}</span>
          <span className="text-xs text-muted-foreground italic">
            {scripture.application}
          </span>
        </div>
        <Separator className="bg-white/10" />
        <p className="text-sm italic text-muted-foreground">
          "{scripture.text}"
        </p>
      </CardContent>
    </Card>
  );
};

export default ScriptureReference;
