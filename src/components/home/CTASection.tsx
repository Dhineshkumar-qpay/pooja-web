"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { GripVertical } from 'lucide-react';

export function CTASection() {
  const [position, setPosition] = useState(50);

  return (
    <section className="py-24 bg-ivory">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-4">
            Experience the Difference
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            Slide the center line to explore the intricate details and unmatched quality of our pooja collections.
          </p>
          <Link href="/products">
            <Button size="lg" className="bg-saffron hover:bg-saffron-dark text-white px-10 py-6 text-lg rounded-xl shadow-[0_8px_30px_rgb(217,107,39,0.3)] transition-all hover:-translate-y-1">
              Shop Collection
            </Button>
          </Link>
        </div>

        {/* Image Comparison Slider */}
        <div className="relative w-full aspect-square sm:aspect-video md:aspect-[21/9] rounded-[2.5rem] overflow-hidden shadow-2xl group border border-border/50 bg-white">
          
          {/* Base Image (Right Side) */}
          <img 
            src="cta1.jpeg" 
            alt="Pooja Collection View 1" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none" 
          />

          {/* Overlay Image (Left Side) */}
          <img 
            src="cta2.jpeg" 
            alt="Pooja Collection View 2" 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          />

          {/* Slider Line and Handle */}
          <div 
            className="absolute inset-y-0 flex items-center justify-center pointer-events-none z-10"
            style={{ left: `${position}%`, width: '4px', transform: 'translateX(-50%)' }}
          >
            {/* The Line */}
            <div className="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.5)]" />
            
            {/* The Handle */}
            <div className="w-14 h-14 bg-white rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.4)] flex items-center justify-center text-text-dark border-4 border-white transform transition-transform group-hover:scale-110">
              <GripVertical size={28} className="text-saffron" />
            </div>
          </div>

          {/* Invisible Range Input for Dragging */}
          <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(e) => setPosition(Number(e.target.value))}
            className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-20"
            aria-label="Image comparison slider"
          />
        </div>

      </div>
    </section>
  );
}
