import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductsContext";
import { ArrowLeft, Package, MessageSquare, Check, Truck, ShieldCheck, ShoppingBag } from "lucide-react";

export default function CategoryProducts() {
    const { categoryId } = useParams();
    const { categories, settings } = useProducts();
    const { cart, addToCart, setIsCartOpen } = useCart();

    const category = categories.find((c) => c.id === categoryId);

    if (!category) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow flex items-center justify-center py-32">
                    <div className="text-center px-4">
                        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Category Not Found</h1>
                        <p className="text-gray-600 mb-6">The category you are looking for does not exist or has been relocated.</p>
                        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold shadow hover:bg-red-700 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Return to Home</span>
                        </Link>
                    </div>
                </main>
                <Footer settings={settings} />
            </div>
        );
    }

    const formatINR = (val) => {
        if (!val) return "";
        return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(val);
    };

    const getWhatsAppUrl = (product) => {
        const message = `Hello SunAura! I am interested in ordering/inquiring about:
*Product:* ${product.name}
*Brand:* ${product.brand || category.brand}
*Category:* ${category.name}
*Price:* ${product.price ? formatINR(product.price) : 'Quote on request'}
${product.spec ? `*Specification:* ${product.spec}` : ''}

Please confirm availability and delivery to my location in Ranchi / Jharkhand.`;

        return `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(message)}`;
    };

    const getItemQuantityInCart = (productId) => {
        const item = cart.find((i) => i.id === productId);
        return item ? item.quantity : 0;
    };

    return (
        <div className="min-h-screen flex flex-col bg-slate-50 scroll-smooth">
            <Navbar />
            
            <main className="flex-grow pt-28">
                {/* Category Hero Banner */}
                <section className="bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <Link to="/" className="text-gray-400 hover:text-white mb-6 inline-flex items-center gap-2 text-sm font-medium transition-colors">
                            <ArrowLeft className="w-4 h-4" />
                            <span>Back to All Categories</span>
                        </Link>

                        <div className="flex flex-wrap items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-red-600/90 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                                {category.brand}
                            </span>
                            {category.department === "water-heating" && (
                                <span className="px-3 py-1 bg-white/10 text-gray-300 text-xs font-semibold rounded-full flex items-center gap-1">
                                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Authorized Distributor
                                </span>
                            )}
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-black mb-4 tracking-tight">{category.name}</h1>
                        <p className="text-lg sm:text-xl text-gray-300 max-w-3xl leading-relaxed">
                            {category.tagline || `Explore our high efficiency ${category.name.toLowerCase()} solutions with authorized warranty and local Ranchi installation.`}
                        </p>
                    </div>
                </section>

                {/* Subcategory / Navigation Bar */}
                <div className="sticky top-28 bg-white border-b border-gray-200 z-30 shadow-sm overflow-x-auto whitespace-nowrap scrollbar-hide">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex space-x-6 py-4">
                            {categories.map((cat) => (
                                <Link
                                    key={cat.id}
                                    to={`/category/${cat.id}`}
                                    className={`text-sm font-semibold transition-all px-3 py-1.5 rounded-lg ${cat.id === categoryId
                                        ? "bg-red-50 text-red-600"
                                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                                        }`}
                                >
                                    {cat.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Products Grid */}
                <section className="py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {!category.products || category.products.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl border border-gray-200">
                                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">Updating Catalog</h2>
                                <p className="text-gray-600 max-w-md mx-auto mb-6">
                                    New models for {category.name} are currently being added. Contact us directly for immediate stock and wholesale inquiries.
                                </p>
                                <a
                                    href={`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(`Hi SunAura, I want to ask about ${category.name} models.`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold shadow hover:bg-emerald-700"
                                >
                                    <MessageSquare className="w-5 h-5" />
                                    <span>Ask on WhatsApp</span>
                                </a>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {category.products.map((product) => {
                                    const discountPercent = product.mrp && product.price
                                        ? Math.round(((product.mrp - product.price) / product.mrp) * 100)
                                        : null;

                                    const qtyInCart = getItemQuantityInCart(product.id || product.name);

                                    return (
                                        <div
                                            key={product.id || product.name}
                                            className="bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden hover:-translate-y-1"
                                        >
                                            {/* Product Image Area */}
                                            <div className="h-64 overflow-hidden relative bg-slate-100 flex items-center justify-center p-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    loading="lazy"
                                                    className="max-h-full max-w-full object-contain transition-transform duration-500 hover:scale-105"
                                                />
                                                
                                                {/* Top Badges */}
                                                <div className="absolute top-3.5 left-3.5 flex flex-col gap-1.5">
                                                    {discountPercent && (
                                                        <span className="bg-red-600 text-white text-[11px] font-extrabold px-2.5 py-1 rounded-lg shadow-sm">
                                                            {discountPercent}% OFF
                                                        </span>
                                                    )}
                                                    {product.fast_delivery && (
                                                        <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-sm flex items-center gap-1">
                                                            <Truck className="w-3 h-3" /> Ranchi Fast Delivery
                                                        </span>
                                                    )}
                                                </div>

                                                {product.in_stock && (
                                                    <span className="absolute top-3.5 right-3.5 bg-white/95 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm border border-emerald-200 flex items-center gap-1">
                                                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                                        In Stock
                                                    </span>
                                                )}
                                            </div>

                                            {/* Product Details */}
                                            <div className="p-6 flex flex-col flex-grow justify-between">
                                                <div>
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <h3 className="text-xl font-bold text-gray-900 leading-snug">
                                                            {product.name}
                                                        </h3>
                                                    </div>

                                                    {product.spec && (
                                                        <div className="inline-block px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-lg mb-4">
                                                            {product.spec}
                                                        </div>
                                                    )}

                                                    {/* Price Display */}
                                                    {product.price && (
                                                        <div className="flex items-baseline gap-2.5 mb-5">
                                                            <span className="text-2xl font-black text-gray-900">
                                                                {formatINR(product.price)}
                                                            </span>
                                                            {product.mrp && (
                                                                <span className="text-sm text-gray-400 line-through">
                                                                    {formatINR(product.mrp)}
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Bullet Features */}
                                                    <ul className="space-y-2 mb-6">
                                                        {product.features && product.features.map((feature, fIndex) => (
                                                            <li key={fIndex} className="flex items-start space-x-2 text-sm text-gray-600">
                                                                <Check className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                                                                <span className="leading-snug">{feature}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>

                                                {/* Action Buttons: Cart & WhatsApp */}
                                                <div className="pt-4 border-t border-gray-100 flex flex-col gap-2.5">
                                                    {!product.is_project ? (
                                                        <>
                                                            <div className="grid grid-cols-2 gap-2">
                                                                <button
                                                                    onClick={() => {
                                                                        addToCart(product);
                                                                    }}
                                                                    className="py-3 px-3 bg-slate-900 hover:bg-black text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                                                                >
                                                                    <ShoppingBag className="w-4 h-4 text-red-400" />
                                                                    <span>{qtyInCart > 0 ? `In Cart (${qtyInCart})` : "Add to Cart"}</span>
                                                                </button>

                                                                <button
                                                                    onClick={() => {
                                                                        addToCart(product);
                                                                        setIsCartOpen(true);
                                                                    }}
                                                                    className="py-3 px-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md shadow-red-600/20"
                                                                >
                                                                    <span>Buy Now</span>
                                                                </button>
                                                            </div>

                                                            <a
                                                                href={getWhatsAppUrl(product)}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="w-full py-2.5 px-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 border border-emerald-200 transition-colors"
                                                            >
                                                                <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                                                                <span>Quick WhatsApp Inquiry</span>
                                                            </a>
                                                        </>
                                                    ) : (
                                                        <a
                                                            href={getWhatsAppUrl(product)}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="w-full py-3.5 px-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-600/20 transition-all"
                                                        >
                                                            <MessageSquare className="w-4 h-4" />
                                                            <span>Request Project Proposal</span>
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                </section>

                <Contact settings={settings} />
            </main>

            <Footer settings={settings} />
        </div>
    );
}
