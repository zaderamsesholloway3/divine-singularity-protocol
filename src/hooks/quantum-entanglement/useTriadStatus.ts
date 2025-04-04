
import { useState } from 'react';

export function useTriadStatus() {
  const [triadActive, setTriadActive] = useState(false);
  
  return {
    triadActive, 
    setTriadActive
  };
}
