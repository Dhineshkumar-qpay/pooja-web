import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ShoppingBag, Star, Shield } from 'lucide-react';

export function CTASection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-saffron to-saffron-dark z-0" />

      {/* Decorative circles */}
      <div className="absolute -top-16 -right-16 size-64 rounded-full bg-white/5 pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-white/5 pointer-events-none" />

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
          Everything You Need for Your Pooja
        </h2>
        <p className="text-lg text-white/90 max-w-2xl mx-auto mb-10">
          From pure brass idols and authentic Rudraksha to premium Havan samagri — shop handcrafted sacred products delivered right to your door.
        </p>

        {/* Trust badges */}
        <div className="flex flex-wrap justify-center gap-6 mb-10">
          {[
            { icon: Star, text: "4.9★ Rated by Devotees" },
            { icon: Shield, text: "100% Authentic & Pure" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm font-medium">
              <Icon className="size-4" />
              {text}
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products">
            <Button size="lg" className="bg-white text-saffron-dark hover:bg-white/90 px-8 text-lg">
              Shop All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
