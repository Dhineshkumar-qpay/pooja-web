import React from 'react';
import { Flame, ShieldCheck, CalendarClock, HeartHandshake } from 'lucide-react';

export function TrustSection() {
  const trusts = [
    {
      icon: Flame,
      title: "Authentic Vedic Rituals",
      description: "Strictly following traditional scriptures and ancient practices."
    },
    {
      icon: ShieldCheck,
      title: "Experienced Priests",
      description: "Verified scholars with deep knowledge of mantras and procedures."
    },
    {
      icon: CalendarClock,
      title: "Convenient Online Booking",
      description: "Hassle-free scheduling at your preferred date and time."
    },
    {
      icon: HeartHandshake,
      title: "Trusted Spiritual Services",
      description: "Serving thousands of devotees with devotion and transparency."
    }
  ];

  return (
    <section className="py-20 bg-ivory relative overflow-hidden border-t border-border/50">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] z-0 pointer-events-none"></div>
      
      <div className="w-full px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="text-saffron font-bold tracking-widest uppercase text-sm mb-3 block">Why Choose Us</span>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-text-dark">Committed to Excellence & Tradition</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trusts.map((trust, index) => {
            const Icon = trust.icon;
            return (
              <div key={index} className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-border/60 relative overflow-hidden flex flex-col items-center text-center">
                {/* Top Accent Line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-saffron to-gold scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                
                <div className="size-16 rounded-xl bg-ivory-section text-saffron group-hover:bg-saffron group-hover:text-white flex items-center justify-center mb-6 transition-all duration-300 -rotate-6 group-hover:rotate-0 shadow-sm group-hover:shadow-md border border-border/50 group-hover:border-saffron">
                  <Icon className="size-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-text-dark mb-3 transition-colors">{trust.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{trust.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
