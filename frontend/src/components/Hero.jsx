import { Droplet, Zap, Award, Flame } from "lucide-react";
import { useState, useEffect } from "react";
import { websiteConfig } from "@/data/website-config";

export default function Hero() {
  const { hero_images } = websiteConfig.settings;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);

    // Rotate background images every 2 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        (prevIndex + 1) % hero_images.length
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [hero_images.length]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Multiple Background Images with Fade Transition */}
      {hero_images.map((image, index) => (
        <div
          key={index}
          className={`bg-transition ${index === currentImageIndex ? 'active' : 'inactive'}`}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="img"
          aria-label={`SunAura Solar and Heat Pump Solutions - Slide ${index + 1}`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-900/80 to-red-900/70"></div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <div className={`${isLoaded ? 'slide-down' : 'opacity-0'}`}>
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-4">
              SunAura
            </h1>
            <p className="text-xl sm:text-2xl text-red-400 font-semibold mb-8">
              Authorized Distributor of Racold
            </p>
          </div>

          <p className={`text-xl sm:text-2xl text-gray-200 max-w-3xl mx-auto leading-relaxed ${isLoaded ? 'slide-up stagger-1' : 'opacity-0'}`}>
            Leading provider of geysers, solar water heaters and heat pump solutions for residential and commercial projects.
          </p>

          <div className={`flex flex-wrap justify-center gap-6 mt-12 ${isLoaded ? 'slide-up stagger-2' : 'opacity-0'}`}>
            <div className="flex items-center space-x-3 glass-premium px-6 py-4 rounded-2xl transform hover:scale-105 transition-transform duration-300">
              <Flame className="w-8 h-8 text-red-400" />
              <span className="text-white font-medium">Geysers</span>
            </div>
            <div className="flex items-center space-x-3 glass-premium px-6 py-4 rounded-2xl transform hover:scale-105 transition-transform duration-300">
              <Droplet className="w-8 h-8 text-red-400" />
              <span className="text-white font-medium">Solar Water Heaters</span>
            </div>
            <div className="flex items-center space-x-3 glass-premium px-6 py-4 rounded-2xl transform hover:scale-105 transition-transform duration-300">
              <Zap className="w-8 h-8 text-red-400" />
              <span className="text-white font-medium">Heat Pumps</span>
            </div>
            <div className="flex items-center space-x-3 glass-premium px-6 py-4 rounded-2xl transform hover:scale-105 transition-transform duration-300">
              <Award className="w-8 h-8 text-red-400" />
              <span className="text-white font-medium">Authorized Distributor</span>
            </div>
          </div>

          <div className={isLoaded ? 'scale-in stagger-3' : 'opacity-0'}>
            <button
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary mt-8"
              data-testid="hero-contact-button"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}
