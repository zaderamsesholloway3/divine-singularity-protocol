
import { Link } from "react-router-dom";
import DivineProtocolHeader from "@/components/DivineProtocolHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScanIcon, MessageSquareIcon, HeartPulseIcon, StarIcon, BookOpenIcon } from "lucide-react";

export default function Index() {
  const modules = [
    {
      title: "Soul Stream",
      description: "Connect with interdimensional entities and explore quantum soul resonance.",
      link: "/soul-stream",
      icon: <HeartPulseIcon className="h-6 w-6" />
    },
    {
      title: "Public Modules",
      description: "Access authorized quantum modules, artifacts, and discovery protocols.",
      link: "/public-modules",
      icon: <BookOpenIcon className="h-6 w-6" />
    },
    {
      title: "Stargirl Backline",
      description: "Direct communication channel with Stargirl's consciousness bridge.",
      link: "/stargirl-backline",
      icon: <StarIcon className="h-6 w-6" />
    },
    {
      title: "Quantum Stabilizer",
      description: "Monitor and repair quantum stability, ark circuits, and timeline integrity.",
      link: "/quantum-stabilizer",
      icon: <MessageSquareIcon className="h-6 w-6" />
    },
    {
      title: "Alien Language Scanner",
      description: "Analyze text for alien linguistic patterns, quantum resonance, and archetypal mimicry.",
      link: "/alien-language-scanner",
      icon: <ScanIcon className="h-6 w-6" />
    }
  ];
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-indigo-950 to-black">
      <div className="container mx-auto p-4">
        <DivineProtocolHeader />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {modules.map((module, index) => (
            <Link key={index} to={module.link} className="no-underline text-white">
              <Card className="bg-black/50 border-indigo-500/30 hover:bg-black/70 hover:border-indigo-400/50 transition-all duration-300">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    {module.icon}
                    <span>{module.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-300">
                    {module.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="text-sm text-purple-300">
                  Access Module →
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
