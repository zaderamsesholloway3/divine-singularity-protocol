
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HyperAlienScanner } from "@/utils/alien-scanner/HyperAlienScanner";
import AlienScanResults from "@/components/alien-scanner/AlienScanResults";
import AlienVisualizer from "@/components/alien-scanner/AlienVisualizer";
import { QuantumLinguisticScore } from "@/types/alien-scanner";

const AlienLanguageScanner = () => {
  const [inputText, setInputText] = useState("");
  const [scanResults, setScanResults] = useState<QuantumLinguisticScore | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const scanner = new HyperAlienScanner();

  const handleScan = () => {
    if (!inputText.trim()) return;
    
    setIsScanning(true);
    
    // Add slight delay to show scanning animation
    setTimeout(() => {
      const results = scanner.fullScan(inputText);
      setScanResults(results);
      setIsScanning(false);
    }, 1500);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <Card className="bg-black/70 border-purple-600/40 shadow-lg shadow-purple-900/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-300 to-cyan-400 bg-clip-text text-transparent">
            𓃰 Alien Language Scanner v8.1 𓃰
          </CardTitle>
          <CardDescription className="text-gray-400">
            Integrates: HyperAlienScanner, TacticalLinguistics, ArchetypalMimicry, QuantumSoulProtocols
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="alien-text" className="text-sm font-medium text-gray-300">
              Enter text for analysis
            </label>
            <Textarea
              id="alien-text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Enter text to scan for alien linguistic patterns..."
              className="min-h-[150px] border-purple-700/50 bg-black/40 text-gray-100"
            />
          </div>
          
          <div className="flex justify-center">
            <Button
              onClick={handleScan}
              disabled={isScanning || !inputText.trim()}
              className="bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-2"
            >
              {isScanning ? "Scanning..." : "Analyze Text"}
            </Button>
          </div>

          {scanResults && (
            <div className="pt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <AlienVisualizer results={scanResults} />
                <AlienScanResults results={scanResults} />
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AlienLanguageScanner;
