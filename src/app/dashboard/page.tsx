"use client";

import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Package, MapPin, Heart, History, LogOut, PackageCheck, IndianRupee, Plus, Star, ShoppingCart, Trash2, Edit2, ClipboardList, Truck, Check } from 'lucide-react';
import { products } from '@/data/mock-data';

const getStatusBadgeStyles = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
    case 'confirmed': return 'bg-blue-500/10 text-blue-600 border-blue-500/30';
    case 'shipped': return 'bg-purple-500/10 text-purple-600 border-purple-500/30';
    case 'delivered': return 'bg-success/10 text-success border-success/30';
    case 'cancelled': return 'bg-error/10 text-error border-error/30';
    default: return 'bg-gray-500/10 text-gray-600 border-gray-500/30';
  }
};

const getStatusIcon = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending': return <ClipboardList size={16} />;
    case 'confirmed': return <PackageCheck size={16} />;
    case 'shipped': return <Truck size={16} />;
    case 'delivered': return <Check size={16} />;
    case 'cancelled': return <Check size={16} />;
    default: return <Package size={16} />;
  }
};
import { getAddresses, addAddress, editAddress, deleteAddress, ApiAddress, getUserOrders, ApiOrder, IMAGE_BASE_URL, addToCart, buyAgain, getFavourites, removeFavourite, ApiFavourite } from '@/lib/api';

declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void };
  }
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wishlist'>('orders');
  const [showAddressForm, setShowAddressForm] = useState(false);

  const [addresses, setAddresses] = useState<ApiAddress[]>([]);
  const [loadingAddresses, setLoadingAddresses] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);

  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [favourites, setFavourites] = useState<ApiFavourite[]>([]);
  const [loadingFavourites, setLoadingFavourites] = useState(false);

  const [addressForm, setAddressForm] = useState({
    firstname: '',
    lastname: '',
    phone: '',
    addressline1: '',
    addressline2: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
  });

  const fetchAddresses = async () => {
    setLoadingAddresses(true);
    const data = await getAddresses();
    setAddresses(data);
    setLoadingAddresses(false);
  };

  const fetchOrders = async () => {
    setLoadingOrders(true);
    const data = await getUserOrders();
    setOrders(data);
    setLoadingOrders(false);
  };

  const fetchFavourites = async () => {
    setLoadingFavourites(true);
    const data = await getFavourites();
    setFavourites(data);
    setLoadingFavourites(false);
  };

  useEffect(() => {
    fetchAddresses();
    fetchOrders();
    fetchFavourites();
  }, []);

  const handleBuyAgain = async (order: ApiOrder) => {
    try {
      const res = await buyAgain(order.orderid);
      if (res && res.data) {
        const options = {
          key: "rzp_test_Tee0FU35xhyKoK",
          amount: res.data.totalamount * 100,
          currency: "INR",
          name: "Pooja Store",
          description: "Buy Again Checkout",
          image: "",
          handler: function () {
            alert("Payment successful! Order placed.");
            fetchOrders();
          },
          prefill: {
            name: "Customer",
            email: "",
            contact: "",
          },
          theme: { color: "#D96B27" },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      }
    } catch (e) {
      console.error(e);
      alert("Failed to buy again.");
    }
  };

  const handleSaveAddress = async () => {
    try {
      if (editingAddressId) {
        await editAddress(editingAddressId, addressForm);
      } else {
        await addAddress(addressForm);
      }
      setShowAddressForm(false);
      setEditingAddressId(null);
      fetchAddresses();
    } catch (e) {
      alert("Failed to save address");
    }
  };

  const handleEditClick = (addr: ApiAddress) => {
    setAddressForm({
      firstname: addr.firstname,
      lastname: addr.lastname,
      phone: addr.phone,
      addressline1: addr.addressline1,
      addressline2: addr.addressline2 || '',
      city: addr.city,
      state: addr.state,
      pincode: addr.pincode,
      country: addr.country || 'India',
    });
    setEditingAddressId(addr.addressid);
    setShowAddressForm(true);
  };

  const handleDeleteAddress = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await deleteAddress(id);
        fetchAddresses();
      } catch (e) {
        alert("Failed to delete address");
      }
    }
  };

  // Use mock products for wishlist
  const wishlistProducts = products.slice(1, 4);

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Header />
      <main className="flex-1 bg-ivory py-12">
        <div className="w-full px-6 md:px-12 max-w-7xl mx-auto">

          <h1 className="text-3xl font-serif font-bold text-text-dark mb-8">My Account</h1>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <Card className="sticky top-28 overflow-hidden shadow-sm border-border/60">
                <CardContent className="p-0">
                  <div className="p-6 border-b border-border/50 bg-ivory-section">
                    <div className="flex items-center gap-4 mb-2">
                      <div className="size-12 rounded-full bg-saffron text-white flex items-center justify-center font-bold text-xl">
                        A
                      </div>
                      <div>
                        <p className="font-bold text-lg text-text-dark leading-tight">Arjun Kumar</p>
                        <p className="text-sm text-text-secondary">arjun.k@example.com</p>
                      </div>
                    </div>
                  </div>
                  <nav className="flex flex-col py-2">
                    <button
                      onClick={() => setActiveTab('orders')}
                      className={`flex items-center gap-3 px-6 py-4 text-left transition-colors ${activeTab === 'orders' ? 'text-saffron font-medium bg-saffron/5 border-l-2 border-saffron' : 'text-text-secondary hover:text-saffron hover:bg-ivory-section'}`}
                    >
                      <Package size={18} /> My Orders
                    </button>
                    <button
                      onClick={() => setActiveTab('addresses')}
                      className={`flex items-center gap-3 px-6 py-4 text-left transition-colors ${activeTab === 'addresses' ? 'text-saffron font-medium bg-saffron/5 border-l-2 border-saffron' : 'text-text-secondary hover:text-saffron hover:bg-ivory-section'}`}
                    >
                      <MapPin size={18} /> Saved Addresses
                    </button>
                    <button
                      onClick={() => setActiveTab('wishlist')}
                      className={`flex items-center gap-3 px-6 py-4 text-left transition-colors ${activeTab === 'wishlist' ? 'text-saffron font-medium bg-saffron/5 border-l-2 border-saffron' : 'text-text-secondary hover:text-saffron hover:bg-ivory-section'}`}
                    >
                      <Heart size={18} /> Wishlist
                    </button>
                    <Link href="/" onClick={() => localStorage.clear()} className="flex items-center gap-3 px-6 py-4 text-left text-error hover:bg-error/5 transition-colors mt-4 border-t border-border/50">
                      <LogOut size={18} /> Sign Out
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Content Area */}
            <div className="lg:w-3/4">

              {/* --- Orders Tab --- */}
              {activeTab === 'orders' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-6 flex items-center gap-2">
                    <History size={24} className="text-saffron" /> Order History
                  </h2>

                  {loadingOrders ? (
                    <p className="text-sm text-text-secondary">Loading orders...</p>
                  ) : orders.length === 0 ? (
                    <p className="text-sm text-text-secondary">No orders found.</p>
                  ) : (
                    <div className="flex flex-col gap-5">
                      {orders.map(order => (
                        <Card key={order.orderid} className="shadow-sm border border-border/40 hover:border-saffron/40 hover:shadow-md transition-all duration-300 overflow-hidden bg-white group">
                          <CardContent className="p-0 flex flex-col md:flex-row">
                            
                            {/* Left Area: Items Preview */}
                            <div className="bg-ivory-section/50 p-5 md:w-1/3 border-b md:border-b-0 md:border-r border-border/50 flex flex-col justify-center relative overflow-hidden">
                               <div className="flex -space-x-4 mb-3 relative z-10 pl-2">
                                 {order.orderitems.slice(0, 3).map((item, i) => (
                                   <div key={item.orderitemid} className="size-14 rounded-full border-[3px] border-white shadow-sm overflow-hidden bg-white relative transition-transform group-hover:-translate-y-1" style={{ transitionDelay: `${i * 50}ms` }}>
                                     <img src={`${IMAGE_BASE_URL}${item.productimage}`} alt={item.productname} className="w-full h-full object-cover" />
                                   </div>
                                 ))}
                                 {order.orderitems.length > 3 && (
                                   <div className="size-14 rounded-full border-[3px] border-white shadow-sm bg-ivory flex items-center justify-center text-xs font-bold text-text-secondary relative transition-transform group-hover:-translate-y-1" style={{ transitionDelay: `150ms` }}>
                                     +{order.orderitems.length - 3}
                                   </div>
                                 )}
                               </div>
                               <div className="text-sm font-bold text-text-dark line-clamp-1 px-1">
                                 {order.orderitems[0].productname} 
                                 {order.orderitems.length > 1 && <span className="font-normal text-text-secondary text-xs ml-1">& {order.orderitems.length - 1} more items</span>}
                               </div>
                            </div>
                            
                            {/* Right Area: Details */}
                            <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                               <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                                 <div>
                                   <div className="text-xs text-text-secondary mb-1">
                                     Placed on {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                                   </div>
                                   <div className="font-bold text-lg text-text-dark font-serif tracking-tight">
                                     Order #{order.orderid.slice(0, 8).toUpperCase()}
                                   </div>
                                 </div>
                                 <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start w-full sm:w-auto">
                                   <div className={`px-2.5 py-1 text-[10px] sm:text-xs font-bold rounded-md flex items-center gap-1.5 uppercase tracking-wider ${getStatusBadgeStyles(order.orderstatus)}`}>
                                     {getStatusIcon(order.orderstatus)} {order.orderstatus}
                                   </div>
                                   <div className="font-bold text-text-dark sm:mt-2 text-base sm:text-lg">
                                     ₹{order.totalamount}
                                   </div>
                                 </div>
                               </div>
                               
                               <div className="flex flex-col sm:flex-row gap-3 mt-auto pt-5 border-t border-border/40 w-full">
                                 <Button variant="outline" size="sm" className="w-full sm:w-auto sm:flex-1 h-10 font-bold" asChild>
                                   <Link href={`/orders/${order.orderid}`}>View Details & Track</Link>
                                 </Button>
                                 <Button size="sm" className="w-full sm:w-auto sm:flex-1 h-10 font-bold" onClick={() => handleBuyAgain(order)}>Buy Again</Button>
                               </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* --- Addresses Tab --- */}
              {activeTab === 'addresses' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold text-text-dark flex items-center gap-2">
                      <MapPin size={24} className="text-saffron" /> Saved Addresses
                    </h2>
                    {!showAddressForm && (
                      <Button onClick={() => setShowAddressForm(true)} size="sm" className="gap-2">
                        <Plus size={16} /> Add New
                      </Button>
                    )}
                  </div>

                  {showAddressForm ? (
                    <Card className="shadow-sm border-border/60 animate-in slide-in-from-bottom-4 duration-300">
                      <CardContent className="p-8">
                        <h3 className="font-serif font-bold text-xl text-text-dark mb-6">{editingAddressId ? "Edit Delivery Address" : "Add New Delivery Address"}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">First Name</label>
                            <Input
                              placeholder="Arjun"
                              className="bg-ivory-section"
                              value={addressForm.firstname}
                              onChange={(e) => setAddressForm({ ...addressForm, firstname: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">Last Name</label>
                            <Input
                              placeholder="Kumar"
                              className="bg-ivory-section"
                              value={addressForm.lastname}
                              onChange={(e) => setAddressForm({ ...addressForm, lastname: e.target.value })}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">Phone Number</label>
                            <Input
                              placeholder="9876543210"
                              className="bg-ivory-section"
                              value={addressForm.phone}
                              onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">Address Line 1</label>
                            <Input
                              placeholder="House/Flat No., Building Name"
                              className="bg-ivory-section"
                              value={addressForm.addressline1}
                              onChange={(e) => setAddressForm({ ...addressForm, addressline1: e.target.value })}
                            />
                          </div>
                          <div className="md:col-span-2">
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">Address Line 2 (Optional)</label>
                            <Input
                              placeholder="Street, Landmark"
                              className="bg-ivory-section"
                              value={addressForm.addressline2}
                              onChange={(e) => setAddressForm({ ...addressForm, addressline2: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">City</label>
                            <Input
                              placeholder="City"
                              className="bg-ivory-section"
                              value={addressForm.city}
                              onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">State</label>
                            <Input
                              placeholder="State"
                              className="bg-ivory-section"
                              value={addressForm.state}
                              onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-text-dark mb-1.5">PIN Code</label>
                            <Input
                              placeholder="123456"
                              className="bg-ivory-section"
                              value={addressForm.pincode}
                              onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="flex gap-3 mt-8">
                          <Button variant="outline" onClick={() => { setShowAddressForm(false); setEditingAddressId(null); }}>Cancel</Button>
                          <Button onClick={handleSaveAddress}>Save Address</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {loadingAddresses ? (
                        <p className="text-sm text-text-secondary">Loading addresses...</p>
                      ) : addresses.length === 0 ? (
                        <p className="text-sm text-text-secondary">No saved addresses found.</p>
                      ) : (
                        addresses.map((addr) => (
                          <Card key={addr.addressid} className="shadow-sm border-border/60 hover:border-saffron/30 transition-colors">
                            <CardContent className="p-6">
                              <h4 className="font-bold text-lg text-text-dark mb-1">{addr.firstname} {addr.lastname}</h4>
                              <p className="text-text-secondary text-sm leading-relaxed mb-4">
                                {addr.addressline1}<br />
                                {addr.addressline2 && <>{addr.addressline2}<br /></>}
                                {addr.city}, {addr.state} {addr.pincode}<br />
                                {addr.country}<br />
                                Phone: {addr.phone}
                              </p>
                              <div className="flex gap-4 pt-4 border-t border-border/50">
                                <button onClick={() => handleEditClick(addr)} className="text-sm font-medium text-saffron flex items-center gap-1 hover:underline">
                                  <Edit2 size={14} /> Edit
                                </button>
                                <button onClick={() => handleDeleteAddress(addr.addressid)} className="text-sm font-medium text-text-secondary flex items-center gap-1 hover:text-error hover:underline transition-colors">
                                  <Trash2 size={14} /> Delete
                                </button>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* --- Wishlist Tab --- */}
              {activeTab === 'wishlist' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                  <h2 className="text-2xl font-serif font-bold text-text-dark mb-6 flex items-center gap-2">
                    <Heart size={24} className="text-saffron fill-saffron/20" /> My Wishlist
                  </h2>

                  {loadingFavourites ? (
                    <p className="text-sm text-text-secondary">Loading wishlist...</p>
                  ) : favourites.length === 0 ? (
                    <p className="text-sm text-text-secondary">Your wishlist is empty.</p>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                      {favourites.map((fav) => (
                        <Card key={fav.favouriteid} className="relative flex flex-col cursor-pointer overflow-hidden border-border/40 hover:border-saffron/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                          <div className="absolute top-3 right-3 z-30">
                            <button 
                              onClick={async (e) => {
                                e.stopPropagation();
                                try {
                                  await removeFavourite(fav.favouriteid);
                                  fetchFavourites();
                                } catch (error) {
                                  alert("Failed to remove from wishlist");
                                }
                              }}
                              className="p-2 bg-white/80 backdrop-blur rounded-full text-error hover:bg-error hover:text-white transition-colors shadow-sm"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                          <div className="relative h-48 w-full overflow-hidden bg-ivory-section">
                            <img
                              src={`${IMAGE_BASE_URL}${fav.thumbnailimage}`}
                              alt={fav.productname}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                          </div>
                          <CardContent className="p-5 flex flex-col flex-1 bg-white">
                            <div className="flex items-center gap-1 mb-2">
                              <Star size={14} className="fill-gold text-gold" />
                              <span className="text-sm font-medium text-text-dark">4.5</span>
                            </div>
                            <Link href={`/products/${fav.productid}`} className="hover:text-saffron transition-colors before:absolute before:inset-0 before:z-10">
                              <h3 className="font-serif font-bold text-lg text-text-dark mb-1 line-clamp-1">{fav.productname}</h3>
                            </Link>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                              <div className="flex flex-col">
                                <div className="flex items-center font-bold text-lg text-text-dark">
                                  <IndianRupee size={16} strokeWidth={2.5} />
                                  {fav.sellingprice}
                                </div>
                              </div>
                              <Link href={`/products/${fav.productid}`} className="relative z-20">
                                <Button size="sm" className="gap-1.5 shadow-md">
                                  <ShoppingCart size={14} /> Cart
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}

            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
