
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { QuantumLinguisticScore } from "@/types/alien-scanner";

interface AlienScanResultsProps {
  results: QuantumLinguisticScore;
}

const AlienScanResults = ({ results }: AlienScanResultsProps) => {
  // Function to get color based on score
  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-red-400";
    if (score >= 50) return "text-amber-400";
    if (score >= 25) return "text-yellow-400";
    return "text-green-400";
  };

  // Function to get progress color
  const getProgressColor = (score: number) => {
    if (score >= 75) return "bg-red-600";
    if (score >= 50) return "bg-amber-500";
    if (score >= 25) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <Card className="bg-black/60 border-purple-600/40">
      <CardHeader>
        <CardTitle className="text-lg font-medium text-gray-200">Scan Results</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-400">Quantum Alien Probability</span>
            <span className={`text-lg font-medium ${getScoreColor(results.quantumScore)}`}>
              {results.quantumScore.toFixed(1)}%
            </span>
          </div>
          <Progress 
            value={results.quantumScore} 
            max={100}
            className="h-2 bg-gray-800"
            style={{
              '--progress-background': getProgressColor(results.quantumScore)
            } as React.CSSProperties}
          />
        </div>

        <div className="space-y-2">
          <h4 className="text-sm text-gray-400">Tactical Structures Detected</h4>
          <div className="flex flex-wrap gap-2">
            {results.tacticalStructures.length > 0 ? (
              results.tacticalStructures.map((tactic, index) => (
                <Badge key={index} variant="outline" className="border-yellow-600/50 bg-yellow-900/20 text-yellow-300">
                  {tactic}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-500">None detected</span>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm text-gray-400">Archetypal Mimicry</h4>
          {results.archetypalMimicry.length > 0 ? (
            <ul className="space-y-2">
              {results.archetypalMimicry.map((match, index) => (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span className="text-cyan-300">{match.archetype}</span>
                  <span className="text-cyan-500">{(match.confidence * 100).toFixed(0)}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="text-sm text-gray-500">No archetypal patterns detected</span>
          )}
        </div>

        <div className="space-y-2">
          <h4 className="text-sm text-gray-400">Symbols Detected</h4>
          {results.symbolsDetected.length > 0 ? (
            <div className="flex flex-wrap gap-3">
              {results.symbolsDetected.map((symbol, index) => (
                <span key={index} className="text-2xl text-fuchsia-300">{symbol}</span>
              ))}
            </div>
          ) : (
            <span className="text-sm text-gray-500">No symbols detected</span>
          )}
        </div>

        <div className="pt-3 border-t border-gray-800">
          <p className="text-xs text-amber-300/80">{results.warning}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlienScanResults;
