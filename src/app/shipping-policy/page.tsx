import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Truck, Clock, ShieldCheck, MapPin } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory pb-20">
        <div className="w-full border-b border-border shadow-sm min-h-[200px] lg:min-h-[250px] flex items-center relative overflow-hidden mb-12">
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-md z-0"></div>
          {/* Subtle corporate background pattern/shapes */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-saffron/10 skew-x-12 translate-x-16 z-0 mix-blend-multiply"></div>
          <div className="absolute top-0 right-0 w-1/4 h-full bg-saffron/20 skew-x-12 translate-x-24 z-0 mix-blend-multiply"></div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-text-dark mb-4 tracking-tight">
                Shipping Policy
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                Everything you need to know about our delivery times, methods, and costs.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <Card className="border border-border/60 shadow-lg rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-sm p-8 md:p-12">
            <CardContent className="space-y-8 p-0">
              
              <div className="flex gap-4">
                <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <Clock size={24} className="text-saffron" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-3">Order Processing Time</h2>
                  <p className="text-text-secondary leading-relaxed mb-3">
                    All orders are processed within 1 to 2 business days (excluding weekends and holidays) after receiving your order confirmation email. You will receive another notification when your order has shipped.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    Please note that during high-volume periods or festive seasons, processing times may be slightly delayed.
                  </p>
                </div>
              </div>

              <hr className="border-border/60" />

              <div className="flex gap-4">
                <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <Truck size={24} className="text-saffron" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-3">Shipping Rates & Estimates</h2>
                  <p className="text-text-secondary leading-relaxed mb-3">
                    Shipping charges for your order will be calculated and displayed at checkout. We offer standard shipping across all our service areas.
                  </p>
                  <ul className="list-disc pl-5 text-text-secondary space-y-2">
                    <li><strong>Standard Shipping:</strong> 3-5 business days.</li>
                    <li><strong>Express Shipping:</strong> 1-2 business days (available in select locations).</li>
                  </ul>
                  <p className="text-text-secondary leading-relaxed mt-3">
                    We also offer free standard shipping for orders over ₹999.
                  </p>
                </div>
              </div>

              <hr className="border-border/60" />

              <div className="flex gap-4">
                <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <MapPin size={24} className="text-saffron" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-3">International Shipping</h2>
                  <p className="text-text-secondary leading-relaxed">
                    Currently, we ship only within India. We do not offer international shipping at this time, but we are actively working on expanding our services globally to serve devotees worldwide.
                  </p>
                </div>
              </div>

              <hr className="border-border/60" />

              <div className="flex gap-4">
                <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <ShieldCheck size={24} className="text-saffron" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-3">How do I check the status of my order?</h2>
                  <p className="text-text-secondary leading-relaxed">
                    When your order has shipped, you will receive an email notification from us which will include a tracking number you can use to check its status. Please allow 24 hours for the tracking information to become available.
                  </p>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </>
  );
}
