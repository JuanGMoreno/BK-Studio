import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    {
      title: t.footer.navigation,
      links: [
        { label: t.nav.projects, href: '#projects' },
        { label: t.nav.services, href: '#services' },
        { label: t.nav.about, href: '#about' },
        { label: t.nav.contact, href: '#contact' },
      ],
    },
    {
      title: t.footer.services,
      links: [
        { label: t.footer.exteriorRenders, href: '#services' },
        { label: t.footer.interiorRenders, href: '#services' },
        { label: t.footer.architecturalAnimations, href: '#services' },
        { label: t.footer.competitionVisualization, href: '#services' },
        { label: t.footer.realEstateVisualization, href: '#services' },
        { label: t.footer.studentSupport, href: '#services' },
      ],
    },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <footer className="bg-white text-foreground py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12 lg:mb-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-block mb-6"
              >
              </a>
            </div>

            {/* Links con menús desplegables mejorados */}
            {footerLinks.map((section) => (
              <div key={section.title} className="relative group">
                <h4 
                  className="text-sm tracking-widest uppercase mb-4 sm:mb-6 text-gray-900 cursor-pointer hover:text-primary transition-all duration-300 transform hover:scale-105"
                >
                  {section.title}
                  <svg 
                    className="inline-block ml-2 w-3 h-3 transition-transform duration-300 group-hover:rotate-180" 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M5.293 7.293a1 1 0 011.414 0l4.586 4.586a1 1 0 011.414 0L10 15.586l-4.586 4.586a1 1 0 01-1.414 0L5.293 7.293z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </h4>
                <ul 
                  className="opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl p-4 min-w-[200px] sm:min-w-[250px] z-50 transition-all duration-300 transform scale-95 group-hover:scale-100 origin-top-left"
                >
                  {section.links.map((link, index) => (
                    <li 
                      key={link.label}
                      className="opacity-0 transform translate-y-2 transition-all duration-300"
                      style={{ 
                        transitionDelay: `${index * 100}ms`,
                        animation: `fadeInUp 0.3s ease-out ${index * 0.1}s forwards`
                      }}
                    >
                      <button
                        onClick={() => scrollToSection(link.href)}
                        className="text-gray-600 hover:text-primary hover:bg-gray-50 transition-all duration-300 text-sm text-left w-full py-2 sm:py-3 px-3 sm:px-4 rounded-lg hover:shadow-md transform hover:scale-105"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-6 sm:pt-8 border-t border-gray-200 flex flex-col items-center gap-4">
            <p className="text-gray-600 text-xs sm:text-sm text-center">
              {t.footer.rights}
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2">
                {t.footer.privacyPolicy}
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2">
                {t.footer.termsOfService}
              </a>
            </div>
            {/* Logo justo debajo del texto */}
            <img
              src="/LOGO VERTICAL .png"
              alt="BKESTUDIO Logo"
              className="max-w-[150px] sm:max-w-[200px] max-h-[250px] sm:max-h-[300px] w-auto h-auto object-contain cursor-pointer hover:scale-110 transition-all duration-300"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
          </div>
        </div>
      </footer>
    </>
  );
};

// Agregar animación CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`;
document.head.appendChild(style);
