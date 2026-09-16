"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Target, Lightbulb, Star, MessageSquare } from 'lucide-react';

export default function AboutPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory pb-20">
        {/* Hero */}
        <div className="bg-saffron-dark text-white py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 z-0"></div>
          <div className="container relative z-10 mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Our Story</h1>
            <p className="text-lg md:text-xl text-white/90">
              Preserving ancient Vedic traditions by making authentic spiritual products accessible to devotees worldwide.
            </p>
          </div>
        </div>

        {/* Story Section */}
        <div className="w-full px-6 md:px-12 py-20">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
            <div className="md:w-1/2">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <Image 
                  src="https://images.unsplash.com/photo-1590059530510-188b77a7df84?w=800&q=80" 
                  alt="Traditional items"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl font-serif font-bold text-text-dark mb-6">How It Started</h2>
              <p className="text-text-secondary leading-relaxed mb-4">
                DivinePooja was born out of a deep reverence for our rich cultural heritage and a desire to bridge the gap between traditional practices and modern convenience.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                For years, finding genuine, high-quality pooja materials and authentic idols was a challenge for many families living in urban areas. We created this platform to bring curated, energized, and ethically sourced spiritual products directly to you.
              </p>
              <p className="text-text-secondary leading-relaxed mb-8">
                Today, we have served thousands of devotees, ensuring that every significant life event and daily ritual is blessed with the purest materials.
              </p>
              <Link href="/products">
                <Button>Explore Our Products</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="bg-white py-20">
          <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
            <SectionHeading title="Our Purpose" subtitle="What drives us every single day." centered />
            
            <div className="flex flex-col md:flex-row gap-8 mt-12 justify-center">
              {/* Mission Card */}
              <Card className="flex-1 border-saffron/30 hover:border-saffron shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-10 text-center flex flex-col items-center">
                  <div className="size-20 rounded-full bg-saffron/10 flex items-center justify-center text-saffron mb-6">
                    <Target size={36} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-text-dark mb-4">Our Mission</h3>
                  <p className="text-text-secondary leading-relaxed">
                    To empower every household with authentic, pure, and blessed spiritual products, making it effortless to uphold our sacred traditions and rituals no matter where they are in the world.
                  </p>
                </CardContent>
              </Card>

              {/* Vision Card */}
              <Card className="flex-1 border-gold/40 hover:border-gold shadow-md hover:shadow-xl transition-all duration-300">
                <CardContent className="p-10 text-center flex flex-col items-center">
                  <div className="size-20 rounded-full bg-gold/10 flex items-center justify-center text-gold mb-6">
                    <Lightbulb size={36} />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-text-dark mb-4">Our Vision</h3>
                  <p className="text-text-secondary leading-relaxed">
                    To become the most trusted global destination for all Hindu spiritual and pooja needs, fostering a deep connection with divinity, peace, and cultural roots for generations to come.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Submit Testimonial Form */}
        <div className="w-full px-6 md:px-12 py-20 bg-ivory-section">
          <div className="max-w-3xl mx-auto">
            <SectionHeading title="Share Your Experience" subtitle="We'd love to hear how our products have enriched your spiritual journey." centered />
            
            <Card className="mt-10 border-border/60 shadow-lg">
              <CardContent className="p-8 md:p-12">
                {submitted ? (
                  <div className="text-center py-10 animate-in zoom-in duration-500">
                    <div className="size-20 rounded-full bg-success/20 text-success flex items-center justify-center mx-auto mb-6">
                      <Star size={40} className="fill-success" />
                    </div>
                    <h3 className="text-2xl font-bold text-text-dark mb-2">Thank you!</h3>
                    <p className="text-text-secondary">Your testimonial has been submitted successfully.</p>
                    <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>Submit Another</Button>
                  </div>
                ) : (
                  <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">Full Name</label>
                        <Input required placeholder="Enter your name" className="bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">Location</label>
                        <Input required placeholder="City, State" className="bg-white" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">Product Purchased</label>
                      <Input required placeholder="e.g. Brass Ganesha Idol" className="bg-white" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button type="button" key={star} className="text-gold focus:outline-none hover:scale-110 transition-transform">
                            <Star size={28} className="fill-gold" />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">Your Review</label>
                      <textarea 
                        required 
                        rows={4} 
                        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-colors"
                        placeholder="Tell us about your experience..."
                      />
                    </div>
                    
                    <Button type="submit" size="lg" className="w-full gap-2">
                      <MessageSquare size={18} /> Submit Testimonial
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

      </main>
      <Footer />
    </>
  );
}
