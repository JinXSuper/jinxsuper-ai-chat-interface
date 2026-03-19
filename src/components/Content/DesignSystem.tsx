'use client';

import * as React from 'react';
import { 
  Palette, 
  Type, 
  Grid2X2, 
  Square, 
  Layers, 
  MousePointer2, 
  Sparkles,
  Info
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function DesignSystem() {
  return (
    <div className="flex-1 w-full h-full overflow-y-auto px-8 py-12 bg-transparent text-white custom-scrollbar animate-in fade-in duration-700">
      <div className="max-w-5xl mx-auto space-y-16">
        
        {/* Header */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-primary/10 border border-primary/20 shadow-lg shadow-primary/5">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Design System</h1>
          </div>
          <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
            The visual language of JinXSuper. Built with Geist, Glassmorphism, and Luminous backgrounds.
          </p>
        </div>

        {/* Colors */}
        <Section title="Colors" icon={<Palette className="h-4 w-4" />}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <ColorCard name="Black" hex="#000000" desc="Root Background" />
            <ColorCard name="Primary" hex="#8b5cf6" desc="Accent & Action" />
            <ColorCard name="White" hex="#FFFFFF" desc="Text & Highlights" />
            <ColorCard name="Glass Border" hex="rgba(255,255,255,0.1)" desc="Subtle Boundaries" />
          </div>
        </Section>

        {/* Typography */}
        <Section title="Typography" icon={<Type className="h-4 w-4" />}>
          <div className="space-y-8 bg-white/5 rounded-3xl p-8 border border-white/10 backdrop-blur-xl">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Display Header</span>
              <h2 className="text-5xl font-bold tracking-tighter">Geist Bold Display</h2>
            </div>
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest font-bold text-white/30">Body Text</span>
              <p className="text-lg text-white/70 max-w-2xl leading-relaxed">
                Geist is an open-source sans-serif typeface designed by Vercel. It is optimized for reading on screens and used across the entire JinXSuper interface for a premium, technical feel.
              </p>
            </div>
          </div>
        </Section>

        {/* UI Elements */}
        <Section title="UI Elements" icon={<Layers className="h-4 w-4" />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Buttons & States</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="default">Primary Action</Button>
                <Button variant="ghost" className="bg-white/5 hover:bg-white/10">Ghost Glass</Button>
                <Button variant="outline" className="border-white/10">Outline</Button>
                <Button size="icon" className="rounded-full"><Sparkles className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="space-y-6 p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Badges & Indicators</h3>
              <div className="flex flex-wrap gap-3">
                <Badge className="bg-primary/20 text-primary border-primary/20">Pro Mode</Badge>
                <Badge variant="outline" className="border-white/10">Beta</Badge>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/20">Active</Badge>
              </div>
            </div>
          </div>
        </Section>

        {/* Glassmorphism Specs */}
        <Section title="Glassmorphism" icon={<Grid2X2 className="h-4 w-4" />}>
          <div className="relative h-64 w-full rounded-3xl overflow-hidden border border-white/5">
             <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-black" />
             <div className="absolute inset-x-8 inset-y-8 rounded-2xl bg-white/5 backdrop-blur-[64px] border border-white/10 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <span className="text-2xl font-bold tracking-tight">Ultra Glass</span>
                  <p className="text-white/40 text-xs">Blur: 64px | Saturation: 1.8 | Opacity: 0.05</p>
                </div>
             </div>
          </div>
        </Section>

        {/* Footer Info */}
        <div className="pt-12 border-t border-white/5 flex items-center gap-2 text-white/30 text-[13px]">
          <Info className="h-4 w-4" />
          <span>Designed with precision for the next generation of AI interfaces.</span>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-white/40 group">
        {icon}
        <h2 className="text-sm font-bold uppercase tracking-[0.2em]">{title}</h2>
      </div>
      {children}
    </div>
  );
}

function ColorCard({ name, hex, desc }: { name: string; hex: string; desc: string }) {
  return (
    <div className="bg-white/5 rounded-2xl p-4 border border-white/10 backdrop-blur-lg group hover:bg-white/10 transition-colors">
      <div 
        className="h-12 w-full rounded-lg mb-3 shadow-inner border border-white/5" 
        style={{ background: hex }}
      />
      <div className="space-y-0.5">
        <span className="text-[13px] font-bold block">{name}</span>
        <span className="text-[11px] text-white/30 font-mono tracking-tighter uppercase">{hex}</span>
        <p className="text-[10px] text-white/40 mt-1">{desc}</p>
      </div>
    </div>
  );
}
