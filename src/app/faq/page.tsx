"use client";

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { faqs } from '@/data/mock-data';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggle = (id: string) => {
    if (openId === id) {
      setOpenId(null);
    } else {
      setOpenId(id);
    }
  };

  // Group faqs by category
  const categories = Array.from(new Set(faqs.map(f => f.category)));

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory py-16">
        <div className="w-full px-6 md:px-12">
          <SectionHeading 
            title="Frequently Asked Questions" 
            subtitle="Find answers to common questions about booking, payments, and our pooja services."
          />

          <div className="max-w-3xl mx-auto mt-12 space-y-10">
            {categories.map(category => {
              const categoryFaqs = faqs.filter(f => f.category === category);
              return (
                <div key={category}>
                  <h2 className="text-xl font-serif font-bold text-text-dark mb-4 border-b border-border pb-2">{category}</h2>
                  <div className="space-y-4">
                    {categoryFaqs.map(faq => (
                      <div 
                        key={faq.id} 
                        className="bg-white border border-border rounded-lg overflow-hidden transition-all duration-200"
                      >
                        <button
                          onClick={() => toggle(faq.id)}
                          className="w-full text-left px-6 py-4 flex items-center justify-between focus:outline-none focus-visible:bg-ivory-section"
                          aria-expanded={openId === faq.id}
                        >
                          <span className="font-medium text-text-dark">{faq.question}</span>
                          <ChevronDown 
                            className={cn(
                              "text-saffron transition-transform duration-300",
                              openId === faq.id ? "rotate-180" : ""
                            )} 
                            size={20} 
                          />
                        </button>
                        <div 
                          className={cn(
                            "px-6 text-text-secondary overflow-hidden transition-all duration-300",
                            openId === faq.id ? "max-h-96 pb-4 opacity-100" : "max-h-0 opacity-0"
                          )}
                        >
                          {faq.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
