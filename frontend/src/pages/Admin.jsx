import { useState } from "react";
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
  Truck,
  FolderPlus,
  RefreshCw,
  Eye,
  SlidersHorizontal
} from "lucide-react";
import { toast } from "sonner";

export default function Admin() {
  const {
    categories,
    isAdminAuthenticated,
    loginAdmin,
    logoutAdmin,
    toggleStock,
    toggleFastDelivery,
    updateProduct,
    addProduct,
    deleteProduct,
    addCategory,
    resetToDefault,
  } = useProducts();

  const [password, setPassword] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all"); // 'all', 'in_stock', 'out_of_stock'

  // Modal States
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null); // { categoryId, product }

  // New Product Form State
  const [newProduct, setNewProduct] = useState({
    categoryId: categories[0]?.id || "storage-geyser",
    name: "",
    brand: "Racold",
    spec: "",
    mrp: "",
    price: "",
    in_stock: true,
    fast_delivery: true,
    is_project: false,
    image: "/assets/product category/Storage Geyser/Omnis slim wifi.jpeg",
    featuresStr: "Titanium Plus Technology, Safety Plus, 8 Bar Pressure",
  });

  // New Category Form State
  const [newCategory, setNewCategory] = useState({
    name: "",
    department: "water-heating",
    brand: "Racold",
    tagline: "",
    image_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
  });

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    loginAdmin(password);
  };

  // Flatten all products with categoryId for simple filtering
  const allProducts = categories.flatMap((cat) =>
    (cat.products || []).map((prod) => ({
      ...prod,
      categoryId: cat.id,
      categoryName: cat.name,
    }))
  );

  const filteredProducts = allProducts.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.spec && p.spec.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.brand && p.brand.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategoryFilter === "all" || p.categoryId === selectedCategoryFilter;

    const matchesStock =
      stockFilter === "all" ||
      (stockFilter === "in_stock" && p.in_stock) ||
      (stockFilter === "out_of_stock" && !p.in_stock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  const totalInStock = allProducts.filter((p) => p.in_stock).length;
  const totalOutOfStock = allProducts.filter((p) => !p.in_stock).length;

  const handleCreateProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name.trim()) {
      toast.error("Please enter a product name");
      return;
    }

    const productPayload = {
      id: `prod-${Date.now()}`,
      name: newProduct.name.trim(),
      brand: newProduct.brand.trim() || "Racold",
      spec: newProduct.spec.trim(),
      mrp: newProduct.mrp ? Number(newProduct.mrp) : null,
      price: newProduct.price ? Number(newProduct.price) : null,
      in_stock: newProduct.in_stock,
      fast_delivery: newProduct.fast_delivery,
      is_project: newProduct.is_project,
      image: newProduct.image.trim() || "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
      features: newProduct.featuresStr
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean),
    };

    addProduct(newProduct.categoryId, productPayload);
    setIsAddProductOpen(false);
    setNewProduct({
      categoryId: categories[0]?.id || "storage-geyser",
      name: "",
      brand: "Racold",
      spec: "",
      mrp: "",
      price: "",
      in_stock: true,
      fast_delivery: true,
      is_project: false,
      image: "/assets/product category/Storage Geyser/Omnis slim wifi.jpeg",
      featuresStr: "Titanium Plus Technology, Safety Plus, 8 Bar Pressure",
    });
  };

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (!newCategory.name.trim()) {
      toast.error("Please enter a category name");
      return;
    }

    addCategory(newCategory);
    setIsAddCategoryOpen(false);
    setNewCategory({
      name: "",
      department: "water-heating",
      brand: "Racold",
      tagline: "",
      image_url: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800",
    });
  };

  const handleUpdateProductSave = (e) => {
    e.preventDefault();
    if (!editingProduct) return;

    updateProduct(editingProduct.categoryId, editingProduct.id, {
      name: editingProduct.name,
      brand: editingProduct.brand,
      spec: editingProduct.spec,
      price: Number(editingProduct.price),
      mrp: Number(editingProduct.mrp),
      image: editingProduct.image,
    });

    setEditingProduct(null);
  };

  const formatINR = (val) => {
    if (!val) return "Quote";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
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
            Enter your Store Manager PIN to update stock, pricing, and products.
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
              Access Dashboard
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <Link
              to="/"
              className="text-xs text-gray-500 hover:text-white inline-flex items-center gap-1.5 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to SunAura Website</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Store Admin Portal
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-gray-900">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-3">
              <img
                src="/assets/sunaura logo.jpeg"
                alt="SunAura"
                className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl object-contain bg-white p-1"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl font-black">SunAura Store Manager</h1>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold px-2 py-0.5 rounded-full">
                    Live Sync
                  </span>
                </div>
                <p className="text-xs text-gray-400 hidden sm:block">
                  Ranchi Store & Inventory Control Panel
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                to="/"
                target="_blank"
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-gray-300 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">View Live Site</span>
              </Link>

              <button
                onClick={logoutAdmin}
                className="p-2 sm:px-3.5 sm:py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Log Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Metric Cards Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Products</p>
            <p className="text-2xl sm:text-3xl font-black text-gray-900 mt-1">{allProducts.length}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">In Stock 🟢</p>
            <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">{totalInStock}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-red-600 uppercase tracking-wider">Out of Stock 🔴</p>
            <p className="text-2xl sm:text-3xl font-black text-red-600 mt-1">{totalOutOfStock}</p>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Categories / Brands</p>
            <p className="text-2xl sm:text-3xl font-black text-blue-700 mt-1">{categories.length}</p>
          </div>
        </div>

        {/* Action Controls & Filters Bar */}
        <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by model, spec, brand (e.g. Omnis, Cera, 25L)..."
                className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-md shadow-red-600/20 transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>

              <button
                onClick={() => setIsAddCategoryOpen(true)}
                className="px-4 py-2.5 bg-slate-900 hover:bg-black text-white rounded-xl text-sm font-bold flex items-center gap-2 transition-colors"
                title="Add new Brand or Category (e.g. new distribution)"
              >
                <FolderPlus className="w-4 h-4 text-amber-400" />
                <span>Add Category / Brand</span>
              </button>

              <button
                onClick={() => {
                  if (window.confirm("Are you sure you want to reset the catalog back to default?")) {
                    resetToDefault();
                  }
                }}
                className="p-2.5 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-xs transition-colors"
                title="Reset to default config"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-100 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-gray-500">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Category:</span>
            </div>

            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="bg-slate-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-gray-700 focus:outline-none"
            >
              <option value="all">All Categories ({categories.length})</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} ({c.brand})
                </option>
              ))}
            </select>

            <div className="flex items-center gap-1 ml-auto">
              <button
                onClick={() => setStockFilter("all")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  stockFilter === "all" ? "bg-slate-900 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStockFilter("in_stock")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  stockFilter === "in_stock" ? "bg-emerald-600 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                In Stock Only
              </button>
              <button
                onClick={() => setStockFilter("out_of_stock")}
                className={`px-3 py-1 rounded-lg transition-all ${
                  stockFilter === "out_of_stock" ? "bg-red-600 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                Out of Stock
              </button>
            </div>
          </div>
        </div>

        {/* Products Management List */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <h3 className="font-bold text-gray-900 text-base">
              Products Catalog ({filteredProducts.length})
            </h3>
            <span className="text-xs text-gray-400">
              Click 🟢/🔴 buttons for instant stock updates
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No products match the selected filters.</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <div
                  key={`${product.categoryId}-${product.id || product.name}`}
                  className="p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors"
                >
                  {/* Left: Image & Title */}
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-16 h-16 bg-slate-100 rounded-xl p-1 border border-gray-200 flex-shrink-0 flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-gray-100 text-gray-700">
                          {product.brand || "Racold"}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">
                          {product.categoryName}
                        </span>
                      </div>

                      <h4 className="font-bold text-gray-900 text-base leading-tight">
                        {product.name}
                      </h4>

                      {product.spec && (
                        <p className="text-xs text-red-600 font-semibold mt-0.5">{product.spec}</p>
                      )}
                    </div>
                  </div>

                  {/* Center: Price & Delivery */}
                  <div className="flex items-center gap-6 self-stretch md:self-auto justify-between md:justify-end">
                    <div className="text-left md:text-right">
                      <p className="text-base font-black text-gray-900">
                        {formatINR(product.price)}
                      </p>
                      {product.mrp && (
                        <p className="text-xs text-gray-400 line-through">
                          MRP: {formatINR(product.mrp)}
                        </p>
                      )}
                    </div>

                    {/* Fast Delivery Quick Switch */}
                    <button
                      onClick={() => toggleFastDelivery(product.categoryId, product.id || product.name)}
                      className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        product.fast_delivery
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-gray-100 text-gray-400 border border-gray-200"
                      }`}
                      title="Toggle Ranchi Fast Delivery Badge"
                    >
                      <Truck className="w-4 h-4" />
                      <span className="hidden sm:inline">Ranchi Delivery</span>
                    </button>

                    {/* Stock Status 1-Tap Toggle Button */}
                    <button
                      onClick={() => toggleStock(product.categoryId, product.id || product.name)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-black flex items-center gap-2 transition-all shadow-sm ${
                        product.in_stock
                          ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                          : "bg-red-600 hover:bg-red-700 text-white"
                      }`}
                    >
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                      <span>{product.in_stock ? "In Stock" : "Out of Stock"}</span>
                    </button>

                    {/* Edit & Delete Action Buttons */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          setEditingProduct({
                            ...product,
                            categoryId: product.categoryId,
                          })
                        }
                        className="p-2 text-gray-500 hover:text-slate-900 hover:bg-gray-100 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete "${product.name}"?`)) {
                            deleteProduct(product.categoryId, product.id || product.name);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* MODAL 1: ADD NEW PRODUCT */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-xl font-bold text-gray-900">Add New Product</h3>
              <button
                onClick={() => setIsAddProductOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Select Category *
                </label>
                <select
                  value={newProduct.categoryId}
                  onChange={(e) => setNewProduct({ ...newProduct, categoryId: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.brand})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Omnis Plus 15L"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Brand *
                  </label>
                  <input
                    type="text"
                    required
                    value={newProduct.brand}
                    onChange={(e) => setNewProduct({ ...newProduct, brand: e.target.value })}
                    placeholder="e.g. Racold"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Spec / Capacity
                  </label>
                  <input
                    type="text"
                    value={newProduct.spec}
                    onChange={(e) => setNewProduct({ ...newProduct, spec: e.target.value })}
                    placeholder="e.g. 15L Capacity"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="e.g. 12999"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    MRP (₹)
                  </label>
                  <input
                    type="number"
                    value={newProduct.mrp}
                    onChange={(e) => setNewProduct({ ...newProduct, mrp: e.target.value })}
                    placeholder="e.g. 16499"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Product Image URL or Path
                </label>
                <input
                  type="text"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                  placeholder="/assets/... or https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Features (comma separated)
                </label>
                <input
                  type="text"
                  value={newProduct.featuresStr}
                  onChange={(e) => setNewProduct({ ...newProduct, featuresStr: e.target.value })}
                  placeholder="Titanium Plus, Safety Plus, 8 Bar Pressure"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.in_stock}
                    onChange={(e) => setNewProduct({ ...newProduct, in_stock: e.target.checked })}
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span>Mark as In Stock 🟢</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newProduct.fast_delivery}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, fast_delivery: e.target.checked })
                    }
                    className="rounded text-red-600 focus:ring-red-500 w-4 h-4"
                  />
                  <span>Ranchi Fast Delivery</span>
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD NEW CATEGORY / BRAND (FUTURE DISTRIBUTION READY) */}
      {isAddCategoryOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Add New Category / Brand</h3>
                <p className="text-xs text-gray-500 mt-0.5">Ready for new distribution lines in 5-6 months</p>
              </div>
              <button
                onClick={() => setIsAddCategoryOpen(false)}
                className="p-2 text-gray-400 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                  placeholder="e.g. Water Purifiers / Kitchen Sinks / Sanitary"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Brand Name *
                </label>
                <input
                  type="text"
                  required
                  value={newCategory.brand}
                  onChange={(e) => setNewCategory({ ...newCategory, brand: e.target.value })}
                  placeholder="e.g. Racold / Cera / Havells / SunAura"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Department
                </label>
                <select
                  value={newCategory.department}
                  onChange={(e) => setNewCategory({ ...newCategory, department: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                >
                  <option value="water-heating">Water Heating & Energy Projects</option>
                  <option value="bathroom-sanitary">Bathroom Essentials & Sanitary</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Tagline / Subtitle
                </label>
                <input
                  type="text"
                  value={newCategory.tagline}
                  onChange={(e) => setNewCategory({ ...newCategory, tagline: e.target.value })}
                  placeholder="e.g. Authorized Distributor Range"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Cover Image URL
                </label>
                <input
                  type="text"
                  value={newCategory.image_url}
                  onChange={(e) => setNewCategory({ ...newCategory, image_url: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsAddCategoryOpen(false)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-slate-900 hover:bg-black text-white font-bold rounded-xl text-sm shadow-md"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: EDIT EXISTING PRODUCT */}
      {editingProduct && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Product Details</h3>
              <button
                onClick={() => setEditingProduct(null)}
                className="p-2 text-gray-400 hover:text-gray-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateProductSave} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, name: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Selling Price (₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.price || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, price: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    MRP (₹)
                  </label>
                  <input
                    type="number"
                    value={editingProduct.mrp || ""}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, mrp: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Spec / Capacity
                </label>
                <input
                  type="text"
                  value={editingProduct.spec || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, spec: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  value={editingProduct.image || ""}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, image: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 text-sm"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl text-sm"
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
    </div>
  );
}
