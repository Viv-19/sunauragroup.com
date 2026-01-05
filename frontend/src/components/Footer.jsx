export default function Footer({ settings }) {
    return (
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">SunAura</h3>
              <p className="text-red-400 text-sm mb-4">Authorized Distributor of Racold</p>
              <p className="text-gray-400 text-sm">Leading provider of solar water heaters and heat pump solutions.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <div className="space-y-2 text-gray-400 text-sm">
                <p>{settings?.phone || "+91-1234567890"}</p>
                <p>{settings?.email || "contact@sunaura.com"}</p>
                <p>{settings?.address || "Bokaro, Jharkhand, India"}</p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <div className="space-y-2">
                <button onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })} className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Products
                </button>
                <button onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })} className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Projects
                </button>
                <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Contact
                </button>
                <a href="/admin/login" className="block text-gray-400 hover:text-white text-sm transition-colors">
                  Admin Login
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400 text-sm">© {new Date().getFullYear()} SunAura. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }
  