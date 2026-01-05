export default function Projects({ projects }) {
  // Duplicate projects array for seamless infinite scroll
  const duplicatedProjects = [...projects, ...projects];

  return (
    <section id="projects" className="section-padding bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Successful Projects</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our completed installations across various sectors</p>
        </div>

        <div className="scroll-container">
          <div className="scroll-content">
            {duplicatedProjects.map((project, index) => (
              <div
                key={`${project.id}-${index}`}
                className="premium-card hover-lift flex-shrink-0 w-[500px]"
                data-testid={index < projects.length ? `project-card-${project.id}` : undefined}
              >
                <div className="h-80 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

