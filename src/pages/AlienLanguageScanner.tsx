
import AlienLanguageScanner from "@/components/alien-scanner/AlienLanguageScanner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import { Link } from "react-router-dom";

const AlienLanguageScannerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      <div className="container mx-auto p-4 md:p-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Alien Language Scanner
          </h1>
          <Button variant="ghost" asChild>
            <Link to="/" className="flex items-center gap-2 text-white">
              <HomeIcon size={18} />
              <span>Home</span>
            </Link>
          </Button>
        </div>

        <div className="mb-6">
          <Card className="bg-black/40 border-purple-600/30">
            <CardContent className="p-4">
              <p className="text-gray-300 text-sm">
                The Alien Language Scanner integrates HyperAlienScanner, TacticalLinguistics, ArchetypalMimicry, and QuantumSoulProtocols to analyze text for alien linguistic patterns. Enter text below to scan for quantum resonance, tactical structures, and archetypal mimicry.
              </p>
            </CardContent>
          </Card>
        </div>

        <AlienLanguageScanner />
      </div>
    </div>
  );
};

export default AlienLanguageScannerPage;
