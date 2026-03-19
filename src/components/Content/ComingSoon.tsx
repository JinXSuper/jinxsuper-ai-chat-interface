'use client';

import { motion } from 'framer-motion';
import { Sparkles, Bell, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ComingSoonProps {
  title: string;
  description: string;
}

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-8 text-center animate-in fade-in duration-1000">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-2xl w-full"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-primary tracking-widest uppercase mb-8">
          <Sparkles className="h-3 w-3" />
          <span>Under Construction</span>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 drop-shadow-lg">
          {title} is <span className="text-primary italic">Coming Soon</span>
        </h2>
        
        <p className="text-lg text-white/50 mb-12 max-w-lg mx-auto leading-relaxed">
          {description} We're building something premium and powerful. Join the waitlist to get notified.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 max-w-md mx-auto p-2 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl">
          <Input 
            type="email" 
            placeholder="Enter your email" 
            className="h-11 bg-transparent border-none text-white focus-visible:ring-0 focus-visible:ring-offset-0 px-4"
          />
          <Button className="h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold transition-all group shrink-0">
            Notify Me
            <Bell className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-white/80">98%</span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Progress</span>
            <div className="w-12 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
               <div className="w-full h-full bg-primary" />
            </div>
          </div>
          <div className="h-8 w-px bg-white/5" />
          <div className="flex flex-col items-center gap-1">
             <span className="text-2xl font-bold text-white/80">Q2</span>
             <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Release</span>
             <div className="w-12 h-1 bg-white/5 rounded-full mt-1 overflow-hidden">
                <div className="w-1/2 h-full bg-primary" />
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
