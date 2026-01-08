import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { websiteConfig } from "@/data/website-config";

export default function Home() {
  const { categories, projects, settings } = websiteConfig;

  return (
    <div>
      <Navbar />
      <Hero />
      <Products categories={categories} />
      <Projects projects={projects} />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}
