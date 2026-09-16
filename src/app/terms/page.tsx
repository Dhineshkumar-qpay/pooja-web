"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function TermsAndConditionsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border/60">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-8 border-b border-border/50 pb-6">Terms & Conditions</h1>
          
          <div className="space-y-8 text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. In addition, when using this website's particular services, you shall be subject to any posted guidelines or rules applicable to such services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">2. E-Commerce and Purchases</h2>
              <p className="mb-3">When you purchase a product or service from us, you agree to the following:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You are providing accurate and complete payment and shipping information.</li>
                <li>We reserve the right to refuse or cancel any order for any reason at any given time.</li>
                <li>Prices for our products are subject to change without notice.</li>
                <li>All spiritual products are sold for religious and spiritual purposes. We do not make any medical or health claims regarding our products.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">3. Shipping and Returns</h2>
              <p>
                We aim to process and ship all orders within 24-48 hours. Delivery times may vary based on location. We offer a 7-day return policy on items that arrive damaged or defective. Used items, especially consumable pooja materials (like Havan Samagri, Agarbatti), cannot be returned.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">4. Intellectual Property</h2>
              <p>
                The Site and its original content, features, and functionality are owned by DivinePooja and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">5. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the laws of India and you irrevocably submit to the exclusive jurisdiction of the courts in that State or location.
              </p>
            </section>
            
            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">6. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. What constitutes a material change will be determined at our sole discretion.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
