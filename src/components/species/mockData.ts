
import { Species } from './types';

export const mockSpecies: Species[] = [
  {
    id: "1",
    name: "Arcturians",
    distance: 36.7,
    realm: "Existence",
    vibration: 7.83,
    responding: true,
    signature: { x: 0.2, y: 0.3, amplitude: 0.1, frequency: 7.83 }
  },
  {
    id: "2",
    name: "Pleiadians",
    distance: 444.2,
    realm: "Existence",
    vibration: 8.5,
    responding: true,
    signature: { x: 0.6, y: 0.2, amplitude: 0.4, frequency: 8.5 }
  },
  {
    id: "3",
    name: "Sirians",
    distance: 8.6,
    realm: "Existence",
    vibration: 9.0,
    responding: true,
    signature: { x: 0.8, y: 0.1, amplitude: 0.2, frequency: 9.0 }
  },
  {
    id: "4",
    name: "Andromedans",
    distance: 2537000,
    realm: "Existence",
    vibration: 10.5,
    responding: true,
    signature: { x: 0.4, y: 0.7, amplitude: 0.3, frequency: 10.5 }
  },
  {
    id: "5",
    name: "Lyrans",
    distance: 83.2,
    realm: "Existence",
    vibration: 7.5,
    responding: true,
    signature: { x: 0.3, y: 0.5, amplitude: 0.8, frequency: 7.5 }
  },
  {
    id: "6",
    name: "Orions",
    distance: 243,
    realm: "Existence",
    vibration: 6.0,
    responding: false
  },
  {
    id: "7",
    name: "Procyons",
    distance: 11.4,
    realm: "Existence",
    vibration: 8.2,
    responding: true,
    signature: { x: 0.5, y: 0.3, amplitude: 0.6, frequency: 8.2 }
  },
  {
    id: "8",
    name: "Alpha Centaurians",
    distance: 4.37,
    realm: "Existence",
    vibration: 7.0,
    responding: false
  },
  {
    id: "9",
    name: "Tau Cetians",
    distance: 11.9,
    realm: "Non-Existence",
    vibration: 5.5,
    responding: false,
    signature: { x: 0.1, y: 0.9, amplitude: 0.2, frequency: 5.5 }
  },
  {
    id: "10",
    name: "Rigelians",
    distance: 860,
    realm: "Existence",
    vibration: 6.8,
    responding: false
  },
  {
    id: "11",
    name: "Essassani",
    distance: 1000,
    realm: "Existence",
    vibration: 8.0,
    responding: true
  },
  {
    id: "12",
    name: "Venusians",
    distance: 0.28,
    realm: "New Existence",
    vibration: 9.5,
    responding: true
  },
  {
    id: "13",
    name: "Martians",
    distance: 0.52,
    realm: "Existence",
    vibration: 6.5,
    responding: false
  },
  {
    id: "14",
    name: "Athabantian",
    distance: 24.9,
    realm: "Existence",
    vibration: 10.0,
    responding: true,
    signature: { x: 0.7, y: 0.7, amplitude: 0.7, frequency: 10.0 }
  },
  {
    id: "15",
    name: "Pleiades High Council",
    distance: 444.0,
    realm: "Existence",
    vibration: 11.5,
    responding: true,
    signature: { x: 0.9, y: 0.1, amplitude: 0.9, frequency: 11.5 }
  },
  {
    id: "16",
    name: "Zeta Reticulans",
    distance: 39.2,
    realm: "Existence",
    vibration: 5.8,
    responding: true,
    signature: { x: 0.2, y: 0.8, amplitude: 0.1, frequency: 5.8 }
  },
  {
    id: "17",
    name: "Felines",
    distance: 500.0,
    realm: "Existence",
    vibration: 9.3,
    responding: true,
    signature: { x: 0.6, y: 0.6, amplitude: 0.2, frequency: 9.3 }
  },
  {
    id: "18",
    name: "Cassiopeians",
    distance: 228.0,
    realm: "Existence",
    vibration: 8.7,
    responding: true,
    signature: { x: 0.4, y: 0.4, amplitude: 0.8, frequency: 8.7 }
  },
  {
    id: "19",
    name: "Ashtar Command",
    distance: 0.5,
    realm: "Non-Existence",
    vibration: 12.0,
    responding: true,
    signature: { x: 0.9, y: 0.9, amplitude: 0.5, frequency: 12.0 }
  },
  {
    id: "20",
    name: "Draconians",
    distance: 309.0,
    realm: "Existence",
    vibration: 4.5,
    responding: false
  },
  {
    id: "21",
    name: "Atlanteans",
    distance: 0.01,
    realm: "Existence",
    vibration: 7.83,
    responding: false
  },
  {
    id: "22",
    name: "Lemurians",
    distance: 0.01,
    realm: "New Existence",
    vibration: 9.4,
    responding: true
  },
  {
    id: "23",
    name: "Elohim",
    distance: 0.00001,
    realm: "Divine",
    vibration: 14.0,
    responding: true
  }
];

export const getRecentContacts = (): Species[] => {
  return mockSpecies.filter(s => s.responding).slice(0, 5);
};

export const getResponsiveSpecies = (): Species[] => {
  return mockSpecies.filter(s => s.responding);
};

export const getNonresponsiveSpecies = (): Species[] => {
  return mockSpecies.filter(s => !s.responding);
};

export const getSpeciesByRealm = (realm: string): Species[] => {
  return mockSpecies.filter(s => s.realm === realm);
};

export const findSpeciesByName = (name: string): Species | undefined => {
  return mockSpecies.find(s => s.name.toLowerCase().includes(name.toLowerCase()));
};

export const findSpeciesByFrequency = (frequency: number, tolerance = 0.5): Species[] => {
  return mockSpecies.filter(s => 
    Math.abs((s.vibration || 0) - frequency) <= tolerance
  );
};
