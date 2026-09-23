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
        <div className="w-full border-b border-border shadow-sm min-h-[200px] lg:min-h-[250px] flex items-center relative overflow-hidden mb-12">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590059530510-188b77a7df84?w=1920&q=80')] bg-cover bg-center bg-no-repeat z-0"></div>

          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-md z-0"></div>

          {/* Subtle corporate background pattern/shapes */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-saffron/10 skew-x-12 translate-x-16 z-0 mix-blend-multiply"></div>
          <div className="absolute top-0 right-0 w-1/4 h-full bg-saffron/20 skew-x-12 translate-x-24 z-0 mix-blend-multiply"></div>

          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block px-3 py-1 mb-4 rounded bg-saffron/10 text-saffron font-semibold text-sm tracking-widest uppercase">
                Divine Collection
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-text-dark mb-4 tracking-tight">
                Shop Sacred Pooja Items
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                Authentic, premium quality spiritual products for your daily rituals and special occasions.
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
