import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, ChevronRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-ivory-section border-t border-border/50 pt-20 pb-8 relative overflow-hidden">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-saffron/30 to-transparent"></div>

      <div className="w-full px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col">
            <Link href="/" className="flex items-center gap-3 mb-6 group w-fit">
              <div className="size-10 rounded-2xl bg-gradient-to-br from-saffron to-[#d97706] flex items-center justify-center shadow-lg shadow-saffron/20 group-hover:-translate-y-1 transition-transform duration-300">
                <span className="text-white font-serif font-bold text-xl drop-shadow-sm">ॐ</span>
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
            <p className="text-text-secondary text-[15px] mb-8 leading-relaxed">
              Shop authentic pooja products and spiritual essentials, carefully
              selected to support your daily prayers, rituals, and traditional
              ceremonies.
            </p>
            <div className="flex items-center gap-4 mt-auto">
              {/* Facebook */}
              <a
                href="#"
                className="relative size-12 flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-[#1877F2]/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-full h-full rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-xl group-hover:border-[#1877F2]/50 group-hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#1877F2]/10 to-[#1877F2]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/145/145802.png"
                    alt="Facebook"
                    className="w-[22px] h-[22px] relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>
              </a>

              {/* Instagram */}
              <a
                href="#"
                className="relative size-12 flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-[#E4405F]/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-full h-full rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-xl group-hover:border-[#E4405F]/50 group-hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#f09433]/10 via-[#e6683c]/10 to-[#bc1888]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png"
                    alt="Instagram"
                    className="w-[22px] h-[22px] relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href="#"
                className="relative size-12 flex items-center justify-center group"
              >
                <div className="absolute inset-0 bg-[#25D366]/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-full h-full rounded-full bg-white border border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-xl group-hover:border-[#25D366]/50 group-hover:-translate-y-1.5 transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#25D366]/10 to-[#128C7E]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3670/3670051.png"
                    alt="WhatsApp"
                    className="w-[22px] h-[22px] relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="lg:pl-8">
            <h3 className="font-serif text-xl font-bold text-text-dark mb-6 relative inline-block">
              Company
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-saffron rounded-full"></span>
            </h3>
            <ul className="space-y-4 mt-8">
              <li>
                <Link
                  href="/about"
                  className="text-[15px] font-medium text-text-secondary hover:text-saffron transition-all duration-300 flex items-center group"
                >
                  <ChevronRight size={14} className="text-saffron/0 -ml-4 group-hover:text-saffron group-hover:ml-0 transition-all duration-300 mr-1" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Our Story</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-[15px] font-medium text-text-secondary hover:text-saffron transition-all duration-300 flex items-center group"
                >
                  <ChevronRight size={14} className="text-saffron/0 -ml-4 group-hover:text-saffron group-hover:ml-0 transition-all duration-300 mr-1" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif text-xl font-bold text-text-dark mb-6 relative inline-block">
              Support
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-saffron rounded-full"></span>
            </h3>
            <ul className="space-y-4 mt-8">
              <li>
                <Link
                  href="/faq"
                  className="text-[15px] font-medium text-text-secondary hover:text-saffron transition-all duration-300 flex items-center group"
                >
                  <ChevronRight size={14} className="text-saffron/0 -ml-4 group-hover:text-saffron group-hover:ml-0 transition-all duration-300 mr-1" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">FAQ</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping-policy"
                  className="text-[15px] font-medium text-text-secondary hover:text-saffron transition-all duration-300 flex items-center group"
                >
                  <ChevronRight size={14} className="text-saffron/0 -ml-4 group-hover:text-saffron group-hover:ml-0 transition-all duration-300 mr-1" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Shipping Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/cancellation-policy"
                  className="text-[15px] font-medium text-text-secondary hover:text-saffron transition-all duration-300 flex items-center group"
                >
                  <ChevronRight size={14} className="text-saffron/0 -ml-4 group-hover:text-saffron group-hover:ml-0 transition-all duration-300 mr-1" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Cancellation & Return Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-[15px] font-medium text-text-secondary hover:text-saffron transition-all duration-300 flex items-center group"
                >
                  <ChevronRight size={14} className="text-saffron/0 -ml-4 group-hover:text-saffron group-hover:ml-0 transition-all duration-300 mr-1" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-[15px] font-medium text-text-secondary hover:text-saffron transition-all duration-300 flex items-center group"
                >
                  <ChevronRight size={14} className="text-saffron/0 -ml-4 group-hover:text-saffron group-hover:ml-0 transition-all duration-300 mr-1" />
                  <span className="group-hover:translate-x-1 transition-transform duration-300">Terms & Conditions</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-xl font-bold text-text-dark mb-6 relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-1/2 h-0.5 bg-saffron rounded-full"></span>
            </h3>
            <ul className="space-y-6 mt-8">
              <li className="flex items-start gap-4 group">
                <div className="size-10 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron group-hover:-translate-y-1 transition-all duration-300">
                  <Phone size={18} className="text-saffron group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="text-xs font-bold text-text-secondary/70 uppercase tracking-wider mb-0.5">Call Us</span>
                  <span className="text-[15px] font-medium text-text-dark">
                    +91 98765 43210
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="size-10 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron group-hover:-translate-y-1 transition-all duration-300">
                  <Mail size={18} className="text-saffron group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="text-xs font-bold text-text-secondary/70 uppercase tracking-wider mb-0.5">Email Us</span>
                  <span className="text-[15px] font-medium text-text-dark">
                    support@divinepooja.com
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-4 group">
                <div className="size-10 rounded-xl bg-saffron/10 flex items-center justify-center shrink-0 group-hover:bg-saffron group-hover:-translate-y-1 transition-all duration-300">
                  <MapPin size={18} className="text-saffron group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex flex-col pt-0.5">
                  <span className="text-xs font-bold text-text-secondary/70 uppercase tracking-wider mb-0.5">Visit Us</span>
                  <span className="text-[15px] font-medium text-text-secondary leading-relaxed">
                    16, Indira Gandhi St, EB Officer's Colony, Surampatti Valasu,
                    Veerappanchatram, Erode, Tamil Nadu 638011
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/60 pt-8 flex flex-col md:flex-row items-center justify-center gap-4">
          <p className="text-sm font-medium text-text-secondary text-center">
            © {new Date().getFullYear()} DivinePooja. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
