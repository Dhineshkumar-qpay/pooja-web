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
import {
  getCart,
  increaseCartItem,
  decreaseCartItem,
  deleteCartItem,
  ApiCartResponse,
  IMAGE_BASE_URL,
  getAddresses,
  ApiAddress,
  placeOrder,
  verifyPayment,
  getCoupons,
  ApiCoupon,
  applyCouponToCart,
} from "@/lib/api";
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
  Trash2,
  Loader2,
} from "lucide-react";

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}



function CheckoutFlow() {
  const [step, setStep] = useState(1);
  const steps = ["Shipping", "Review & Pay", "Confirmation"];

  const [cart, setCart] = useState<ApiCartResponse | null>(null);
  const [loadingCart, setLoadingCart] = useState(true);

  const [addresses, setAddresses] = useState<ApiAddress[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [showNewAddressForm, setShowNewAddressForm] = useState(false);
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null,
  );
  const [placedOrderId, setPlacedOrderId] = useState("");

  const fetchCartData = async () => {
    setLoadingCart(true);
    const data = await getCart();
    setCart(data);
    setLoadingCart(false);
  };

  React.useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem("token")) {
      fetchCartData();
      fetchAddresses();
      fetchCouponsData();
    } else {
      setLoadingCart(false);
      setLoadingAddresses(false);
    }
  }, []);

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    const data = await getAddresses();
    setAddresses(data);
    if (data.length === 0) setShowNewAddressForm(true);
    setLoadingAddresses(false);
  };

  const handleIncrease = async (cartid: string) => {
    await increaseCartItem(cartid);
    fetchCartData();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const handleDecrease = async (cartid: string, qty: number) => {
    if (qty > 1) {
      await decreaseCartItem(cartid);
      fetchCartData();
      window.dispatchEvent(new Event("cartUpdated"));
    }
  };

  const handleDelete = async (cartid: string) => {
    await deleteCartItem(cartid);
    fetchCartData();
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<ApiCoupon | null>(null);
  const [couponResult, setCouponResult] = useState<any>(null);
  const [couponError, setCouponError] = useState("");
  const [coupons, setCoupons] = useState<ApiCoupon[]>([]);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  const fetchCouponsData = async () => {
    const data = await getCoupons();
    setCoupons(data);
  };
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

  const subtotal = couponResult ? couponResult.subtotal : (cart ? parseFloat(cart.totalamount || "0") : 0);
  const deliveryCharge = 0;
  const discount = couponResult ? couponResult.discount : 0;
  const total = couponResult ? couponResult.total : (subtotal + deliveryCharge);

  async function applyCoupon(codeToApply?: string) {
    const code = (codeToApply || coupon).trim().toUpperCase();

    try {
      const res = await applyCouponToCart(code);
      if (res && res.status === 200) {
        setCouponResult(res.data);
        const found = coupons.find(c => c.couponcode === code);
        setAppliedCoupon(found || null);
        setCouponError("");
        if (codeToApply) setCoupon(codeToApply);
      } else {
        setCouponError(res?.message || "Invalid coupon code.");
        setAppliedCoupon(null);
        setCouponResult(null);
      }
    } catch (e) {
      setCouponError("Failed to apply coupon.");
      setAppliedCoupon(null);
      setCouponResult(null);
    }
  }

  async function handlePayment() {
    if (!selectedAddressId) {
      alert("Please select an address first");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const code = appliedCoupon?.couponcode || couponResult?.couponcode;
      const res = await placeOrder(selectedAddressId, code);
      if (res && res.data) {
        setPlacedOrderId(res.data.orderid);
        openRazorpay(res.data.totalamount, res.data.orderid, res.data.razorpayorderid);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to place order.");
    } finally {
      setIsPlacingOrder(false);
    }
  }

  function openRazorpay(orderTotal: number, orderId: string, razorpayOrderId: string) {
    const options = {
      key: "rzp_test_Tee0FU35xhyKoK",
      amount: Number(orderTotal) * 100,
      currency: "INR",
      name: "Pooja Store",
      description: "Order Checkout",
      order_id: razorpayOrderId,
      image: "",
      handler: async function (response: any) {
        const paymentId = response.razorpay_payment_id;
        const orderIdReturned = response.razorpay_order_id;
        const signature = response.razorpay_signature;

        setIsVerifyingPayment(true);
        try {
          const verifyRes = await verifyPayment({
            orderid: orderId,
            razorpay_order_id: orderIdReturned,
            razorpay_payment_id: paymentId,
            razorpay_signature: signature
          });

          if (verifyRes && verifyRes.status === 200) {
            setStep(3);
            window.dispatchEvent(new Event("cartUpdated"));
            console.log("Payment successful and verified for order: " + orderId);
          } else {
            alert("Payment verification failed.");
          }
        } catch (e) {
          console.error(e);
          alert("Payment verification failed.");
        } finally {
          setIsVerifyingPayment(false);
        }
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
      <div className="max-w-3xl mx-auto py-20 px-6 animate-in zoom-in-95 duration-700">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-border/50 overflow-hidden relative">
          {/* Top banner / Confetti abstraction */}
          <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-success/20 via-success/5 to-transparent pointer-events-none"></div>

          <div className="p-10 md:p-14 text-center relative z-10 flex flex-col items-center">
            {/* Animated Check */}
            <div className="relative size-28 mb-8">
              <div className="absolute inset-0 bg-success/20 rounded-full animate-ping opacity-75"></div>
              <div className="relative size-full bg-gradient-to-tr from-success to-emerald-400 rounded-full flex items-center justify-center shadow-xl shadow-success/30 transform transition-transform hover:scale-105 duration-300">
                <Check size={50} className="text-white stroke-[3]" />
              </div>
            </div>

            <Badge className="mb-6 bg-success/10 text-success border-success/20 px-4 py-1.5 text-sm uppercase tracking-widest font-black rounded-full">
              Payment Successful
            </Badge>

            <h2 className="text-4xl md:text-5xl font-serif font-black text-text-dark mb-4 tracking-tight">
              Order Confirmed!
            </h2>

            <p className="text-lg text-text-secondary mb-2 max-w-lg mx-auto leading-relaxed">
              Thank you, <span className="font-bold text-text-dark">{form.firstName || "Customer"}</span>. Your spiritual items are being prepared with care.
            </p>

            <div className="inline-flex items-center gap-2 bg-ivory px-4 py-2 rounded-xl border border-border/50 mb-10 mt-2">
              <span className="text-sm text-text-secondary">Order ID:</span>
              <span className="font-mono font-bold text-saffron-dark text-base tracking-widest">
                #{placedOrderId.slice(0, 8).toUpperCase() || "ORD-XXXX"}
              </span>
            </div>

            {/* Receipt Card */}
            <div className="w-full max-w-md bg-ivory-section rounded-2xl p-1 relative border border-border/50 shadow-sm">
              <div className="absolute -left-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-white border-r border-border/50 z-10"></div>
              <div className="absolute -right-2 top-1/2 -translate-y-1/2 size-4 rounded-full bg-white border-l border-border/50 z-10"></div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-border/30 border-dashed relative overflow-hidden">
                <h4 className="text-sm font-bold uppercase tracking-widest text-text-secondary mb-4 text-left border-b border-border/50 pb-3">Order Summary</h4>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between items-center text-sm font-medium text-text-dark">
                    <span>Total Items</span>
                    <span className="bg-ivory px-2 py-0.5 rounded-md">{cart?.cartItems?.length || 0}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-text-dark">
                    <span>Delivery</span>
                    <span className="text-success font-bold">Standard</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium text-text-dark">
                    <span>Email sent to</span>
                    <span className="text-xs text-text-secondary truncate max-w-[150px]">{form.email || "your email"}</span>
                  </div>
                </div>

                <div className="flex justify-between items-center border-t border-border/50 pt-4 mt-2">
                  <span className="text-base font-black text-text-dark">Total Paid</span>
                  <span className="text-2xl font-black text-saffron-dark">₹{total}</span>
                </div>
              </div>
            </div>

            <div className="mt-12 flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Link href={`/orders/${placedOrderId}`} className="flex-1">
                <Button size="lg" className="w-full h-14 text-base font-bold rounded-xl shadow-lg shadow-text-dark/10 hover:shadow-xl hover:-translate-y-1 transition-all bg-saffron hover:bg-saffron-dark text-white cursor-pointer">
                  Track Order
                </Button>
              </Link>
              <Link href="/products" className="flex-1">
                <Button size="lg" variant="outline" className="w-full h-14 text-base font-bold rounded-xl border-2 hover:bg-saffron transition-all text-text-dark cursor-pointer">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
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

                  {loadingAddresses ? (
                    <p className="text-sm text-text-secondary">
                      Loading addresses...
                    </p>
                  ) : !showNewAddressForm && addresses.length > 0 ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {addresses.map((addr) => (
                          <div
                            key={addr.addressid}
                            className="p-4 border-2 border-border/60 rounded-xl cursor-pointer hover:border-saffron/60 transition-colors bg-ivory-section flex flex-col justify-between"
                            onClick={() => {
                              setSelectedAddressId(addr.addressid);
                              setForm({
                                firstName: addr.firstname,
                                lastName: addr.lastname,
                                email: "",
                                phone: addr.phone,
                                address1: addr.addressline1,
                                address2: addr.addressline2 || "",
                                city: addr.city,
                                state: addr.state,
                                pin: addr.pincode,
                              });
                              setStep(2);
                            }}
                          >
                            <div>
                              <h4 className="font-bold text-text-dark mb-1">
                                {addr.firstname} {addr.lastname}
                              </h4>
                              <p className="text-xs text-text-secondary leading-relaxed">
                                {addr.addressline1}{" "}
                                {addr.addressline2 && `, ${addr.addressline2}`}
                                <br />
                                {addr.city}, {addr.state} {addr.pincode}
                                <br />
                                Phone: {addr.phone}
                              </p>
                            </div>
                            <div className="mt-4 text-saffron text-sm font-bold flex items-center gap-1">
                              Deliver Here <ChevronRight size={14} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button
                        variant="outline"
                        className="w-full border-dashed border-2"
                        onClick={() => setShowNewAddressForm(true)}
                      >
                        + Add New Address
                      </Button>
                    </div>
                  ) : (
                    <>
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

                      <div className="flex gap-3">
                        {addresses.length > 0 && (
                          <Button
                            variant="outline"
                            size="lg"
                            className="h-13 rounded-xl"
                            onClick={() => setShowNewAddressForm(false)}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button
                          size="lg"
                          className="flex-1 h-13 text-base rounded-xl shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 group"
                          onClick={() => setStep(2)}
                        >
                          Review Order{" "}
                          <ChevronRight
                            size={18}
                            className="ml-2 group-hover:translate-x-1 transition-transform"
                          />
                        </Button>
                      </div>
                    </>
                  )}
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
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                    {loadingCart ? (
                      <p className="text-sm text-text-secondary p-4">
                        Loading cart...
                      </p>
                    ) : cart?.cartItems?.length === 0 ? (
                      <p className="text-sm text-text-secondary p-4">
                        Your cart is empty.
                      </p>
                    ) : (
                      cart?.cartItems?.map((item) => (
                        <div
                          key={item.cartid}
                          className="flex gap-4 p-4 bg-ivory-section rounded-xl border border-border/50 relative group"
                        >
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
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-text-dark text-sm line-clamp-2 mb-1 pr-6">
                              {item.Product.productname}
                            </p>
                            <div className="flex items-center gap-1 mb-2">
                              <Badge className="bg-saffron/10 text-saffron border-saffron/20 text-[10px] py-0">
                                {item.Product.categoryname}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-text-secondary">
                                Qty:
                              </span>
                              <div className="flex items-center border border-border bg-white rounded-lg overflow-hidden">
                                <button
                                  onClick={() =>
                                    handleDecrease(item.cartid, item.quantity)
                                  }
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
                              <span className="font-bold text-text-dark flex items-center text-sm ml-auto">
                                <IndianRupee size={13} strokeWidth={2.5} />
                                {parseFloat(
                                  item.Product.sellingprice ||
                                  item.Product.price,
                                ) * item.quantity}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
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
                  <div className="pt-1">
                    <h3 className="text-sm font-extrabold text-text-dark mb-4 flex items-center gap-2 uppercase tracking-wide">
                      <div className="p-1.5 bg-saffron/10 rounded-lg text-saffron shadow-sm border border-saffron/20">
                        <Gift size={16} />
                      </div>
                      Available Coupons
                    </h3>
                    <div className="space-y-4">
                      {coupons.map((c, i) => {
                        const themes = [
                          { bg: "bg-gradient-to-br from-orange-400 to-pink-500", text: "text-white", border: "border-orange-200", btnText: "text-orange-600", btnBg: "bg-orange-50", btnHover: "hover:bg-orange-500 hover:text-white hover:border-orange-500" },
                          { bg: "bg-gradient-to-br from-emerald-400 to-teal-500", text: "text-white", border: "border-emerald-200", btnText: "text-emerald-600", btnBg: "bg-emerald-50", btnHover: "hover:bg-emerald-500 hover:text-white hover:border-emerald-500" },
                          { bg: "bg-gradient-to-br from-blue-400 to-indigo-500", text: "text-white", border: "border-blue-200", btnText: "text-blue-600", btnBg: "bg-blue-50", btnHover: "hover:bg-blue-500 hover:text-white hover:border-blue-500" },
                          { bg: "bg-gradient-to-br from-purple-400 to-fuchsia-500", text: "text-white", border: "border-purple-200", btnText: "text-purple-600", btnBg: "bg-purple-50", btnHover: "hover:bg-purple-500 hover:text-white hover:border-purple-500" }
                        ];
                        const theme = themes[i % themes.length];

                        return (
                          <div
                            key={c.couponid}
                            className={`relative flex items-stretch rounded-2xl overflow-hidden border border-border shadow-[0_4px_14px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all duration-300 group bg-white`}
                          >
                            {/* Left colorful ticket area */}
                            <div
                              className={`${theme.bg} flex flex-col items-center justify-center px-4 py-5 min-w-[110px] relative z-10 border-r-2 border-dashed border-white/40`}
                            >
                              <div className="absolute -top-3 -right-3 size-6 rounded-full bg-white shadow-inner"></div>
                              <div className="absolute -bottom-3 -right-3 size-6 rounded-full bg-white shadow-inner"></div>

                              <Tag size={22} className={`${theme.text} mb-2 opacity-90 drop-shadow-sm`} />
                              <span className={`font-mono font-black text-sm tracking-widest ${theme.text} uppercase drop-shadow-md`}>
                                {c.couponcode}
                              </span>
                            </div>

                            {/* Content area */}
                            <div className="flex-1 flex items-center justify-between p-4 bg-white relative">
                              <div className="pl-2">
                                <p className="text-lg font-black text-text-dark flex items-center gap-2 mb-1">
                                  {c.type === "flat" ? `₹${parseFloat(c.value)} OFF` : `${parseFloat(c.value)}% OFF`}
                                  <span className={`text-[9px] ${theme.btnBg} ${theme.btnText} px-2 py-0.5 rounded-full uppercase font-bold tracking-widest border ${theme.border}`}>Sale</span>
                                </p>
                                <p className="text-xs font-medium text-text-secondary">
                                  On min. order of ₹{parseFloat(c.minorder)}
                                </p>
                              </div>
                              <button
                                onClick={() => {
                                  applyCoupon(c.couponcode);
                                }}
                                className={`ml-3 text-xs font-black rounded-xl px-5 py-2.5 transition-all duration-300 shadow-sm ${theme.btnBg} ${theme.btnText} ${theme.btnHover} active:scale-95 shrink-0 uppercase tracking-wide border ${theme.border}`}
                              >
                                Apply
                              </button>
                            </div>
                          </div>
                        )
                      })}
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
                          <Gift size={15} /> "{appliedCoupon.couponcode}" applied —{" "}
                          {appliedCoupon.type === "flat" ? `₹${parseFloat(appliedCoupon.value)}` : `${parseFloat(appliedCoupon.value)}%`} off
                        </span>
                        <button
                          onClick={() => {
                            setAppliedCoupon(null);
                            setCouponResult(null);
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
                          onClick={() => applyCoupon()}
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
                      onClick={handlePayment}
                      disabled={isPlacingOrder || isVerifyingPayment}
                    >
                      {isPlacingOrder || isVerifyingPayment ? (
                        <>
                          <Loader2 size={16} className="mr-2 animate-spin" /> Processing...
                        </>
                      ) : (
                        <>
                          <Lock size={16} className="mr-2" /> Pay ₹{total}
                        </>
                      )}
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

              <div className="flex flex-col gap-3 mb-6 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                {cart?.cartItems?.map((item) => (
                  <div key={item.cartid} className="flex gap-3">
                    <div className="size-14 w-14 h-14 rounded-xl bg-ivory border border-border/50 overflow-hidden shrink-0">
                      <img
                        src={`${IMAGE_BASE_URL}${item.Product.thumbnailimage}`}
                        alt={item.Product.productname}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-text-dark text-xs line-clamp-2 mb-1">
                        {item.Product.productname}
                      </p>
                      <div className="flex items-center text-text-dark font-bold text-sm">
                        <IndianRupee size={12} />
                        {parseFloat(
                          item.Product.sellingprice || item.Product.price,
                        )}{" "}
                        <span className="text-text-secondary font-normal text-xs ml-1">
                          × {item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t border-border/50 pt-5 text-sm">
                <div className="flex justify-between text-text-secondary">
                  <span>
                    Subtotal ({cart?.cartItems?.length || 0} item
                    {(cart?.cartItems?.length || 0) !== 1 ? "s" : ""})
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
                    <span>Coupon ({appliedCoupon?.couponcode || couponResult?.couponcode})</span>
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
