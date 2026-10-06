import Navbar from "@/components/Navbar";
import SareeHero from "@/components/sarees/SareeHero";
import SareeTrustBadges from "@/components/sarees/SareeTrustBadges";
import SareeCatalog from "@/components/sarees/SareeCatalog";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { sareeConfig } from "@/data/saree-config";

export default function SareeHome() {
  const { settings } = sareeConfig;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-rose-500 selection:text-white">
      <Navbar />
      <SareeHero />
      <SareeTrustBadges />
      <SareeCatalog />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}
