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
import { Target, Lightbulb, Star, MessageSquare, ArrowRight } from 'lucide-react';
import { addTestimonial } from '@/lib/api';

export default function AboutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullname: '',
    location: '',
    title: '',
    rating: 5,
    review: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleStarClick = (rating: number) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await addTestimonial(formData);
      setSubmitted(true);
      setFormData({
        fullname: '',
        location: '',
        title: '',
        rating: 5,
        review: ''
      });
    } catch (err) {
      setError("Failed to submit testimonial. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory pb-20">
        {/* Hero */}
        <div className="w-full border-b border-border shadow-sm min-h-[200px] lg:min-h-[250px] flex items-center relative overflow-hidden mb-12">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590059530510-188b77a7df84?w=1920&q=80')] bg-cover bg-center bg-no-repeat z-0"></div>
          
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-md z-0"></div>

          {/* Subtle corporate background pattern/shapes */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-saffron/10 skew-x-12 translate-x-16 z-0 mix-blend-multiply"></div>
          <div className="absolute top-0 right-0 w-1/4 h-full bg-saffron/20 skew-x-12 translate-x-24 z-0 mix-blend-multiply"></div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block px-3 py-1 mb-4 rounded bg-saffron/10 text-saffron font-semibold text-sm tracking-widest uppercase">
                Heritage & Tradition
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-text-dark mb-4 tracking-tight">
                Our Story
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                Preserving ancient Vedic traditions by making authentic spiritual products accessible to devotees worldwide.
              </p>
            </div>
          </div>
        </div>

        {/* Story Section */}
        <div className="w-full px-6 md:px-12 py-20">
          <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl mx-auto">
            <div className="md:w-1/2">
              <div className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://www.mypoojabox.in/cdn/shop/collections/26c92712a02585550e716cd99f294bbc.jpg?v=1643028341"
                  alt="Traditional items"
                  className="w-full h-full object-cover"
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

        {/* Business Highlights */}
        <div className="bg-saffron text-white py-16">
          <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x-0 md:divide-x divide-white/20">
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold font-serif mb-2">1,000+</span>
                <span className="text-white/90 font-medium uppercase tracking-wider text-xs md:text-sm">Happy Customers</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold font-serif mb-2">100+</span>
                <span className="text-white/90 font-medium uppercase tracking-wider text-xs md:text-sm">Pooja Products</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold font-serif mb-2">20+</span>
                <span className="text-white/90 font-medium uppercase tracking-wider text-xs md:text-sm">Product Categories</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl font-bold font-serif mb-2">2+</span>
                <span className="text-white/90 font-medium uppercase tracking-wider text-xs md:text-sm">Years of Experience</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="bg-white py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
            <div className="absolute -top-24 -left-24 size-96 bg-saffron/20 rounded-full blur-[100px]"></div>
            <div className="absolute top-1/2 right-0 size-96 bg-gold/20 rounded-full blur-[100px]"></div>
          </div>
          
          <div className="w-full px-6 md:px-12 max-w-6xl mx-auto relative z-10">
            <SectionHeading title="Our Purpose" subtitle="What drives us every single day." centered />

            <div className="flex flex-col md:flex-row gap-10 mt-16 justify-center">
              {/* Mission Card */}
              <Card className="flex-1 border border-border/40 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-2xl hover:border-saffron/40 transition-all duration-500 group rounded-[2rem] overflow-hidden relative">
                <div className="absolute -top-8 -right-8 text-saffron/5 group-hover:text-saffron/10 transition-colors duration-500 transform -scale-x-100">
                   <Target size={180} />
                </div>
                <CardContent className="p-12 text-center flex flex-col items-center relative z-10 h-full">
                  <div className="size-20 rounded-2xl bg-gradient-to-br from-saffron to-saffron-dark flex items-center justify-center text-white mb-8 shadow-lg shadow-saffron/30 group-hover:scale-110 transition-transform duration-500 -rotate-6 group-hover:rotate-0">
                    <Target size={36} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-text-dark mb-5 tracking-tight">Our Mission</h3>
                  <p className="text-text-dark/80 text-[17px] leading-relaxed">
                    To empower every household with authentic, pure, and blessed spiritual products, making it effortless to uphold our sacred traditions and rituals no matter where they are in the world.
                  </p>
                </CardContent>
              </Card>

              {/* Vision Card */}
              <Card className="flex-1 border border-border/40 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-2xl hover:border-gold/40 transition-all duration-500 group rounded-[2rem] overflow-hidden relative">
                <div className="absolute -top-8 -right-8 text-gold/5 group-hover:text-gold/10 transition-colors duration-500 transform -scale-x-100">
                   <Lightbulb size={180} />
                </div>
                <CardContent className="p-12 text-center flex flex-col items-center relative z-10 h-full">
                  <div className="size-20 rounded-2xl bg-gradient-to-br from-gold to-[#c79122] flex items-center justify-center text-white mb-8 shadow-lg shadow-gold/30 group-hover:scale-110 transition-transform duration-500 rotate-6 group-hover:rotate-0">
                    <Lightbulb size={36} />
                  </div>
                  <h3 className="text-3xl font-serif font-bold text-text-dark mb-5 tracking-tight">Our Vision</h3>
                  <p className="text-text-dark/80 text-[17px] leading-relaxed">
                    To become the most trusted global destination for all Hindu spiritual and pooja needs, fostering a deep connection with divinity, peace, and cultural roots for generations to come.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="bg-ivory-section py-24 relative overflow-hidden">
          {/* Subtle background graphics */}
          <div className="absolute top-0 left-1/4 w-full h-full opacity-20 pointer-events-none">
             <div className="absolute top-20 left-0 size-64 bg-gold/20 rounded-full blur-[80px]"></div>
          </div>
          
          <div className="w-full px-6 md:px-12 max-w-7xl mx-auto relative z-10">
            <SectionHeading title="What We Offer" subtitle="Explore our wide range of authentic spiritual products." centered />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {[
                { icon: "🪔", title: "Pooja Items", desc: "Sacred tools for your daily rituals and ceremonies." },
                { icon: "🌸", title: "Decorations", desc: "Beautiful floral accents for your divine spaces." },
                { icon: "🛕", title: "Temple Essentials", desc: "Everything you need to set up your home temple." },
                { icon: "🕉️", title: "God Idols", desc: "Exquisite murtis crafted with devotion and care." },
                { icon: "🪔", title: "Diyas & Lamps", desc: "Bring light and positivity into your spiritual corner." },
                { icon: "🌿", title: "Pooja Samagri", desc: "Pure and authentic ingredients for havan and pooja." },
                { icon: "🎁", title: "Devotional Gifts", desc: "Meaningful gifts for weddings, housewarmings, and festivals." },
                { icon: "📿", title: "Accessories", desc: "Malas, yantras, and tools for deep meditation." }
              ].map((item, idx) => (
                <Card 
                  key={idx} 
                  className="border border-border/40 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl hover:border-saffron/40 transition-all duration-500 text-left group cursor-pointer rounded-3xl overflow-hidden relative transform hover:-translate-y-2 flex flex-col"
                >
                  <div className="absolute -bottom-6 -right-6 text-7xl opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-500 grayscale group-hover:grayscale-0 pointer-events-none">
                    {item.icon}
                  </div>
                  <CardContent className="p-8 relative z-10 flex-1 flex flex-col">
                    <div className="size-14 rounded-2xl bg-ivory-section flex items-center justify-center text-3xl mb-6 shadow-sm border border-border/50 group-hover:bg-saffron/5 group-hover:border-saffron/20 transition-colors">
                      <span className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{item.icon}</span>
                    </div>
                    <h3 className="font-bold text-text-dark text-lg mb-2">{item.title}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed flex-1">
                      {item.desc}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-saffron font-semibold text-sm opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                      Explore <ArrowRight size={16} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Submit Testimonial Form */}
        <div className="w-full px-6 md:px-12 py-20 bg-white">
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
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="bg-destructive/10 text-destructive p-3 rounded-md text-sm">
                        {error}
                      </div>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">Full Name</label>
                        <Input name="fullname" value={formData.fullname} onChange={handleInputChange} required placeholder="Enter your name" className="bg-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-dark mb-2">Location</label>
                        <Input name="location" value={formData.location} onChange={handleInputChange} required placeholder="City, State" className="bg-white" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">Title</label>
                      <Input name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g. Beautiful Experience" className="bg-white" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">Rating</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button type="button" key={star} onClick={() => handleStarClick(star)} className="text-gold focus:outline-none hover:scale-110 transition-transform">
                            <Star size={28} className={star <= formData.rating ? "fill-gold" : ""} />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-2">Your Review</label>
                      <textarea
                        name="review"
                        value={formData.review}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className="w-full rounded-md border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent transition-colors"
                        placeholder="Tell us about your experience..."
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full gap-2" disabled={loading}>
                      <MessageSquare size={18} /> {loading ? "Submitting..." : "Submit Testimonial"}
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
