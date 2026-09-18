import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/mock-data';
import {
  ArrowLeft, PackageCheck, Truck, Package, ClipboardList,
  MapPin, IndianRupee, Phone, Mail, Check,
} from 'lucide-react';

const TRACKING_STEPS = [
  { label: 'Order Placed', desc: 'Your order has been received', date: '14 Sep 2026, 10:32 AM', done: true, icon: ClipboardList },
  { label: 'Order Confirmed', desc: 'Payment verified & order confirmed', date: '14 Sep 2026, 11:05 AM', done: true, icon: PackageCheck },
  { label: 'Packed & Shipped', desc: 'Your order is on its way', date: '15 Sep 2026, 09:20 AM', done: true, icon: Package },
  { label: 'Out for Delivery', desc: 'Arriving today between 2–6 PM', date: '17 Sep 2026, 08:45 AM', done: true, icon: Truck },
  { label: 'Delivered', desc: 'Package delivered successfully', date: '17 Sep 2026, 04:12 PM', done: true, icon: PackageCheck },
];

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products[0];

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory pb-16">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border/50 py-4">
          <div className="w-full px-6 md:px-12">
            <div className="flex items-center text-sm text-text-secondary">
              <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/dashboard" className="hover:text-saffron transition-colors">My Account</Link>
              <span className="mx-2">/</span>
              <span className="text-text-dark font-medium">Order #{id}</span>
            </div>
          </div>
        </div>

        <div className="w-full px-6 md:px-12 py-10 max-w-6xl mx-auto">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-saffron hover:text-saffron-dark font-medium mb-8 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to My Orders
          </Link>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-text-dark">Order #{id}</h1>
              <p className="text-text-secondary text-sm mt-1">Placed on 14 Sep, 2026</p>
            </div>
            <Badge className="bg-success/10 text-success border-success/30 px-4 py-2 text-sm font-semibold w-fit flex items-center gap-2">
              <PackageCheck size={16} /> Delivered
            </Badge>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left — Tracking + Product */}
            <div className="flex-1 space-y-6">

              {/* Tracking Timeline */}
              <Card className="border border-border/60 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <h2 className="font-serif font-bold text-xl text-text-dark mb-6 flex items-center gap-2">
                    <Truck size={20} className="text-saffron" /> Order Tracking
                  </h2>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border/60" />
                    <div className="space-y-0">
                      {TRACKING_STEPS.map((step, idx) => {
                        const Icon = step.icon;
                        const isLast = idx === TRACKING_STEPS.length - 1;
                        return (
                          <div key={idx} className="relative flex gap-5 pb-8 last:pb-0">
                            {/* Icon circle */}
                            <div className={`relative z-10 size-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${step.done ? 'bg-saffron border-saffron text-white shadow-[0_0_12px_rgba(217,107,39,0.3)]' : 'bg-white border-border text-text-secondary'}`}>
                              {step.done ? <Check size={16} /> : <Icon size={16} />}
                            </div>
                            {/* Content */}
                            <div className={`flex-1 pt-1.5 ${!isLast ? 'pb-2' : ''}`}>
                              <div className="flex items-center justify-between flex-wrap gap-1">
                                <span className={`font-semibold text-sm ${step.done ? 'text-text-dark' : 'text-text-secondary'}`}>{step.label}</span>
                                {step.done && <span className="text-xs text-text-secondary">{step.date}</span>}
                              </div>
                              <p className="text-xs text-text-secondary mt-0.5">{step.desc}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product */}
              <Card className="border border-border/60 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <h2 className="font-serif font-bold text-xl text-text-dark mb-5 flex items-center gap-2">
                    <Package size={20} className="text-saffron" /> Items Ordered
                  </h2>
                  <div className="flex gap-4 p-4 bg-ivory-section rounded-xl border border-border/50">
                    <div className="size-20 rounded-xl overflow-hidden shrink-0 border border-border/50">
                      <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/products/${product.slug}`} className="font-bold text-text-dark hover:text-saffron transition-colors line-clamp-2 text-sm">
                        {product.name}
                      </Link>
                      <p className="text-xs text-text-secondary mt-1">Category: {product.category}</p>
                      <p className="text-xs text-text-secondary">Qty: 1</p>
                      <div className="flex items-center font-bold text-text-dark mt-2">
                        <IndianRupee size={14} strokeWidth={2.5} />{product.price}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex gap-3">
                    <Link href={`/products/${product.slug}`} className="flex-1">
                      <Button variant="outline" size="sm" className="w-full">View Product</Button>
                    </Link>
                    <Link href="/checkout" className="flex-1">
                      <Button size="sm" className="w-full">Buy Again</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right — Summary */}
            <div className="lg:w-80 shrink-0 space-y-6">

              {/* Price Breakdown */}
              <Card className="border border-border/60 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <h2 className="font-serif font-bold text-xl text-text-dark mb-5">Price Details</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span className="font-medium text-text-dark">₹{product.price}</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Delivery</span>
                      <span className="font-medium text-success">FREE</span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Taxes</span>
                      <span className="font-medium text-text-dark">Included</span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border/50">
                      <span className="font-bold text-text-dark">Total Paid</span>
                      <span className="font-bold text-saffron-dark text-xl">₹{product.price}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50 text-xs text-text-secondary flex items-center gap-2">
                    <span className="font-medium text-text-dark">Payment:</span> Razorpay · UPI
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="border border-border/60 shadow-sm rounded-2xl">
                <CardContent className="p-6">
                  <h2 className="font-serif font-bold text-xl text-text-dark mb-4 flex items-center gap-2">
                    <MapPin size={18} className="text-saffron" /> Delivery Address
                  </h2>
                  <p className="font-semibold text-text-dark text-sm">Arjun Kumar</p>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                    402, Shri Krishna Apartments,<br />
                    Temple Road, Juhu,<br />
                    Mumbai, Maharashtra – 400049
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Phone size={12} /> +91 98765 43210
                    </div>
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Mail size={12} /> arjun.k@example.com
                    </div>
                  </div>
                </CardContent>
              </Card>

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
