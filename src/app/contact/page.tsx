import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory py-16">
        <div className="w-full px-6 md:px-12">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h1 className="text-4xl font-serif font-bold text-text-dark mb-4">Contact Us</h1>
            <p className="text-text-secondary text-lg">
              Have a question about a pooja or need assistance with your booking? We are here to help you on your spiritual journey.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <div className="lg:w-1/3 space-y-6">
              <Card className="border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                    <Phone className="text-saffron" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark mb-1">Phone</h3>
                    <p className="text-text-secondary">+91 98765 43210</p>
                    <p className="text-text-secondary">+91 87654 32109</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                    <Mail className="text-saffron" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark mb-1">Email</h3>
                    <p className="text-text-secondary">support@divinepooja.com</p>
                    <p className="text-text-secondary">bookings@divinepooja.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                    <MapPin className="text-saffron" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark mb-1">Address</h3>
                    <p className="text-text-secondary">
                      123 Spiritual Way, Temple District,<br />
                      Mumbai, Maharashtra 400001
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border bg-white shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="size-12 rounded-full bg-saffron/10 flex items-center justify-center shrink-0">
                    <Clock className="text-saffron" size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-dark mb-1">Working Hours</h3>
                    <p className="text-text-secondary">Mon - Sun: 8:00 AM - 8:00 PM</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3">
              <Card className="border-border bg-white shadow-md">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-6">Send us a message</h2>
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-dark">Full Name</label>
                        <Input placeholder="John Doe" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-dark">Email Address</label>
                        <Input type="email" placeholder="john@example.com" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-dark">Phone Number</label>
                        <Input placeholder="+91 98765 43210" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-text-dark">Subject</label>
                        <Input placeholder="How can we help?" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-text-dark">Message</label>
                      <textarea 
                        className="flex min-h-[150px] w-full rounded-md border border-border bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron focus-visible:ring-offset-2"
                        placeholder="Type your message here..."
                      ></textarea>
                    </div>
                    <Button type="button" className="w-full md:w-auto px-8">Send Message</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
