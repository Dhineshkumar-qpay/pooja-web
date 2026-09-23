"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getOrderDetails,
  ApiOrderDetailsResponse,
  IMAGE_BASE_URL,
} from "@/lib/api";
import {
  ArrowLeft,
  PackageCheck,
  Truck,
  Package,
  ClipboardList,
  MapPin,
  IndianRupee,
  Phone,
  Mail,
  Check,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const getStatusBadgeStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-amber-500/10 text-amber-600 border-amber-500/30";
    case "confirmed":
      return "bg-blue-500/10 text-blue-600 border-blue-500/30";
    case "shipped":
      return "bg-purple-500/10 text-purple-600 border-purple-500/30";
    case "delivered":
      return "bg-success/10 text-success border-success/30";
    case "cancelled":
      return "bg-error/10 text-error border-error/30";
    default:
      return "bg-gray-500/10 text-gray-600 border-gray-500/30";
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return <ClipboardList size={16} />;
    case "confirmed":
      return <PackageCheck size={16} />;
    case "shipped":
      return <Truck size={16} />;
    case "delivered":
      return <Check size={16} />;
    case "cancelled":
      return <Check size={16} />;
    default:
      return <Package size={16} />;
  }
};

const getTrackingSteps = (order: any) => {
  const status = order.orderstatus.toLowerCase();
  const date = new Date(order.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  if (status === "cancelled") {
    return [
      {
        label: "Order Placed",
        desc: "Your order was received",
        date,
        done: true,
        icon: ClipboardList,
      },
      {
        label: "Cancelled",
        desc: "Order was cancelled",
        date: "",
        done: true,
        icon: Check,
      },
    ];
  }

  const steps = [
    {
      id: "pending",
      label: "Order Placed",
      desc: "Your order has been received",
      date,
      done: true,
      icon: ClipboardList,
    },
    {
      id: "confirmed",
      label: "Order Confirmed",
      desc: "Payment verified & order confirmed",
      date: "",
      done: false,
      icon: PackageCheck,
    },
    {
      id: "shipped",
      label: "Packed & Shipped",
      desc: "Your order is on its way",
      date: "",
      done: false,
      icon: Truck,
    },
    {
      id: "delivered",
      label: "Delivered",
      desc: "Package delivered successfully",
      date: "",
      done: false,
      icon: PackageCheck,
    },
  ];

  let currentLevel = 0;
  if (status === "confirmed") currentLevel = 1;
  else if (status === "shipped") currentLevel = 2;
  else if (status === "delivered") currentLevel = 3;

  return steps.map((step, idx) => ({
    ...step,
    done: idx <= currentLevel,
  }));
};

export default function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [details, setDetails] = useState<ApiOrderDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      const data = await getOrderDetails(id);
      setDetails(data);
      setLoading(false);
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-ivory pb-16 flex items-center justify-center min-h-[60vh]">
          <p className="text-text-secondary">Loading order details...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!details) {
    return (
      <>
        <Header />
        <main className="flex-1 bg-ivory pb-16 flex items-center justify-center min-h-[60vh]">
          <p className="text-text-secondary">Order not found.</p>
        </main>
        <Footer />
      </>
    );
  }

  const { orderdetails: order, address } = details;

  const handleDownloadInvoice = () => {
    if (!details) return;
    const { orderdetails: order, address } = details;

    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text("INVOICE", 105, 20, { align: "center" });

    doc.setFontSize(10);
    doc.text(`Order ID: ${order.orderid.toUpperCase()}`, 14, 30);
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 14, 35);
    doc.text(`Status: ${order.orderstatus.toUpperCase()}`, 14, 40);

    // Billed To
    doc.setFontSize(12);
    doc.text("Billed To:", 14, 55);
    doc.setFontSize(10);
    doc.text(`${address.firstname} ${address.lastname}`, 14, 62);
    doc.text(`${address.addressline1}`, 14, 67);
    if (address.addressline2) {
      doc.text(`${address.addressline2}`, 14, 72);
      doc.text(
        `${address.city}, ${address.state} - ${address.pincode}`,
        14,
        77,
      );
      doc.text(`Phone: ${address.phone}`, 14, 82);
    } else {
      doc.text(
        `${address.city}, ${address.state} - ${address.pincode}`,
        14,
        72,
      );
      doc.text(`Phone: ${address.phone}`, 14, 77);
    }

    // Items table
    const tableColumn = ["S.No", "Item", "Quantity", "Price", "Total"];
    const tableRows = order.orderitems.map((item, index) => [
      index + 1,
      item.productname,
      item.quantity,
      `Rs. ${item.price}`,
      `Rs. ${item.quantity * item.price}`,
    ]);

    autoTable(doc, {
      startY: 95,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
      headStyles: { fillColor: [217, 107, 39] },
    });

    const finalY = (doc as any).lastAutoTable.finalY || 95;

    // Summary
    let y = finalY + 15;
    doc.text(
      `Subtotal: Rs. ${order.subtotal ? parseFloat(order.subtotal) : order.totalamount - order.shippingprice}`,
      140,
      y,
    );
    y += 7;
    
    if (order.discountprice && parseFloat(order.discountprice) > 0) {
      doc.text(
        `Coupon ${order.couponcode ? `(${order.couponcode})` : ''}: -Rs. ${parseFloat(order.discountprice)}`,
        140,
        y,
      );
      y += 7;
    }
    
    doc.text(
      `Shipping: ${order.shippingprice === 0 ? "FREE" : "Rs. " + order.shippingprice}`,
      140,
      y,
    );
    
    y += 8;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Total Paid: Rs. ${order.totalamount}`, 140, y);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    // Save
    doc.save(`Invoice_${order.orderid.slice(0, 8).toUpperCase()}.pdf`);
  };

  return (
    <>
      <Header />
      <main className="flex-1 bg-ivory pb-16 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 z-0">
          <div className="absolute top-0 left-1/4 size-[500px] bg-saffron/20 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 right-1/4 size-[400px] bg-gold/15 rounded-full blur-[100px]"></div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-white/40 backdrop-blur-sm border-b border-border/50 py-4 relative z-10">
          <div className="w-full px-6 md:px-12">
            <div className="flex items-center text-sm text-text-secondary">
              <Link href="/" className="hover:text-saffron transition-colors">
                Home
              </Link>
              <span className="mx-2">/</span>
              <Link
                href="/dashboard"
                className="hover:text-saffron transition-colors"
              >
                My Account
              </Link>
              <span className="mx-2">/</span>
              <span className="text-text-dark font-medium">
                Order #{order.orderid.slice(0, 8).toUpperCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="w-full px-6 md:px-12 py-10 max-w-6xl mx-auto relative z-10">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-saffron hover:text-saffron-dark font-medium mb-8 group"
          >
            <ArrowLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />{" "}
            Back to My Orders
          </Link>

          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold text-text-dark">
                Order #{order.orderid.slice(0, 8).toUpperCase()}
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
            </div>
            <Badge
              className={`px-4 py-2 text-sm font-semibold w-fit flex items-center gap-2 capitalize ${getStatusBadgeStyles(order.orderstatus)}`}
            >
              {getStatusIcon(order.orderstatus)} {order.orderstatus}
            </Badge>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left — Tracking + Product */}
            <div className="flex-1 space-y-6">
              {/* Tracking Timeline */}
              <Card className="border border-border/40 shadow-lg rounded-[2rem] bg-white/70 backdrop-blur-md overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="font-serif font-bold text-xl text-text-dark mb-6 flex items-center gap-2">
                    <Truck size={20} className="text-saffron" /> Order Tracking
                  </h2>
                  <div className="relative">
                    {/* Vertical line */}
                    <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-border/60" />
                    <div className="space-y-0">
                      {getTrackingSteps(order).map((step, idx, arr) => {
                        const Icon = step.icon;
                        const isLast = idx === arr.length - 1;
                        return (
                          <div
                            key={idx}
                            className="relative flex gap-5 pb-8 last:pb-0"
                          >
                            {/* Icon circle */}
                            <div
                              className={`relative z-10 size-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all ${step.done ? "bg-saffron border-saffron text-white shadow-[0_0_12px_rgba(217,107,39,0.3)]" : "bg-white border-border text-text-secondary"}`}
                            >
                              {step.done ? (
                                <Check size={16} />
                              ) : (
                                <Icon size={16} />
                              )}
                            </div>
                            {/* Content */}
                            <div
                              className={`flex-1 pt-1.5 ${!isLast ? "pb-2" : ""}`}
                            >
                              <div className="flex items-center justify-between flex-wrap gap-1">
                                <span
                                  className={`font-semibold text-sm ${step.done ? "text-text-dark" : "text-text-secondary"}`}
                                >
                                  {step.label}
                                </span>
                                {step.done && (
                                  <span className="text-xs text-text-secondary">
                                    {step.date}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-text-secondary mt-0.5">
                                {step.desc}
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product */}
              <Card className="border border-border/40 shadow-lg rounded-[2rem] bg-white/70 backdrop-blur-md overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="font-serif font-bold text-xl text-text-dark mb-5 flex items-center gap-2">
                    <Package size={20} className="text-saffron" /> Items Ordered
                  </h2>
                  <div className="space-y-4">
                    {order.orderitems.map((item) => (
                      <div
                        key={item.orderitemid}
                        className="flex gap-4 p-4 bg-ivory-section rounded-xl border border-border/50"
                      >
                        <div className="size-20 rounded-xl overflow-hidden shrink-0 border border-border/50">
                          <img
                            src={`${IMAGE_BASE_URL}${item.productimage}`}
                            alt={item.productname}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="font-bold text-text-dark line-clamp-2 text-sm">
                            {item.productname}
                          </span>
                          <p className="text-xs text-text-secondary mt-1">
                            Qty: {item.quantity}
                          </p>
                          <div className="flex items-center font-bold text-text-dark mt-2">
                            <IndianRupee size={14} strokeWidth={2.5} />
                            {item.price}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right — Summary */}
            <div className="lg:w-80 shrink-0 space-y-6">
              {/* Price Breakdown */}
              <Card className="border border-border/40 shadow-lg rounded-[2rem] bg-white/70 backdrop-blur-md overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="font-serif font-bold text-xl text-text-dark mb-5">
                    Price Details
                  </h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between text-text-secondary">
                      <span>Subtotal</span>
                      <span className="font-medium text-text-dark">
                        ₹{order.subtotal ? parseFloat(order.subtotal) : order.totalamount - order.shippingprice}
                      </span>
                    </div>
                    {order.discountprice && parseFloat(order.discountprice) > 0 && (
                      <div className="flex justify-between text-success">
                        <span>Coupon {order.couponcode ? `(${order.couponcode})` : ""}</span>
                        <span className="font-medium">
                          −₹{parseFloat(order.discountprice)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-text-secondary">
                      <span>Delivery</span>
                      <span className="font-medium text-success">
                        {order.shippingprice === 0
                          ? "FREE"
                          : `₹${order.shippingprice}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-text-secondary">
                      <span>Taxes</span>
                      <span className="font-medium text-text-dark">
                        Included
                      </span>
                    </div>
                    <div className="flex justify-between items-center pt-3 border-t border-border/50">
                      <span className="font-bold text-text-dark">
                        Total Paid
                      </span>
                      <span className="font-bold text-saffron-dark text-xl">
                        ₹{order.totalamount}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/50 text-xs text-text-secondary flex items-center gap-2 mb-4"></div>
                  <Button
                    variant="outline"
                    className="w-full gap-2 font-bold h-12 rounded-xl border-saffron/30 hover:border-saffron/60 text-saffron hover:bg-saffron/5 transition-all shadow-sm"
                    onClick={handleDownloadInvoice}
                  >
                    <Download size={16} /> Download Invoice
                  </Button>
                </CardContent>
              </Card>

              {/* Delivery Address */}
              <Card className="border border-border/40 shadow-lg rounded-[2rem] bg-white/70 backdrop-blur-md overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="font-serif font-bold text-xl text-text-dark mb-4 flex items-center gap-2">
                    <MapPin size={18} className="text-saffron" /> Delivery
                    Address
                  </h2>
                  <p className="font-semibold text-text-dark text-sm">
                    {address.firstname} {address.lastname}
                  </p>
                  <p className="text-sm text-text-secondary mt-1 leading-relaxed">
                    {address.addressline1},<br />
                    {address.addressline2 && (
                      <>
                        {address.addressline2},<br />
                      </>
                    )}
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <div className="mt-3 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs text-text-secondary">
                      <Phone size={12} /> {address.phone}
                    </div>
                  </div>
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
