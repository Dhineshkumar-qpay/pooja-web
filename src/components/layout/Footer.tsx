import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ivory-section border-t border-border pt-16 pb-8">
      <div className="w-full px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-6">
              <div className="size-8 rounded-full bg-saffron flex items-center justify-center">
                <span className="text-white font-serif font-bold">ॐ</span>
              </div>
              <span className="font-serif text-xl font-bold text-saffron-dark">DivinePooja</span>
            </Link>
            <p className="text-text-secondary text-sm mb-6 leading-relaxed">
              Book authentic Hindu poojas and spiritual ceremonies performed by experienced priests with devotion and tradition.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="hover:scale-110 transition-transform opacity-80 hover:opacity-100">
                <img src="https://cdn-icons-png.flaticon.com/128/145/145802.png" alt="Facebook" className="w-8 h-8" />
              </a>
              <a href="#" className="hover:scale-110 transition-transform opacity-80 hover:opacity-100">
                <img src="https://cdn-icons-png.flaticon.com/128/3955/3955024.png" alt="Instagram" className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif text-lg font-bold text-text-dark mb-6">Company</h3>
            <ul className="space-y-4">
              <li><Link href="/about" className="text-sm text-text-secondary hover:text-saffron transition-colors">Our Story</Link></li>
              <li><Link href="/contact" className="text-sm text-text-secondary hover:text-saffron transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-serif text-lg font-bold text-text-dark mb-6">Support</h3>
            <ul className="space-y-4">
              <li><Link href="/faq" className="text-sm text-text-secondary hover:text-saffron transition-colors">FAQ</Link></li>
              <li><Link href="/faq" className="text-sm text-text-secondary hover:text-saffron transition-colors">Booking Help</Link></li>
              <li><Link href="/privacy" className="text-sm text-text-secondary hover:text-saffron transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-text-secondary hover:text-saffron transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-bold text-text-dark mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone size={18} className="text-saffron mt-0.5 shrink-0" />
                <span className="text-sm text-text-secondary">+91 98765 43210</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={18} className="text-saffron mt-0.5 shrink-0" />
                <span className="text-sm text-text-secondary">support@divinepooja.com</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-saffron mt-0.5 shrink-0" />
                <span className="text-sm text-text-secondary">123 Spiritual Way, Temple District, Mumbai 400001</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-secondary">
            © {new Date().getFullYear()} DivinePooja. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
