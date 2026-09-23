import React from 'react';
import { getBanners, IMAGE_BASE_URL } from '@/lib/api';
import Link from 'next/link';

export async function BannersSection() {
  const banners = await getBanners();

  if (!banners || banners.length === 0) return null;

  return (
    <section className="py-12 bg-white">
      <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
        <div className={`grid gap-8 ${banners.length > 1 ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
          {banners.map((banner) => (
            <Link
              href="/products"
              key={banner.bannerid}
              className="relative rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl group border border-border/30 bg-ivory block transition-all duration-500 hover:-translate-y-1"
            >
              <img
                src={`${IMAGE_BASE_URL}${banner.bannerimage}`}
                alt={banner.title || 'Promotional Banner'}
                className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ minHeight: '300px', maxHeight: banners.length > 1 ? '350px' : '450px' }}
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
              
              {/* Content Box */}
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <h3 className="text-3xl md:text-4xl font-serif font-bold text-white mb-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  {banner.title}
                </h3>
                <div className="flex items-center text-saffron font-bold uppercase tracking-wider text-sm opacity-90 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-75">
                  Explore Collection 
                  <span className="ml-2 group-hover:translate-x-2 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
