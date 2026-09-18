"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Menu,
  Phone,
  Mail,
  User,
  Search,
  ShoppingCart,
  X,
  IndianRupee,
  ArrowRight,
} from "lucide-react";
import { products } from "@/data/mock-data";

export function Header() {
  const router = useRouter();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<"email" | "otp">("email");
  
  // OTP State and Refs
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleOtpChange = (index: number, value: string) => {
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== "" && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Auto-focus previous input on backspace
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      otpRefs.current[index - 1]?.focus();
    }
  };

  // Focus search input when opened
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchQuery("");
    }
  }, [isSearchOpen]);

  // Lock body scroll when sidebars/modals are open
  useEffect(() => {
    if (isSearchOpen || isLoginOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen, isLoginOpen]);

  // Filter products for search
  const searchResults = products
    .filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()),
    )
    .slice(0, 5);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full flex flex-col shadow-sm">
        {/* Top Utility Bar */}
        <div className="bg-text-dark text-white text-xs py-2 hidden md:block">
          <div className="w-full px-6 md:px-12 flex justify-between items-center">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Phone size={14} className="text-saffron" /> +91 98765 43210
              </span>
              <span className="flex items-center gap-2">
                <Mail size={14} className="text-saffron" />{" "}
                support@divinepooja.com
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/faq"
                className="hover:text-saffron transition-colors"
              >
                Help & FAQ
              </Link>
              <span className="text-border/30">|</span>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="flex items-center gap-1 hover:text-saffron transition-colors focus:outline-none"
              >
                <User size={14} /> My Account
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white border-b border-border h-20 md:h-24">
          <div className="w-full px-6 md:px-12 h-full flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 relative z-50">
              <div className="size-12 rounded-sm bg-saffron flex items-center justify-center shadow-sm">
                <span className="text-white font-serif font-bold text-2xl">
                  ॐ
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-text-dark leading-none tracking-tight">
                  DivinePooja
                </span>
                <span className="text-[10px] uppercase tracking-widest text-text-secondary mt-1 font-semibold">
                  Spiritual Services
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-9">
              <Link
                href="/"
                className="text-[15px] font-medium text-text-dark hover:text-saffron transition-colors relative group"
              >
                Home
                <span className="absolute -bottom-7 left-0 w-full h-0.5 bg-saffron scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              <Link
                href="/products"
                className="text-[15px] font-medium text-text-dark hover:text-saffron transition-colors relative group flex items-center gap-1"
              >
                Shop Products
                <span className="absolute -bottom-7 left-0 w-full h-0.5 bg-saffron scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              <Link
                href="/about"
                className="text-[15px] font-medium text-text-dark hover:text-saffron transition-colors relative group"
              >
                Our Story
                <span className="absolute -bottom-7 left-0 w-full h-0.5 bg-saffron scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
              <Link
                href="/contact"
                className="text-[15px] font-medium text-text-dark hover:text-saffron transition-colors relative group"
              >
                Contact
                <span className="absolute -bottom-7 left-0 w-full h-0.5 bg-saffron scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </nav>

            <div className="hidden lg:flex items-center gap-5">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="text-text-dark hover:text-saffron transition-colors focus:outline-none"
              >
                <Search size={20} />
              </button>
              <div className="w-px h-5 bg-border mx-1"></div>
              <Link
                href="/checkout"
                className="text-text-dark hover:text-saffron transition-colors relative"
              >
                <ShoppingCart size={22} />
                <span className="absolute -top-1.5 -right-2 bg-error text-white text-[10px] font-bold size-4 rounded-full flex items-center justify-center">
                  1
                </span>
              </Link>
            </div>

            <button className="lg:hidden p-2 text-text-dark">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* --- Search Modal Overlay --- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex flex-col items-center pt-24 bg-text-dark/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-3xl px-6 md:px-0 relative">
            
            {/* Search Input Container */}
            <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden animate-in slide-in-from-top-4 duration-300">
              <div className="relative flex items-center p-2 border-b border-border/40 bg-ivory-section/30">
                <div className="pl-6 pr-2">
                  <Search
                    size={28}
                    className="text-saffron"
                  />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products, idols..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-16 bg-transparent border-none focus:outline-none focus:ring-0 text-xl font-bold text-text-dark placeholder:text-text-secondary/40 placeholder:font-normal"
                />
                <div className="pr-4 pl-2">
                  <button
                    onClick={handleSearchClose}
                    className="p-2 bg-ivory hover:bg-border/50 rounded-full transition-colors group"
                  >
                    <X size={20} className="text-text-secondary group-hover:text-text-dark" />
                  </button>
                </div>
              </div>

              {/* Results Area */}
              {searchQuery ? (
                <div className="max-h-[60vh] overflow-y-auto p-4 bg-white">
                  {searchResults.length > 0 ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Products</span>
                        <span className="text-xs text-saffron font-bold">{searchResults.length} Results</span>
                      </div>
                      
                      {searchResults.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            handleSearchClose();
                            router.push(`/products/${product.slug}`);
                          }}
                          className="flex items-center gap-5 p-3 rounded-xl hover:bg-ivory-section transition-colors cursor-pointer group"
                        >
                          <div className="size-16 rounded-lg overflow-hidden shrink-0 bg-white border border-border/50 group-hover:border-saffron/30 transition-colors">
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-md text-text-dark group-hover:text-saffron transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                              {product.category}
                            </p>
                          </div>
                          <div className="flex items-center font-bold text-text-dark">
                            <IndianRupee size={14} />
                            {product.price}
                          </div>
                        </div>
                      ))}
                      
                      <div className="pt-4 pb-2 px-2">
                        <button
                          onClick={() => {
                            handleSearchClose();
                            router.push("/products");
                          }}
                          className="w-full py-4 bg-ivory rounded-xl text-saffron font-bold text-sm hover:bg-saffron hover:text-white transition-all flex justify-center items-center gap-2"
                        >
                          View all results <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16 flex flex-col items-center">
                      <div className="size-16 bg-ivory rounded-full flex items-center justify-center text-text-secondary mb-4">
                        <Search size={28} />
                      </div>
                      <p className="text-lg text-text-dark font-bold">No results found</p>
                      <p className="text-sm text-text-secondary mt-1">We couldn't find anything matching "{searchQuery}"</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white p-8">
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {["Ganesha Idol", "Rudraksha", "Incense", "Diya", "Pooja Thali"].map(term => (
                      <button 
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-4 py-2 bg-ivory-section border border-border/50 rounded-full text-sm text-text-dark hover:border-saffron hover:text-saffron transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Click outside to close (handled by backdrop) */}
            <div className="absolute -inset-[1000px] -z-10" onClick={handleSearchClose}></div>
          </div>
        </div>
      )}

      {/* --- Login Sidebar / Slide-over --- */}
      {isLoginOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setIsLoginOpen(false)}
          ></div>

          {/* Panel */}
          <div className="absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-[0_0_50px_rgba(0,0,0,0.3)] animate-in slide-in-from-right duration-300 flex flex-col border-l border-border/50">
            <div className="relative h-40 bg-gradient-to-br from-text-dark via-text-dark to-[#2a1f18] p-6 flex flex-col justify-between overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-saffron rounded-full blur-[100px] opacity-20 -mr-20 -mt-20 pointer-events-none"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div className="size-10 rounded-sm bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                  <span className="text-saffron font-serif font-bold text-xl">ॐ</span>
                </div>
                <button
                  onClick={() => setIsLoginOpen(false)}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors focus:outline-none"
                >
                  <X size={20} className="text-white/80" />
                </button>
              </div>
              
              <div className="relative z-10">
                <h2 className="text-3xl font-serif font-bold text-white drop-shadow-sm">
                  {loginStep === "email" ? "Welcome Back" : "Verify OTP"}
                </h2>
                <p className="text-white/70 text-sm mt-1">
                  {loginStep === "email" ? "Access your spiritual journey" : "Secure authentication"}
                </p>
              </div>
            </div>

            <div className="p-8 flex-1 overflow-y-auto flex flex-col bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-white">
              {loginStep === "email" ? (
                <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-bold text-text-dark mb-2 uppercase tracking-wide">
                        Email Address
                      </label>
                      <Input
                        placeholder="Enter your email to continue"
                        type="email"
                        className="h-14 bg-ivory-section/50 border-border/80 focus:border-saffron focus:ring-saffron/20 rounded-xl text-md"
                      />
                    </div>
                    <Button
                      size="lg"
                      className="w-full h-14 text-lg rounded-xl shadow-[0_8px_20px_-8px_rgba(198,90,30,0.5)] hover:shadow-[0_12px_25px_-8px_rgba(198,90,30,0.6)] hover:-translate-y-0.5 transition-all mt-10"
                      onClick={() => setLoginStep("otp")}
                    >
                      Request OTP
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="bg-success/5 border border-success/20 p-5 rounded-2xl flex items-start gap-4">
                    <div className="bg-success/20 p-2 rounded-full text-success shrink-0 mt-0.5">
                      <Mail size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-text-dark font-medium leading-relaxed">
                        We've sent a 6-digit secure code to your email.
                      </p>
                      <p className="text-xs text-text-secondary mt-1">user@example.com</p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-text-dark mb-4 text-center uppercase tracking-wider">
                      Enter Security Code
                    </label>
                    <div className="flex justify-between gap-3 max-w-[320px] mx-auto">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => { otpRefs.current[index] = el; }}
                          type="text"
                          inputMode="numeric"
                          maxLength={1}
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleOtpKeyDown(index, e)}
                          className="w-12 h-14 text-center text-2xl font-bold border-2 border-border/80 rounded-xl focus:border-saffron focus:ring-4 focus:ring-saffron/20 focus:outline-none bg-white transition-all shadow-sm"
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-14 text-lg rounded-xl  shadow-[0_8px_20px_-8px_rgba(63,125,74,0.5)] hover:shadow-[0_12px_25px_-8px_rgba(63,125,74,0.6)] hover:-translate-y-0.5 transition-all mt-4"
                    onClick={() => {
                      setIsLoginOpen(false);
                      setLoginStep("email");
                      router.push("/dashboard");
                    }}
                  >
                    Verify & Login
                  </Button>

                  <div className="text-center pt-2 flex flex-col gap-3">
                    <p className="text-sm text-text-secondary">Didn't receive the code? <button className="font-bold text-text-dark hover:text-saffron transition-colors">Resend Code</button></p>
                    <button
                      onClick={() => setLoginStep("email")}
                      className="text-sm text-saffron font-medium hover:underline"
                    >
                      Use a different email
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 text-center text-xs text-text-secondary border-t border-border/50 bg-ivory/50">
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                onClick={() => setIsLoginOpen(false)}
                className="underline hover:text-saffron transition-colors font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                onClick={() => setIsLoginOpen(false)}
                className="underline hover:text-saffron transition-colors font-medium"
              >
                Privacy Policy
              </Link>
              .
            </div>
          </div>
        </div>
      )}
    </>
  );
}
