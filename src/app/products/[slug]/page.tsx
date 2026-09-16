import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { products } from '@/data/mock-data';
import { IndianRupee, Star, Truck, ShieldCheck, ArrowLeft, ShoppingCart, Check } from 'lucide-react';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

// Generate static paths at build time
export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = await params;
  const product = products.find(p => p.slug === resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-border/50 py-4">
          <div className="w-full px-6 md:px-12">
            <div className="flex items-center text-sm text-text-secondary">
              <Link href="/" className="hover:text-saffron transition-colors">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/products" className="hover:text-saffron transition-colors">Products</Link>
              <span className="mx-2">/</span>
              <span className="text-text-dark font-medium">{product.name}</span>
            </div>
          </div>
        </div>

        <div className="w-full px-6 md:px-12 py-12">
          <Link href="/products" className="inline-flex items-center gap-2 text-saffron hover:text-saffron-dark font-medium mb-8 group">
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Products
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Product Image Gallery */}
            <div className="lg:w-1/2">
              <div className="sticky top-28 space-y-4">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden border border-border bg-white shadow-sm">
                  <img 
                    src={product.imageUrl} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                  {!product.inStock && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="destructive" className="px-3 py-1 text-sm">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                
                {/* Thumbnails (mock logic using main image multiple times) */}
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`relative size-24 rounded-lg overflow-hidden border-2 cursor-pointer ${i === 1 ? 'border-saffron' : 'border-border opacity-70 hover:opacity-100'}`}>
                      <img 
                        src={product.imageUrl} 
                        alt={`${product.name} view ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <Badge className="mb-4 bg-saffron/10 text-saffron border-saffron/20">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-text-dark mb-4 leading-tight">
                {product.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star size={18} className="fill-gold text-gold" />
                  <span className="font-bold text-text-dark">{product.rating}</span>
                </div>
                <span className="text-text-secondary text-sm underline decoration-border underline-offset-4 cursor-pointer hover:text-saffron">
                  {product.reviewsCount} verified reviews
                </span>
              </div>

              <div className="flex items-end gap-3 mb-8">
                <div className="flex items-center text-3xl font-bold text-text-dark">
                  <IndianRupee size={28} strokeWidth={2.5} />
                  {product.price}
                </div>
                {product.originalPrice && (
                  <div className="flex items-center text-lg text-text-secondary line-through mb-1">
                    <IndianRupee size={16} />{product.originalPrice}
                  </div>
                )}
                <span className="text-sm text-success font-medium mb-1.5 ml-2">(Inclusive of all taxes)</span>
              </div>

              <p className="text-text-secondary leading-relaxed mb-8 text-lg">
                {product.description}
              </p>

              {/* Add to Cart Area */}
              <div className="bg-white p-6 rounded-2xl border border-border/60 shadow-sm mb-10">
                <div className="flex items-center gap-4 mb-6">
                  <span className="font-medium text-text-dark">Quantity:</span>
                  <div className="flex items-center border border-border rounded-lg overflow-hidden">
                    <button className="px-4 py-2 hover:bg-ivory-section transition-colors text-text-secondary">-</button>
                    <span className="px-4 py-2 font-medium text-text-dark border-x border-border">1</span>
                    <button className="px-4 py-2 hover:bg-ivory-section transition-colors text-text-secondary">+</button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="outline" className="flex-1 bg-white">
                    <ShoppingCart size={18} className="mr-2" /> Add to Cart
                  </Button>
                  <Link href="/checkout" className="flex-1">
                    <Button size="lg" className="w-full">Buy Now</Button>
                  </Link>
                </div>
                
                <div className="mt-6 flex flex-col gap-3 pt-6 border-t border-border/50 text-sm">
                  <div className="flex items-center gap-3 text-text-secondary">
                    <Truck size={18} className="text-success" /> Free shipping on orders over ₹999
                  </div>
                  <div className="flex items-center gap-3 text-text-secondary">
                    <ShieldCheck size={18} className="text-success" /> 100% Authentic & Certified
                  </div>
                </div>
              </div>

              {/* Features/Highlights */}
              <div>
                <h3 className="font-bold text-xl text-text-dark mb-4 font-serif">Product Highlights</h3>
                <ul className="space-y-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 size-5 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                        <Check size={12} className="text-saffron-dark" />
                      </div>
                      <span className="text-text-secondary">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
