import { useState } from "react";
import { CheckCircle, ArrowRight, Flame, Sun, ShieldCheck, Zap } from "lucide-react";
import { Link } from "react-router-dom";

export default function Products({ categories }) {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCategories = categories ? categories.filter((cat) => {
    if (activeTab === "all") return true;
    if (activeTab === "residential") return cat.type === "residential" || cat.id.includes("geyser");
    if (activeTab === "projects") return cat.type === "projects" || cat.id.includes("heatpump") || cat.id.includes("solar");
    return true;
  }) : [];

  return (
    <section id="products" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Flame className="w-3.5 h-3.5 text-red-600" />
            <span>Racold Range</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            Water Heating Categories
          </h2>
          <p className="text-sm text-gray-600">
            Select a category to view models, pricing, and stock availability.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex p-1 bg-gray-200/80 rounded-xl shadow-inner max-w-full overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "all"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              All Categories ({categories ? categories.length : 0})
            </button>
            <button
              onClick={() => setActiveTab("residential")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "residential"
                  ? "bg-red-600 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Flame className="w-3.5 h-3.5" />
              <span>Storage & Instant Geysers</span>
            </button>
            <button
              onClick={() => setActiveTab("projects")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                activeTab === "projects"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span>Solar & Heat Pumps</span>
            </button>
          </div>
        </div>

        {/* Category Cards Grid */}
        {!filteredCategories || filteredCategories.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
            <p className="text-gray-500 text-sm">No categories found in this section.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.id}`}
                className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                {/* Image Header with Brand Badge */}
                <div className="h-52 overflow-hidden relative bg-gray-100">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex gap-2">
                    <span className="px-2.5 py-0.5 bg-white/95 backdrop-blur-md text-gray-900 text-[11px] font-bold rounded-md shadow-sm">
                      {category.brand || "Racold"}
                    </span>
                    <span className="px-2.5 py-0.5 bg-red-600/90 text-white text-[11px] font-bold rounded-md shadow-sm flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3" /> Authorized
                    </span>
                  </div>

                  {/* Category Title on image */}
                  <div className="absolute bottom-3 left-3.5 right-3.5">
                    <h3 className="text-xl font-extrabold text-white leading-tight drop-shadow-sm">
                      {category.name}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-5 flex flex-col flex-grow justify-between">
                  <div>
                    {category.tagline && (
                      <p className="text-xs font-semibold text-red-600 mb-3 line-clamp-1">
                        {category.tagline}
                      </p>
                    )}
                    
                    {/* Compact Feature Tags */}
                    <div className="space-y-1.5 mb-4">
                      {category.features && category.features.slice(0, 3).map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2 text-gray-600 text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span className="truncate">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-red-600 font-bold text-xs group-hover:text-red-700">
                    <span>{category.products ? `${category.products.length} Models` : 'View Models'}</span>
                    <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>View Products</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Turnkey Projects Direct Callout */}
        <div className="mt-12 bg-slate-900 rounded-2xl p-6 sm:p-8 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-600/20 text-red-400 rounded-xl flex-shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold">
                Planning a Commercial Solar or Heat Pump Project?
              </h3>
              <p className="text-gray-400 text-xs mt-0.5">
                Turnkey installation for hotels, hospitals, hostels & bungalows across Jharkhand.
              </p>
            </div>
          </div>

          <button
            onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl whitespace-nowrap shadow-md transition-all flex-shrink-0"
          >
            View Projects
          </button>
        </div>
      </div>
    </section>
  );
}
