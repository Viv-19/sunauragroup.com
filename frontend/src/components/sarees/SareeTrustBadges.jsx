import { ShieldCheck, Truck, Sparkles, IndianRupee } from "lucide-react";

export default function SareeTrustBadges() {
  const guarantees = [
    {
      icon: IndianRupee,
      title: "Direct Mill Wholesale",
      desc: "Sourced directly from Surat looms with zero middleman markup.",
      badge: "Wholesale Rate",
      color: "text-amber-600 bg-amber-50 border-amber-200",
    },
    {
      icon: Truck,
      title: "Doorstep Fabric Check",
      desc: "Inspect fabric quality, zari work, and drape before payment in Ranchi.",
      badge: "COD in Ranchi",
      color: "text-rose-600 bg-rose-50 border-rose-200",
    },
    {
      icon: ShieldCheck,
      title: "100% Authentic Weaves",
      desc: "Genuine Banarasi, Kanjivaram, and pure Surat georgette materials.",
      badge: "Quality Verified",
      color: "text-emerald-600 bg-emerald-50 border-emerald-200",
    },
    {
      icon: Sparkles,
      title: "Blouse Piece Included",
      desc: "All sarees come with matching 0.8m unstitched designer blouse piece.",
      badge: "Complete Set",
      color: "text-purple-600 bg-purple-50 border-purple-200",
    },
  ];

  return (
    <section className="py-14 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>The Surat Saree Factory Advantage</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Why Ranchi Prefers Us for Sarees
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guarantees.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="bg-slate-50/70 rounded-2xl p-5 border border-gray-200/80 hover:bg-white hover:border-gray-300 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className={`p-2.5 rounded-xl border ${item.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-gray-200">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-1">
                    {item.title}
                  </h3>

                  <p className="text-xs text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
