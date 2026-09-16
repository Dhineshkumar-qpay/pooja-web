import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { categories } from '@/data/mock-data';
import Link from 'next/link';
import Image from 'next/image';

export function Categories() {
  return (
    <section className="py-16 bg-ivory-section">
      <div className="w-full px-6 md:px-12">
        <SectionHeading 
          title="Explore by Category" 
          subtitle="Find the perfect spiritual products for your specific life events and rituals." 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              href={`/products?category=${category.slug}`}
              className="group flex flex-col bg-white rounded-2xl shadow-sm border border-border/60 hover:shadow-xl hover:border-saffron/40 transition-all duration-500 transform hover:-translate-y-1.5 overflow-hidden"
            >
              <div className="relative h-48 w-full overflow-hidden bg-ivory-section">
                <Image 
                  src={category.imageUrl} 
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 flex flex-col items-center text-center flex-1">
                <h3 className="font-serif font-bold text-xl text-text-dark mb-3 group-hover:text-saffron-dark transition-colors duration-300">{category.name}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
