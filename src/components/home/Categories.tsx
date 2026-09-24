import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { fetchCategories, IMAGE_BASE_URL } from '@/lib/api';
import Link from 'next/link';

export async function Categories() {
  const categories = await fetchCategories();

  return (
    <section id="categories" className="py-16 bg-ivory-section">
      <div className="w-full px-6 md:px-12">
        <SectionHeading 
          title="Explore by Category" 
          subtitle="Find the perfect spiritual products for your specific life events and rituals." 
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {categories.map((category) => (
            <Link 
              key={category.categoryid} 
              href={`/products?category=${category.categoryid}`}
              className="group flex flex-col bg-white rounded-2xl shadow-sm border border-border/60 hover:shadow-xl hover:border-saffron/40 transition-all duration-500 transform hover:-translate-y-1.5 overflow-hidden"
            >
              <div className="relative h-48 w-full overflow-hidden bg-ivory-section">
                <img 
                  src={`${IMAGE_BASE_URL}${category.thumbnailimage}`} 
                  alt={category.categoryname}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6 flex flex-col items-center text-center flex-1">
                <h3 className="font-serif font-bold text-xl text-text-dark mb-3 group-hover:text-saffron-dark transition-colors duration-300">{category.categoryname}</h3>
                <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{category.description}</p>
                <span className="mt-4 text-xs font-semibold text-saffron tracking-wider uppercase">{category.productcount || 0} Products</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
