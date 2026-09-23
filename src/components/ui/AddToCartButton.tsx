"use client";

import React, { useState } from 'react';
import { Button } from './button';
import { ShoppingCart, Check } from 'lucide-react';
import { addToCart } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AddToCartButtonProps {
  productid: string;
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export function AddToCartButton({ productid, variant = "outline", size = "sm", className = "" }: AddToCartButtonProps) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const router = useRouter();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      alert("Please login to add items to your cart");
      return;
    }

    setLoading(true);
    try {
      await addToCart(productid);
      setAdded(true);
      window.dispatchEvent(new Event("cartUpdated"));
      
      setTimeout(() => {
        setAdded(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant={added ? "default" : variant} 
      size={size} 
      className={`gap-2 font-semibold relative z-20 transition-all ${added ? "bg-success hover:bg-success text-white border-success" : ""} ${className}`}
      onClick={handleAddToCart}
      disabled={loading || added}
    >
      {loading ? "Adding..." : added ? "Added" : "Add to Cart"} 
      {added ? <Check size={16} /> : <ShoppingCart size={16} />}
    </Button>
  );
}
