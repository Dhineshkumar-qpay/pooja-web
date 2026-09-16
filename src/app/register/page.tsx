import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory p-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1599839619722-39751411ea63?w=1600&q=80')] bg-cover bg-center opacity-10"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="size-10 rounded-full bg-saffron flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl">ॐ</span>
            </div>
            <span className="font-serif text-2xl font-bold text-saffron-dark">DivinePooja</span>
          </Link>
        </div>

        <Card className="border-border shadow-lg">
          <CardHeader className="text-center pb-2">
            <h1 className="text-2xl font-serif font-bold text-text-dark">Create Account</h1>
            <p className="text-text-secondary text-sm">Join us for your spiritual journey</p>
          </CardHeader>
          <CardContent>
            <form className="space-y-4 pt-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-dark">Full Name</label>
                <Input placeholder="Enter your full name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-dark">Email Address</label>
                <Input type="email" placeholder="Enter your email" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-dark">Phone Number</label>
                <Input placeholder="Enter your phone number" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-text-dark">Password</label>
                <Input type="password" placeholder="Create a password" />
              </div>

              <Link href="/dashboard" className="block pt-4">
                <Button className="w-full">Create Account</Button>
              </Link>
            </form>

            <div className="mt-6 flex items-center justify-center gap-4">
              <div className="h-px bg-border flex-1"></div>
              <span className="text-xs text-text-secondary uppercase">Or sign up with</span>
              <div className="h-px bg-border flex-1"></div>
            </div>

            <div className="mt-6 flex gap-4">
              <Button variant="outline" className="flex-1 bg-white">Google</Button>
              <Button variant="outline" className="flex-1 bg-white">Facebook</Button>
            </div>

            <div className="mt-8 text-center text-sm text-text-secondary">
              Already have an account?{' '}
              <Link href="/login" className="text-saffron font-medium hover:underline">
                Login here
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
