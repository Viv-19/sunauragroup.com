import { useLocation, useNavigate } from "react-router-dom";
import { Flame, Sparkles } from "lucide-react";

export default function StoreSwitcher() {
  const location = useLocation();
  const navigate = useNavigate();

  const isSareeStore = location.pathname.startsWith("/sarees");

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 text-white text-xs py-1.5 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        {/* Left: Store Toggle Pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/90 rounded-full border border-slate-700 shadow-inner">
          <button
            type="button"
            onClick={() => navigate("/")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs transition-all ${
              !isSareeStore
                ? "bg-red-600 text-white shadow-md shadow-red-600/30 scale-[1.02]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>SunAura (Water Heaters)</span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/sarees")}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-bold text-xs transition-all ${
              isSareeStore
                ? "bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 text-white shadow-md shadow-rose-600/30 scale-[1.02]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Surat Saree Factory 🥻</span>
          </button>
        </div>

        {/* Right: Hyperlocal Delivery Tag */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>
            {isSareeStore
              ? "Surat Direct Wholesale Rates • Same-Day Ranchi Home Delivery"
              : "Authorized Racold Distributor • Same-Day Ranchi Delivery"}
          </span>
        </div>
      </div>
    </div>
  );
}
