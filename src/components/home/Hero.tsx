import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { Sparkles, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-text-dark">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 transition-transform duration-[20000ms] ease-linear hover:scale-110"
          style={{ backgroundImage: "url('hero.jpeg')" }}
        />
        {/* Elegant Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

        {/* Subtle glowing orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-saffron/20 rounded-full blur-[100px] mix-blend-screen animate-pulse pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-6 lg:px-12 flex flex-col justify-center h-full pt-20 pb-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <span className="text-xs sm:text-sm text-white/70 mt-3 mb-8 font-medium tracking-wider uppercase">Premium Spiritual Collection</span>

          <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-white mt-5 mb-6 leading-[1.1] drop-shadow-2xl">
            Sacred <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-gold">Pooja Products</span><br /> for Your Soul
          </h1>

          <p className="text-lg md:text-md text-white/90 mb-10 max-w-2xl font-light leading-relaxed drop-shadow-md">
            Discover our curated collection of authentic Rudraksha, pure brass idols, and premium Havan samagri. Handcrafted by artisans with devotion, tradition, and purity.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <Link href="/products" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-7 bg-saffron hover:bg-saffron-dark text-white rounded-xl shadow-[0_0_40px_-10px_rgba(217,107,39,0.5)] transition-all hover:scale-105 hover:shadow-[0_0_60px_-10px_rgba(217,107,39,0.7)] border-none group">
                Shop Collection
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#categories" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-7 bg-white/5 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white rounded-xl transition-all hover:scale-105">
                Explore Categories
              </Button>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-wrap gap-6 items-center text-sm text-gray-300">
            <div className="flex items-center gap-2 group cursor-default">
              <ShieldCheck size={20} className="text-gold group-hover:scale-110 transition-transform" />
              <span className="font-medium tracking-wide">100% Authentic</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2 group cursor-default">
              <Heart size={20} className="text-gold group-hover:scale-110 transition-transform" />
              <span className="font-medium tracking-wide">Handcrafted with Devotion</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
