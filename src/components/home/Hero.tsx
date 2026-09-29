import React from 'react';
import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, ShieldCheck, Star, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center bg-ivory overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-ivory-section/50 rounded-bl-[150px] -z-10 hidden lg:block" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-saffron/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 -left-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl -z-10" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-10 py-12 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-16 items-center">

          {/* Text Content Area */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-8 lg:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-saffron/20 mb-8 shadow-sm w-fit">
              <Sparkles size={16} className="text-saffron" />
              <span className="text-xs sm:text-sm font-semibold text-saffron-dark tracking-wider uppercase">
                Premium Spiritual Collection
              </span>
            </div>

            <h1 className="text-5xl md:text-5xl lg:text-5xl font-serif font-bold text-text-dark mb-6 leading-[1.1]">
              Sacred <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-saffron-dark">Pooja</span><br />
              <span className="text-4xl md:text-5xl lg:text-6xl">Products for Soul</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-lg font-light leading-relaxed">
              Discover our curated collection of authentic Rudraksha, pure brass idols, and premium Havan samagri. Handcrafted by artisans with devotion and purity.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-7 bg-saffron hover:bg-saffron-dark text-white rounded-xl shadow-[0_8px_30px_rgb(217,107,39,0.3)] transition-all hover:-translate-y-1 group">
                  Shop Collection
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#categories" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-7 bg-white/50 backdrop-blur-sm border-border text-text-dark hover:bg-white hover:text-saffron-dark rounded-xl transition-all hover:shadow-md">
                  Explore Categories
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-14 pt-8 border-t border-border flex flex-wrap gap-8 items-center">
              <div>
                <div className="flex items-center gap-1 text-saffron mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-text-secondary tracking-wide">10,000+ Customers</span>
              </div>

              <div className="w-px h-12 bg-border hidden sm:block" />

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-saffron/10 text-saffron">
                  <ShieldCheck size={24} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-text-dark tracking-wide">100% Authentic</span>
                  <span className="text-xs text-text-secondary mt-0.5">Certified & Blessed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Image/Visual Area */}
          <div className="py-10 col-span-1 lg:col-span-6 xl:col-span-7 relative order-1 lg:order-2 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-2xl lg:max-w-none h-[400px] sm:h-[500px] lg:h-[600px] group mt-8 lg:mt-0">
              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-[1rem] overflow-hidden bg-ivory-section shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                <img
                  src="home.jpeg"
                  alt="Premium Pooja Products"
                  className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-dark/50 via-transparent to-transparent opacity-70" />
              </div>

              {/* Floating Element - Product feature or highlight */}
              <div className="absolute -bottom-6 -left-2 sm:bottom-10 sm:-left-10 bg-white/90 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl border border-white/60 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-saffron/10 flex items-center justify-center shadow-inner">
                    <Sparkles className="text-saffron" size={24} />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-text-secondary">Special Offer</p>
                    <p className="text-sm sm:text-base font-bold text-text-dark">Pure Brass Idols</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
