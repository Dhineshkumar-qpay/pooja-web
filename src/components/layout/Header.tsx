import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu, Phone, Mail, User, Search, ChevronDown, ShoppingCart } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-col shadow-sm">
      {/* Top Utility Bar - Corporate Style */}
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
            <Link href="/faq" className="hover:text-saffron transition-colors">
              Help & FAQ
            </Link>
            <span className="text-border/30">|</span>
            <Link
              href="/dashboard"
              className="flex items-center gap-1 hover:text-saffron transition-colors"
            >
              <User size={14} /> My Account
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation - Corporate Style */}
      <div className="bg-white border-b border-border h-20 md:h-24">
        <div className="w-full px-6 md:px-12 h-full flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
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
              Shop Products{" "}
              <ChevronDown
                size={14}
                className="text-text-secondary group-hover:text-saffron"
              />
              <span className="absolute -bottom-7 left-0 w-full h-0.5 bg-saffron scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
            </Link>
            <Link
              href="/products"
              className="text-[15px] font-medium text-text-dark hover:text-saffron transition-colors relative group"
            >
              Categories
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
            <button className="text-text-dark hover:text-saffron transition-colors">
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
  );
}
