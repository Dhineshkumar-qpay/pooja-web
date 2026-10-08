import Link from 'next/link';
import { Button } from '../ui/button';
import { ArrowRight, ShieldCheck, Star, Medal } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-[90vh] w-full flex items-center bg-white overflow-hidden border-b border-border/50">
      
      {/* Subtle Corporate Background Accents */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-ivory-section/50 rounded-bl-[150px] -z-10 hidden lg:block" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] z-0 pointer-events-none" />

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 z-10 py-16 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* Text Content Area */}
          <div className="col-span-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-center order-2 lg:order-1 pt-8 lg:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-3 mb-8">
              <span className="w-10 h-px bg-saffron" />
              <span className="text-xs sm:text-sm font-semibold text-saffron-dark tracking-widest uppercase">
                Premium Spiritual Collection
              </span>
            </div>

            <h1 className="text-5xl md:text-5xl lg:text-[3.5rem] font-serif font-bold text-text-dark mb-6 leading-[1.1] tracking-tight">
              Sacred <span className="text-saffron">Pooja</span><br />
              Products for Soul
            </h1>

            <p className="text-lg md:text-xl text-text-secondary mb-10 max-w-lg font-light leading-relaxed">
              Discover our curated collection of authentic Rudraksha, pure brass idols, and premium Havan samagri. Handcrafted by artisans with devotion and absolute purity.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link href="/products" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-7 bg-saffron hover:bg-saffron-dark text-white rounded-xl shadow-[0_4px_20px_rgb(217,107,39,0.3)] hover:shadow-[0_8px_30px_rgb(217,107,39,0.4)] transition-all hover:-translate-y-0.5 group">
                  Shop Collection
                  <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="#categories" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-7 bg-white border-border/80 text-text-dark hover:bg-ivory hover:text-saffron-dark rounded-xl transition-all shadow-sm hover:shadow-md">
                  Explore Categories
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-14 pt-8 border-t border-border/60 flex flex-wrap gap-8 items-center">
              <div>
                <div className="flex items-center gap-1 text-saffron mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className="fill-current" />
                  ))}
                </div>
                <span className="text-sm font-medium text-text-secondary tracking-wide">10,000+ Customers</span>
              </div>

              <div className="w-px h-12 bg-border/80 hidden sm:block" />

              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-ivory-section border border-border/50 text-saffron">
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
            <div className="relative w-full max-w-2xl lg:max-w-none h-[400px] sm:h-[500px] lg:h-[650px] mt-8 lg:mt-0">
              
              {/* Main Image Container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-ivory shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border/50 group">
                <img
                  src="home.jpeg"
                  alt="Premium Pooja Products"
                  className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-105"
                />
              </div>

              {/* Sophisticated Overlay Card */}
              <div className="absolute -bottom-6 -left-2 sm:bottom-10 sm:-left-12 bg-white p-6 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-border/60 flex items-start gap-4 max-w-xs transition-transform duration-500 hover:-translate-y-2">
                <div className="w-12 h-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <Medal className="text-saffron" size={24} />
                </div>
                <div>
                  <h4 className="text-text-dark font-bold text-sm mb-1">Premium Quality</h4>
                  <p className="text-text-secondary text-xs leading-relaxed">
                    Ethically sourced and artisan-crafted materials for your sacred rituals.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
