"use client";

import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";
import { submitContact } from "@/lib/api";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await submitContact(formData);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (err) {
      setError("Failed to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory pb-20">
        {/* Hero Section */}
        <div className="w-full border-b border-border shadow-sm min-h-[200px] lg:min-h-[250px] flex items-center relative overflow-hidden mb-12">
          {/* Background Image */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590059530510-188b77a7df84?w=1920&q=80')] bg-cover bg-center bg-no-repeat z-0"></div>
          
          {/* Glass Overlay */}
          <div className="absolute inset-0 bg-white/75 backdrop-blur-md z-0"></div>

          {/* Subtle corporate background pattern/shapes */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-saffron/10 skew-x-12 translate-x-16 z-0 mix-blend-multiply"></div>
          <div className="absolute top-0 right-0 w-1/4 h-full bg-saffron/20 skew-x-12 translate-x-24 z-0 mix-blend-multiply"></div>
          
          <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block px-3 py-1 mb-4 rounded bg-saffron/10 text-saffron font-semibold text-sm tracking-widest uppercase">
                We're here for you
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-text-dark mb-4 tracking-tight">
                Contact Us
              </h1>
              <p className="text-lg text-text-secondary leading-relaxed">
                Have a question about a pooja or need assistance with your booking? We are here to help you on your spiritual journey.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full px-6 md:px-12 py-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-30">
            <div className="absolute -top-24 -right-24 size-[500px] bg-saffron/20 rounded-full blur-[120px]"></div>
            <div className="absolute top-1/2 left-0 size-[400px] bg-gold/15 rounded-full blur-[100px]"></div>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto relative z-10">
            {/* Contact Info */}
            <div className="lg:w-1/3 space-y-6">
              <Card className="border border-border/40 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-saffron/40 transition-all duration-500 group rounded-[2rem] overflow-hidden relative">
                <div className="absolute -top-6 -right-6 text-saffron/5 group-hover:text-saffron/10 transition-colors duration-500 transform -scale-x-100">
                  <Phone size={140} />
                </div>
                <CardContent className="p-8 flex items-start gap-5 relative z-10">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-saffron to-saffron-dark group-hover:scale-110 flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg shadow-saffron/20 -rotate-3 group-hover:rotate-0">
                    <Phone
                      className="text-white"
                      size={22}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-text-dark mb-2 tracking-tight">
                      Phone
                    </h3>
                    <p className="text-text-secondary text-[15px] mb-1">
                      +91 98765 43210
                    </p>
                    <p className="text-text-secondary text-[15px]">
                      +91 87654 32109
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/40 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-gold/40 transition-all duration-500 group rounded-[2rem] overflow-hidden relative">
                <div className="absolute -top-6 -right-6 text-gold/5 group-hover:text-gold/10 transition-colors duration-500 transform -scale-x-100">
                  <Mail size={140} />
                </div>
                <CardContent className="p-8 flex items-start gap-5 relative z-10">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-gold to-[#c79122] group-hover:scale-110 flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg shadow-gold/20 -rotate-3 group-hover:rotate-0">
                    <Mail
                      className="text-white"
                      size={22}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-text-dark mb-2 tracking-tight">
                      Email
                    </h3>
                    <p className="text-text-secondary text-[15px] mb-1">
                      support@divinepooja.com
                    </p>
                    <p className="text-text-secondary text-[15px]">
                      bookings@divinepooja.com
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/40 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-success/40 transition-all duration-500 group rounded-[2rem] overflow-hidden relative">
                <div className="absolute -top-6 -right-6 text-success/5 group-hover:text-success/10 transition-colors duration-500 transform -scale-x-100">
                  <MapPin size={140} />
                </div>
                <CardContent className="p-8 flex items-start gap-5 relative z-10">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-success to-emerald-700 group-hover:scale-110 flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg shadow-success/20 -rotate-3 group-hover:rotate-0">
                    <MapPin
                      className="text-white"
                      size={22}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-text-dark mb-2 tracking-tight">
                      Address
                    </h3>
                    <p className="text-text-secondary text-[15px] leading-relaxed">
                      16, Indira Gandhi St, EB Officer's Colony, Surampatti
                      Valasu, Veerappanchatram, <br />
                      Erode, Tamil Nadu 638011
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/40 bg-white/60 backdrop-blur-md shadow-sm hover:shadow-2xl hover:-translate-y-1 hover:border-text-dark/40 transition-all duration-500 group rounded-[2rem] overflow-hidden relative">
                <div className="absolute -top-6 -right-6 text-text-dark/5 group-hover:text-text-dark/10 transition-colors duration-500 transform -scale-x-100">
                  <Clock size={140} />
                </div>
                <CardContent className="p-8 flex items-start gap-5 relative z-10">
                  <div className="size-14 rounded-2xl bg-gradient-to-br from-text-dark to-gray-800 group-hover:scale-110 flex items-center justify-center shrink-0 transition-transform duration-500 shadow-lg shadow-text-dark/20 -rotate-3 group-hover:rotate-0">
                    <Clock
                      className="text-white"
                      size={22}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold font-serif text-text-dark mb-2 tracking-tight">
                      Working Hours
                    </h3>
                    <p className="text-text-secondary text-[15px]">
                      Mon - Sun: 8:00 AM - 8:00 PM
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3">
              <Card className="border border-border/40 bg-white/80 backdrop-blur-md shadow-xl rounded-[2rem] overflow-hidden h-full">
                <CardContent className="p-8 md:p-12 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-10">
                    <div className="size-12 rounded-2xl bg-saffron/10 text-saffron flex items-center justify-center shrink-0">
                       <Mail size={24} />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-text-dark tracking-tight">
                      Send us a message
                    </h2>
                  </div>

                  {submitted ? (
                    <div className="text-center py-16 animate-in zoom-in duration-500 flex-1 flex flex-col items-center justify-center">
                      <div className="size-24 rounded-full bg-success/10 text-success flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className="text-3xl font-bold text-text-dark mb-3 font-serif">Message Sent!</h3>
                      <p className="text-text-secondary text-[17px] max-w-sm">Thank you for reaching out. We will get back to you shortly.</p>
                      <Button variant="outline" className="mt-8 px-8 py-6 rounded-2xl font-bold" onClick={() => setSubmitted(false)}>Send Another Message</Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8 flex-1 flex flex-col">
                      {error && (
                        <div className="bg-error/10 text-error p-4 rounded-2xl text-sm mb-6 text-center font-medium border border-error/20">
                          {error}
                        </div>
                      )}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-text-dark ml-1">
                            Full Name
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="John Doe"
                            className="bg-ivory/50 focus:bg-white transition-all h-14 rounded-2xl border-border/60 focus:border-saffron/60 text-md px-5 shadow-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-text-dark ml-1">
                            Email Address
                          </label>
                          <Input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            type="email"
                            placeholder="john@example.com"
                            className="bg-ivory/50 focus:bg-white transition-all h-14 rounded-2xl border-border/60 focus:border-saffron/60 text-md px-5 shadow-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-text-dark ml-1">
                            Phone Number
                          </label>
                          <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+91 98765 43210"
                            className="bg-ivory/50 focus:bg-white transition-all h-14 rounded-2xl border-border/60 focus:border-saffron/60 text-md px-5 shadow-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-text-dark ml-1">
                            Subject
                          </label>
                          <Input
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            placeholder="How can we help?"
                            className="bg-ivory/50 focus:bg-white transition-all h-14 rounded-2xl border-border/60 focus:border-saffron/60 text-md px-5 shadow-sm"
                          />
                        </div>
                      </div>
                      <div className="space-y-2 flex-1 flex flex-col">
                        <label className="text-sm font-bold text-text-dark ml-1">
                          Message
                        </label>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          className="flex flex-1 min-h-[160px] w-full rounded-2xl border border-border/60 bg-ivory/50 focus:bg-white px-5 py-4 text-md ring-offset-background placeholder:text-text-secondary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron/30 focus-visible:border-saffron/60 transition-all shadow-sm resize-y"
                          placeholder="Type your detailed message here..."
                        ></textarea>
                      </div>
                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={loading}
                          size="lg"
                          className="w-full h-14 rounded-2xl text-[17px] font-bold shadow-[0_8px_20px_-8px_rgba(198,90,30,0.5)] hover:shadow-[0_12px_25px_-8px_rgba(198,90,30,0.6)] hover:-translate-y-0.5 transition-all bg-gradient-to-r from-saffron to-saffron-dark text-white border-0"
                        >
                          {loading ? "Sending..." : "Send Message"}
                        </Button>
                      </div>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Map Section Placeholder */}
          <div className="max-w-7xl mx-auto mt-20 relative z-10">
            <div className="w-full h-[400px] bg-ivory-section border border-border/40 rounded-[2rem] overflow-hidden shadow-md relative group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors z-10 pointer-events-none"></div>
              <iframe
                src="https://maps.google.com/maps?q=11.3277236,77.6957882&z=15&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "grayscale(0.2) contrast(1.1)" }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="opacity-90 group-hover:opacity-100 transition-opacity"
              ></iframe>
              <div className="absolute top-6 left-6 bg-white p-4 rounded-xl shadow-lg z-20 border border-border/50 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="size-6 rounded-full bg-saffron text-white flex items-center justify-center font-serif font-bold text-xs">
                    ॐ
                  </div>
                  <span className="font-bold text-text-dark text-sm">
                    DivinePooja HQ
                  </span>
                </div>
                <p className="text-xs text-text-secondary leading-relaxed">
                  16, Indira Gandhi St, EB Officer's Colony, Surampatti
                  Valasu, Veerappanchatram, <br />
                  Erode, Tamil Nadu 638011
                </p>
                <a
                  href="https://www.google.com/maps/dir/?api=1&destination=11.3277236,77.6957882"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-saffron font-bold hover:underline mt-2 inline-block"
                >
                  Get Directions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
