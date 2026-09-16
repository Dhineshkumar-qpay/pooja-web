"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { products } from '@/data/mock-data';
import { Check, ChevronRight, Lock, IndianRupee, Truck, ShieldCheck, MapPin } from 'lucide-react';

function CheckoutFlow() {
  const [step, setStep] = useState(1);
  const steps = ['Shipping', 'Payment', 'Confirmation'];
  
  // Simulate a cart item
  const cartItem = products[0];
  const cartTotal = cartItem.price;

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-6">
        <div className="relative size-32 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8 text-success shadow-[0_0_40px_rgba(63,125,74,0.2)]">
          <div className="absolute inset-0 rounded-full border-4 border-success/30 animate-pulse"></div>
          <Check size={64} className="relative z-10" />
        </div>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-4 drop-shadow-sm">Order Confirmed!</h2>
        <p className="text-lg md:text-xl text-text-secondary mb-10 leading-relaxed">
          Thank you for your purchase. Your order <span className="font-bold text-saffron-dark">#ORD-8475-9021</span> has been placed successfully and will be shipped within 24 hours.
        </p>
        <Link href="/dashboard">
          <Button size="lg" className="text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            Track Order in Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-6 lg:px-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-4">Secure Checkout</h1>
        <p className="text-text-secondary">Complete your purchase safely and securely.</p>
      </div>
      
      {/* Premium Progress Bar */}
      <div className="max-w-2xl mx-auto mb-16">
        <div className="flex items-center justify-between relative">
          <div className="absolute left-8 right-8 top-1/2 h-1 bg-border/50 -z-10 rounded-full"></div>
          <div 
            className="absolute left-8 top-1/2 h-1 bg-gradient-to-r from-saffron to-saffron-dark -z-10 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: step === 1 ? '0%' : step === 2 ? '50%' : '100%' }}
          ></div>
          
          {steps.map((s, idx) => {
            const stepNumber = idx + 1;
            const isActive = step >= stepNumber;
            const isCompleted = step > stepNumber;
            return (
              <div key={s} className="flex flex-col items-center relative z-10 bg-transparent px-2 group">
                <div className={`size-14 rounded-full flex items-center justify-center font-bold mb-3 transition-all duration-500 ${isActive ? 'bg-gradient-to-br from-saffron to-saffron-dark text-white shadow-[0_0_20px_rgba(198,90,30,0.4)] scale-110' : 'bg-white border-2 border-border text-text-secondary'}`}>
                  {isCompleted ? <Check size={24} /> : stepNumber}
                </div>
                <span className={`text-sm font-bold tracking-wide transition-colors ${isActive ? 'text-text-dark' : 'text-text-secondary'}`}>{s}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Main Form Area */}
        <div className="lg:w-2/3">
          <Card className="border-0 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8 md:p-10">
              {step === 1 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                    <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center text-saffron">
                      <MapPin size={24} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-text-dark">
                      Shipping Details
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">First Name</label>
                      <Input placeholder="John" className="bg-ivory-section/50 border-border/60 focus:border-saffron focus:ring-saffron/20 h-12 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">Last Name</label>
                      <Input placeholder="Doe" className="bg-ivory-section/50 border-border/60 focus:border-saffron focus:ring-saffron/20 h-12 rounded-xl" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-text-dark mb-2">Email Address</label>
                      <Input type="email" placeholder="john@example.com" className="bg-ivory-section/50 border-border/60 focus:border-saffron focus:ring-saffron/20 h-12 rounded-xl" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-text-dark mb-2">Phone Number</label>
                      <Input placeholder="+91 98765 43210" className="bg-ivory-section/50 border-border/60 focus:border-saffron focus:ring-saffron/20 h-12 rounded-xl" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-text-dark mb-2">Address Line 1</label>
                      <Input placeholder="House/Flat No., Building Name" className="bg-ivory-section/50 border-border/60 focus:border-saffron focus:ring-saffron/20 h-12 rounded-xl" />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-text-dark mb-2">Address Line 2 (Optional)</label>
                      <Input placeholder="Street, Landmark" className="bg-ivory-section/50 border-border/60 focus:border-saffron focus:ring-saffron/20 h-12 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">City</label>
                      <Input placeholder="City" className="bg-ivory-section/50 border-border/60 focus:border-saffron focus:ring-saffron/20 h-12 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">State</label>
                      <Input placeholder="State" className="bg-ivory-section/50 border-border/60 focus:border-saffron focus:ring-saffron/20 h-12 rounded-xl" />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-text-dark mb-2">PIN Code</label>
                      <Input placeholder="123456" className="bg-ivory-section/50 border-border/60 focus:border-saffron focus:ring-saffron/20 h-12 rounded-xl" />
                    </div>
                  </div>
                  
                  <Button size="lg" className="w-full mt-10 h-14 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group" onClick={() => setStep(2)}>
                    Continue to Payment <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
                  <div className="flex items-center gap-4 border-b border-border/50 pb-6">
                    <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center text-saffron">
                      <Lock size={24} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-text-dark">
                      Secure Payment
                    </h2>
                  </div>
                  
                  <div className="space-y-5">
                    <label className="flex p-5 border-2 border-saffron rounded-2xl bg-saffron/5 cursor-pointer shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-16 h-16 bg-saffron/10 rounded-bl-[100px] -z-10"></div>
                      <div className="flex items-center gap-4 w-full">
                        <input type="radio" name="payment" className="text-saffron focus:ring-saffron size-6 mt-0.5" defaultChecked />
                        <div className="flex-1">
                          <span className="font-bold text-lg text-text-dark block">UPI</span>
                          <span className="text-sm text-text-secondary">GPay, PhonePe, Paytm</span>
                        </div>
                      </div>
                    </label>
                    <label className="flex p-5 border border-border/60 rounded-2xl bg-white cursor-pointer hover:border-saffron/50 hover:bg-saffron/5 transition-colors">
                      <div className="flex items-center gap-4 w-full">
                        <input type="radio" name="payment" className="text-saffron focus:ring-saffron size-6 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-bold text-lg text-text-dark block">Credit / Debit Card</span>
                          <span className="text-sm text-text-secondary">Visa, MasterCard, RuPay</span>
                        </div>
                      </div>
                    </label>
                    <label className="flex p-5 border border-border/60 rounded-2xl bg-white cursor-pointer hover:border-saffron/50 hover:bg-saffron/5 transition-colors">
                      <div className="flex items-center gap-4 w-full">
                        <input type="radio" name="payment" className="text-saffron focus:ring-saffron size-6 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-bold text-lg text-text-dark block">Net Banking</span>
                          <span className="text-sm text-text-secondary">All major Indian banks</span>
                        </div>
                      </div>
                    </label>
                    <label className="flex p-5 border border-border/60 rounded-2xl bg-white cursor-pointer hover:border-saffron/50 hover:bg-saffron/5 transition-colors">
                      <div className="flex items-center gap-4 w-full">
                        <input type="radio" name="payment" className="text-saffron focus:ring-saffron size-6 mt-0.5" />
                        <div className="flex-1">
                          <span className="font-bold text-lg text-text-dark block">Cash on Delivery (COD)</span>
                          <span className="text-sm text-text-secondary">Pay when your order arrives</span>
                        </div>
                      </div>
                    </label>
                  </div>
                  
                  <div className="flex gap-4 mt-10 pt-8 border-t border-border/50">
                    <Button variant="outline" size="lg" className="w-1/3 h-14 rounded-xl border-border/80 hover:bg-ivory-section" onClick={() => setStep(1)}>Back</Button>
                    <Button size="lg" className="w-2/3 h-14 rounded-xl text-lg bg-success hover:bg-success/90 shadow-[0_10px_20px_-10px_rgba(63,125,74,0.5)] hover:shadow-[0_15px_30px_-10px_rgba(63,125,74,0.6)] hover:-translate-y-1 transition-all" onClick={() => setStep(3)}>
                      Pay Securely (₹{cartTotal})
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-1/3">
          <Card className="sticky top-28 border-0 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.1)] rounded-3xl overflow-hidden bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="font-serif font-bold text-2xl text-text-dark mb-6 border-b border-border/50 pb-4">Order Summary</h3>
              
              <div className="flex gap-4 mb-8">
                <div className="size-20 rounded-xl bg-ivory border border-border/50 overflow-hidden shrink-0 shadow-sm">
                  <img src={cartItem.imageUrl} alt={cartItem.name} className="object-cover w-full h-full" />
                </div>
                <div className="flex-1 flex flex-col justify-center">
                  <h4 className="font-bold text-text-dark text-base line-clamp-2 mb-1">{cartItem.name}</h4>
                  <p className="text-text-secondary text-sm mb-2">Qty: 1</p>
                  <div className="flex items-center text-text-dark font-bold text-lg">
                    <IndianRupee size={16} /> {cartItem.price}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4 border-t border-border/50 pt-6 text-base">
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Subtotal</span>
                  <span className="font-medium text-text-dark">₹{cartTotal}</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Shipping</span>
                  <span className="text-success font-bold">FREE</span>
                </div>
                <div className="flex justify-between items-center text-text-secondary">
                  <span>Taxes (Included)</span>
                  <span className="font-medium text-text-dark">₹0</span>
                </div>
                
                <div className="flex justify-between items-center pt-6 mt-6 border-t border-border/50">
                  <span className="font-serif font-bold text-text-dark text-xl">Total</span>
                  <span className="font-serif font-bold text-saffron-dark text-3xl">₹{cartTotal}</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border/50 space-y-4">
                <div className="flex items-center gap-3 text-sm text-text-secondary bg-ivory-section p-3 rounded-lg">
                  <ShieldCheck size={20} className="text-success shrink-0" />
                  <span>100% Secure Checkout with 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-text-secondary bg-ivory-section p-3 rounded-lg">
                  <Truck size={20} className="text-saffron shrink-0" />
                  <span>Guaranteed delivery within 3-5 business days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-ivory/50">
        <CheckoutFlow />
      </main>
      <Footer />
    </>
  );
}
