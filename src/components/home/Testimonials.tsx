import React from 'react';
import { SectionHeading } from '../ui/SectionHeading';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '../ui/card';

const testimonials = [
  {
    id: 't1',
    customerName: 'Rahul Sharma',
    location: 'Mumbai, MH',
    rating: 5,
    review: 'The brass Ganesha idol I ordered is absolutely stunning. The craftsmanship is top-notch and it came perfectly packaged. Very satisfied!'
  },
  {
    id: 't2',
    customerName: 'Priya Patel',
    location: 'Ahmedabad, GJ',
    rating: 5,
    review: 'I bought the 5-Mukhi Rudraksha mala and the lab certificate gave me great peace of mind. It feels very authentic and pure.'
  },
  {
    id: 't3',
    customerName: 'Amit Desai',
    location: 'Pune, MH',
    rating: 4,
    review: 'The Havan Samagri kit had everything we needed for our housewarming pooja. The quality of herbs and ghee was excellent.'
  }
];

export function Testimonials() {
  return (
    <section className="py-16 bg-ivory-section">
      <div className="w-full px-6 md:px-12">
        <SectionHeading 
          title="What Our Devotees Say" 
          subtitle="Read experiences from people who have trusted us with their spiritual journeys." 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 max-w-5xl mx-auto">
          {testimonials.map(testimonial => (
            <Card key={testimonial.id} className="relative overflow-visible pt-8 mt-8 border-none shadow-sm">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 size-12 rounded-full bg-saffron flex items-center justify-center text-white shadow-md">
                <Quote size={20} fill="currentColor" />
              </div>
              <CardContent className="pt-6 text-center">
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < testimonial.rating ? "text-gold fill-gold" : "text-border"} 
                    />
                  ))}
                </div>
                <p className="text-text-secondary italic mb-6">"{testimonial.review}"</p>
                <div>
                  <h4 className="font-bold text-text-dark">{testimonial.customerName}</h4>
                  <p className="text-sm text-text-secondary">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
