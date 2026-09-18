"use client";

import React, { useState } from "react";
import Script from "next/script";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/data/mock-data";
import {
  Check,
  ChevronRight,
  Lock,
  IndianRupee,
  Truck,
  ShieldCheck,
  MapPin,
  Tag,
  Package,
  Gift,
  Star,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

const COUPONS: Record<string, number> = {
  POOJA10: 10,
  SACRED20: 20,
  FIRST15: 15,
};

function CheckoutFlow() {
  const [step, setStep] = useState(1);
  const steps = ["Shipping", "Review & Pay", "Confirmation"];

  const cartItem = products[0];
  const [qty, setQty] = useState(1);
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [couponError, setCouponError] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pin: "",
  });

  const subtotal = cartItem.price * qty;
  const deliveryCharge = 0;
  const discount = appliedCoupon
    ? Math.round(subtotal * (COUPONS[appliedCoupon] / 100))
    : 0;
  const total = subtotal + deliveryCharge - discount;

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code.");
      setAppliedCoupon("");
    }
  }

  function openRazorpay() {
    const options = {
      key: "rzp_test_TRz4Jt08XnAOja",
      amount: total * 100,
      currency: "INR",
      name: "Pooja Store",
      description: cartItem.name,
      image: cartItem.imageUrl,
      handler: function () {
        setStep(3);
      },
      prefill: {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        contact: form.phone,
      },
      theme: { color: "#D96B27" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  // ── Confirmation ──────────────────────────────────────────────
  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20 px-6">
        <div className="relative size-32 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-8 text-success shadow-[0_0_40px_rgba(63,125,74,0.2)]">
          <div className="absolute inset-0 rounded-full border-4 border-success/30 animate-pulse" />
          <Check size={64} className="relative z-10" />
        </div>
        <Badge className="mb-4 bg-success/10 text-success border-success/20">
          Payment Successful
        </Badge>
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-4">
          Order Confirmed!
        </h2>
        <p className="text-lg text-text-secondary mb-3 leading-relaxed">
          Thank you,{" "}
          <span className="font-semibold text-text-dark">
            {form.firstName || "Customer"}
          </span>
          ! Your order{" "}
          <span className="font-bold text-saffron-dark">#ORD-8475-9021</span>{" "}
          has been placed.
        </p>
        <p className="text-sm text-text-secondary mb-10">
          A confirmation will be sent to{" "}
          <span className="font-medium text-text-dark">
            {form.email || "your email"}
          </span>
          .
        </p>

        <div className="bg-white rounded-2xl border border-border p-6 mb-10 text-left space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Product</span>
            <span className="font-medium text-text-dark">{cartItem.name}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Qty</span>
            <span className="font-medium text-text-dark">{qty}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-text-secondary">Delivery</span>
            <span className="font-medium text-text-dark">
              Standard Delivery
            </span>
          </div>
          <div className="flex justify-between text-sm border-t border-border pt-3">
            <span className="font-bold text-text-dark">Total Paid</span>
            <span className="font-bold text-saffron-dark">₹{total}</span>
          </div>
        </div>

        <Link href="/dashboard">
          <Button
            size="lg"
            className="px-10 h-14 text-lg rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
          >
            Track Order in Dashboard
          </Button>
        </Link>
      </div>
    );
  }

  // ── Step Progress ─────────────────────────────────────────────
  const StepBar = () => (
    <div className="max-w-lg mx-auto mb-12">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-7 right-7 top-5 h-0.5 bg-border/60 -z-10 rounded-full" />
        <div
          className="absolute left-7 top-5 h-0.5 bg-gradient-to-r from-saffron to-saffron-dark -z-10 rounded-full transition-all duration-500"
          style={{ width: step === 1 ? "0%" : "100%" }}
        />
        {steps.map((s, idx) => {
          const n = idx + 1;
          const active = step >= n;
          const done = step > n;
          return (
            <div key={s} className="flex flex-col items-center gap-2">
              <div
                className={`size-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${active ? "bg-gradient-to-br from-saffron to-saffron-dark text-white shadow-[0_4px_14px_rgba(217,107,39,0.4)]" : "bg-white border-2 border-border text-text-secondary"}`}
              >
                {done ? <Check size={16} /> : n}
              </div>
              <span
                className={`text-xs font-semibold tracking-wide ${active ? "text-text-dark" : "text-text-secondary"}`}
              >
                {s}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-12 px-6 lg:px-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-success/10 text-success text-sm font-medium px-4 py-1.5 rounded-full mb-4">
          <Lock size={13} /> Secured with 256-bit SSL
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-text-dark mb-2">
          Secure Checkout
        </h1>
        <p className="text-text-secondary">
          Complete your purchase safely and securely.
        </p>
      </div>

      <StepBar />

      <div className="flex flex-col lg:flex-row gap-10">
        {/* ── Main Form ── */}
        <div className="lg:w-3/5">
          <Card className="border border-border/60 shadow-lg rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-8">
              {/* Step 1 — Shipping */}
              {step === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border/50 pb-5">
                    <div className="size-10 rounded-full bg-saffron/10 flex items-center justify-center text-saffron shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-text-dark">
                        Shipping Details
                      </h2>
                      <p className="text-sm text-text-secondary">
                        Where should we deliver your order?
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {[
                      {
                        label: "First Name",
                        key: "firstName",
                        placeholder: "Ramesh",
                        col: 1,
                      },
                      {
                        label: "Last Name",
                        key: "lastName",
                        placeholder: "Kumar",
                        col: 1,
                      },
                      {
                        label: "Email Address",
                        key: "email",
                        placeholder: "ramesh@example.com",
                        col: 2,
                        type: "email",
                      },
                      {
                        label: "Phone Number",
                        key: "phone",
                        placeholder: "+91 98765 43210",
                        col: 2,
                      },
                      {
                        label: "Address Line 1",
                        key: "address1",
                        placeholder: "House/Flat No., Building Name",
                        col: 2,
                      },
                      {
                        label: "Address Line 2 (Optional)",
                        key: "address2",
                        placeholder: "Street, Landmark",
                        col: 2,
                      },
                      {
                        label: "City",
                        key: "city",
                        placeholder: "Mumbai",
                        col: 1,
                      },
                      {
                        label: "State",
                        key: "state",
                        placeholder: "Maharashtra",
                        col: 1,
                      },
                      {
                        label: "PIN Code",
                        key: "pin",
                        placeholder: "400001",
                        col: 1,
                      },
                    ].map((f) => (
                      <div
                        key={f.key}
                        className={f.col === 2 ? "md:col-span-2" : ""}
                      >
                        <label className="block text-sm font-semibold text-text-dark mb-1.5">
                          {f.label}
                        </label>
                        <Input
                          type={f.type ?? "text"}
                          placeholder={f.placeholder}
                          value={form[f.key as keyof typeof form]}
                          onChange={(e) =>
                            setForm((prev) => ({
                              ...prev,
                              [f.key]: e.target.value,
                            }))
                          }
                          className="h-11 rounded-xl bg-ivory border-border/60 focus:border-saffron focus:ring-saffron/20"
                        />
                      </div>
                    ))}
                  </div>

                  <Button
                    size="lg"
                    className="w-full h-13 text-base rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 group"
                    onClick={() => setStep(2)}
                  >
                    Review Order{" "}
                    <ChevronRight
                      size={18}
                      className="ml-2 group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </div>
              )}

              {/* Step 2 — Review & Pay */}
              {step === 2 && (
                <div className="space-y-6">
                  <div className="flex items-center gap-3 border-b border-border/50 pb-5">
                    <div className="size-10 rounded-full bg-saffron/10 flex items-center justify-center text-saffron shrink-0">
                      <Package size={20} />
                    </div>
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-text-dark">
                        Review & Pay
                      </h2>
                      <p className="text-sm text-text-secondary">
                        Confirm your order before payment.
                      </p>
                    </div>
                  </div>

                  {/* Product row */}
                  <div className="flex gap-4 p-4 bg-ivory-section rounded-xl border border-border/50">
                    <div className="size-20 rounded-xl overflow-hidden shrink-0 border border-border/50">
                      <img
                        src={cartItem.imageUrl}
                        alt={cartItem.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-text-dark text-sm line-clamp-2 mb-1">
                        {cartItem.name}
                      </p>
                      <div className="flex items-center gap-1 mb-2">
                        <Star size={11} className="fill-gold text-gold" />
                        <span className="text-xs text-text-secondary">
                          {cartItem.rating} ({cartItem.reviewsCount} reviews)
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-text-secondary">
                          Qty:
                        </span>
                        <div className="flex items-center border border-border rounded-lg overflow-hidden">
                          <button
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            className="px-2.5 py-1 text-text-secondary hover:bg-ivory transition-colors text-sm"
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-sm font-medium text-text-dark border-x border-border">
                            {qty}
                          </span>
                          <button
                            onClick={() => setQty((q) => q + 1)}
                            className="px-2.5 py-1 text-text-secondary hover:bg-ivory transition-colors text-sm"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-bold text-text-dark flex items-center text-sm ml-auto">
                          <IndianRupee size={13} strokeWidth={2.5} />
                          {cartItem.price * qty}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping address summary */}
                  <div className="p-4 bg-ivory-section rounded-xl border border-border/50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-bold text-text-dark flex items-center gap-1.5">
                        <MapPin size={14} className="text-saffron" /> Delivering
                        to
                      </span>
                      <button
                        onClick={() => setStep(1)}
                        className="text-xs text-saffron hover:text-saffron-dark font-medium"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-text-secondary">
                      {form.firstName || "Name"} {form.lastName},{" "}
                      {form.address1 || "Address"}, {form.city || "City"},{" "}
                      {form.state || "State"} – {form.pin || "PIN"}
                    </p>
                    <p className="text-xs text-text-secondary mt-1">
                      {form.phone} · {form.email}
                    </p>
                  </div>

                  {/* Available Coupons */}
                  <div>
                    <h3 className="text-sm font-bold text-text-dark mb-3 flex items-center gap-2">
                      <Gift size={14} className="text-saffron" /> Available
                      Coupons
                    </h3>
                    <div className="space-y-2">
                      {[
                        {
                          code: "POOJA10",
                          desc: "10% off on all orders",
                          min: "Min. order ₹500",
                          color: "from-saffron/20 to-saffron/5",
                        },
                        {
                          code: "SACRED20",
                          desc: "20% off on sacred items",
                          min: "Min. order ₹1000",
                          color: "from-gold/20 to-gold/5",
                        },
                        {
                          code: "FIRST15",
                          desc: "15% off on your first order",
                          min: "New users only",
                          color: "from-temple-green/20 to-temple-green/5",
                        },
                      ].map((c) => (
                        <div
                          key={c.code}
                          className="relative flex items-stretch rounded-xl overflow-hidden border border-border/50 shadow-sm"
                        >
                          {/* Left ticket notch */}
                          <div
                            className={`bg-gradient-to-b ${c.color} flex flex-col items-center justify-center px-4 py-4 min-w-[90px]`}
                          >
                            <Tag size={16} className="text-saffron mb-1.5" />
                            <span className="font-mono font-extrabold text-sm text-saffron-dark tracking-wider leading-none text-center">
                              {c.code}
                            </span>
                          </div>
                          {/* Notch circles */}
                          <div className="absolute left-[82px] -top-2 size-4 rounded-full bg-ivory border border-border/40" />
                          <div className="absolute left-[82px] -bottom-2 size-4 rounded-full bg-ivory border border-border/40" />
                          {/* Dashed separator */}
                          <div className="w-px border-l-2 border-dashed border-border/60 my-3" />
                          {/* Content */}
                          <div className="flex-1 flex items-center justify-between px-4 py-3 bg-white">
                            <div>
                              <p className="text-sm font-semibold text-text-dark">
                                {c.desc}
                              </p>
                              <p className="text-xs text-text-secondary mt-0.5">
                                {c.min}
                              </p>
                            </div>
                            <button
                              onClick={() => {
                                setCoupon(c.code);
                                setCouponError("");
                              }}
                              className="ml-3 text-xs font-bold text-saffron border border-saffron/40 rounded-lg px-3 py-1.5 hover:bg-saffron hover:text-white transition-all shrink-0"
                            >
                              APPLY
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Coupon */}
                  <div>
                    <h3 className="text-sm font-bold text-text-dark mb-2 flex items-center gap-2">
                      <Tag size={14} className="text-saffron" /> Coupon Code
                    </h3>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between bg-success/10 border border-success/30 rounded-xl px-4 py-3">
                        <span className="text-sm text-success font-semibold flex items-center gap-2">
                          <Gift size={15} /> "{appliedCoupon}" applied —{" "}
                          {COUPONS[appliedCoupon]}% off
                        </span>
                        <button
                          onClick={() => {
                            setAppliedCoupon("");
                            setCoupon("");
                          }}
                          className="text-xs text-text-secondary hover:text-error"
                        >
                          Remove
                        </button>
                      </div>
                    ) : (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter coupon code"
                          value={coupon}
                          onChange={(e) => {
                            setCoupon(e.target.value);
                            setCouponError("");
                          }}
                          className="h-11 rounded-xl bg-ivory border-border/60 focus:border-saffron focus:ring-saffron/20 uppercase"
                        />
                        <Button
                          variant="outline"
                          onClick={applyCoupon}
                          className="h-11 px-5 rounded-xl shrink-0 border-saffron text-saffron hover:bg-saffron/10"
                        >
                          Apply
                        </Button>
                      </div>
                    )}
                    {couponError && (
                      <p className="text-xs text-error mt-1.5">{couponError}</p>
                    )}
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button
                      variant="outline"
                      className="w-1/3 h-12 rounded-xl"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button
                      size="lg"
                      className="w-2/3 h-12 rounded-xl text-base bg-success hover:bg-success/90 shadow-[0_8px_20px_-8px_rgba(65,122,80,0.5)] hover:-translate-y-0.5 transition-all"
                      onClick={openRazorpay}
                    >
                      <Lock size={16} className="mr-2" /> Pay ₹{total}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ── Order Summary Sidebar ── */}
        <div className="lg:w-2/5">
          <Card className="sticky top-28 border border-border/60 shadow-lg rounded-2xl overflow-hidden bg-white">
            <CardContent className="p-7">
              <h3 className="font-serif font-bold text-xl text-text-dark mb-5 pb-4 border-b border-border/50">
                Order Summary
              </h3>

              <div className="flex gap-4 mb-6">
                <div className="size-18 w-18 h-18 rounded-xl bg-ivory border border-border/50 overflow-hidden shrink-0">
                  <img
                    src={cartItem.imageUrl}
                    alt={cartItem.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-text-dark text-sm line-clamp-2 mb-1">
                    {cartItem.name}
                  </p>
                  <Badge className="bg-saffron/10 text-saffron border-saffron/20 text-xs mb-2">
                    {cartItem.category}
                  </Badge>
                  <div className="flex items-center text-text-dark font-bold">
                    <IndianRupee size={14} />
                    {cartItem.price}{" "}
                    <span className="text-text-secondary font-normal text-xs ml-1">
                      × {qty}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 border-t border-border/50 pt-5 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>
                    Subtotal ({qty} item{qty > 1 ? "s" : ""})
                  </span>
                  <span className="font-medium text-text-dark">
                    ₹{subtotal}
                  </span>
                </div>
                <div className="flex justify-between text-text-secondary">
                  <span>Delivery</span>
                  <span
                    className={`font-medium ${deliveryCharge === 0 ? "text-success" : "text-text-dark"}`}
                  >
                    {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-success">
                    <span>Coupon ({appliedCoupon})</span>
                    <span className="font-medium">−₹{discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-text-secondary">
                  <span>Taxes</span>
                  <span className="font-medium text-text-dark">Included</span>
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-border/50">
                  <span className="font-serif font-bold text-text-dark text-lg">
                    Total
                  </span>
                  <span className="font-serif font-bold text-saffron-dark text-2xl">
                    ₹{total}
                  </span>
                </div>
              </div>

              {/* <div className="mt-6 space-y-2.5">
                <div className="flex items-center gap-3 text-xs text-text-secondary bg-ivory-section px-3 py-2.5 rounded-lg">
                  <ShieldCheck size={16} className="text-success shrink-0" />
                  100% Secure · 256-bit SSL Encryption
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary bg-ivory-section px-3 py-2.5 rounded-lg">
                  <Truck size={16} className="text-saffron shrink-0" />
                  Standard Delivery · 3–5 business days
                </div>
                <div className="flex items-center gap-3 text-xs text-text-secondary bg-ivory-section px-3 py-2.5 rounded-lg">
                  <Package size={16} className="text-saffron shrink-0" />
                  Easy 7-day returns on eligible items
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Header />
      <main className="flex-1 bg-ivory pb-16">
        <CheckoutFlow />
      </main>
      <Footer />
    </>
  );
}
