import { useState, useMemo } from "react";
import { useProducts } from "@/context/ProductsContext";
import { Link } from "react-router-dom";
import {
  Lock,
  LogOut,
  Search,
  Plus,
  Trash2,
  Edit2,
  X,
  Package,
  ArrowLeft,
  Sparkles,
  Flame,
  Tag,
  Download,
  Copy,
  RotateCcw,
  SlidersHorizontal,
  CheckCircle2,
  Eye,
  ShieldCheck
} from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const {
    // Racold State & Actions
    categories,
    settings,
    toggleStock,
    updateProduct,
    addProduct,
    deleteProduct,

    // Saree State & Actions
    sareeCategories,
    sareeSettings,
    toggleSareeStock,
    updateSaree,
    addSaree,
    deleteSaree,

    // Universal Actions
    applyBulkDiscount,
    resetToDefault,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
  } = useProducts();

  // Active Store: 'racold' | 'saree'
  const [activeStore, setActiveStore] = useState("racold");

  // Auth & Filters
  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all"); // 'all', 'in_stock', 'out_of_stock'

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isBulkDiscountModalOpen, setIsBulkDiscountModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // { store, categoryId, product }

  // Bulk Discount Form State
  const [bulkDiscountCategory, setBulkDiscountCategory] = useState("all");
  const [bulkDiscountPercent, setBulkDiscountPercent] = useState(15);

  // New Racold Product Form State
  const [newRacoldProduct, setNewRacoldProduct] = useState({
    categoryId: categories[0]?.id || "storage-geyser",
    name: "",
    brand: "Racold",
    spec: "",
    mrp: "",
    price: "",
    discountPercent: "",
    free_installation: true,
    free_pipe: true,
    in_stock: true,
    fast_delivery: true,
    is_project: false,
    image: "/assets/product category/Storage Geyser/Omnis slim wifi.jpeg",
    featuresStr: "Titanium Plus Technology, Safety Plus 8 Bar, Free Installation Included",
  });

  // New Saree Form State
  const [newSareeProduct, setNewSareeProduct] = useState({
    categoryId: sareeCategories[0]?.id || "silk-sarees",
    name: "",
    fabric: "Pure Katan Silk",
    color: "Festive Crimson Red",
    spec: "5.5m Saree + 0.8m Blouse Piece",
    badge: "Surat Mill Direct",
    mrp: "",
    price: "",
    discountPercent: "",
    in_stock: true,
    image: "/assets/sarees/saree-hero-1.jpeg",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginAdmin(password);
  };

  // 1. Current Store Data Aggregation
  const currentCategories = activeStore === "racold" ? categories : sareeCategories;

  const allProducts = useMemo(() => {
    if (activeStore === "racold") {
      return (categories || []).flatMap((cat) =>
        (cat.products || []).map((prod) => ({
          ...prod,
          store: "racold",
          categoryId: cat.id,
          categoryName: cat.name,
        }))
      );
    } else {
      return (sareeCategories || []).flatMap((cat) =>
        (cat.products || []).map((saree) => ({
          ...saree,
          store: "saree",
          categoryId: cat.id,
          categoryName: cat.name,
        }))
      );
    }
  }, [activeStore, categories, sareeCategories]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((p) => {
      const q = searchQuery.toLowerCase();
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        (p.spec && p.spec.toLowerCase().includes(q)) ||
        (p.fabric && p.fabric.toLowerCase().includes(q)) ||
        (p.color && p.color.toLowerCase().includes(q)) ||
        (p.brand && p.brand.toLowerCase().includes(q));

      const matchesCategory =
        selectedCategoryFilter === "all" || p.categoryId === selectedCategoryFilter;

      const isStockTrue = p.in_stock !== false;
      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "in_stock" && isStockTrue) ||
        (stockFilter === "out_of_stock" && !isStockTrue);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [allProducts, searchQuery, selectedCategoryFilter, stockFilter]);

  // KPIs
  const totalInStock = allProducts.filter((p) => p.in_stock !== false).length;
  const totalOutOfStock = allProducts.filter((p) => p.in_stock === false).length;

  const formatINR = (val) => {
    if (!val) return "Quote";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  // --- TWO-WAY DISCOUNT CALCULATION HELPERS ---
  const handleMrpChange = (val, state, setState) => {
    const mrp = Number(val);
    const disc = Number(state.discountPercent);
    if (!isNaN(mrp) && mrp > 0 && !isNaN(disc) && disc > 0) {
      const price = Math.round(mrp * (1 - disc / 100));
      setState({ ...state, mrp: val, price });
    } else if (!isNaN(mrp) && mrp > 0 && state.price) {
      const price = Number(state.price);
      const discountPercent = Math.round(((mrp - price) / mrp) * 100);
      setState({ ...state, mrp: val, discountPercent });
    } else {
      setState({ ...state, mrp: val });
    }
  };

  const handlePriceChange = (val, state, setState) => {
    const price = Number(val);
    const mrp = Number(state.mrp);
    if (!isNaN(mrp) && mrp > 0 && !isNaN(price)) {
      const discountPercent = Math.round(((mrp - price) / mrp) * 100);
      setState({ ...state, price: val, discountPercent });
    } else {
      setState({ ...state, price: val });
    }
  };

  const handleDiscountChange = (val, state, setState) => {
    const disc = Number(val);
    const mrp = Number(state.mrp);
    if (!isNaN(mrp) && mrp > 0 && !isNaN(disc)) {
      const price = Math.round(mrp * (1 - disc / 100));
      setState({ ...state, discountPercent: val, price });
    } else {
      setState({ ...state, discountPercent: val });
    }
  };

  // Handle Create Product
  const handleCreateProductSubmit = (e) => {
    e.preventDefault();
    if (activeStore === "racold") {
      if (!newRacoldProduct.name.trim()) {
        toast.error("Please enter a product name");
        return;
      }
      const payload = {
        id: `prod-${Date.now()}`,
        name: newRacoldProduct.name.trim(),
        brand: newRacoldProduct.brand.trim() || "Racold",
        spec: newRacoldProduct.spec.trim(),
        mrp: newRacoldProduct.mrp ? Number(newRacoldProduct.mrp) : null,
        price: newRacoldProduct.price ? Number(newRacoldProduct.price) : null,
        free_installation: newRacoldProduct.free_installation,
        free_pipe: newRacoldProduct.free_pipe,
        in_stock: newRacoldProduct.in_stock,
        fast_delivery: newRacoldProduct.fast_delivery,
        is_project: newRacoldProduct.is_project,
        image: newRacoldProduct.image.trim() || "/assets/product category/Storage Geyser/Omnis slim wifi.jpeg",
        features: newRacoldProduct.featuresStr
          .split(",")
          .map((f) => f.trim())
          .filter(Boolean),
      };
      addProduct(newRacoldProduct.categoryId, payload);
    } else {
      if (!newSareeProduct.name.trim()) {
        toast.error("Please enter saree name");
        return;
      }
      const payload = {
        id: `saree-${Date.now()}`,
        name: newSareeProduct.name.trim(),
        fabric: newSareeProduct.fabric.trim(),
        color: newSareeProduct.color.trim(),
        spec: newSareeProduct.spec.trim(),
        badge: newSareeProduct.badge.trim(),
        mrp: newSareeProduct.mrp ? Number(newSareeProduct.mrp) : null,
        price: newSareeProduct.price ? Number(newSareeProduct.price) : null,
        in_stock: newSareeProduct.in_stock,
        image: newSareeProduct.image.trim() || "/assets/sarees/saree-hero-1.jpeg",
      };
      addSaree(newSareeProduct.categoryId, payload);
    }
    setIsAddModalOpen(false);
  };

  // Handle Edit Save
  const handleUpdateProductSave = (e) => {
    e.preventDefault();
    if (!editingItem) return;

    const { store, categoryId, product } = editingItem;
    if (store === "racold") {
      updateProduct(categoryId, product.id, {
        name: product.name,
        price: product.price ? Number(product.price) : null,
        mrp: product.mrp ? Number(product.mrp) : null,
        spec: product.spec,
        free_installation: product.free_installation,
        free_pipe: product.free_pipe,
        image: product.image,
      });
    } else {
      updateSaree(categoryId, product.id, {
        name: product.name,
        price: product.price ? Number(product.price) : null,
        mrp: product.mrp ? Number(product.mrp) : null,
        fabric: product.fabric,
        color: product.color,
        spec: product.spec,
        badge: product.badge,
        image: product.image,
      });
    }
    setEditingItem(null);
  };

  // Handle Bulk Festive Sale Application
  const handleApplyBulkDiscount = (e) => {
    e.preventDefault();
    applyBulkDiscount(activeStore, bulkDiscountCategory, bulkDiscountPercent);
    setIsBulkDiscountModalOpen(false);
  };

  // Export Config Content Generator
  const getExportCode = () => {
    if (activeStore === "racold") {
      return `export const websiteConfig = ${JSON.stringify({ settings, categories }, null, 4)};`;
    } else {
      return `export const sareeConfig = ${JSON.stringify({ settings: sareeSettings, categories: sareeCategories }, null, 4)};`;
    }
  };

  const handleCopyExportCode = () => {
    navigator.clipboard.writeText(getExportCode());
    toast.success(`Copied ${activeStore === "racold" ? "website-config.js" : "saree-config.js"} to clipboard!`);
  };

  const handleDownloadExportCode = () => {
    const filename = activeStore === "racold" ? "website-config.js" : "saree-config.js";
    const blob = new Blob([getExportCode()], { type: "application/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
    toast.success(`Downloaded ${filename} ready to commit!`);
  };

  // 1. Password Protection Screen
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-4">
        <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl text-white">
          <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-red-500/30">
            <Lock className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-black text-center mb-1">SunAura Store Admin</h2>
          <p className="text-gray-400 text-xs text-center mb-8">
            Manage Racold Appliances & Surat Saree Factory stock, discounts, and pricing.
          </p>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">
                Admin Password / PIN
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter PIN (e.g. sunaura2026)"
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-600/30 transition-all text-sm"
            >
              Access Command Center
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 flex justify-between text-xs text-gray-500">
            <Link to="/" className="hover:text-white inline-flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Racold Site</span>
            </Link>
            <Link to="/sarees" className="hover:text-white inline-flex items-center gap-1 transition-colors">
              <span>Saree Factory</span>
              <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Multi-Store Control Room
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-gray-900">
      {/* Top Navbar */}
      <header
        className={`bg-slate-900 text-white sticky top-0 z-40 shadow-lg border-b-4 transition-colors duration-300 ${
          activeStore === "racold" ? "border-red-600" : "border-rose-500"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-600 rounded-xl shadow-md">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-black tracking-tight leading-none">
                  SunAura Command Center
                </h1>
                <p className="text-[11px] text-gray-400 font-medium mt-1">
                  Multi-Store Inventory & Discount Control
                </p>
              </div>
            </div>

            {/* Quick Utility Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsExportModalOpen(true)}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-200 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Export updated configuration file to Git"
              >
                <Download className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Export Config</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to reset ${activeStore.toUpperCase()} store to official default prices?`)) {
                    resetToDefault(activeStore);
                  }
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                title="Reset to factory default"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Reset Defaults</span>
              </button>

              <button
                onClick={logoutAdmin}
                className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* STORE SEGMENTED SWITCHER TAB BAR */}
          <div className="pb-3 flex gap-2">
            <button
              onClick={() => {
                setActiveStore("racold");
                setSelectedCategoryFilter("all");
              }}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeStore === "racold"
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30 scale-100"
                  : "bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              <Flame className="w-4 h-4 text-amber-300" />
              <span>⚡ SunAura (Racold Water Heating)</span>
            </button>

            <button
              onClick={() => {
                setActiveStore("saree");
                setSelectedCategoryFilter("all");
              }}
              className={`flex-1 sm:flex-initial px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all ${
                activeStore === "saree"
                  ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30 scale-100"
                  : "bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700"
              }`}
            >
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>🌸 Surat Saree Factory</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full">
        {/* KPI Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Active Catalog
              </p>
              <p className="text-2xl font-black text-gray-900 mt-1">{allProducts.length}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">
                {activeStore === "racold" ? "Water Heaters & Pumps" : "Curated Saree Designs"}
              </p>
            </div>
            <div className={`p-3 rounded-2xl ${activeStore === "racold" ? "bg-red-50 text-red-600" : "bg-rose-50 text-rose-600"}`}>
              <Package className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                In Stock 🟢
              </p>
              <p className="text-2xl font-black text-emerald-600 mt-1">{totalInStock}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Ready for immediate delivery</p>
            </div>
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Sold Out 🔴
              </p>
              <p className="text-2xl font-black text-rose-600 mt-1">{totalOutOfStock}</p>
              <p className="text-[11px] text-gray-500 mt-0.5">Currently unavailable</p>
            </div>
            <div className="p-3 bg-rose-50 text-rose-600 rounded-2xl">
              <SlidersHorizontal className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between">
            <div>
              <p className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Live Store Link
              </p>
              <a
                href={activeStore === "racold" ? "/" : "/sarees"}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex items-center gap-1.5 mt-2 font-extrabold text-xs px-3 py-1.5 rounded-lg text-white shadow-sm transition-all ${
                  activeStore === "racold" ? "bg-slate-900 hover:bg-black" : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                <span>View {activeStore === "racold" ? "Racold" : "Sarees"}</span>
                <Eye className="w-3.5 h-3.5" />
              </a>
            </div>
            <div className="p-3 bg-slate-50 text-slate-700 rounded-2xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Action Controls & Filters Bar */}
        <div className="bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-3xl border border-gray-200/80 shadow-md mb-8 space-y-4 sticky top-16 sm:top-20 z-30 transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={`Search ${activeStore === "racold" ? "model, capacity (15L), specs..." : "saree name, fabric (Katan Silk), color..."}`}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 text-xs sm:text-sm bg-gray-50/50"
              />
            </div>

            {/* Category Dropdown */}
            <div className="flex flex-wrap items-center gap-3">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-bold bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Categories ({currentCategories?.length || 0})</option>
                {currentCategories?.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} ({cat.products?.length || 0})
                  </option>
                ))}
              </select>

              {/* Stock Filter Tabs */}
              <div className="inline-flex p-1 bg-gray-100 rounded-xl">
                <button
                  onClick={() => setStockFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    stockFilter === "all" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  All
                </button>
                <button
                  onClick={() => setStockFilter("in_stock")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    stockFilter === "in_stock" ? "bg-emerald-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  In Stock
                </button>
                <button
                  onClick={() => setStockFilter("out_of_stock")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    stockFilter === "out_of_stock" ? "bg-rose-600 text-white shadow-sm" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  Sold Out
                </button>
              </div>

              {/* Action Buttons: Bulk Discount & Add Product */}
              <button
                onClick={() => setIsBulkDiscountModalOpen(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
              >
                <Tag className="w-3.5 h-3.5" />
                <span>Festive Sale Tool</span>
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className={`px-4 py-2.5 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md transition-all ${
                  activeStore === "racold" ? "bg-red-600 hover:bg-red-700 shadow-red-600/20" : "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New {activeStore === "racold" ? "Product" : "Saree"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product Catalog Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-200">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No products match your search</h3>
            <p className="text-gray-500 text-xs max-w-sm mx-auto mb-6">
              Try searching a different keyword or switch to another category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategoryFilter("all");
                setStockFilter("all");
              }}
              className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-black"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((item) => {
              const discount = item.mrp && item.price ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : null;
              const inStock = item.in_stock !== false;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden group"
                >
                  {/* Top Image Preview & Status */}
                  <div className="h-48 relative bg-slate-100 flex items-center justify-center p-3 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      {discount && (
                        <span className="px-2.5 py-1 bg-red-600 text-white text-[11px] font-black rounded-lg shadow-sm">
                          {discount}% OFF
                        </span>
                      )}
                      <span className="px-2 py-0.5 bg-white/95 text-gray-900 text-[10px] font-bold rounded-md shadow-sm">
                        {item.categoryName}
                      </span>
                    </div>

                    {/* In-Stock Toggle Badge */}
                    <button
                      onClick={() => {
                        if (item.store === "racold") {
                          toggleStock(item.categoryId, item.id);
                        } else {
                          toggleSareeStock(item.categoryId, item.id);
                        }
                      }}
                      className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 shadow-sm transition-all border ${
                        inStock
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                          : "bg-rose-50 text-rose-700 border-rose-300 hover:bg-rose-100"
                      }`}
                      title="Click to toggle stock status"
                    >
                      <span className={`w-2 h-2 rounded-full ${inStock ? "bg-emerald-500 animate-pulse" : "bg-rose-500"}`} />
                      <span>{inStock ? "In Stock" : "Sold Out"}</span>
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-gray-900 leading-snug mb-1">
                        {item.name}
                      </h4>

                      {/* Store-specific attributes */}
                      {item.store === "racold" ? (
                        <>
                          {item.spec && (
                            <p className="text-xs font-semibold text-red-600 mb-2">{item.spec}</p>
                          )}
                          {item.free_installation && (
                            <div className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded text-[10px] font-bold mb-3">
                              <Sparkles className="w-3 h-3 text-emerald-600" />
                              <span>Free Installation & Pipes Included</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          <p className="text-xs font-semibold text-rose-600 mb-0.5">🧵 {item.fabric}</p>
                          <p className="text-xs text-gray-500 mb-2">🎨 {item.color}</p>
                          {item.badge && (
                            <span className="inline-block px-2 py-0.5 bg-rose-50 text-rose-700 text-[10px] font-bold rounded mb-3">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {/* Price Display */}
                      <div className="flex items-baseline gap-2.5 mb-4 tabular-nums">
                        <span className="text-xl font-black text-gray-900">
                          {formatINR(item.price)}
                        </span>
                        {item.mrp && (
                          <span className="text-xs text-gray-400 line-through">
                            {formatINR(item.mrp)}
                          </span>
                        )}
                        {item.mrp && item.price && (
                          <span className="text-[11px] font-bold text-emerald-600">
                            (Save {formatINR(item.mrp - item.price)})
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Card Action Buttons */}
                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                      <button
                        onClick={() => {
                          const disc = item.mrp && item.price ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : "";
                          setEditingItem({
                            store: item.store,
                            categoryId: item.categoryId,
                            product: {
                              ...item,
                              discountPercent: disc,
                            },
                          });
                        }}
                        className="flex-1 py-2 px-3 bg-slate-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-amber-400" />
                        <span>Edit Price / Details</span>
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${item.name}" from catalog?`)) {
                            if (item.store === "racold") {
                              deleteProduct(item.categoryId, item.id);
                            } else {
                              deleteSaree(item.categoryId, item.id);
                            }
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* --- MODAL 1: TWO-WAY SMART EDIT PRODUCT DETAILS --- */}
      {editingItem && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Edit {editingItem.store === "racold" ? "Product" : "Saree"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Live two-way discount calculator & details editor
                </p>
              </div>
              <button
                onClick={() => setEditingItem(null)}
                className="p-2 text-gray-400 hover:text-gray-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Name
                </label>
                <input
                  type="text"
                  required
                  value={editingItem.product.name}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      product: { ...editingItem.product, name: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              {/* TWO-WAY PRICING & DISCOUNT CALCULATOR */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-slate-700 tracking-wider flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-amber-500" />
                    <span>Smart Discount Engine</span>
                  </span>
                  {editingItem.product.mrp && editingItem.product.price && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Savings: {formatINR(editingItem.product.mrp - editingItem.product.price)}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                      Official MRP (₹)
                    </label>
                    <input
                      type="number"
                      value={editingItem.product.mrp || ""}
                      onChange={(e) =>
                        handleMrpChange(
                          e.target.value,
                          editingItem.product,
                          (updated) => setEditingItem({ ...editingItem, product: updated })
                        )
                      }
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm font-semibold tabular-nums font-mono bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                      Discount %
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        placeholder="e.g. 25"
                        value={editingItem.product.discountPercent || ""}
                        onChange={(e) =>
                          handleDiscountChange(
                            e.target.value,
                            editingItem.product,
                            (updated) => setEditingItem({ ...editingItem, product: updated })
                          )
                        }
                        className="w-full px-3 py-2 rounded-xl border border-amber-300 text-sm font-bold tabular-nums font-mono bg-amber-50/50 text-amber-900 pr-6"
                      />
                      <span className="absolute right-2 top-2 text-xs font-bold text-gray-400">%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                      Selling Price (₹)
                    </label>
                    <input
                      type="number"
                      value={editingItem.product.price || ""}
                      onChange={(e) =>
                        handlePriceChange(
                          e.target.value,
                          editingItem.product,
                          (updated) => setEditingItem({ ...editingItem, product: updated })
                        )
                      }
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 text-sm font-black tabular-nums font-mono bg-emerald-50/50 text-emerald-900"
                    />
                  </div>
                </div>

                {/* Quick Discount Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-bold text-gray-500 uppercase">Presets:</span>
                  {[10, 15, 20, 25, 30, 40, 50].map((disc) => (
                    <button
                      key={disc}
                      type="button"
                      onClick={() =>
                        handleDiscountChange(
                          disc,
                          editingItem.product,
                          (updated) => setEditingItem({ ...editingItem, product: updated })
                        )
                      }
                      className="px-2 py-0.5 bg-white border border-gray-300 hover:border-gray-900 text-gray-700 text-[10px] font-bold rounded-md transition-colors"
                    >
                      {disc}% OFF
                    </button>
                  ))}
                </div>
              </div>

              {/* Store specific fields */}
              {editingItem.store === "racold" ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Capacity / Spec
                    </label>
                    <input
                      type="text"
                      value={editingItem.product.spec || ""}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          product: { ...editingItem.product, spec: e.target.value },
                        })
                      }
                      placeholder="e.g. Available in 15L and 25L"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>

                  <div className="flex items-center gap-4 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-gray-700">
                      <input
                        type="checkbox"
                        checked={editingItem.product.free_installation !== false}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            product: {
                              ...editingItem.product,
                              free_installation: e.target.checked,
                              free_pipe: e.target.checked,
                            },
                          })
                        }
                        className="rounded text-red-600 focus:ring-red-500"
                      />
                      <span>🎁 Free Installation & Connecting Pipes Included</span>
                    </label>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Fabric
                      </label>
                      <input
                        type="text"
                        value={editingItem.product.fabric || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            product: { ...editingItem.product, fabric: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Color / Work
                      </label>
                      <input
                        type="text"
                        value={editingItem.product.color || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            product: { ...editingItem.product, color: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Blouse / Dimensions
                      </label>
                      <input
                        type="text"
                        value={editingItem.product.spec || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            product: { ...editingItem.product, spec: e.target.value },
                          })
                        }
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Festive Badge
                      </label>
                      <input
                        type="text"
                        value={editingItem.product.badge || ""}
                        onChange={(e) =>
                          setEditingItem({
                            ...editingItem,
                            product: { ...editingItem.product, badge: e.target.value },
                          })
                        }
                        placeholder="e.g. Wedding Special"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  value={editingItem.product.image || ""}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      product: { ...editingItem.product, image: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 2: ADD NEW PRODUCT / SAREE --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  Add New {activeStore === "racold" ? "Racold Product" : "Surat Saree"}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Adding to {activeStore === "racold" ? "Water Heating" : "Saree Factory"} Catalog
                </p>
              </div>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProductSubmit} className="space-y-4">
              {/* Category Selector */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Select Category
                </label>
                <select
                  value={
                    activeStore === "racold"
                      ? newRacoldProduct.categoryId
                      : newSareeProduct.categoryId
                  }
                  onChange={(e) => {
                    if (activeStore === "racold") {
                      setNewRacoldProduct({ ...newRacoldProduct, categoryId: e.target.value });
                    } else {
                      setNewSareeProduct({ ...newSareeProduct, categoryId: e.target.value });
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold bg-white"
                >
                  {currentCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  {activeStore === "racold" ? "Product Model Name" : "Saree Title"}
                </label>
                <input
                  type="text"
                  required
                  placeholder={activeStore === "racold" ? "e.g. Omnis Slim Wi-Fi 25L" : "e.g. Royal Bridal Katan Silk"}
                  value={activeStore === "racold" ? newRacoldProduct.name : newSareeProduct.name}
                  onChange={(e) => {
                    if (activeStore === "racold") {
                      setNewRacoldProduct({ ...newRacoldProduct, name: e.target.value });
                    } else {
                      setNewSareeProduct({ ...newSareeProduct, name: e.target.value });
                    }
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              {/* Two-Way Pricing Block */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <span className="text-xs font-black uppercase text-slate-700 tracking-wider block">
                  Pricing & Discount
                </span>
                <div className="grid grid-cols-3 gap-2.5">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                      MRP (₹)
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 5999"
                      value={activeStore === "racold" ? newRacoldProduct.mrp : newSareeProduct.mrp}
                      onChange={(e) => {
                        if (activeStore === "racold") {
                          handleMrpChange(e.target.value, newRacoldProduct, setNewRacoldProduct);
                        } else {
                          handleMrpChange(e.target.value, newSareeProduct, setNewSareeProduct);
                        }
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm tabular-nums font-mono bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                      Discount %
                    </label>
                    <input
                      type="number"
                      placeholder="e.g. 25"
                      value={activeStore === "racold" ? newRacoldProduct.discountPercent : newSareeProduct.discountPercent}
                      onChange={(e) => {
                        if (activeStore === "racold") {
                          handleDiscountChange(e.target.value, newRacoldProduct, setNewRacoldProduct);
                        } else {
                          handleDiscountChange(e.target.value, newSareeProduct, setNewSareeProduct);
                        }
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-amber-300 text-sm font-bold tabular-nums font-mono bg-amber-50/50"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 uppercase mb-1">
                      Selling Price (₹)
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 4499"
                      value={activeStore === "racold" ? newRacoldProduct.price : newSareeProduct.price}
                      onChange={(e) => {
                        if (activeStore === "racold") {
                          handlePriceChange(e.target.value, newRacoldProduct, setNewRacoldProduct);
                        } else {
                          handlePriceChange(e.target.value, newSareeProduct, setNewSareeProduct);
                        }
                      }}
                      className="w-full px-3 py-2 rounded-xl border border-emerald-300 text-sm font-black tabular-nums font-mono bg-emerald-50/50"
                    />
                  </div>
                </div>
              </div>

              {/* Specific fields */}
              {activeStore === "racold" ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Capacity / Specs
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Available in 15L and 25L"
                      value={newRacoldProduct.spec}
                      onChange={(e) => setNewRacoldProduct({ ...newRacoldProduct, spec: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                      Image URL / Path
                    </label>
                    <input
                      type="text"
                      value={newRacoldProduct.image}
                      onChange={(e) => setNewRacoldProduct({ ...newRacoldProduct, image: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Fabric
                      </label>
                      <input
                        type="text"
                        value={newSareeProduct.fabric}
                        onChange={(e) => setNewSareeProduct({ ...newSareeProduct, fabric: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Color / Work
                      </label>
                      <input
                        type="text"
                        value={newSareeProduct.color}
                        onChange={(e) => setNewSareeProduct({ ...newSareeProduct, color: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Blouse Spec
                      </label>
                      <input
                        type="text"
                        value={newSareeProduct.spec}
                        onChange={(e) => setNewSareeProduct({ ...newSareeProduct, spec: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                        Festive Badge
                      </label>
                      <input
                        type="text"
                        value={newSareeProduct.badge}
                        onChange={(e) => setNewSareeProduct({ ...newSareeProduct, badge: e.target.value })}
                        placeholder="e.g. Wedding Special"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Create & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 3: BULK FESTIVE DISCOUNT CAMPAIGN TOOL --- */}
      {isBulkDiscountModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-100 text-amber-700 rounded-xl">
                  <Tag className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Festive Sale Tool</h3>
                  <p className="text-xs text-gray-500">1-Click category discount campaign</p>
                </div>
              </div>
              <button
                onClick={() => setIsBulkDiscountModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleApplyBulkDiscount} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Target Store
                </label>
                <div className="px-3 py-2 bg-gray-100 rounded-xl text-xs font-bold text-gray-800">
                  {activeStore === "racold" ? "⚡ SunAura (Racold Appliances)" : "🌸 Surat Saree Factory"}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Target Category
                </label>
                <select
                  value={bulkDiscountCategory}
                  onChange={(e) => setBulkDiscountCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold bg-white"
                >
                  <option value="all">Entire Store (All Categories)</option>
                  {currentCategories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Festive Discount Percentage
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="5"
                    max="60"
                    step="1"
                    value={bulkDiscountPercent}
                    onChange={(e) => setBulkDiscountPercent(Number(e.target.value))}
                    className="flex-1 accent-amber-500 cursor-pointer"
                  />
                  <span className="w-16 px-2.5 py-1.5 bg-amber-50 border border-amber-300 rounded-xl text-center font-black text-amber-900 text-sm">
                    {bulkDiscountPercent}%
                  </span>
                </div>
              </div>

              {/* Preset buttons */}
              <div className="flex gap-2 pt-1">
                {[10, 15, 20, 25, 30].map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setBulkDiscountPercent(p)}
                    className={`flex-1 py-1 text-xs font-bold rounded-lg border transition-all ${
                      bulkDiscountPercent === p
                        ? "bg-amber-500 text-white border-amber-500 shadow-sm"
                        : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {p}%
                  </button>
                ))}
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 leading-relaxed">
                💡 This will recalculate the selling price for all products in this selection as:
                <br />
                <code className="font-bold">Selling Price = MRP × (1 - {bulkDiscountPercent}%)</code>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsBulkDiscountModalOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Apply {bulkDiscountPercent}% Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL 4: EXPORT CONFIGURATION TO GIT --- */}
      {isExportModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Export Production Configuration</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Save your changes permanently to GitHub & AWS Amplify
                </p>
              </div>
              <button
                onClick={() => setIsExportModalOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900 rounded-xl"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-gray-600 leading-relaxed">
                Changes made in this browser portal are saved instantly to your local machine. To deploy them so all customers across the internet see them on the live website:
              </p>

              <div className="flex gap-3">
                <button
                  onClick={handleDownloadExportCode}
                  className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download {activeStore === "racold" ? "website-config.js" : "saree-config.js"}</span>
                </button>

                <button
                  onClick={handleCopyExportCode}
                  className="flex-1 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Copy className="w-4 h-4" />
                  <span>Copy Code to Clipboard</span>
                </button>
              </div>

              <div className="bg-slate-900 rounded-2xl p-4 text-gray-200 text-xs font-mono max-h-48 overflow-y-auto">
                <pre>{getExportCode().slice(0, 500)}...</pre>
              </div>

              <p className="text-[11px] text-gray-500 text-center">
                Paste the downloaded file into <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">frontend/src/data/</code> and run <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">git push</code> to update live!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
