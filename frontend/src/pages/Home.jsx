import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [projects, setProjects] = useState([]);
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, projectsRes, settingsRes] = await Promise.all([
          axios.get(`${API}/products`),
          axios.get(`${API}/projects`),
          axios.get(`${API}/settings`)
        ]);
        setProducts(productsRes.data);
        setProjects(projectsRes.data);
        setSettings(settingsRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <Hero />
      <Products products={products} />
      <Projects projects={projects} />
      <Contact settings={settings} />
      <Footer settings={settings} />
    </div>
  );
}
