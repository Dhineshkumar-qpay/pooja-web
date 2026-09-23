import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { RefreshCcw, XCircle, FileText, CheckCircle2 } from 'lucide-react';

export default function CancellationPolicyPage() {
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
                Cancellation & Return Policy
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                We strive for your complete satisfaction. Learn about our transparent cancellation and returns process.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 md:px-12 max-w-4xl">
          <Card className="border border-border/60 shadow-lg rounded-[2rem] overflow-hidden bg-white/80 backdrop-blur-sm p-8 md:p-12">
            <CardContent className="space-y-8 p-0">
              
              <div className="flex gap-4">
                <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <XCircle size={24} className="text-saffron" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-3">Order Cancellation</h2>
                  <p className="text-text-secondary leading-relaxed mb-3">
                    We accept order cancellations before the product has been dispatched. If you cancel your order before dispatch, you will receive a full refund to your original payment method within 5-7 business days.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    Once the order has been shipped, we can no longer cancel the order. In this case, you will have to initiate a return request after receiving the product.
                  </p>
                </div>
              </div>

              <hr className="border-border/60" />

              <div className="flex gap-4">
                <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <RefreshCcw size={24} className="text-saffron" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-3">Returns & Exchanges</h2>
                  <p className="text-text-secondary leading-relaxed mb-3">
                    We have a 7-day return policy, which means you have 7 days after receiving your item to request a return.
                  </p>
                  <p className="text-text-secondary leading-relaxed mb-3">
                    To be eligible for a return, your item must be in the same condition that you received it, unworn or unused, with tags, and in its original packaging. You’ll also need the receipt or proof of purchase.
                  </p>
                  <p className="text-text-secondary leading-relaxed">
                    Certain types of items cannot be returned, like perishable goods (such as fresh flowers or prasad), and custom products (such as personalized pooja thalis).
                  </p>
                </div>
              </div>

              <hr className="border-border/60" />

              <div className="flex gap-4">
                <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <FileText size={24} className="text-saffron" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-3">How to Initiate a Return</h2>
                  <p className="text-text-secondary leading-relaxed mb-3">
                    To start a return, you can contact us at <strong>support@divinepooja.com</strong>. If your return is accepted, we’ll send you a return shipping label, as well as instructions on how and where to send your package. Items sent back to us without first requesting a return will not be accepted.
                  </p>
                </div>
              </div>

              <hr className="border-border/60" />

              <div className="flex gap-4">
                <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={24} className="text-saffron" />
                </div>
                <div>
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-3">Refunds</h2>
                  <p className="text-text-secondary leading-relaxed">
                    We will notify you once we’ve received and inspected your return, and let you know if the refund was approved or not. If approved, you’ll be automatically refunded on your original payment method within 10 business days. Please remember it can take some time for your bank or credit card company to process and post the refund too.
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
