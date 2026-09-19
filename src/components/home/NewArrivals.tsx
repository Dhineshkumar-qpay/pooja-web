import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { SectionHeading } from '../ui/SectionHeading';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { fetchProducts, IMAGE_BASE_URL } from '@/lib/api';
import { IndianRupee, Star, ShoppingCart } from 'lucide-react';

export async function NewArrivals() {
  const newArrivals = await fetchProducts({ isNewarrival: true });
  const displayArrivals = newArrivals.slice(0, 6);

  return (
    <section className="py-20 bg-white">
      <div className="w-full px-6 md:px-12">
        <SectionHeading 
          title="New Arrivals" 
          subtitle="Discover our latest authentic spiritual items and pooja samagri added this week."
          centered
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {displayArrivals.map((product) => (
            <Card key={product.productid} className="relative flex flex-col cursor-pointer overflow-hidden border-border/40 hover:border-saffron/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
              <div className="relative h-64 w-full overflow-hidden bg-ivory-section">
                <img 
                  src={`${IMAGE_BASE_URL}${product.thumbnailimage}`} 
                  alt={product.productname}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-3 left-3 bg-success text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                  NEW
                </div>
                {product.stockquantity <= 0 && (
                  <div className="absolute top-3 right-3">
                    <Badge variant="destructive">Out of Stock</Badge>
                  </div>
                )}
                {product.price && product.stockquantity > 0 && product.price !== product.sellingprice && (
                  <div className="absolute top-3 right-3 bg-saffron text-white text-xs font-bold px-2 py-1 rounded shadow-sm">
                    SALE
                  </div>
                )}
              </div>
              <CardContent className="p-6 flex flex-col flex-1 bg-white">
                <div className="flex items-center gap-1 mb-2">
                  <Star size={14} className="fill-gold text-gold" />
                  <span className="text-sm font-medium text-text-dark">4.9</span>
                  <span className="text-xs text-text-secondary">(124)</span>
                </div>
                <Link href={`/products/${product.productid}`} className="hover:text-saffron transition-colors before:absolute before:inset-0 before:z-10">
                  <h3 className="font-serif font-bold text-xl text-text-dark mb-2 line-clamp-1">{product.productname}</h3>
                </Link>
                <p className="text-sm text-text-secondary line-clamp-2 mb-5 flex-1 leading-relaxed">
                  {product.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <div className="flex flex-col">
                    <div className="flex items-center font-bold text-xl text-text-dark">
                      <IndianRupee size={18} strokeWidth={2.5} />
                      {product.sellingprice}
                    </div>
                    {product.price && product.price !== product.sellingprice && (
                      <div className="text-xs text-text-secondary line-through flex items-center mt-0.5">
                        <IndianRupee size={10} />{product.price}
                      </div>
                    )}
                  </div>
                  <Link href={`/products/${product.productid}`} className="relative z-20">
                    <Button variant="outline" className="gap-2 font-semibold group-hover:bg-saffron group-hover:text-white group-hover:border-saffron transition-all">
                      View <ShoppingCart size={16} />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/products">
            <Button size="lg" variant="outline" className="px-8">
              View All Arrivals
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
