"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  Trash2,
} from "lucide-react";
import {
  loginUser,
  verifyOtp,
  getCartCount,
  getCart,
  increaseCartItem,
  decreaseCartItem,
  deleteCartItem,
  searchProducts,
  ApiCartResponse,
  ApiProduct,
  IMAGE_BASE_URL,
} from "@/lib/api";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<ApiProduct[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loginStep, setLoginStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  // OTP State and Refs
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const searchInputRef = useRef<HTMLInputElement>(null);

  const [cartCount, setCartCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartData, setCartData] = useState<ApiCartResponse | null>(null);
  const [loadingCart, setLoadingCart] = useState(false);

  const fetchCartCount = async () => {
    if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      try {
        setLoadingCart(true);
        const [count, data] = await Promise.all([getCartCount(), getCart()]);
        setCartCount(count);
        setCartData(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingCart(false);
      }
    }
  };

  const handleIncrease = async (cartid: string) => {
    await increaseCartItem(cartid);
    fetchCartCount();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecrease = async (cartid: string, qty: number) => {
    if (qty > 1) {
      await decreaseCartItem(cartid);
      fetchCartCount();
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const handleDelete = async (cartid: string) => {
    await deleteCartItem(cartid);
    fetchCartCount();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  useEffect(() => {
    fetchCartCount();
    window.addEventListener('cartUpdated', fetchCartCount);
    window.addEventListener('loginSuccess', fetchCartCount);
    return () => {
      window.removeEventListener('cartUpdated', fetchCartCount);
      window.removeEventListener('loginSuccess', fetchCartCount);
    };
  }, []);

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

  useEffect(() => {
    const handleOpenLogin = () => setIsLoginOpen(true);
    window.addEventListener('openLogin', handleOpenLogin);
    return () => window.removeEventListener('openLogin', handleOpenLogin);
  }, []);

  // Lock body scroll when sidebars/modals are open
  useEffect(() => {
    if (isSearchOpen || isLoginOpen || isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSearchOpen, isLoginOpen, isMobileMenuOpen]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("recentSearches");
      if (stored) {
        try {
          setRecentSearches(JSON.parse(stored));
        } catch (e) { }
      }
    }
  }, []);

  const saveSearchQuery = (query: string) => {
    if (!query.trim()) return;
    const term = query.trim();
    setRecentSearches(prev => {
      const filtered = prev.filter(t => t.toLowerCase() !== term.toLowerCase());
      const updated = [term, ...filtered].slice(0, 5); // Keep top 5
      if (typeof window !== "undefined") {
        localStorage.setItem("recentSearches", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Filter products for search via API with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsSearching(true);
        try {
          const results = await searchProducts(searchQuery);
          setSearchResults(results.slice(0, 5));
        } catch (error) {
          console.error("Failed to search products", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full flex flex-col shadow-[0_2px_20px_rgba(0,0,0,0.04)] transition-all duration-300">
        {/* Top Utility Bar */}
        <div className="bg-text-dark text-white/90 text-xs py-2.5 hidden md:block border-b border-white/10">
          <div className="w-full px-6 md:px-12 flex justify-between items-center max-w-7xl mx-auto">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2 font-medium">
                <Phone size={14} className="text-saffron" /> +91 98765 43210
              </span>
              <span className="flex items-center gap-2 font-medium">
                <Mail size={14} className="text-saffron" />{" "}
                support@divinepooja.com
              </span>
            </div>
            <div className="flex items-center gap-5 font-medium tracking-wide">
              <Link
                href="/faq"
                className="hover:text-saffron transition-colors"
              >
                Help & FAQ
              </Link>
              <span className="text-border/30">|</span>
              <button
                onClick={() => {
                  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
                    router.push('/dashboard');
                  } else {
                    setIsLoginOpen(true);
                  }
                }}
                className="flex items-center gap-1.5 hover:text-saffron transition-colors focus:outline-none group"
              >
                <div className="bg-white/10 p-1 rounded-full group-hover:bg-saffron/20 transition-colors">
                  <User size={12} />
                </div>
                My Account
              </button>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="bg-white/95 backdrop-blur-xl border-b border-border/40 h-20 md:h-24">
          <div className="w-full px-6 md:px-12 h-full flex items-center justify-between max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-3.5 relative z-50 group">
              <div className="size-12 rounded-xl bg-gradient-to-br from-saffron to-[#d97706] flex items-center justify-center shadow-lg shadow-saffron/30 group-hover:shadow-saffron/50 group-hover:-translate-y-0.5 transition-all duration-300">
                <span className="text-white font-serif font-bold text-2xl drop-shadow-md">
                  ॐ
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold text-text-dark leading-none tracking-tight group-hover:text-saffron transition-colors duration-300">
                  DivinePooja
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-text-secondary mt-1 font-bold">
                  Spiritual Services
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-2 bg-ivory/60 px-2 py-1.5 rounded-2xl border border-border/50">
              <Link
                href="/"
                className={`text-[14px] font-bold transition-all duration-300 px-5 py-2.5 rounded-xl ${pathname === '/' ? 'bg-white text-saffron shadow-sm' : 'text-text-dark hover:text-saffron hover:bg-white/60'}`}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={`text-[14px] font-bold transition-all duration-300 px-5 py-2.5 rounded-xl ${pathname.startsWith('/products') ? 'bg-white text-saffron shadow-sm' : 'text-text-dark hover:text-saffron hover:bg-white/60'}`}
              >
                Shop Products
              </Link>
              <Link
                href="/about"
                className={`text-[14px] font-bold transition-all duration-300 px-5 py-2.5 rounded-xl ${pathname === '/about' ? 'bg-white text-saffron shadow-sm' : 'text-text-dark hover:text-saffron hover:bg-white/60'}`}
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                className={`text-[14px] font-bold transition-all duration-300 px-5 py-2.5 rounded-xl ${pathname === '/contact' ? 'bg-white text-saffron shadow-sm' : 'text-text-dark hover:text-saffron hover:bg-white/60'}`}
              >
                Contact
              </Link>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="size-11 flex items-center justify-center rounded-full bg-ivory/80 border border-border/50 text-text-dark hover:bg-saffron hover:text-white hover:border-saffron hover:shadow-lg hover:shadow-saffron/20 hover:-translate-y-0.5 transition-all duration-300 focus:outline-none"
              >
                <Search size={18} />
              </button>
              
              <button
                onClick={() => setIsCartOpen(true)}
                className="size-11 flex items-center justify-center rounded-full bg-ivory/80 border border-border/50 text-text-dark hover:bg-saffron hover:text-white hover:border-saffron hover:shadow-lg hover:shadow-saffron/20 hover:-translate-y-0.5 transition-all duration-300 relative group"
              >
                <ShoppingCart size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-text-dark group-hover:bg-white group-hover:text-saffron text-white text-[10px] font-bold min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center shadow-md border-2 border-white transition-colors duration-300">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 text-text-dark hover:text-saffron bg-ivory/80 border border-border/50 rounded-xl active:scale-95 transition-all duration-300"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* --- Mobile Menu Drawer --- */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[60] flex lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>

          {/* Panel */}
          <div className="absolute top-0 left-0 h-full w-4/5 max-w-[300px] bg-white shadow-2xl animate-in slide-in-from-left duration-300 flex flex-col border-r border-border/50">
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-ivory-section">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
                <div className="size-8 rounded-sm bg-saffron flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-lg">ॐ</span>
                </div>
                <span className="font-serif text-xl font-bold text-text-dark">
                  DivinePooja
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 hover:bg-border/50 rounded-full transition-colors"
              >
                <X size={20} className="text-text-secondary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/' ? 'bg-saffron/10 text-saffron' : 'hover:bg-saffron/10 text-text-dark hover:text-saffron'}`}
              >
                Home
              </Link>
              <Link
                href="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-medium transition-colors ${pathname.startsWith('/products') ? 'bg-saffron/10 text-saffron' : 'hover:bg-saffron/10 text-text-dark hover:text-saffron'}`}
              >
                Shop Products
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/about' ? 'bg-saffron/10 text-saffron' : 'hover:bg-saffron/10 text-text-dark hover:text-saffron'}`}
              >
                Our Story
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`px-4 py-3 rounded-xl font-medium transition-colors ${pathname === '/contact' ? 'bg-saffron/10 text-saffron' : 'hover:bg-saffron/10 text-text-dark hover:text-saffron'}`}
              >
                Contact
              </Link>

              <div className="h-px bg-border/50 my-4 mx-2"></div>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
                    router.push('/dashboard');
                  } else {
                    setIsLoginOpen(true);
                  }
                }}
                className="px-4 py-3 rounded-xl bg-ivory text-text-dark font-medium transition-colors flex items-center gap-3 border border-border/50"
              >
                <User size={18} className="text-saffron" /> My Account
              </button>

              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsCartOpen(true);
                }}
                className="w-full text-left px-4 py-3 rounded-xl bg-ivory text-text-dark font-medium transition-colors flex items-center justify-between border border-border/50"
              >
                <div className="flex items-center gap-3">
                  <ShoppingCart size={18} className="text-saffron" /> Cart
                </div>
                {cartCount > 0 && (
                  <span className="bg-saffron text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
                )}
              </button>
            </div>

            <div className="p-6 bg-text-dark text-white text-xs space-y-3">
              <div className="flex items-center gap-3">
                <Phone size={14} className="text-saffron" /> +91 98765 43210
              </div>
              <div className="flex items-center gap-3">
                <Mail size={14} className="text-saffron" /> support@divinepooja.com
              </div>
            </div>
          </div>
        </div>
      )}

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
                  {isSearching ? (
                    <div className="text-center py-8 text-text-secondary">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <div className="space-y-2">
                      <div className="px-4 py-2 flex items-center justify-between">
                        <span className="text-xs font-bold text-text-secondary uppercase tracking-widest">Products</span>
                        <span className="text-xs text-saffron font-bold">{searchResults.length} Results</span>
                      </div>

                      {searchResults.map((product) => (
                        <div
                          key={product.productid}
                          onClick={() => {
                            saveSearchQuery(searchQuery);
                            handleSearchClose();
                            router.push(`/products/${product.productid}`);
                          }}
                          className="flex items-center gap-5 p-3 rounded-xl hover:bg-ivory-section transition-colors cursor-pointer group"
                        >
                          <div className="size-16 rounded-lg overflow-hidden shrink-0 bg-white border border-border/50 group-hover:border-saffron/30 transition-colors">
                            <img
                              src={`${IMAGE_BASE_URL}${product.thumbnailimage}`}
                              alt={product.productname}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-md text-text-dark group-hover:text-saffron transition-colors">
                              {product.productname}
                            </h4>
                            <p className="text-xs text-text-secondary line-clamp-1 mt-0.5">
                              {product.categoryname}
                            </p>
                          </div>
                          <div className="flex items-center font-bold text-text-dark">
                            <IndianRupee size={14} />
                            {product.sellingprice || product.price}
                          </div>
                        </div>
                      ))}

                      <div className="pt-4 pb-2 px-2">
                        <button
                          onClick={() => {
                            saveSearchQuery(searchQuery);
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
              ) : recentSearches.length > 0 ? (
                <div className="bg-white p-8">
                  <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-4">Recent Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map(term => (
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
              ) : (
                <div className="bg-white p-8 text-center text-text-secondary text-sm">
                  <p>Start typing to search for products</p>
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
        <div className="fixed inset-0 z-[100] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-text-dark/40 backdrop-blur-md transition-all duration-500 animate-in fade-in"
            onClick={() => setIsLoginOpen(false)}
          ></div>

          {/* Panel */}
          <div className="relative h-full w-full max-w-[420px] bg-white shadow-[-20px_0_60px_-15px_rgba(0,0,0,0.1)] animate-in slide-in-from-right duration-500 flex flex-col z-10 rounded-l-[0rem] overflow-hidden">
            {/* Header Section */}
            <div className="relative pt-12 pb-8 px-10 bg-gradient-to-br from-ivory to-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-saffron/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>

              <div className="flex justify-between items-start relative z-10 mb-8">
                <div className="size-12 rounded-2xl bg-saffron text-white flex items-center justify-center shadow-lg shadow-saffron/30">
                  <span className="font-serif font-bold text-2xl">ॐ</span>
                </div>
                <button
                  onClick={() => setIsLoginOpen(false)}
                  className="p-2.5 bg-white/50 hover:bg-white text-text-secondary hover:text-text-dark rounded-full transition-all shadow-sm border border-border/30 backdrop-blur-md"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-text-dark tracking-tight mb-2">
                  {loginStep === "email" ? "Welcome Back" : "Verify OTP"}
                </h2>
                <p className="text-text-secondary text-sm font-medium">
                  {loginStep === "email" ? "Enter your email to access your spiritual journey." : "We've sent a secure code to your email."}
                </p>
              </div>
            </div>

            {/* Content Section */}
            <div className="px-10 py-6 flex-1 overflow-y-auto flex flex-col">
              {loginStep === "email" ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100 fill-mode-both">
                  <div className="space-y-2 relative group">
                    <label className="text-xs font-bold text-text-secondary uppercase tracking-widest ml-1 transition-colors group-focus-within:text-saffron">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary/50 group-focus-within:text-saffron transition-colors">
                        <Mail size={18} />
                      </div>
                      <Input
                        placeholder="you@example.com"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="h-14 pl-12 bg-white border-border/50 focus:border-saffron focus:ring-4 focus:ring-saffron/10 rounded-2xl text-md transition-all shadow-sm group-hover:border-border"
                      />
                    </div>
                  </div>
                  <Button
                    size="lg"
                    disabled={loading || !email}
                    className="w-full h-14 text-md font-bold rounded-2xl bg-saffron hover:bg-saffron/90 text-white shadow-lg shadow-saffron/25 hover:shadow-xl hover:shadow-saffron/30 hover:-translate-y-1 transition-all mt-8"
                    onClick={async () => {
                      setLoading(true);
                      try {
                        await loginUser(email);
                        setLoginStep("otp");
                      } catch (err) {
                        alert("Failed to send OTP");
                      }
                      setLoading(false);
                    }}
                  >
                    {loading ? "Sending OTP..." : "Continue with Email"}
                  </Button>
                </div>
              ) : (
                <div className="space-y-8 animate-in fade-in slide-in-from-right-8 duration-500">
                  <div className="bg-saffron/5 border border-saffron/10 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div className="bg-white p-2 rounded-xl text-saffron shadow-sm shrink-0">
                        <Mail size={18} />
                      </div>
                      <p className="text-sm font-medium text-text-dark truncate">
                        {email}
                      </p>
                    </div>
                    <button
                      onClick={() => setLoginStep("email")}
                      className="text-xs font-bold text-saffron hover:text-saffron/80 transition-colors whitespace-nowrap px-2"
                    >
                      Change
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-text-secondary mb-4 text-center uppercase tracking-widest">
                      Enter Security Code
                    </label>
                    <div className="flex justify-center gap-2 sm:gap-3">
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
                          className="w-11 h-14 sm:w-12 sm:h-16 text-center text-2xl font-bold border-2 border-border/40 rounded-2xl focus:border-saffron focus:ring-4 focus:ring-saffron/10 focus:outline-none bg-white transition-all shadow-sm"
                        />
                      ))}
                    </div>
                  </div>

                  <Button
                    size="lg"
                    disabled={loading || otp.join('').length < 6}
                    className="w-full h-14 text-md font-bold rounded-2xl bg-text-dark hover:bg-saffron text-white shadow-lg shadow-text-dark/20 hover:shadow-xl hover:shadow-text-dark/30 hover:-translate-y-1 transition-all mt-4 cursor-pointer"
                    onClick={async () => {
                      setLoading(true);
                      try {
                        const res = await verifyOtp(email, otp.join(''));
                        if (res.data?.token) {
                          localStorage.setItem("token", res.data.token);
                          localStorage.setItem("userid", res.data.userid);
                          setIsLoginOpen(false);
                          setLoginStep("email");
                          setOtp(["", "", "", "", "", ""]);

                          // Custom event to notify that login was successful without reloading
                          window.dispatchEvent(new Event('loginSuccess'));

                          if (window.location.pathname === '/' || window.location.pathname === '/login') {
                            router.push("/dashboard");
                          }
                        }
                      } catch (err) {
                        alert("Invalid OTP");
                      }
                      setLoading(false);
                    }}
                  >
                    {loading ? "Verifying..." : "Verify & Login"}
                  </Button>

                  <div className="text-center pt-4">
                    <p className="text-sm text-text-secondary">Didn't receive the code? <button className="font-bold text-text-dark hover:text-saffron transition-colors">Resend Code</button></p>
                  </div>
                </div>
              )}
            </div>

            <div className="px-10 py-8 text-center text-xs text-text-secondary bg-ivory/30">
              <p>
                By continuing, you agree to our{" "}
                <Link
                  href="/terms"
                  onClick={() => setIsLoginOpen(false)}
                  className="font-bold text-text-dark hover:text-saffron transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  onClick={() => setIsLoginOpen(false)}
                  className="font-bold text-text-dark hover:text-saffron transition-colors"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- Cart Drawer --- */}
      {isCartOpen && (
        <div className="fixed inset-0 z-[70] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity animate-in fade-in duration-300"
            onClick={() => setIsCartOpen(false)}
          ></div>

          {/* Panel */}
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col border-l border-border/50 z-10">
            <div className="p-6 border-b border-border/50 flex items-center justify-between bg-ivory-section">
              <div className="flex items-center gap-3">
                <ShoppingCart className="text-saffron" size={24} />
                <span className="font-serif text-xl font-bold text-text-dark">
                  Your Cart
                </span>
                {cartCount > 0 && (
                  <span className="bg-text-dark text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-border/50 rounded-full transition-colors"
              >
                <X size={20} className="text-text-secondary" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-white custom-scrollbar">
              {loadingCart ? (
                <div className="h-full flex flex-col items-center justify-center text-text-secondary">
                  <p>Loading cart...</p>
                </div>
              ) : cartData?.cartItems?.length === 0 || !cartData ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="size-20 bg-ivory rounded-full flex items-center justify-center text-border border border-border/50">
                    <ShoppingCart size={32} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-dark">Your cart is empty</h3>
                    <p className="text-sm text-text-secondary mt-1">Looks like you haven't added anything yet.</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      router.push('/products');
                    }}
                    className="mt-4 px-6 py-2.5 bg-saffron text-white font-bold rounded-xl hover:bg-saffron-dark transition-colors"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartData.cartItems.map((item) => (
                    <div key={item.cartid} className="flex gap-4 p-4 bg-ivory-section rounded-xl border border-border/50 relative group">
                      <button
                        onClick={() => handleDelete(item.cartid)}
                        className="absolute top-2 right-2 p-1.5 bg-white rounded-full text-text-secondary hover:text-error shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                      <div className="size-20 rounded-xl overflow-hidden shrink-0 border border-border/50 bg-white">
                        <img
                          src={`${IMAGE_BASE_URL}${item.Product.thumbnailimage}`}
                          alt={item.Product.productname}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0 pr-6">
                        <p className="font-bold text-text-dark text-sm line-clamp-2 mb-1">
                          {item.Product.productname}
                        </p>
                        <p className="text-[10px] uppercase tracking-wider font-bold text-saffron mb-3">{item.Product.categoryname}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-border bg-white rounded-lg overflow-hidden">
                            <button
                              onClick={() => handleDecrease(item.cartid, item.quantity)}
                              className="px-2.5 py-1 text-text-secondary hover:bg-ivory transition-colors text-sm"
                            >
                              −
                            </button>
                            <span className="px-3 py-1 text-sm font-medium text-text-dark border-x border-border">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => handleIncrease(item.cartid)}
                              className="px-2.5 py-1 text-text-secondary hover:bg-ivory transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>
                          <span className="font-bold text-text-dark flex items-center text-sm">
                            <IndianRupee size={13} strokeWidth={2.5} />
                            {parseFloat(item.Product.sellingprice || item.Product.price) * item.quantity}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartData && cartData.cartItems?.length > 0 && (
              <div className="p-6 border-t border-border/50 bg-white space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-text-secondary font-medium">Subtotal</span>
                  <span className="font-serif text-2xl font-bold text-saffron-dark flex items-center">
                    <IndianRupee size={20} />
                    {cartData.totalamount || 0}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    router.push('/checkout');
                  }}
                  className="w-full py-4 bg-success text-white text-lg font-bold rounded-xl shadow-[0_8px_20px_-8px_rgba(65,122,80,0.5)] hover:shadow-[0_12px_25px_-8px_rgba(65,122,80,0.6)] hover:-translate-y-0.5 transition-all flex justify-center items-center gap-2"
                >
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
