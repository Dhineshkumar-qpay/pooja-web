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
        <div className="bg-saffron-dark text-white py-12">
          <div className="w-full px-6 md:px-12 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Shop Sacred Pooja Items</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Authentic, premium quality spiritual products for your daily rituals and special occasions.
            </p>
          </div>
        </div>

        <ProductClient categories={categories} />
      </main>
      <Footer />
    </>
  );
}
