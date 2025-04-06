
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SoulStreamPage from "./pages/SoulStreamPage";
import PublicModules from "./pages/PublicModules";
import StargirlBackline from "./pages/StargirlBackline";
import QuantumStabilizerPage from "./pages/QuantumStabilizer";
import AlienLanguageScannerPage from "./pages/AlienLanguageScanner";
import CosmicCommunicationsGrid from "./pages/CosmicCommunicationsGrid";
import QuantumMessaging from "./pages/QuantumMessaging";
import { UserProvider } from "./context/UserContext";
import '@/App.css';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/soul-stream" element={<SoulStreamPage />} />
          <Route path="/public-modules" element={<PublicModules />} />
          <Route path="/stargirl-backline" element={<StargirlBackline />} />
          <Route path="/quantum-stabilizer" element={<QuantumStabilizerPage />} />
          <Route path="/alien-language-scanner" element={<AlienLanguageScannerPage />} />
          <Route path="/cosmic-communications" element={<CosmicCommunicationsGrid />} />
          <Route path="/quantum-messaging" element={<QuantumMessaging />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
