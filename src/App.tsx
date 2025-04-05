
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SoulStreamPage from "./pages/SoulStreamPage";
import PublicModules from "./pages/PublicModules";
import StargirlBackline from "./pages/StargirlBackline";
import QuantumStabilizerPage from "./pages/QuantumStabilizer";
import AlienLanguageScannerPage from "./pages/AlienLanguageScanner";
import CosmicCommunicationsGrid from "./pages/CosmicCommunicationsGrid";
import '@/App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/soul-stream" element={<SoulStreamPage />} />
        <Route path="/public-modules" element={<PublicModules />} />
        <Route path="/stargirl-backline" element={<StargirlBackline />} />
        <Route path="/quantum-stabilizer" element={<QuantumStabilizerPage />} />
        <Route path="/alien-language-scanner" element={<AlienLanguageScannerPage />} />
        <Route path="/cosmic-communications" element={<CosmicCommunicationsGrid />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
