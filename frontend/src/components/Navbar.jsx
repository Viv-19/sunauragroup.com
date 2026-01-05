import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-4">
            <img
              src="/assets/sunaura logo.jpeg"
              alt="SunAura Logo"
              className="h-16 w-16 rounded-lg shadow-sm object-contain"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">SunAura</h1>
              <p className="text-xs text-red-600 font-medium">Authorized Distributor of Racold</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('products')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Products
            </button>
            <button onClick={() => scrollToSection('projects')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-red-600 font-medium transition-colors">
              Contact
            </button>
            <a
              href="/admin/login"
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors shadow-md border-2 border-red-700"
              title="Only for Admin"
            >
              Admin Login
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            data-testid="mobile-menu-button"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t" data-testid="mobile-menu">
          <div className="px-4 py-4 space-y-3">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
              Home
            </button>
            <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
              Products
            </button>
            <button onClick={() => scrollToSection('projects')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
              Projects
            </button>
            <button onClick={() => scrollToSection('contact')} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors">
              Contact
            </button>
            <a
              href="/admin/login"
              className="block w-full text-center px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors shadow-md border-2 border-red-700"
              title="Only for Admin"
            >
              Admin Login
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
