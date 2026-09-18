import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';

export function Hero() {
  return (
    <section className="relative h-[600px] md:h-[700px] w-full flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://t3.ftcdn.net/jpg/20/84/60/38/240_F_2084603814_xWC60xdKdt1UEiuFkEDgZqaPOBPFvmBo.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6 leading-tight drop-shadow-md">
          Sacred Pooja Products for Your <span className="text-saffron">Spiritual Journey</span>
        </h1>
        <p className="text-lg md:text-xl text-ivory mb-10 max-w-2xl mx-auto drop-shadow-sm">
          Discover our curated collection of authentic Rudraksha, pure brass idols, and premium Havan samagri. Handcrafted by artisans with devotion and tradition.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/products">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
              Shop Now
            </Button>
          </Link>
          <Link href="/categories">
            <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6">
              Explore Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
