import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { websiteConfig } from "@/data/website-config";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, MessageSquare, Truck, Store, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
    totalMrp,
    totalSavings,
  } = useCart();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: "",
    deliveryType: "delivery", // 'delivery' or 'pickup'
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  const handleWhatsAppCheckout = (e) => {
    e.preventDefault();

    if (!customer.name.trim() || !customer.phone.trim()) {
      toast.error("Please enter your name and phone number");
      return;
    }

    if (customer.deliveryType === "delivery" && !customer.address.trim()) {
      toast.error("Please enter your delivery address in Ranchi / Jharkhand");
      return;
    }

    setIsSubmitting(true);

    const itemsText = cart
      .map(
        (item, idx) =>
          `${idx + 1}. *${item.name}* ${item.spec ? `(${item.spec})` : ""}\n   Qty: ${item.quantity} × ${formatINR(item.price)} = *${formatINR(item.price * item.quantity)}*`
      )
      .join("\n\n");

    const message = `*🛍️ NEW ORDER FROM SUNAURA CO.IN*
---------------------------------------
*Customer Details:*
• *Name:* ${customer.name.trim()}
• *Phone:* ${customer.phone.trim()}
• *Order Type:* ${customer.deliveryType === "delivery" ? "🚀 Express Home Delivery" : "🏬 Store Pickup (Bajra Itki Rd, Ranchi)"}
${customer.deliveryType === "delivery" ? `• *Address:* ${customer.address.trim()}` : ""}
${customer.notes.trim() ? `• *Note:* ${customer.notes.trim()}` : ""}

*ORDERED ITEMS (${totalItems} items):*
${itemsText}

---------------------------------------
• *Total MRP:* ${formatINR(totalMrp)}
• *Your Discounted Price:* *${formatINR(totalPrice)}*
${totalSavings > 0 ? `• *You Save:* ${formatINR(totalSavings)} 🎉` : ""}
• *Delivery Fee:* FREE (Ranchi City)
• *Payment:* Cash on Delivery / UPI at Delivery

Please confirm stock availability and dispatch time. Thank you!`;

    const whatsappNumber = websiteConfig.settings.whatsapp_number || "919204418515";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
    toast.success("Redirecting to WhatsApp to complete your order!");
    setIsSubmitting(false);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-white shadow-2xl flex flex-col justify-between">
          {/* Drawer Header */}
          <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Your Order Cart</h2>
                <p className="text-xs text-gray-300">
                  {totalItems === 0
                    ? "Cart is currently empty"
                    : `${totalItems} ${totalItems === 1 ? "item" : "items"} selected`}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Your Cart is Empty</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs mx-auto">
                  Browse our range of authorized Racold storage and instant geysers.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-3 bg-red-600 text-white font-semibold rounded-xl hover:bg-red-700 transition-colors inline-flex items-center gap-2"
                >
                  <span>Start Exploring Products</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                {/* Savings Callout */}
                {totalSavings > 0 && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-3.5 flex items-center gap-3 text-emerald-800 text-xs font-semibold">
                    <span className="text-lg">🎉</span>
                    <span>
                      You are saving <strong>{formatINR(totalSavings)}</strong> on this direct distributor order!
                    </span>
                  </div>
                )}

                {/* Items List */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span>Products ({totalItems})</span>
                    <button
                      onClick={clearCart}
                      className="text-red-600 hover:underline normal-case text-xs font-semibold"
                    >
                      Clear All
                    </button>
                  </div>

                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-4 rounded-2xl border border-gray-100 bg-slate-50/50 hover:bg-white hover:border-gray-200 transition-all"
                    >
                      {/* Product Thumbnail */}
                      <div className="w-20 h-20 bg-white rounded-xl border border-gray-200 flex-shrink-0 p-1 flex items-center justify-center overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      {/* Product Info & Controls */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm leading-tight">
                              {item.name}
                            </h4>
                            {item.spec && (
                              <span className="text-[11px] text-gray-500 font-medium">
                                {item.spec}
                              </span>
                            )}
                          </div>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-400 hover:text-red-600 p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-black text-gray-900 text-base">
                              {formatINR(item.price * item.quantity)}
                            </span>
                            {item.quantity > 1 && (
                              <span className="text-xs text-gray-400">
                                ({formatINR(item.price)} each)
                              </span>
                            )}
                          </div>

                          {/* Quantity Counter */}
                          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-500 hover:text-red-600 hover:bg-gray-100 rounded"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-xs font-bold w-4 text-center text-gray-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-500 hover:text-emerald-600 hover:bg-gray-100 rounded"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Customer Checkout Form */}
                <form onSubmit={handleWhatsAppCheckout} id="cart-checkout-form" className="pt-4 border-t border-gray-200 space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                    Customer & Delivery Information
                  </h3>

                  {/* Delivery Type Option */}
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setCustomer({ ...customer, deliveryType: "delivery" })}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        customer.deliveryType === "delivery"
                          ? "border-red-600 bg-red-50/50 text-red-950 font-bold"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <Truck className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs">Ranchi Home Delivery</p>
                        <p className="text-[10px] text-gray-500 font-normal">Direct to doorstep</p>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setCustomer({ ...customer, deliveryType: "pickup" })}
                      className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                        customer.deliveryType === "pickup"
                          ? "border-red-600 bg-red-50/50 text-red-950 font-bold"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      <Store className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs">Store Pickup</p>
                        <p className="text-[10px] text-gray-500 font-normal">Bajra Itki Rd, Ranchi</p>
                      </div>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.name}
                        onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={customer.phone}
                        onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>
                  </div>

                  {customer.deliveryType === "delivery" && (
                    <div>
                      <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                        Delivery Address in Ranchi / Jharkhand *
                      </label>
                      <input
                        type="text"
                        required
                        value={customer.address}
                        onChange={(e) => setCustomer({ ...customer, address: e.target.value })}
                        placeholder="e.g. House 12, Kanke Road, near CMPDI, Ranchi"
                        className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase mb-1">
                      Instructions / Notes (Optional)
                    </label>
                    <input
                      type="text"
                      value={customer.notes}
                      onChange={(e) => setCustomer({ ...customer, notes: e.target.value })}
                      placeholder="e.g. Need installation assistance or deliver after 5 PM"
                      className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                    />
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Drawer Footer / Checkout CTA */}
          {cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-gray-200 space-y-4">
              {/* Order Bill Breakdown */}
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Total MRP</span>
                  <span className="line-through text-gray-400">{formatINR(totalMrp)}</span>
                </div>
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Authorized Discount</span>
                    <span>- {formatINR(totalSavings)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery (Ranchi Area)</span>
                  <span className="text-emerald-700 font-bold uppercase">FREE</span>
                </div>
                <div className="flex justify-between text-base font-black text-gray-900 pt-2 border-t border-gray-200">
                  <span>Final Payable</span>
                  <span className="text-red-600">{formatINR(totalPrice)}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="submit"
                form="cart-checkout-form"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-base shadow-xl shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Place Order via WhatsApp</span>
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Genuine Racold Authorized • Pay upon Delivery / Verification</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
