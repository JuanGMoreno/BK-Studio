import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types';
import { useLanguage } from '@/contexts/LanguageContext';

const projects = [
  // PROYECTO 1 - Chepe jardinería (2024)
  {
    id: 1,
    title: 'Chepe Jardinería',
    location: 'Proyecto Residencial',
    category: 'PROYECTO 1',
    image: '/proyectos/proyecto1/1_5_Photo.jpg',
    year: '2024',
    images: [
      { path: '/proyectos/proyecto1/1_5_Photo.jpg', type: 'exterior' },
      { path: '/proyectos/proyecto1/1_2_Photo.jpg', type: 'exterior' },
      { path: '/proyectos/proyecto1/1_3_Photo_copy_copy.jpg', type: 'exterior' },
    ],
    description: 'Proyecto de jardinería residencial con diseño de espacios exteriores.',
  },
  // PROYECTO 2 - Daniel (2025)
  {
    id: 2,
    title: 'Casa Daniel',
    location: 'Proyecto Residencial',
    category: 'PROYECTO 2',
    image: '/proyectos/proyecto2/FACHADA NE.jpg',
    year: '2025',
    images: [
      { path: '/proyectos/proyecto2/FACHADA NE.jpg', type: 'exterior' },
      { path: '/proyectos/proyecto2/G_8 - Photo.jpg', type: 'exterior' },
      { path: '/proyectos/proyecto2/1_8 - Photo (copy).jpg', type: 'interior' },
      { path: '/proyectos/proyecto2/hhhh_1 - Photo.jpg', type: 'interior' },
    ],
    description: 'Residencia completa con diseño de fachada y distribución interior moderna.',
  },
  // PROYECTO 3 - Tienda 1 (2025)
  {
    id: 3,
    title: 'Tienda Comercial 1',
    location: 'Proyecto Comercial',
    category: 'PROYECTO 3',
    image: '/proyectos/proyecto3/1-EDITADA.jpg',
    year: '2025',
    images: [
      { path: '/proyectos/proyecto3/1-EDITADA.jpg', type: 'exterior' },
      { path: '/proyectos/proyecto3/INTERIOR 1.jpg', type: 'exterior' },
      { path: '/proyectos/proyecto3/INTERIOR 3.jpg', type: 'interior' },
    ],
    description: 'Diseño de tienda comercial con fachada moderna y distribución interior optimizada.',
  },
  // PROYECTO 4 - Tienda 2 (2025)
  {
    id: 4,
    title: 'Tienda Comercial 2',
    location: 'Proyecto Comercial',
    category: 'PROYECTO 4',
    image: '/proyectos/proyecto4/2 V2.jpg',
    year: '2025',
    images: [
      { path: '/proyectos/proyecto4/2 V2.jpg', type: 'exterior' },
      { path: '/proyectos/proyecto4/2.jpg', type: 'interior' },
      { path: '/proyectos/proyecto4/4.jpg', type: 'interior' },
      { path: '/proyectos/proyecto4/5.jpg', type: 'interior' },
    ],
    description: 'Segundo proyecto comercial con diseño arquitectónico contemporáneo.',
  },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('TODOS');
  const [activeSubCategory, setActiveSubCategory] = useState('Todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const categories = [t.projects.all, t.projects.project1, t.projects.project2, t.projects.project3, t.projects.project4];
  const subCategories = [t.projects.allImages, t.projects.interiors, t.projects.exteriors];

  const filteredProjects = projects.filter((project) => {
    const categoryMatch = activeCategory === t.projects.all || project.category === activeCategory;
    return categoryMatch;
  });

  const getFilteredImages = (images: { path: string; type: string }[] = []) => {
    if (activeSubCategory === t.projects.allImages) return images;
    return images.filter(img => 
      activeSubCategory === t.projects.interiors ? img.type === 'interior' : img.type === 'exterior'
    );
  };

  const handleProjectClick = (project: Project) => {
    if (activeCategory === t.projects.all) {
      setSelectedProject(null);
      setSelectedImage('');
      setActiveCategory(project.category);
      setActiveSubCategory(t.projects.allImages);
    }
  };

  const handleImageClick = (project: Project, imagePath: string) => {
    setSelectedProject(project);
    setSelectedImage(imagePath);
  };

  // Resetear selectedImage cuando cambia el filtro principal
  useEffect(() => {
    return () => {
      setSelectedProject(null);
      setSelectedImage('');
    };
  }, [activeCategory]);

  useEffect(() => {
    return () => {
      setSelectedProject(null);
      setSelectedImage('');
    };
  }, [activeSubCategory]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = parseInt(entry.target.getAttribute('data-project') || '0');
            setVisibleProjects((prev) => [...new Set([...prev, projectId])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const projectElements = sectionRef.current?.querySelectorAll('[data-project]');
    projectElements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [filteredProjects]);

  return (
    <section id="projects" ref={sectionRef} className="py-24 bg-[#302F2C]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16">
          <p className="text-foreground/80 text-sm tracking-[0.3em] uppercase mb-4">
            {t.projects.title}
          </p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-primary">
            {t.projects.subtitle}
          </h2>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedProject(null);
                setSelectedImage('');
                setActiveCategory(category);
                setActiveSubCategory(t.projects.allImages);
              }}
              className={`text-xs sm:text-sm tracking-widest uppercase transition-all pb-2 border-b-2 ${
                activeCategory === category
                  ? 'text-white border-white'
                  : 'text-gray-400 border-transparent hover:text-white'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Subcategory Filter - solo mostrar si no es TODOS */}
        {activeCategory !== t.projects.all && (
          <div className="flex flex-wrap gap-2 sm:gap-4 mb-8 sm:mb-12">
            {subCategories.map((subCategory) => (
              <button
                key={subCategory}
                onClick={() => {
                  setSelectedProject(null);
                  setSelectedImage('');
                  setActiveSubCategory(subCategory);
                }}
                className={`text-xs sm:text-sm tracking-widest uppercase transition-all pb-2 border-b-2 ${
                  activeSubCategory === subCategory
                    ? 'text-white border-white'
                    : 'text-gray-400 border-transparent hover:text-white'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
              >
                {subCategory}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <div className={activeCategory === t.projects.all ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8' : 'space-y-12 lg:space-y-16'}>
          {activeCategory === t.projects.all ? (
            // Mostrar portadas cuando está en TODOS
            filteredProjects.map((project, index) => (
              <div
                key={project.id}
                data-project={project.id}
                onClick={() => handleProjectClick(project)}
                className={`group cursor-pointer transition-all duration-700 ${
                  visibleProjects.includes(project.id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-[4/3] rounded-lg">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500" />
                  
                  {/* Hover Arrow */}
                  <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                    <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                  </div>
                </div>

                {/* Project Info */}
                <div className="mt-3 sm:mt-4">
                  <h3 className="text-sm sm:text-base lg:text-lg font-medium text-orange-500 group-hover:text-orange-400 transition-colors">
                    {project.title} ({project.year})
                  </h3>
                  <p className="text-white text-xs sm:text-sm mt-1">{project.location === 'Proyecto Residencial' ? t.projects.residential : t.projects.commercial}</p>
                </div>
              </div>
            ))
          ) : (
            // Mostrar todas las imágenes cuando está en un proyecto específico
            filteredProjects.map((project, projectIndex) => (
              <div
                key={project.id}
                data-project={project.id}
                className={`transition-all duration-700 ${
                  visibleProjects.includes(project.id)
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${projectIndex * 150}ms` }}
              >
                {/* Project Header */}
                <div className="mb-6 sm:mb-8 text-center">
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-light text-orange-500 mb-2">
                    {project.title} ({project.year})
                  </h3>
                  <p className="text-white text-sm">{project.location}</p>
                </div>

                {/* Images Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {getFilteredImages(project.images).map((image, imageIndex) => (
                    <div
                      key={imageIndex}
                      className="group cursor-pointer overflow-hidden aspect-[4/3] rounded-lg bg-white shadow-md"
                      onClick={() => handleImageClick(project, image.path)}
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={image.path}
                          alt={`${project.title} - ${image.type}`}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                        
                        {/* Hover Arrow */}
                        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 shadow-lg">
                          <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-900" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-gray-900/90 flex items-center justify-center p-6"
          onClick={() => {
            setSelectedProject(null);
            setSelectedImage('');
          }}
        >
          <div
            className="bg-white max-w-4xl w-full max-h-[90vh] overflow-auto rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage || selectedProject.image}
              alt={selectedProject.title}
              className="w-full aspect-video object-cover"
            />
            <div className="p-8">
              <p className="text-gray-600 text-xs tracking-widest uppercase mb-2">
                {selectedProject.category} — {selectedProject.year}
              </p>
              <h3 className="text-3xl font-light text-gray-900 mb-4">
                {selectedProject.title}
              </h3>
              <p className="text-gray-600 mb-4">{selectedProject.location}</p>
              <p className="text-gray-500 leading-relaxed">
                {selectedProject.description}
              </p>
            </div>
            <button
              onClick={() => {
                setSelectedProject(null);
                setSelectedImage('');
              }}
              className="absolute top-6 right-6 text-gray-900 hover:text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
            >
              <span className="text-2xl">&times;</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
