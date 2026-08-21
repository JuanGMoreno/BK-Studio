import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-image.png"
          alt="Arquitectura moderna"
          className={`w-full h-full object-cover transition-transform duration-[2000ms] ${
            isLoaded ? 'scale-100' : 'scale-110'
          }`}
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <p className="text-foreground/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight mb-2 font-futura-text">
            {t.hero.optimizeTime}
          </p>
          <p className="text-foreground text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight mb-4 sm:mb-6 md:mb-8 font-futura-title">
            {t.hero.guaranteeResults}
          </p>
        </div>

        <p
          className={`text-muted-foreground text-sm sm:text-base md:text-lg max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl font-light leading-relaxed transition-all duration-1000 delay-700 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          } font-futura-text`}
        >
          {t.hero.visualization}
        </p>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToProjects}
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-primary transition-colors duration-500 delay-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs tracking-[0.2em] uppercase font-futura-text">{t.hero.explore}</span>
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </div>
      </button>

      {/* Side Info */}
      <div
        className={`hidden lg:block absolute bottom-10 left-10 text-muted-foreground text-left transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-xs tracking-widest uppercase font-futura-text">{t.hero.since}</p>
        <p className="text-xs tracking-widest uppercase mt-1 font-futura-text">{t.hero.location}</p>
      </div>

      {/* Mobile Side Info */}
      <div
        className={`lg:hidden absolute bottom-10 left-6 text-muted-foreground text-left transition-all duration-1000 delay-1000 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <p className="text-[10px] tracking-widest uppercase font-futura-text">{t.hero.since}</p>
        <p className="text-[10px] tracking-widest uppercase mt-1 font-futura-text">{t.hero.location}</p>
      </div>
    </section>
  );
}
