import { useRef, useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

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
    <section id="about" ref={sectionRef} className="py-16 md:py-24" style={{ backgroundColor: '#302F2C' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#302F2C' }}>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center" style={{ backgroundColor: '#302F2C' }}>
          {/* Left Column - Image */}
          <div
            className={`order-2 lg:order-1 transition-all duration-700 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <img
              src="/nosotros-imagen.jpg"
              alt="Nosotros"
              className="w-full h-auto rounded-lg shadow-xl"
            />
          </div>

          {/* Right Column - Content */}
          <div className="order-1 lg:order-2">
            <p className="text-primary/80 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
              {t.about.title}
            </p>
            <h2
              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-foreground mb-6 md:mb-8 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              {t.about.subtitle === 'Una visión diferente' ? (
                <>
                  Una visión
                  <br />
                  <span className="font-bold text-primary">diferente</span>
                </>
              ) : t.about.subtitle === 'A Different Vision' ? (
                <>
                  A Different
                  <br />
                  <span className="font-bold text-primary">Vision</span>
                </>
              ) : (
                t.about.subtitle
              )}
            </h2>

            <div
              className={`space-y-4 md:space-y-6 transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {t.about.description1}
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {t.about.description2}
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {t.about.description3}
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {t.about.description4}
              </p>
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {t.about.description5}
              </p>
            </div>

            {/* Signature */}
            <div
              className={`mt-8 md:mt-10 pt-6 md:pt-8 border-t border-border transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <p className="text-foreground font-medium text-base md:text-lg">Arq. Roberto Muñoz</p>
              <p className="text-muted-foreground text-xs md:text-sm">Director</p>
            </div>
          </div>

          </div>
      </div>
    </section>
  );
}
