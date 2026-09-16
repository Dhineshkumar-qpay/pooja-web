"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Package, MapPin, Heart, History, LogOut, PackageCheck, IndianRupee } from 'lucide-react';
import { products } from '@/data/mock-data';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory py-12">
        <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
          
          <h1 className="text-3xl font-serif font-bold text-text-dark mb-8">My Account</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <Card className="sticky top-28">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-border/50 bg-ivory-section">
                    <p className="font-bold text-lg text-text-dark">Arjun Kumar</p>
                    <p className="text-sm text-text-secondary">arjun.k@example.com</p>
                  </div>
                  <nav className="flex flex-col py-2">
                    <button 
                      onClick={() => setActiveTab('orders')}
                      className={`flex items-center gap-3 px-6 py-4 text-left transition-colors ${activeTab === 'orders' ? 'text-saffron font-medium bg-saffron/5 border-l-2 border-saffron' : 'text-text-secondary hover:text-saffron hover:bg-ivory-section'}`}
                    >
                      <Package size={18} /> My Orders
                    </button>
                    <button 
                      onClick={() => setActiveTab('addresses')}
                      className={`flex items-center gap-3 px-6 py-4 text-left transition-colors ${activeTab === 'addresses' ? 'text-saffron font-medium bg-saffron/5 border-l-2 border-saffron' : 'text-text-secondary hover:text-saffron hover:bg-ivory-section'}`}
                    >
                      <MapPin size={18} /> Saved Addresses
                    </button>
                    <button 
                      onClick={() => setActiveTab('wishlist')}
                      className={`flex items-center gap-3 px-6 py-4 text-left transition-colors ${activeTab === 'wishlist' ? 'text-saffron font-medium bg-saffron/5 border-l-2 border-saffron' : 'text-text-secondary hover:text-saffron hover:bg-ivory-section'}`}
                    >
                      <Heart size={18} /> Wishlist
                    </button>
                    <Link href="/login" className="flex items-center gap-3 px-6 py-4 text-left text-error hover:bg-error/5 transition-colors mt-4 border-t border-border/50">
                      <LogOut size={18} /> Sign Out
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4">
              
              {/* Orders Tab */}
              {activeTab === 'orders' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-6 flex items-center gap-2">
                    <History size={24} className="text-saffron" /> Order History
                  </h2>
                  
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b border-border/50">
                        <div>
                          <p className="text-sm font-medium text-text-dark">Order #ORD-8475-9021</p>
                          <p className="text-xs text-text-secondary mt-1">Placed on 14 Sep, 2026</p>
                        </div>
                        <div className="mt-2 md:mt-0 px-3 py-1 bg-success/10 text-success text-xs font-bold rounded flex items-center gap-1.5">
                          <PackageCheck size={14} /> Delivered
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="size-20 bg-ivory rounded-md overflow-hidden shrink-0 border border-border">
                          <img src={products[0].imageUrl} alt="Product" className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <Link href={`/products/${products[0].slug}`} className="font-bold text-text-dark hover:text-saffron transition-colors line-clamp-1">
                            {products[0].name}
                          </Link>
                          <p className="text-sm text-text-secondary mt-1">Qty: 1</p>
                          <div className="flex items-center text-text-dark font-bold mt-2">
                            <IndianRupee size={14} /> {products[0].price}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex gap-3">
                        <Button variant="outline" size="sm">Track Order</Button>
                        <Button size="sm">Buy Again</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Other tabs placeholders */}
              {activeTab === 'addresses' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-6">Saved Addresses</h2>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                      <div className="size-16 bg-ivory rounded-full flex items-center justify-center text-text-secondary mb-4">
                        <MapPin size={32} />
                      </div>
                      <h3 className="font-bold text-lg text-text-dark mb-2">No addresses saved yet</h3>
                      <p className="text-text-secondary mb-6">Add a delivery address to make checkout faster.</p>
                      <Button>Add New Address</Button>
                    </CardContent>
                  </Card>
                </div>
              )}

              {activeTab === 'wishlist' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-6">My Wishlist</h2>
                  <Card>
                    <CardContent className="p-6 flex flex-col items-center justify-center min-h-[300px] text-center">
                      <div className="size-16 bg-ivory rounded-full flex items-center justify-center text-text-secondary mb-4">
                        <Heart size={32} />
                      </div>
                      <h3 className="font-bold text-lg text-text-dark mb-2">Your wishlist is empty</h3>
                      <p className="text-text-secondary mb-6">Save items you love to your wishlist and buy them later.</p>
                      <Link href="/products">
                        <Button>Explore Products</Button>
                      </Link>
                    </CardContent>
                  </Card>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
