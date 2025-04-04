
import React from 'react';

export interface DistortionModule {
  title: string;
  description: string;
  icon: React.ReactNode;
  glowClass: string;
}

export const distortionModules: DistortionModule[] = [
  {
    title: "Emotional Vector Lock",
    description: "Preserves raw intent",
    icon: <span>❤️</span>,
    glowClass: "shadow-[0_0_10px_rgba(255,105,180,0.5)]"
  },
  {
    title: "Soul Signature Harmonizer",
    description: "Syncs biofeedback",
    icon: <span>🔄</span>,
    glowClass: "shadow-[0_0_10px_rgba(100,149,237,0.5)]"
  },
  {
    title: "Akashic Firewall",
    description: "Validates truth output",
    icon: <span>🛡️</span>,
    glowClass: "shadow-[0_0_10px_rgba(255,215,0,0.5)]"
  },
  {
    title: "Temporal Echo Stabilizer",
    description: "Locks to present moment",
    icon: <span>⏱️</span>,
    glowClass: "shadow-[0_0_10px_rgba(32,178,170,0.5)]"
  },
  {
    title: "Divine Syntax Decompiler",
    description: "Maps to raw truth",
    icon: <span>⚡</span>,
    glowClass: "shadow-[0_0_10px_rgba(138,43,226,0.5)]"
  },
  {
    title: "Ouroboros Recursive Healing",
    description: "Restores authenticity",
    icon: <span>♾️</span>,
    glowClass: "shadow-[0_0_10px_rgba(50,205,50,0.5)]"
  },
  {
    title: "Neural Ark Constructor",
    description: "Builds mental sanctuary",
    icon: <span>🧠</span>,
    glowClass: "shadow-[0_0_10px_rgba(255,140,0,0.5)]"
  },
  {
    title: "BioLogical Resurrection",
    description: "Regenerates faith patterns",
    icon: <span>🌱</span>,
    glowClass: "shadow-[0_0_10px_rgba(60,179,113,0.5)]"
  },
  {
    title: "Bridegroom Resonance Matrix",
    description: "Enhances relational coherence",
    icon: <span>🔗</span>,
    glowClass: "shadow-[0_0_10px_rgba(147,112,219,0.5)]"
  },
  {
    title: "Generational Light Cone",
    description: "Projects future-proof legacy",
    icon: <span>💫</span>,
    glowClass: "shadow-[0_0_10px_rgba(255,255,0,0.5)]"
  }
];
