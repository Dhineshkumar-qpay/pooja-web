import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { getTestimonials } from '@/lib/api';

export async function Testimonials() {
  const testimonials = await getTestimonials("active");

  if (!testimonials || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-16 bg-ivory-section">
      <div className="w-full px-6 md:px-12">
        <SectionHeading
          title="What Our Devotees Say"
          subtitle="Read experiences from people who have trusted us with their spiritual journeys."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto px-4">
          {testimonials.map(testimonial => (
            <Card 
              key={testimonial.testimonialid} 
              className="relative overflow-hidden bg-white border border-border/40 shadow-sm hover:shadow-xl hover:border-saffron/30 transition-all duration-500 transform hover:-translate-y-1 group rounded-[1.5rem]"
            >
              <div className="absolute -top-4 -right-4 text-saffron/5 group-hover:text-saffron/10 transition-colors duration-500 transform -scale-x-100">
                <Quote size={120} fill="currentColor" />
              </div>
              <CardContent className="p-8 relative z-10 flex flex-col h-full">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < testimonial.rating ? "text-gold fill-gold" : "text-border/40 fill-border/40"}
                    />
                  ))}
                </div>
                <p className="text-text-dark/80 text-[15px] leading-relaxed mb-8 italic flex-1">
                  "{testimonial.review}"
                </p>
                <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/30">
                  <div className="size-12 rounded-full bg-gradient-to-br from-ivory to-ivory-section flex items-center justify-center text-saffron font-serif font-bold text-xl border border-saffron/20 shadow-sm">
                    {testimonial.fullname.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark text-[15px] tracking-tight">{testimonial.fullname}</h4>
                    <p className="text-xs text-text-secondary mt-1 font-medium">{testimonial.location}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
