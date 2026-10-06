import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { sareeConfig } from "@/data/saree-config";
import {
  Sparkles,
  ShoppingBag,
  MessageSquare,
  Check,
  Truck,
  Eye,
  X
} from "lucide-react";

export default function SareeCatalog() {
  const { categories, settings } = sareeConfig;
  const { cart, addToCart, setIsCartOpen } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeModalProduct, setActiveModalProduct] = useState(null);

  const allProducts = categories.flatMap((cat) =>
    cat.products.map((p) => ({ ...p, categoryName: cat.name, categoryId: cat.id }))
  );

  const filteredProducts =
    selectedCategory === "all"
      ? allProducts
      : allProducts.filter((p) => p.categoryId === selectedCategory);

  const formatINR = (val) => {
    if (!val) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getSareeWhatsAppUrl = (product) => {
    const text = `Hello Surat Saree Factory! I would like to order this saree:
🥻 *Saree:* ${product.name}
🧵 *Fabric:* ${product.fabric}
🎨 *Color:* ${product.color}
💰 *Factory Price:* ${formatINR(product.price)} (Showroom MRP: ${formatINR(product.mrp)})
📐 *Spec:* ${product.spec}

Please confirm stock and arrange same-day delivery / fabric inspection to my Ranchi address.`;

    return `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(text)}`;
  };

  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      brand: "Surat Saree Factory",
      price: product.price,
      image: product.image,
      spec: `${product.fabric} • ${product.spec}`,
    });
    setIsCartOpen(true);
  };

  return (
    <section id="saree-catalog" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>Surat Mill Direct Catalogue</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Explore Saree Collections
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Hand-curated sarees directly from Surat looms with same-day doorstep inspection in Ranchi.
          </p>
        </div>

        {/* Fabric Category Filter Tabs */}
        <div className="flex justify-center mb-10 overflow-x-auto scrollbar-hide py-1">
          <div className="inline-flex p-1 bg-gray-200/80 rounded-2xl shadow-inner max-w-full">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                selectedCategory === "all"
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              All Sarees ({allProducts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id
                    ? "bg-rose-600 text-white shadow-md shadow-rose-600/30"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* 3:4 Portrait Saree Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const inCart = isProductInCart(product.id);
            const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                {/* Image Container with 3:4 Aspect Ratio */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    {product.badge && (
                      <span className="px-2.5 py-0.5 bg-rose-600 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md shadow-sm">
                        {product.badge}
                      </span>
                    )}
                    <span className="px-2 py-0.5 bg-white/95 backdrop-blur-md text-gray-900 text-[10px] font-bold rounded-md shadow-sm">
                      {product.categoryName}
                    </span>
                  </div>

                  {/* Quick View Button on Hover */}
                  <button
                    type="button"
                    onClick={() => setActiveModalProduct(product)}
                    className="absolute bottom-3 right-3 bg-white/95 hover:bg-white text-gray-900 p-2 rounded-xl shadow-md transition-all flex items-center gap-1.5 text-xs font-bold opacity-90 group-hover:opacity-100"
                    aria-label="Quick View Saree"
                  >
                    <Eye className="w-3.5 h-3.5 text-rose-600" />
                    <span>Quick View</span>
                  </button>
                </div>

                {/* Saree Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 leading-snug line-clamp-2 mb-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-rose-600 font-semibold mb-1 line-clamp-1">
                      🧵 {product.fabric}
                    </p>
                    <p className="text-[11px] text-gray-500 mb-2">
                      🎨 Color: {product.color}
                    </p>

                    {/* Pricing */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-base font-black text-gray-900">
                        {formatINR(product.price)}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {formatINR(product.mrp)}
                      </span>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded">
                        {discount}% OFF
                      </span>
                    </div>

                    <div className="text-[11px] text-gray-500 flex items-center gap-1 mb-3 bg-slate-50 p-1.5 rounded-lg">
                      <Truck className="w-3 h-3 text-red-500 flex-shrink-0" />
                      <span className="truncate">Ranchi Same-Day Delivery • COD</span>
                    </div>
                  </div>

                  {/* CTAs */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className={`py-2 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all shadow-sm ${
                        inCart
                          ? "bg-emerald-600 text-white"
                          : "bg-slate-900 hover:bg-slate-800 text-white"
                      }`}
                    >
                      {inCart ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>In Bag</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 text-rose-400" />
                          <span>Add to Bag</span>
                        </>
                      )}
                    </button>

                    <a
                      href={getSareeWhatsAppUrl(product)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2 px-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick View Detail Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl relative border border-gray-200 animate-scale">
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white p-2 rounded-full shadow-md text-gray-700"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-[3/4] bg-gray-100 overflow-hidden relative">
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider bg-rose-50 px-2 py-0.5 rounded-md">
                    Surat Direct Mill Weave
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mt-2 mb-1">
                    {activeModalProduct.name}
                  </h3>
                  <p className="text-xs font-semibold text-gray-700 mb-1">
                    Fabric: {activeModalProduct.fabric}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Color: {activeModalProduct.color}
                  </p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-xl font-black text-gray-900">
                      {formatINR(activeModalProduct.price)}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      {formatINR(activeModalProduct.mrp)}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                      Save {formatINR(activeModalProduct.mrp - activeModalProduct.price)}
                    </span>
                  </div>

                  <div className="space-y-1.5 mb-4 text-xs text-gray-600">
                    <p className="font-semibold text-gray-800">Highlights:</p>
                    {activeModalProduct.features?.map((f, i) => (
                      <p key={i} className="flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                        <span>{f}</span>
                      </p>
                    ))}
                  </div>

                  <p className="text-[11px] text-gray-500 bg-slate-50 p-2 rounded-lg">
                    📦 Dimension: {activeModalProduct.spec}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      handleAddToCart(activeModalProduct);
                      setActiveModalProduct(null);
                    }}
                    className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <ShoppingBag className="w-4 h-4 text-rose-400" />
                    <span>Add to Bag</span>
                  </button>

                  <a
                    href={getSareeWhatsAppUrl(activeModalProduct)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Order on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
