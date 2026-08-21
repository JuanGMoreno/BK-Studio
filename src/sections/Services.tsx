import { useRef, useEffect, useState } from 'react';
import { Image, Home, Play, Trophy, Building, GraduationCap } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  const services = [
    {
      icon: Image,
      title: t.services.exteriorRenders.title,
      description: t.services.exteriorRenders.description,
    },
    {
      icon: Home,
      title: t.services.interiorRenders.title,
      description: t.services.interiorRenders.description,
    },
    {
      icon: Play,
      title: t.services.architecturalAnimations.title,
      description: t.services.architecturalAnimations.description,
    },
    {
      icon: Trophy,
      title: t.services.competitionVisualization.title,
      description: t.services.competitionVisualization.description,
    },
    {
      icon: Building,
      title: t.services.realEstateVisualization.title,
      description: t.services.realEstateVisualization.description,
    },
    {
      icon: GraduationCap,
      title: t.services.studentSupport.title,
      description: t.services.studentSupport.description,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-16 md:py-24 bg-[#302F2C]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-20">
          <div>
            <p className="text-primary/80 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
              {t.services.title}
            </p>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-foreground transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {t.services.title === 'SERVICIOS' ? (
                <>
                  Lo que
                  <br />
                  <span className="font-bold text-primary">hacemos</span>
                </>
              ) : (
                <>
                  What
                  <br />
                  <span className="font-bold text-primary">We Do</span>
                </>
              )}
            </h2>
          </div>
          <div
            className={`flex items-end transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <p className="text-muted-foreground text-sm sm:text-base lg:text-lg leading-relaxed max-w-lg">
              {t.services.description}
            </p>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className="group p-6 sm:p-8 hover:shadow-xl transition-all duration-500"
                style={{ 
                  backgroundColor: '#3A3A3A',
                  transitionDelay: `${300 + index * 100}ms`
                }}
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 transition-colors duration-300 flex items-center justify-center mb-4 sm:mb-6"
                  style={{ backgroundColor: '#4A4946' }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-foreground group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-lg sm:text-xl font-medium text-foreground mb-3 sm:mb-4">
                  {service.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
