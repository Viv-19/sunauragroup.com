import { Link } from "react-router-dom";
import { ShieldCheck, MapPin, Phone, Mail, MessageSquare } from "lucide-react";

export default function Footer({ settings }) {
  return (
    <footer className="bg-slate-950 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand Col */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/assets/sunaura logo.jpeg"
                alt="SunAura"
                className="h-12 w-12 rounded-xl object-contain bg-white p-1"
              />
              <div>
                <h3 className="text-2xl font-black tracking-tight text-white">SunAura</h3>
                <span className="text-xs text-red-400 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Authorized Distributor
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Jharkhand's premier destination for genuine Racold storage geysers, instant water heaters, turnkey solar heating projects, and commercial heat pumps.
            </p>
            <div className="text-xs text-slate-500 space-y-1">
              <p>GSTIN: {settings?.gstin || "20DZZPS7438M1ZB"}</p>
              <p>State: Jharkhand (Code 20)</p>
            </div>
          </div>

          {/* Solutions Col */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4">Racold Water Heating</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link to="/category/storage-geyser" className="hover:text-red-400 transition-colors">
                  Storage Geysers (10L - 100L)
                </Link>
              </li>
              <li>
                <Link to="/category/tankless-geyser" className="hover:text-red-400 transition-colors">
                  Tankless / Instant Geysers
                </Link>
              </li>
              <li>
                <Link to="/category/domestic-heatpump" className="hover:text-red-400 transition-colors">
                  Domestic Heat Pumps (200L - 500L)
                </Link>
              </li>
              <li>
                <Link to="/category/commercial-heatpump" className="hover:text-red-400 transition-colors">
                  Commercial Heat Pumps (12kW - 48kW)
                </Link>
              </li>
              <li>
                <Link to="/category/solar-water-heater" className="hover:text-red-400 transition-colors">
                  Solar Water Heaters (ETC & FPC)
                </Link>
              </li>
            </ul>
          </div>

          {/* Projects & Fast Links */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4">Turnkey Projects</h4>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  NIT Jamshedpur (12,000 LPD Solar)
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Hotel Clarks Inn Bokaro (48kW Heat Pump)
                </button>
              </li>
              <li>
                <button
                  onClick={() => document.getElementById('sizing-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                  className="hover:text-red-400 transition-colors text-left"
                >
                  Capacity & Sizing Calculator
                </button>
              </li>
              <li className="pt-2">
                <Link to="/admin" className="text-xs text-amber-400/80 hover:text-amber-300 font-semibold inline-flex items-center gap-1">
                  🔒 Admin & Stock Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Col */}
          <div>
            <h4 className="text-base font-bold text-white uppercase tracking-wider mb-4">Ranchi Store</h4>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                <span className="leading-snug text-xs">
                  {settings?.address || "8th Lane, Sarweshwari Nagar, Bajra, Itki Road, Ranchi"}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href={`tel:${settings?.phone || "+91-9204418515"}`} className="hover:text-white">
                  {settings?.phone || "+91-9204418515"}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-red-500 flex-shrink-0" />
                <a href={`mailto:${settings?.email || "sunauratec@gmail.com"}`} className="hover:text-white">
                  {settings?.email || "sunauratec@gmail.com"}
                </a>
              </div>
              <div className="pt-2">
                <a
                  href={`https://wa.me/919204418515?text=${encodeURIComponent('Hi SunAura, I need assistance with Racold water heating solutions.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Developer Credit & Copyright */}
        <div className="border-t border-slate-800/80 pt-8 text-center space-y-2">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-2 flex-wrap">
            Made with <span className="text-red-500">❤️</span> by
            <a href="mailto:viveshkrsingh19@gmail.com" className="text-red-400 hover:text-red-300 transition-colors font-medium">
              Vivesh Kumar Singh
            </a>
            <span className="text-gray-600">|</span>
            <span className="text-gray-300">8102190905</span>
            <span className="text-gray-600">|</span>
            <a href="mailto:viveshkrsingh19@gmail.com" className="text-gray-300 hover:text-red-300 transition-colors">
              viveshkrsingh19@gmail.com
            </a>
          </p>
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} SunAura. Authorized Distributor of Racold. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
