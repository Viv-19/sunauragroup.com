import { Droplet, Zap, Award } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-red-900/70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4">
              SunAura
            </h1>
            <p className="text-xl sm:text-2xl text-red-400 font-semibold mb-8">
              Authorized Distributor of Racold
            </p>
          </div>

          <p className="text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
            Leading provider of solar water heaters and heat pump solutions for residential and commercial projects.
          </p>

          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
              <Droplet className="w-8 h-8 text-red-400" />
              <span className="text-white font-medium">Solar Water Heaters</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
              <Zap className="w-8 h-8 text-red-400" />
              <span className="text-white font-medium">Heat Pumps</span>
            </div>
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/20">
              <Award className="w-8 h-8 text-red-400" />
              <span className="text-white font-medium">Authorized Dealer</span>
            </div>
          </div>

          <button
            onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary mt-8"
            data-testid="hero-contact-button"
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
