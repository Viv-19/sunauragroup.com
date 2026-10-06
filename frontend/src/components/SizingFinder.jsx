import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductsContext";
import {
  Sparkles,
  Home as HomeIcon,
  Building,
  Zap,
  Flame,
  Sun,
  CheckCircle2,
  ShoppingCart,
  MessageSquare,
  ArrowRight,
  Check,
  TrendingDown
} from "lucide-react";

export default function SizingFinder() {
  const { categories, settings } = useProducts();
  const { cart, addToCart, setIsCartOpen } = useCart();

  // Interactive state
  const [usageArea, setUsageArea] = useState("bathroom"); // 'bathroom', 'villa', 'kitchen', 'commercial'
  const [familySize, setFamilySize] = useState("3-4"); // '1-2', '3-4', '5-8', 'large'
  const [bathingStyle, setBathingStyle] = useState("rain_shower"); // 'bucket', 'rain_shower', 'bathtub'
  const [energyPriority, setEnergyPriority] = useState("smart_electric"); // 'smart_electric', 'tankless', 'heatpump', 'solar'

  // Flatten all products across categories for instant exact matching
  const allProducts = useMemo(() => {
    const list = [];
    categories.forEach((cat) => {
      (cat.products || []).forEach((prod) => {
        list.push({ ...prod, categoryId: cat.id, categoryName: cat.name });
      });
    });
    return list;
  }, [categories]);

  // Sizing Calculation Logic
  const recommendation = useMemo(() => {
    // 1. Commercial / Institutional
    if (usageArea === "commercial" || familySize === "large") {
      const heatpump48 = allProducts.find((p) => p.id === "commercial-heatpump-48kw") || allProducts.find((p) => p.id === "commercial-heatpump-12-23kw");
      const solarAlpha = allProducts.find((p) => p.id === "alpha-plus-solar");
      
      if (energyPriority === "solar") {
        return {
          product: solarAlpha,
          categoryId: "solar-water-heater",
          categoryName: "Solar Water Heaters",
          title: "Racold Mega Institutional Solar (500L - 12,000 LPD)",
          tag: "Zero Power Bills",
          capacityNote: "500L to 12,000+ Litres / Day",
          ranchiWinterStats: {
            output: "12,000+ LPD (65°C)",
            heatingTime: "Solar + Auto Backup",
            powerSaving: "100% Solar Powered",
            pressure: "8 Bar Pressurized",
          },
          whyThisFits: "High-absorption glass tubes with 2-3 year ROI for hostels & hospitals.",
        };
      }

      return {
        product: heatpump48,
        categoryId: "commercial-heatpump",
        categoryName: "Commercial Heat Pumps",
        title: "Racold Commercial Heat Pump (12kW / 23kW / 48kW)",
        tag: "70% Power Savings",
        capacityNote: "Centralized for 15 to 50+ Guest Rooms",
        ranchiWinterStats: {
          output: "1,000L - 10,000L / hr",
          heatingTime: "Thermodynamic Scroll",
          powerSaving: "70% vs Boilers",
          pressure: "Heavy Duty Circulation",
        },
        whyThisFits: "High COP scroll compressor operates down to 5°C Ranchi winters.",
      };
    }

    // 2. Kitchen / Single Sink
    if (usageArea === "kitchen") {
      const pronto = allProducts.find((p) => p.id === "pronto-neo") || allProducts.find((p) => p.id === "altro-i-plus");

      return {
        product: pronto,
        categoryId: "storage-geyser",
        categoryName: "Storage Geysers",
        title: "Racold Pronto Neo 3L / Altro i+ 6L Instant",
        tag: "Instant 3kW",
        capacityNote: "3L / 6L Compact Kitchen Storage",
        ranchiWinterStats: {
          output: "Continuous hot water",
          heatingTime: "< 2 mins to 55°C",
          powerSaving: "Active usage only",
          pressure: "High Pressure (HPR)",
        },
        whyThisFits: "Compact design fits under kitchen sink with rapid 3kW heating.",
      };
    }

    // 3. Multi-Bathroom Villa / Bungalow (3+ Bathrooms)
    if (usageArea === "villa" || (familySize === "5-8" && energyPriority === "heatpump")) {
      const domesticHp = allProducts.find((p) => p.id === "domestic-heatpump-200-300-500");
      const omegaSolar = allProducts.find((p) => p.id === "omega-max-8-solar");

      if (energyPriority === "solar") {
        return {
          product: omegaSolar,
          categoryId: "solar-water-heater",
          categoryName: "Solar Water Heaters",
          title: "Racold Omega Max 8 Pressurized Solar (200L / 300L)",
          tag: "8 Bar Pressurized Solar",
          capacityNote: "200L - 300L High Pressure Storage",
          ranchiWinterStats: {
            output: "~500L mixed (40°C)",
            heatingTime: "Solar + Electric Backup",
            powerSaving: "Zero Daily Grid Cost",
            pressure: "8 Bar Booster Safe",
          },
          whyThisFits: "Maintains strong rain shower pressure without pressure drops in multi-bath villas.",
        };
      }

      return {
        product: domesticHp,
        categoryId: "domestic-heatpump",
        categoryName: "Domestic Heat Pumps",
        title: "Racold Domestic Central Heat Pump (200L / 300L)",
        tag: "70% Electricity Savings",
        capacityNote: "Centralized for 3 to 8 Bathrooms",
        ranchiWinterStats: {
          output: "300L Storage (Mixed ~600L)",
          heatingTime: "Thermodynamic cycle",
          powerSaving: "Runs on only 800W",
          pressure: "8 Bar Titanium Plus",
        },
        whyThisFits: "Replaces 4-5 geysers with 1 rooftop unit, drawing only 800W to save ₹3,000+/month.",
      };
    }

    // 4. Tankless / Instant Preference
    if (energyPriority === "tankless") {
      const aures13 = allProducts.find((p) => p.id === "aures-13kw") || allProducts.find((p) => p.id === "aures-24kw") || allProducts.find((p) => p.id === "aures-7-6kw");

      return {
        product: aures13,
        categoryId: "tankless-geyser",
        categoryName: "Tankless / Instant Geysers",
        title: "Racold Aures Multipoint Instant (13kW / 24kW)",
        tag: "Endless Hot Water",
        capacityNote: "Multipoint Instant (No Storage Tank)",
        ranchiWinterStats: {
          output: "Continuous endless flow",
          heatingTime: "< 3 seconds instant",
          powerSaving: "Zero standby loss",
          pressure: "Digital Temp Display",
        },
        whyThisFits: "No storage tank means you never run out of hot water, even with back-to-back baths.",
      };
    }

    // 5. Large Family / Bathtub / Jacuzzi
    if (familySize === "5-8" || bathingStyle === "bathtub") {
      const platinumNxt = allProducts.find((p) => p.id === "platinum-nxt");

      return {
        product: platinumNxt,
        categoryId: "storage-geyser",
        categoryName: "Storage Geysers",
        title: "Racold Platinum NXT (50L / 70L / 100L)",
        tag: "Extra High Volume",
        capacityNote: "50L / 70L High Capacity Storage",
        ranchiWinterStats: {
          output: "~130L mixed hot water",
          heatingTime: "~30 mins to 75°C",
          powerSaving: "BEE 5-Star PUF",
          pressure: "8 Bar Titanium Plus",
        },
        whyThisFits: "Designed for deep-soak bathtubs and high-flow showers in large family homes.",
      };
    }

    // 6. Rain Shower / 3-4 Family (Ranchi's #1 Selling Requirement)
    if (bathingStyle === "rain_shower" || familySize === "3-4") {
      const omnisDgWifi = allProducts.find((p) => p.id === "omnis-dg-wifi") || allProducts.find((p) => p.id === "omnis-slim-wifi");

      return {
        product: omnisDgWifi,
        categoryId: "storage-geyser",
        categoryName: "Storage Geysers",
        title: "Racold Omnis DG Wi-Fi (25 Litres)",
        tag: "Ranchi Best Seller",
        capacityNote: "25 Litres Storage (8 Bar Pressure)",
        ranchiWinterStats: {
          output: "~65L mixed (40°C)",
          heatingTime: "18 mins to 65°C",
          powerSaving: "Wi-Fi Smart Scheduler",
          pressure: "Titanium Plus 8 Bar",
        },
        whyThisFits: "Ideal capacity for a 6-8 min luxury rain shower or 3-4 consecutive bucket baths.",
      };
    }

    // 7. Compact / 1-2 Persons / Standard Bucket Bath
    const omnisDg15 = allProducts.find((p) => p.id === "omnis-dg") || allProducts.find((p) => p.id === "cdr-dlx");

    return {
      product: omnisDg15,
      categoryId: "storage-geyser",
      categoryName: "Storage Geysers",
      title: "Racold Omnis DG (15 Litres)",
      tag: "Compact & Fast",
      capacityNote: "15 Litres Storage (8 Bar Pressure)",
      ranchiWinterStats: {
        output: "~35L mixed water",
        heatingTime: "12 mins fast reheat",
        powerSaving: "BEE 5-Star Rated",
        pressure: "Titanium Plus Hard Water",
      },
      whyThisFits: "Quick 12-minute reheat for 1-2 people with minimal power consumption.",
    };
  }, [usageArea, familySize, bathingStyle, energyPriority, allProducts]);

  const formatINR = (val) => {
    if (!val) return "";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const getWhatsAppQuery = () => {
    const p = recommendation.product;
    const text = `Hello SunAura! I used your Sizing Calculator:
• Property: ${usageArea}
• Users: ${familySize}
• Bathing Style: ${bathingStyle}
• Tech: ${energyPriority}

Recommended: ${recommendation.title} (${p?.price ? formatINR(p.price) : "Quote"})
Please confirm stock & Ranchi delivery schedule.`;

    return `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(text)}`;
  };

  const isCurrentInCart = recommendation.product
    ? cart.some((item) => item.id === recommendation.product.id)
    : false;

  const handleAddToCart = () => {
    if (recommendation.product) {
      addToCart({
        id: recommendation.product.id,
        name: recommendation.product.name,
        brand: recommendation.product.brand || "Racold",
        price: recommendation.product.price,
        image: recommendation.product.image,
        spec: recommendation.product.spec || recommendation.capacityNote,
      });
      setIsCartOpen(true);
    }
  };

  return (
    <section id="sizing-calculator" className="py-16 bg-slate-950 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Capacity Sizer</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Find Your Ideal Water Heater
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Select your requirements to get an exact model match with real specs & pricing.
          </p>
        </div>

        {/* 2-Col Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Controls Form */}
          <div className="lg:col-span-7 bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-slate-800 shadow-xl space-y-5">
            {/* 1. Property */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                1. Property Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "bathroom", label: "Flat / Apartment", icon: HomeIcon },
                  { id: "villa", label: "Villa / Bungalow", icon: Building },
                  { id: "kitchen", label: "Kitchen Sink", icon: Flame },
                  { id: "commercial", label: "Hotel / Hostel", icon: Zap },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = usageArea === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setUsageArea(item.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-red-600 border-red-500 text-white font-bold shadow-md shadow-red-600/30"
                          : "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? "text-white" : "text-red-400"}`} />
                      <span className="text-xs">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Family Size */}
            {usageArea !== "kitchen" && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  2. Number of Users
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: "1-2", label: "1 - 2 People" },
                    { id: "3-4", label: "3 - 4 Family" },
                    { id: "5-8", label: "5 - 8 Members" },
                    { id: "large", label: "8+ Commercial" },
                  ].map((item) => {
                    const isSelected = familySize === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setFamilySize(item.id)}
                        className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                          isSelected
                            ? "bg-red-600 border-red-500 text-white font-bold shadow-md shadow-red-600/30"
                            : "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 3. Bathing Style */}
            {usageArea !== "kitchen" && usageArea !== "commercial" && (
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  3. Bathing Style
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "bucket", label: "Bucket Bath (15L)" },
                    { id: "rain_shower", label: "Rain Shower (25L+)" },
                    { id: "bathtub", label: "Bathtub / Jacuzzi" },
                  ].map((item) => {
                    const isSelected = bathingStyle === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setBathingStyle(item.id)}
                        className={`p-2.5 rounded-xl border text-center text-xs transition-all ${
                          isSelected
                            ? "bg-red-600 border-red-500 text-white font-bold shadow-md shadow-red-600/30"
                            : "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* 4. Technology Preference */}
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                4. Technology Preference
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "smart_electric", label: "5-Star Storage", icon: Zap },
                  { id: "tankless", label: "Instant Tankless", icon: Flame },
                  { id: "heatpump", label: "Heat Pump (70% Save)", icon: TrendingDown },
                  { id: "solar", label: "Solar (0 Bill)", icon: Sun },
                ].map((item) => {
                  const Icon = item.icon;
                  const isSelected = energyPriority === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setEnergyPriority(item.id)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-red-600 border-red-500 text-white font-bold shadow-md shadow-red-600/30"
                          : "bg-slate-800/60 border-slate-700/80 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 mb-1 ${isSelected ? "text-white" : "text-amber-400"}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sizing Result Card */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl p-5 sm:p-6 border border-red-500/40 shadow-xl flex flex-col justify-between">
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-2.5 py-0.5 bg-red-600 text-white text-[10px] font-extrabold uppercase tracking-wider rounded-md">
                  {recommendation.tag}
                </span>
                <span className="text-[11px] text-amber-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Best Match
                </span>
              </div>

              {/* Product Visual & Name */}
              <div className="flex gap-3.5 items-center mb-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/60">
                {recommendation.product?.image ? (
                  <img
                    src={recommendation.product.image}
                    alt={recommendation.title}
                    className="w-16 h-16 object-contain bg-white rounded-lg p-1 flex-shrink-0"
                  />
                ) : (
                  <div className="w-16 h-16 bg-slate-700 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-red-500" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm sm:text-base font-extrabold text-white leading-snug truncate">
                    {recommendation.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {recommendation.capacityNote}
                  </p>
                  {recommendation.product?.price && (
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-base font-black text-white">
                        {formatINR(recommendation.product.price)}
                      </span>
                      {recommendation.product.mrp && (
                        <span className="text-xs text-slate-500 line-through">
                          {formatINR(recommendation.product.mrp)}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Why This Fits */}
              <p className="text-xs text-slate-300 mb-3 bg-slate-800/30 p-2.5 rounded-lg border border-slate-700/40 leading-relaxed">
                💡 {recommendation.whyThisFits}
              </p>

              {/* 4 Quick Specs Chips */}
              <div className="grid grid-cols-2 gap-2 text-[11px] mb-4">
                <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                  <p className="text-slate-400">Hot Output</p>
                  <p className="font-bold text-white">{recommendation.ranchiWinterStats.output}</p>
                </div>
                <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                  <p className="text-slate-400">Reheat Time</p>
                  <p className="font-bold text-white">{recommendation.ranchiWinterStats.heatingTime}</p>
                </div>
                <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                  <p className="text-slate-400">Efficiency</p>
                  <p className="font-bold text-white">{recommendation.ranchiWinterStats.powerSaving}</p>
                </div>
                <div className="bg-slate-800/60 p-2 rounded-lg border border-slate-700/50">
                  <p className="text-slate-400">Tank Pressure</p>
                  <p className="font-bold text-white">{recommendation.ranchiWinterStats.pressure}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-3 border-t border-slate-800">
              {recommendation.product && !recommendation.product.is_project ? (
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all shadow-md ${
                      isCurrentInCart
                        ? "bg-emerald-600 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white shadow-red-600/30"
                    }`}
                  >
                    {isCurrentInCart ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>In Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  <a
                    href={getWhatsAppQuery()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              ) : (
                <a
                  href={getWhatsAppQuery()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Request Project Proposal</span>
                </a>
              )}

              <Link
                to={`/category/${recommendation.categoryId}`}
                className="w-full py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-colors border border-slate-700"
              >
                <span>View {recommendation.categoryName}</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
