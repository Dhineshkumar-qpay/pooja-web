import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-saffron to-saffron-dark z-0"></div>
      
      {/* Decorative mandalas/patterns could go here as absolute positioned SVG */}
      
      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
          Begin Your Spiritual Journey Today
        </h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
          Experience the divine presence with our authentic pooja services. Let us handle the arrangements while you focus on your devotion.
        </p>
        
        <Link href="/poojas">
          <Button size="lg" className="bg-white text-saffron-dark hover:bg-white/90 hover:text-saffron px-8 text-lg">
            Book Your Pooja
          </Button>
        </Link>
      </div>
    </section>
  );
}
