import { notFound } from 'next/navigation';
import ProductDetailClient from './ProductDetailClient';
import { fetchProductDetails } from '@/lib/api';

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const response = await fetchProductDetails(slug);
  
  if (!response || !response.data) {
    notFound();
  }
  
  return <ProductDetailClient productData={response.data} relatedProducts={response.relatedproducts} />;
}
