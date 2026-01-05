export default function Projects({ projects }) {
    return (
      <section id="projects" className="section-padding bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Successful Projects</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Our completed installations across various sectors</p>
          </div>
  
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="bg-gradient-to-br from-gray-50 to-red-50 rounded-2xl overflow-hidden shadow-lg hover-lift"
                data-testid={`project-card-${project.id}`}
              >
                <div className="h-80 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
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
      </section>
    );
  }
  