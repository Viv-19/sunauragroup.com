import { useState, useEffect } from "react";
import { MessageSquare, Building2, Zap, CheckCircle2, ChevronRight } from "lucide-react";
import { websiteConfig } from "@/data/website-config";

function ProjectImageSlider({ images, title }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <div className="h-64 sm:h-72 overflow-hidden relative bg-gray-900 group">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`${title} - Slide ${index + 1}`}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      
      {/* Slide Indicator Dots */}
      {images.length > 1 && (
        <div className="absolute bottom-3 left-4 flex gap-1.5 z-10">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 rounded-full transition-all ${
                idx === currentIndex ? "w-5 bg-red-500" : "w-1.5 bg-white/50"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Projects({ projects }) {
  const { settings } = websiteConfig;

  const getProjectConsultWhatsApp = (project) => {
    const msg = `Hello SunAura! I am looking for a commercial solar or heat pump project proposal similar to *${project.title}*. Please share consultation details.`;
    return `https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="projects" className="py-16 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-bold uppercase tracking-wider mb-2.5">
            <Building2 className="w-3.5 h-3.5" />
            <span>Turnkey Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
            Commercial & Solar Installations
          </h2>
          <p className="text-sm text-gray-400">
            Institutional solar arrays and commercial heat pump projects executed across Jharkhand.
          </p>
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-slate-800/90 rounded-2xl overflow-hidden border border-slate-700/70 shadow-xl flex flex-col justify-between hover:border-slate-600 transition-all duration-300"
            >
              <div>
                <ProjectImageSlider images={project.images} title={project.title} />
                
                <div className="p-6">
                  {/* Category & Scope Pills */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.category && (
                      <span className="px-2.5 py-0.5 bg-red-600/20 text-red-400 border border-red-500/30 text-[11px] font-bold rounded-md">
                        {project.category}
                      </span>
                    )}
                    {project.scope && (
                      <span className="px-2.5 py-0.5 bg-slate-700 text-gray-200 text-[11px] font-semibold rounded-md flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" /> {project.scope}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                    {project.title}
                  </h3>

                  {project.capacity && (
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold mb-3 bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20">
                      <Zap className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{project.capacity}</span>
                    </div>
                  )}

                  <p className="text-gray-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 mt-auto">
                <a
                  href={getProjectConsultWhatsApp(project)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md shadow-red-600/30 transition-all"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Request Similar Project Proposal</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-red-950/50 via-slate-800 to-slate-900 border border-red-500/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-lg sm:text-xl font-bold text-white">Need a Solar or Heat Pump site survey?</h4>
            <p className="text-gray-400 text-xs mt-0.5">
              Free rooftop plumbing & electrical feasibility assessment for your building.
            </p>
          </div>
          <a
            href={`https://wa.me/${settings.whatsapp_number}?text=${encodeURIComponent('Hello SunAura! I would like to book a free site survey for a Solar / Heat Pump project.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-white text-gray-900 hover:bg-gray-100 rounded-xl font-bold text-xs whitespace-nowrap shadow-md transition-all flex-shrink-0"
          >
            Book Free Site Survey
          </a>
        </div>
      </div>
    </section>
  );
}
