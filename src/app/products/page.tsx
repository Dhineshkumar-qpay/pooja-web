import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { fetchCategories } from '@/lib/api';
import { ProductClient } from './ProductClient';

export default async function ProductsPage() {
  const categories = await fetchCategories();

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory pb-20">
        <div className="w-full border-b border-border/50 shadow-lg min-h-[250px] lg:min-h-[320px] flex items-center relative overflow-hidden mb-12 bg-text-dark group">
          {/* Background Image with smooth scale */}
          <div
            className="absolute inset-0 z-0 scale-105 bg-cover bg-center bg-no-repeat transition-transform duration-[15000ms] ease-out group-hover:scale-110"
            style={{ backgroundImage: "url('/product-bg.jpeg')" }}
          ></div>

          {/* Elegant Dark Glass Overlay for premium feel */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/80 backdrop-blur-[2px] z-0"></div>

          {/* Vibrant background shapes */}
          <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-saffron/30 rounded-full blur-[100px] z-0 mix-blend-screen animate-pulse pointer-events-none"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-gold/20 rounded-full blur-[100px] z-0 mix-blend-screen pointer-events-none" style={{ animationDelay: '2s' }}></div>

          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center justify-center">
            <div className="max-w-3xl mx-auto transform transition-all duration-700 translate-y-0 opacity-100">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-light font-medium text-xs sm:text-sm tracking-widest uppercase shadow-xl hover:bg-white/20 transition-colors cursor-default">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron"></span>
                </span>
                Divine Collection
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-2xl">
                Shop <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-gold">Sacred Pooja</span> Items
              </h1>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light drop-shadow-md">
                Authentic, premium quality spiritual products curated for your daily rituals, meditation, and special occasions.
              </p>
            </div>
          </div>
        </div>

        <ProductClient categories={categories} />
      </main>
      <Footer />
    </>
  );
}
