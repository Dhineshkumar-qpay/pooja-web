import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { fetchCategories, IMAGE_BASE_URL } from '@/lib/api';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export async function Categories() {
  const categories = await fetchCategories();

  return (
    <section id="categories" className="py-24 bg-ivory-section relative overflow-hidden">
      {/* Decorative background accents */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute top-40 -left-40 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-80 h-80 bg-saffron/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Explore by Category" 
          subtitle="Find the perfect spiritual products for your specific life events and rituals." 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {categories.map((category) => (
            <Link 
              key={category.categoryid} 
              href={`/products?category=${category.categoryid}`}
              className="group flex flex-col items-center p-4 sm:p-6 bg-white rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-border/40 hover:shadow-[0_8px_30px_rgb(217,107,39,0.12)] hover:border-saffron/30 transition-all duration-500 transform hover:-translate-y-2"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden rounded-[1.5rem] rounded-t-full mb-6 ring-1 ring-black/5 bg-ivory">
                <img 
                  src={`${IMAGE_BASE_URL}${category.thumbnailimage}`} 
                  alt={category.categoryname}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-text-dark/50 via-text-dark/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Floating action button on hover */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-8 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                  <div className="w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center text-saffron shadow-lg">
                    <ArrowUpRight size={22} className="group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                </div>
              </div>
              
              <h3 className="font-serif font-bold text-2xl text-text-dark mb-3 text-center group-hover:text-saffron-dark transition-colors duration-300">
                {category.categoryname}
              </h3>
              <p className="text-sm text-text-secondary text-center leading-relaxed line-clamp-2 mb-6 px-2">
                {category.description}
              </p>
              
              <div className="mt-auto flex items-center gap-3 text-xs font-semibold text-saffron tracking-widest uppercase">
                <span>Explore</span>
                <span className="w-1 h-1 rounded-full bg-saffron/50" />
                <span>{category.productcount || 0} Items</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
