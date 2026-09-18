'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { products, reviews as allReviews } from '@/data/mock-data';
import { IndianRupee, Star, Truck, ShieldCheck, ArrowLeft, ShoppingCart, Check, User } from 'lucide-react';

export default function ProductDetailClient({ slug }: { slug: string }) {
  const product = products.find(p => p.slug === slug);
  if (!product) notFound();

  const productReviews = allReviews.filter(r => r.productId === product.id);
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  const [form, setForm] = useState({ userName: '', rating: 5, comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const [localReviews, setLocalReviews] = useState(productReviews);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.userName.trim() || !form.comment.trim()) return;
    setLocalReviews(prev => [
      { id: `local-${Date.now()}`, productId: product.id, ...form, date: new Date().toISOString().split('T')[0] },
      ...prev,
    ]);
    setSubmitted(true);
    setForm({ userName: '', rating: 5, comment: '' });
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
                  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                  {!product.inStock && (
                    <div className="absolute top-4 left-4">
                      <Badge variant="destructive" className="px-3 py-1 text-sm">Out of Stock</Badge>
                    </div>
                  )}
                </div>
                <div className="flex gap-4 overflow-x-auto pb-2">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`relative size-24 rounded-lg overflow-hidden border-2 cursor-pointer ${i === 1 ? 'border-saffron' : 'border-border opacity-70 hover:opacity-100'}`}>
                      <img src={product.imageUrl} alt={`${product.name} view ${i}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="lg:w-1/2">
              <Badge className="mb-4 bg-saffron/10 text-saffron border-saffron/20">{product.category}</Badge>
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-text-dark mb-4 leading-tight">{product.name}</h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  <Star size={18} className="fill-gold text-gold" />
                  <span className="font-bold text-text-dark">{product.rating}</span>
                </div>
                <span className="text-text-secondary text-sm underline decoration-border underline-offset-4">
                  {product.reviewsCount} verified reviews
                </span>
              </div>

              <div className="flex items-end gap-3 mb-8">
                <div className="flex items-center text-3xl font-bold text-text-dark">
                  <IndianRupee size={28} strokeWidth={2.5} />{product.price}
                </div>
                {product.originalPrice && (
                  <div className="flex items-center text-lg text-text-secondary line-through mb-1">
                    <IndianRupee size={16} />{product.originalPrice}
                  </div>
                )}
                <span className="text-sm text-success font-medium mb-1.5 ml-2">(Inclusive of all taxes)</span>
              </div>

              <p className="text-text-secondary leading-relaxed mb-8 text-lg">{product.description}</p>

              {/* Add to Cart */}
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

              {/* Features */}
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

          {/* Reviews Section */}
          <div className="mt-20">
            <SectionHeading title="Customer Reviews" subtitle="See what our customers are saying about this product." centered={false} />
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Reviews List */}
              <div className="flex-1 space-y-6">
                {localReviews.length === 0 && (
                  <p className="text-text-secondary">No reviews yet. Be the first to review!</p>
                )}
                {localReviews.map(review => (
                  <div key={review.id} className="bg-white rounded-xl border border-border/60 p-6 shadow-sm">
                    <div className="flex items-start gap-4">
                      <div className="size-10 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                        <User size={18} className="text-saffron" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-text-dark">{review.userName}</span>
                          <span className="text-xs text-text-secondary">{review.date}</span>
                        </div>
                        <div className="flex items-center gap-0.5 mb-3">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} size={14} className={i < review.rating ? 'fill-gold text-gold' : 'text-border fill-border'} />
                          ))}
                        </div>
                        <p className="text-text-secondary text-sm leading-relaxed">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Post Review Form */}
              <div className="lg:w-96 shrink-0">
                <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6 sticky top-28">
                  <h3 className="font-serif font-bold text-xl text-text-dark mb-6">Write a Review</h3>
                  {submitted && (
                    <div className="mb-4 flex items-center gap-2 text-success text-sm bg-success/10 rounded-lg px-4 py-3">
                      <Check size={16} /> Review submitted successfully!
                    </div>
                  )}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1.5">Your Name</label>
                      <input
                        type="text"
                        value={form.userName}
                        onChange={e => setForm(f => ({ ...f, userName: e.target.value }))}
                        placeholder="e.g. Ramesh K."
                        required
                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-text-dark bg-ivory focus:outline-none focus:ring-1 focus:ring-saffron"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1.5">Rating</label>
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button key={star} type="button" onClick={() => setForm(f => ({ ...f, rating: star }))} className="focus:outline-none">
                            <Star size={24} className={star <= form.rating ? 'fill-gold text-gold' : 'text-border fill-border'} />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-dark mb-1.5">Your Review</label>
                      <textarea
                        value={form.comment}
                        onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                        placeholder="Share your experience with this product..."
                        required
                        rows={4}
                        className="w-full border border-border rounded-lg px-4 py-2.5 text-sm text-text-dark bg-ivory focus:outline-none focus:ring-1 focus:ring-saffron resize-none"
                      />
                    </div>
                    <Button type="submit" className="w-full">Submit Review</Button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-20">
              <SectionHeading title="You May Also Like" subtitle="More products from the same category." centered={false} />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {related.map(p => (
                  <Card key={p.id} className="relative flex flex-col cursor-pointer overflow-hidden border-border/40 hover:border-saffron/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                    <div className="relative h-64 w-full overflow-hidden bg-ivory-section">
                      <img src={p.imageUrl} alt={p.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      {!p.inStock && (
                        <div className="absolute top-3 right-3"><Badge variant="destructive">Out of Stock</Badge></div>
                      )}
                      {p.originalPrice && p.inStock && (
                        <div className="absolute top-3 right-3 bg-saffron text-white text-xs font-bold px-2 py-1 rounded shadow-sm">SALE</div>
                      )}
                    </div>
                    <CardContent className="p-6 flex flex-col flex-1 bg-white">
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={14} className="fill-gold text-gold" />
                        <span className="text-sm font-medium text-text-dark">{p.rating}</span>
                        <span className="text-xs text-text-secondary">({p.reviewsCount})</span>
                      </div>
                      <Link href={`/products/${p.slug}`} className="hover:text-saffron transition-colors before:absolute before:inset-0 before:z-10">
                        <h3 className="font-serif font-bold text-xl text-text-dark mb-2 line-clamp-1">{p.name}</h3>
                      </Link>
                      <p className="text-sm text-text-secondary line-clamp-2 mb-5 flex-1 leading-relaxed">{p.shortDescription}</p>
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                        <div className="flex flex-col">
                          <div className="flex items-center font-bold text-xl text-text-dark">
                            <IndianRupee size={18} strokeWidth={2.5} />{p.price}
                          </div>
                          {p.originalPrice && (
                            <div className="text-xs text-text-secondary line-through flex items-center mt-0.5">
                              <IndianRupee size={10} />{p.originalPrice}
                            </div>
                          )}
                        </div>
                        <Link href={`/products/${p.slug}`} className="relative z-20">
                          <Button variant="outline" className="gap-2 font-semibold group-hover:bg-saffron group-hover:text-white group-hover:border-saffron transition-all">
                            View <ShoppingCart size={16} />
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
