import { useCart } from "@/context/CartContext";
import { ShoppingBag } from "lucide-react";

export default function FloatingCartButton() {
  const { totalItems, totalPrice, setIsCartOpen } = useCart();

  if (totalItems === 0) return null;

  const formatINR = (val) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val || 0);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 animate-bounce-subtle">
      <button
        onClick={() => setIsCartOpen(true)}
        className="flex items-center gap-3 bg-slate-900 hover:bg-black text-white px-5 py-3.5 rounded-full shadow-2xl border-2 border-red-500/80 transition-all hover:scale-105 group"
        aria-label="Open Shopping Cart"
      >
        <div className="relative">
          <ShoppingBag className="w-6 h-6 text-red-400 group-hover:text-red-300 transition-colors" />
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
            {totalItems}
          </span>
        </div>

        <div className="text-left pr-1">
          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none">View Cart</p>
          <p className="text-sm font-black text-white leading-tight">{formatINR(totalPrice)}</p>
        </div>
      </button>
    </div>
  );
}
