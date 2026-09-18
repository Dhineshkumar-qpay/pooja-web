import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { products } from '@/data/mock-data';
import { fetchCategories } from '@/lib/api';
import { Search, Filter, IndianRupee, Star, ShoppingCart } from 'lucide-react';

export default async function ProductsPage() {
  const categories = await fetchCategories();
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory pb-20">
        <div className="bg-saffron-dark text-white py-12">
          <div className="w-full px-6 md:px-12 text-center">
            <h1 className="text-4xl font-serif font-bold mb-4">Shop Sacred Pooja Items</h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Authentic, premium quality spiritual products for your daily rituals and special occasions.
            </p>
          </div>
        </div>

        <div className="w-full px-6 md:px-12 mt-8 flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full md:w-1/4 shrink-0">
            <div className="bg-white p-6 rounded-xl border border-border shadow-sm sticky top-28">
              <div className="flex items-center gap-2 font-bold text-text-dark text-lg mb-6 pb-4 border-b border-border">
                <Filter size={20} className="text-saffron" /> Filters
              </div>
              
              <div className="mb-6">
                <h3 className="font-semibold text-text-dark mb-3">Categories</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-saffron focus:ring-saffron" defaultChecked />
                    <span className="text-text-secondary text-sm">All Products</span>
                  </label>
                  {categories.map(cat => (
                    <label key={cat.categoryid} className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="rounded text-saffron focus:ring-saffron" />
                      <span className="text-text-secondary text-sm">{cat.categoryname}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-text-dark mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="price" className="text-saffron focus:ring-saffron" defaultChecked />
                    <span className="text-text-secondary text-sm">Any Price</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="price" className="text-saffron focus:ring-saffron" />
                    <span className="text-text-secondary text-sm">Under ₹500</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="price" className="text-saffron focus:ring-saffron" />
                    <span className="text-text-secondary text-sm">₹500 - ₹1000</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="price" className="text-saffron focus:ring-saffron" />
                    <span className="text-text-secondary text-sm">Over ₹1000</span>
                  </label>
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-text-secondary">Showing <span className="font-bold text-text-dark">{products.length}</span> products</p>
              <select className="border border-border rounded-md px-3 py-1.5 text-sm text-text-dark bg-white focus:outline-none focus:ring-1 focus:ring-saffron">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <Card key={product.id} className="relative flex flex-col cursor-pointer overflow-hidden border-border/40 hover:border-saffron/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <div className="relative h-56 w-full overflow-hidden bg-ivory-section">
                    <img
                      src={product.imageUrl} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                    {!product.inStock && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="destructive">Out of Stock</Badge>
                      </div>
                    )}
                    {product.originalPrice && product.inStock && (
                      <div className="absolute top-3 right-3 bg-saffron text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="fill-gold text-gold" />
                      <span className="text-sm font-medium text-text-dark">{product.rating}</span>
                      <span className="text-xs text-text-secondary">({product.reviewsCount})</span>
                    </div>
                    <Link href={`/products/${product.slug}`} className="hover:text-saffron transition-colors before:absolute before:inset-0 before:z-10">
                      <h3 className="font-serif font-bold text-lg text-text-dark mb-1 line-clamp-1">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                      {product.shortDescription}
                    </p>
                    
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <div className="flex flex-col">
                        <div className="flex items-center font-bold text-lg text-text-dark">
                          <IndianRupee size={16} strokeWidth={2.5} />
                          {product.price}
                        </div>
                        {product.originalPrice && (
                          <div className="text-xs text-text-secondary line-through flex items-center">
                            <IndianRupee size={10} />{product.originalPrice}
                          </div>
                        )}
                      </div>
                      <Link href={`/products/${product.slug}`} className="relative z-20">
                        <Button size="sm" variant="outline" className="gap-2">
                          View <ShoppingCart size={14} />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
