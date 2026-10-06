import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import SizingFinder from "@/components/SizingFinder";
import Products from "@/components/Products";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { useProducts } from "@/context/ProductsContext";
import { websiteConfig } from "@/data/website-config";

export default function Home() {
  const { categories, settings } = useProducts();
  const { projects } = websiteConfig;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 selection:bg-red-500 selection:text-white">
      <Navbar />
      <Hero />
      <TrustBadges />
      <Products categories={categories} />
      <SizingFinder />
      <Projects projects={projects} />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}
