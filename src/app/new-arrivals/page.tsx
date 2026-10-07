import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { fetchProducts, IMAGE_BASE_URL } from '@/lib/api';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { IndianRupee, Star, Search } from 'lucide-react';
import { AddToCartButton } from '@/components/ui/AddToCartButton';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function NewArrivalsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const searchQuery = typeof resolvedParams?.q === 'string' ? resolvedParams.q : '';

  const allProducts = await fetchProducts({ isNewarrival: true });

  // Filter products locally based on search query
  const products = searchQuery
    ? allProducts.filter(p => p.productname?.toLowerCase().includes(searchQuery.toLowerCase()))
    : allProducts;

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory pb-20">
        <div className="w-full border-b border-border/50 shadow-xl min-h-[250px] lg:min-h-[300px] py-10 flex items-center relative overflow-hidden mb-12 bg-text-dark group">
          <div
            className="absolute inset-0 z-0 scale-105 bg-cover bg-center bg-no-repeat transition-transform duration-[15000ms] ease-out group-hover:scale-110 opacity-60"
            style={{ backgroundImage: "url('/hero.jpeg')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90 backdrop-blur-[4px] z-0"></div>
          <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-saffron/20 rounded-full blur-[120px] z-0 mix-blend-screen animate-pulse pointer-events-none"></div>

          <div className="container mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-gold-light font-medium text-xs sm:text-sm tracking-widest uppercase shadow-xl hover:bg-white/20 transition-colors cursor-default">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-saffron opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-saffron"></span>
              </span>
              Latest Additions
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-5xl font-serif font-bold text-white mb-6 tracking-tight drop-shadow-2xl text-center">
              New <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-gold">Arrivals</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-200 leading-relaxed font-light drop-shadow-md max-w-2xl text-center mb-10">
              Discover our latest authentic spiritual items and pooja samagri added this week to enrich your sacred space.
            </p>

            <form action="/new-arrivals" method="GET" className="w-full max-w-2xl relative group/form">
              <div className="relative flex items-center w-full h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden transition-all duration-300 focus-within:bg-white/20 focus-within:border-saffron/50 focus-within:ring-4 focus-within:ring-saffron/20 shadow-2xl">
                <div className="grid place-items-center h-full w-12 sm:w-14 shrink-0 text-white/70 group-focus-within/form:text-saffron transition-colors">
                  <Search size={20} className="sm:w-6 sm:h-6" />
                </div>

                <input
                  className="peer h-full w-full outline-none text-base text-white bg-transparent pr-4 placeholder-white/50 font-medium"
                  type="text"
                  name="q"
                  placeholder="Search our new arrivals..."
                  defaultValue={searchQuery}
                  autoComplete="off"
                />

                <button type="submit" className="h-full px-5 sm:px-8 shrink-0 bg-gradient-to-r from-saffron to-gold text-white font-bold hover:from-saffron-dark hover:to-saffron transition-all flex items-center justify-center gap-2 tracking-wide uppercase text-xs sm:text-sm">
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="w-full px-6 md:px-12 mt-12 max-w-[1440px] mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map(product => (
                <Card key={product.productid} className="relative flex flex-col cursor-pointer overflow-hidden border-border/40 hover:border-saffron/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group">
                  <div className="relative h-56 w-full overflow-hidden bg-ivory-section">
                    <img
                      src={`${IMAGE_BASE_URL}${product.thumbnailimage}`}
                      alt={product.productname}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
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
                      <div className="absolute top-3 right-3 bg-saffron text-white text-xs font-bold px-2 py-1 rounded">
                        SALE
                      </div>
                    )}
                  </div>
                  <CardContent className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="fill-gold text-gold" />
                      <span className="text-sm font-medium text-text-dark">{product.averagerating || "5.0"}</span>
                      <span className="text-xs text-text-secondary">({product.totalrating || 0})</span>
                    </div>
                    <Link href={`/products/${product.productid}`} className="hover:text-saffron transition-colors before:absolute before:inset-0 before:z-10">
                      <h3 className="font-serif font-bold text-lg text-text-dark mb-1 line-clamp-1">{product.productname}</h3>
                    </Link>
                    <p className="text-sm text-text-secondary line-clamp-2 mb-4 flex-1">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                      <div className="flex flex-col">
                        <div className="flex items-center font-bold text-lg text-text-dark">
                          <IndianRupee size={16} strokeWidth={2.5} />
                          {product.sellingprice}
                        </div>
                        {product.price && product.price !== product.sellingprice && (
                          <div className="text-xs text-text-secondary line-through flex items-center">
                            <IndianRupee size={10} />{product.price}
                          </div>
                        )}
                      </div>
                      <AddToCartButton productid={product.productid} className="group-hover:bg-saffron group-hover:text-white group-hover:border-saffron relative z-20" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center py-20">
              <Search size={48} className="text-border mb-4" />
              <p className="text-text-secondary text-lg">No new arrivals found matching "{searchQuery}".</p>
              <Link href="/new-arrivals" className="mt-4 text-saffron font-medium hover:underline">
                Clear Search
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
