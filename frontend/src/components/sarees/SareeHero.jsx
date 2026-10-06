import { Sparkles, ArrowRight, MessageSquare, ShieldCheck, Heart, Crown, Gem } from "lucide-react";
import { useState, useEffect } from "react";
import { sareeConfig } from "@/data/saree-config";

export default function SareeHero() {
  const { settings } = sareeConfig;
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [textFade, setTextFade] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const images = settings.hero_images || [
    "/assets/sarees/saree-hero-1.jpeg",
    "/assets/sarees/saree-hero-2.jpeg",
    "/assets/sarees/saree-hero-3.jpeg",
    "/assets/sarees/saree-hero-4.jpeg",
  ];

  useEffect(() => {
    setIsLoaded(true);

    const imagesToRotate = settings.hero_images;
    if (imagesToRotate && imagesToRotate.length > 1) {
      const imageInterval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesToRotate.length);
      }, 4500);

      return () => clearInterval(imageInterval);
    }
  }, [settings.hero_images]);

  // 2-Second Rotating Headline Switcher
  useEffect(() => {
    const headlineInterval = setInterval(() => {
      setTextFade(false);
      setTimeout(() => {
        setHeadlineIndex((prev) => (prev === 0 ? 1 : 0));
        setTextFade(true);
      }, 200); // 200ms smooth fade transition
    }, 2000); // 2 seconds per state

    return () => clearInterval(headlineInterval);
  }, []);

  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
      {/* Background Slides with full uncropped background cover */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`bg-transition ${index === currentImageIndex ? 'active' : 'inactive'}`}
          style={{
            backgroundImage: `url('${image}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          role="img"
          aria-label={`Surat Saree Slide ${index + 1}`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/80 to-slate-950/95" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16">
        <div className="space-y-6">
          {/* Badge */}
          <div className={`${isLoaded ? 'slide-down' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-600/20 text-rose-300 border border-rose-500/30 text-xs font-bold tracking-wide backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Direct from Surat Mills • Ranchi, Jharkhand</span>
            </div>
          </div>

          {/* Animated 2-Second Rotating Headline Container */}
          <div className="min-h-[140px] sm:min-h-[170px] lg:min-h-[190px] flex items-center justify-center">
            <div
              className={`transition-all duration-300 transform ${
                textFade ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-2"
              }`}
            >
              {headlineIndex === 0 ? (
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight">
                  Authentic Surat Sarees <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300">
                    At Direct Mill Rates
                  </span>
                </h1>
              ) : (
                <h1 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-400 to-amber-300 drop-shadow-2xl">
                  Surat Saree Factory
                </h1>
              )}
            </div>
          </div>

          {/* Short, Punchy Subtitle */}
          <p className={`text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal ${isLoaded ? 'slide-up stagger-1' : 'opacity-0'}`}>
            Banarasi Katan, Kanjivaram Silk, Flowy Georgette & Bridal Zari with doorstep fabric inspection and same-day delivery in Ranchi.
          </p>

          {/* Clean Feature Badges */}
          <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 pt-2 ${isLoaded ? 'slide-up stagger-2' : 'opacity-0'}`}>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
              <Crown className="w-3.5 h-3.5 text-amber-400" /> Banarasi & Kanjivaram
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
              <Gem className="w-3.5 h-3.5 text-rose-400" /> Surat Georgette
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
              <Heart className="w-3.5 h-3.5 text-pink-400" /> Pure Cotton & Linen
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Check at Doorstep (COD)
            </span>
          </div>

          {/* Action CTAs */}
          <div className={`flex flex-wrap items-center justify-center gap-3 pt-4 ${isLoaded ? 'scale-in stagger-3' : 'opacity-0'}`}>
            <button
              onClick={() => document.getElementById('saree-catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3.5 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-bold rounded-xl shadow-lg shadow-rose-600/30 transition-all flex items-center gap-2 text-sm hover:-translate-y-0.5"
            >
              <span>Explore Saree Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => document.getElementById('saree-catalog')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl backdrop-blur-md border border-white/20 transition-all text-sm hover:-translate-y-0.5"
            >
              Fabric Catalogue
            </button>

            <a
              href={`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent('Hello Surat Saree Factory! I would like to see the latest saree collection with delivery in Ranchi.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-md shadow-emerald-600/30 transition-all flex items-center gap-2 text-sm hover:-translate-y-0.5"
            >
              <MessageSquare className="w-4 h-4" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 30L60 25C120 20 240 10 360 15C480 20 600 35 720 40C840 45 960 40 1080 30C1200 20 1320 10 1380 5L1440 0V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0V30Z" fill="#f8fafc" />
        </svg>
      </div>
    </section>
  );
}
