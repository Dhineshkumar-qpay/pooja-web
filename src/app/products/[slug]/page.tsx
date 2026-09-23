"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { fetchProductDetails, ProductDetailsResponse } from '@/lib/api';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: ProductPageProps) {
  const [slug, setSlug] = useState<string | null>(null);
  const [response, setResponse] = useState<ProductDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  useEffect(() => {
    if (!slug) return;
    
    fetchProductDetails(slug)
      .then((res) => {
        setResponse(res);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-saffron"></div>
      </div>
    );
  }
  
  if (!response || !response.data) {
    // Return a friendly not found message instead of Next.js notFound()
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory flex-col gap-4">
        <h1 className="text-3xl font-serif font-bold text-text-dark">Product Not Found</h1>
        <p className="text-text-secondary">We couldn't find the product you're looking for, or you don't have access.</p>
      </div>
    );
  }
  
  return <ProductDetailClient productData={response.data} relatedProducts={response.relatedproducts} />;
}
