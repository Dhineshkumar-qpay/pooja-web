"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Package, MapPin, Heart, History, LogOut, PackageCheck, IndianRupee, Plus, Star, ShoppingCart, Trash2, Edit2 } from 'lucide-react';
import { products } from '@/data/mock-data';

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  // Use mock products for wishlist
  const wishlistProducts = products.slice(1, 4);

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory py-12">
        <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">
          
          <h1 className="text-3xl font-serif font-bold text-text-dark mb-8">My Account</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <Card className="sticky top-28 overflow-hidden shadow-sm border-border/60">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-border/50 bg-ivory-section">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="size-12 rounded-full bg-saffron text-white flex items-center justify-center font-bold text-xl">
                        A
                      </div>
                      <div>
                        <p className="font-bold text-lg text-text-dark leading-tight">Arjun Kumar</p>
                        <p className="text-sm text-text-secondary">arjun.k@example.com</p>
                      </div>
                    </div>
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
                    <Link href="/" className="flex items-center gap-3 px-6 py-4 text-left text-error hover:bg-error/5 transition-colors mt-4 border-t border-border/50">
                      <LogOut size={18} /> Sign Out
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4">
              
              {/* --- Orders Tab --- */}
              {activeTab === 'orders' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-6 flex items-center gap-2">
                    <History size={24} className="text-saffron" /> Order History
                  </h2>
                  
                  <Card className="shadow-sm border-border/60">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b border-border/50">
                        <div>
                          <p className="text-sm font-bold text-text-dark">Order #ORD-8475-9021</p>
                          <p className="text-xs text-text-secondary mt-1">Placed on 14 Sep, 2026</p>
                        </div>
                        <div className="mt-2 md:mt-0 px-3 py-1.5 bg-success/10 text-success text-xs font-bold rounded-md flex items-center gap-1.5">
                          <PackageCheck size={16} /> Delivered
                        </div>
                      </div>
                      
                      <div className="flex gap-5">
                        <div className="size-24 bg-ivory rounded-xl overflow-hidden shrink-0 border border-border">
                          <img src={products[0].imageUrl} alt="Product" className="object-cover w-full h-full" />
                        </div>
                        <div className="flex-1">
                          <Link href={`/products/${products[0].slug}`} className="font-bold text-lg text-text-dark hover:text-saffron transition-colors line-clamp-1">
                            {products[0].name}
                          </Link>
                          <p className="text-sm text-text-secondary mt-1">Qty: 1</p>
                          <div className="flex items-center text-text-dark font-bold mt-2 text-lg">
                            <IndianRupee size={16} /> {products[0].price}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex gap-3">
                        <Button variant="outline" size="sm" className="flex-1 md:flex-none" asChild>
                          <Link href="/orders/ORD-8475-9021">Track Order</Link>
                        </Button>
                        <Button size="sm" className="flex-1 md:flex-none">Buy Again</Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* --- Addresses Tab --- */}
              {activeTab === 'addresses' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-text-dark flex items-center gap-2">
                      <MapPin size={24} className="text-saffron" /> Saved Addresses
                    </h2>
                    {!showAddressForm && (
                      <Button onClick={() => setShowAddressForm(true)} size="sm" className="gap-2">
                        <Plus size={16} /> Add New
                      </Button>
                    )}
                  </div>
                  
                  {showAddressForm ? (
                    <Card className="shadow-sm border-border/60 animate-in slide-in-from-bottom-4 duration-300">
                      <CardContent className="p-8">
                        <h3 className="font-serif font-bold text-xl text-text-dark mb-6">Add New Delivery Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">First Name</label>
                            <Input placeholder="Arjun" className="bg-ivory-section" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">Last Name</label>
                            <Input placeholder="Kumar" className="bg-ivory-section" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">Phone Number</label>
                            <Input placeholder="+91 98765 43210" className="bg-ivory-section" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">Address Line 1</label>
                            <Input placeholder="House/Flat No., Building Name" className="bg-ivory-section" />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">Address Line 2 (Optional)</label>
                            <Input placeholder="Street, Landmark" className="bg-ivory-section" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">City</label>
                            <Input placeholder="City" className="bg-ivory-section" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">State</label>
                            <Input placeholder="State" className="bg-ivory-section" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">PIN Code</label>
                            <Input placeholder="123456" className="bg-ivory-section" />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">Address Type</label>
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="addrType" className="text-saffron focus:ring-saffron" defaultChecked />
                                <span className="text-sm">Home</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input type="radio" name="addrType" className="text-saffron focus:ring-saffron" />
                                <span className="text-sm">Work</span>
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                          <Button variant="outline" onClick={() => setShowAddressForm(false)}>Cancel</Button>
                          <Button onClick={() => setShowAddressForm(false)}>Save Address</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Saved Address Card */}
                      <Card className="shadow-sm border-saffron border-2 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 bg-saffron text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                          DEFAULT
                        </div>
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-saffron/10 text-saffron rounded-md"><MapPin size={16} /></div>
                              <span className="font-bold text-text-dark uppercase tracking-wider text-sm">Home</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-lg text-text-dark mb-1">Arjun Kumar</h4>
                          <p className="text-text-secondary text-sm leading-relaxed mb-4">
                            402, Shri Krishna Apartments<br/>
                            Temple Road, Juhu<br/>
                            Mumbai, Maharashtra 400049<br/>
                            Phone: +91 98765 43210
                          </p>
                          <div className="flex gap-4 pt-4 border-t border-border/50">
                            <button className="text-sm font-medium text-saffron flex items-center gap-1 hover:underline">
                              <Edit2 size={14} /> Edit
                            </button>
                            <button className="text-sm font-medium text-error flex items-center gap-1 hover:underline">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="shadow-sm border-border/60 hover:border-saffron/30 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                              <div className="p-1.5 bg-ivory text-text-secondary rounded-md"><MapPin size={16} /></div>
                              <span className="font-bold text-text-dark uppercase tracking-wider text-sm">Work</span>
                            </div>
                          </div>
                          <h4 className="font-bold text-lg text-text-dark mb-1">Arjun Kumar</h4>
                          <p className="text-text-secondary text-sm leading-relaxed mb-4">
                            TechPark Business Center, Floor 4<br/>
                            Andheri East<br/>
                            Mumbai, Maharashtra 400069<br/>
                            Phone: +91 98765 43210
                          </p>
                          <div className="flex gap-4 pt-4 border-t border-border/50">
                            <button className="text-sm font-medium text-saffron flex items-center gap-1 hover:underline">
                              <Edit2 size={14} /> Edit
                            </button>
                            <button className="text-sm font-medium text-text-secondary flex items-center gap-1 hover:text-error hover:underline transition-colors">
                              <Trash2 size={14} /> Delete
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              )}

              {/* --- Wishlist Tab --- */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-6 flex items-center gap-2">
                    <Heart size={24} className="text-saffron fill-saffron/20" /> My Wishlist
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {wishlistProducts.map((product) => (
                      <Card key={product.id} className="relative flex flex-col cursor-pointer overflow-hidden border-border/40 hover:border-saffron/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                        <div className="absolute top-3 right-3 z-30">
                          <button className="p-2 bg-white/80 backdrop-blur rounded-full text-error hover:bg-error hover:text-white transition-colors shadow-sm">
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <div className="relative h-48 w-full overflow-hidden bg-ivory-section">
                          <img 
                            src={product.imageUrl} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                          />
                        </div>
                        <CardContent className="p-5 flex flex-col flex-1 bg-white">
                          <div className="flex items-center gap-1 mb-2">
                            <Star size={14} className="fill-gold text-gold" />
                            <span className="text-sm font-medium text-text-dark">{product.rating}</span>
                          </div>
                          <Link href={`/products/${product.slug}`} className="hover:text-saffron transition-colors before:absolute before:inset-0 before:z-10">
                            <h3 className="font-serif font-bold text-lg text-text-dark mb-1 line-clamp-1">{product.name}</h3>
                          </Link>
                          
                          <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                            <div className="flex flex-col">
                              <div className="flex items-center font-bold text-lg text-text-dark">
                                <IndianRupee size={16} strokeWidth={2.5} />
                                {product.price}
                              </div>
                            </div>
                            <Link href={`/products/${product.slug}`} className="relative z-20">
                              <Button size="sm" className="gap-1.5 shadow-md">
                                <ShoppingCart size={14} /> Cart
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
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
