import { useState, useEffect } from "react";
import { Menu, X, Phone, MessageSquare, ShoppingBag, Sparkles } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { websiteConfig } from "@/data/website-config";
import { sareeConfig } from "@/data/saree-config";
import { useCart } from "@/context/CartContext";
import StoreSwitcher from "@/components/StoreSwitcher";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems, setIsCartOpen } = useCart();

  const isSareeStore = location.pathname.startsWith("/sarees");
  const activeConfig = isSareeStore ? sareeConfig : websiteConfig;
  const { settings } = activeConfig;

  const scrollToSection = (id) => {
    const targetPath = isSareeStore ? '/sarees' : '/';
    if (location.pathname !== targetPath) {
      navigate(targetPath, { state: { scrollTo: id } });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsOpen(false);
  };

  useEffect(() => {
    const targetPath = isSareeStore ? '/sarees' : '/';
    if (location.pathname === targetPath && location.state?.scrollTo) {
      const id = location.state.scrollTo;
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          window.history.replaceState({}, document.title);
        }
      }, 100);
    }
  }, [location, isSareeStore]);

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50 transition-all">
      {/* Top Flipkart-Style Multi-Store Switcher */}
      <StoreSwitcher />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          {/* Brand Logo & Name */}
          <Link to={isSareeStore ? "/sarees" : "/"} className="flex items-center gap-3">
            <img
              src="/assets/sunaura logo.jpeg"
              alt="SunAura & Surat Saree Factory"
              className="h-10 w-10 sm:h-13 sm:w-13 rounded-xl shadow-sm object-contain border border-gray-100"
            />
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {isSareeStore ? "Surat Saree Factory" : "SunAura"}
              </h1>
              {isSareeStore && (
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold">
                  <Sparkles className="w-3 h-3" /> Surat Direct
                </span>
              )}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-7">
            {isSareeStore ? (
              <>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-700 hover:text-rose-600 font-medium transition-colors text-sm"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('saree-catalog')}
                  className="text-gray-700 hover:text-rose-600 font-medium transition-colors text-sm"
                >
                  Saree Collections
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-rose-600 font-medium transition-colors text-sm"
                >
                  Order on WhatsApp
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => scrollToSection('home')}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('products')}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection('sizing-calculator')}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm"
                >
                  Capacity Sizer
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-gray-700 hover:text-red-600 font-medium transition-colors text-sm"
                >
                  Store & Contact
                </button>
              </>
            )}
          </div>

          {/* Cart & WhatsApp CTAs */}
          <div className="flex items-center gap-3">
            {/* Cart Button with Count Badge */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 transition-colors"
              aria-label="View Cart"
            >
              <ShoppingBag className="w-5 h-5 text-gray-800" />
              {totalItems > 0 && (
                <span className={`absolute -top-1.5 -right-1.5 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md ${
                  isSareeStore ? 'bg-rose-600' : 'bg-red-600'
                }`}>
                  {totalItems}
                </span>
              )}
            </button>

            <a
              href={`tel:${settings.phone}`}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-gray-900 transition-colors"
            >
              <Phone className="w-4 h-4 text-red-600" />
              <span>{settings.phone}</span>
            </a>

            <a
              href={`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(
                isSareeStore
                  ? 'Hi Surat Saree Factory, I want to inquire about latest saree designs with Ranchi home delivery.'
                  : 'Hi SunAura, I need assistance with Racold water heaters.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden sm:flex items-center gap-2 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all hover:shadow hover:-translate-y-0.5 ${
                isSareeStore ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-gray-100 text-gray-700"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl">
          <div className="px-4 py-4 space-y-2 text-sm">
            {isSareeStore ? (
              <>
                <button
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('saree-catalog')}
                  className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-medium"
                >
                  Saree Collections
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-rose-50 hover:text-rose-600 rounded-xl font-medium"
                >
                  Store Location & Contact
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => scrollToSection('home')}
                  className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection('products')}
                  className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium"
                >
                  Racold Products
                </button>
                <button
                  onClick={() => scrollToSection('sizing-calculator')}
                  className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium"
                >
                  Capacity Sizer
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium"
                >
                  Turnkey Projects
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="block w-full text-left px-4 py-2.5 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-xl font-medium"
                >
                  Store Location & Contact
                </button>
              </>
            )}

            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setIsCartOpen(true);
                }}
                className="flex items-center justify-center gap-2 bg-slate-900 text-white font-semibold py-2.5 rounded-xl text-xs"
              >
                <ShoppingBag className="w-4 h-4 text-rose-400" />
                <span>Open Cart ({totalItems} items)</span>
              </button>

              <a
                href={`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent('Hi, I need assistance with an order.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-center gap-2 text-white font-semibold py-2.5 rounded-xl text-xs ${
                  isSareeStore ? 'bg-rose-600' : 'bg-emerald-600'
                }`}
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
