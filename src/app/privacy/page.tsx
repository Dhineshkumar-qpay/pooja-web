"use client";

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-border/60">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-8 border-b border-border/50 pb-6">Privacy Policy</h1>
          
          <div className="space-y-8 text-text-secondary leading-relaxed">
            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">1. Introduction</h2>
              <p>
                Welcome to DivinePooja. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website (regardless of where you visit it from) and tell you about your privacy rights and how the law protects you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">2. The Data We Collect About You</h2>
              <p className="mb-3">We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-text-dark">Identity Data:</strong> includes first name, last name, username or similar identifier.</li>
                <li><strong className="text-text-dark">Contact Data:</strong> includes billing address, delivery address, email address and telephone numbers.</li>
                <li><strong className="text-text-dark">Financial Data:</strong> includes bank account and payment card details (processed securely by our payment gateways).</li>
                <li><strong className="text-text-dark">Transaction Data:</strong> includes details about payments to and from you and other details of products and services you have purchased from us.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">3. How We Use Your Personal Data</h2>
              <p className="mb-3">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Where we need to perform the contract we are about to enter into or have entered into with you (e.g., shipping your order).</li>
                <li>Where it is necessary for our legitimate interests (or those of a third party) and your interests and fundamental rights do not override those interests.</li>
                <li>Where we need to comply with a legal obligation.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">4. Data Security</h2>
              <p>
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-serif font-bold text-text-dark mb-4">5. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or our privacy practices, please contact us in the following ways:
              </p>
              <p className="mt-2">
                <strong>Email:</strong> support@divinepooja.com<br/>
                <strong>Phone:</strong> +91 98765 43210
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
