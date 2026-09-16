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
    <section className="py-16 bg-ivory">
      <div className="w-full px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trusts.map((trust, index) => {
            const Icon = trust.icon;
            return (
              <div key={index} className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-white transition-colors duration-300 border border-transparent hover:border-border hover:shadow-sm">
                <div className="size-16 rounded-full bg-ivory-section flex items-center justify-center mb-6 shadow-sm border border-border">
                  <Icon className="text-saffron size-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-text-dark mb-3">{trust.title}</h3>
                <p className="text-text-secondary">{trust.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
