import { useState, useEffect } from 'react';
import { Menu, X, Languages } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const navLinks = [
  { href: '#hero' },
  { href: '#about' },
  { href: '#projects' },
  { href: '#services' },
  { href: '#contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, toggleLanguage } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 h-20 ${
        isScrolled
          ? 'bg-[#302F2C]/95 backdrop-blur-md border-b border-[#4A4946]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-full">
        <div className="flex items-center justify-between h-full">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center h-full transition-transform duration-500"
            style={{ transform: isScrolled ? 'translateY(8px)' : 'translateY(0)' }}
          >
            <img 
              src={isScrolled ? "/logo-naranja.png" : "/logo-positivo.png"}
              alt="ARQ Studio Logo" 
              className="h-42 md:h-42 w-auto max-w-[120px] md:max-w-[160px] transition-all duration-500 ease-in-out hover:opacity-80 object-contain"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className={`text-sm tracking-widest uppercase transition-colors hover:text-primary font-futura-text ${
                  isScrolled ? 'text-foreground' : 'text-foreground'
                } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
              >
                {Object.values(t.nav)[index]}
              </button>
            ))}
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-primary font-futura-text flex items-center gap-2 ${
                isScrolled ? 'text-foreground' : 'text-foreground'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            >
              <Languages className="w-4 h-4" />
              {t.lang}
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            {/* Language Toggle Mobile */}
            <button
              onClick={toggleLanguage}
              className={`transition-colors ${
                isScrolled ? 'text-foreground' : 'text-foreground'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            >
              <Languages className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors ${
                isScrolled ? 'text-foreground' : 'text-foreground'
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4 bg-[#302F2C]/95 backdrop-blur-sm absolute left-0 right-0 top-full">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="flex flex-col gap-3">
                {navLinks.map((link, index) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className={`text-left text-sm tracking-widest uppercase py-3 px-4 transition-colors hover:text-primary font-futura-text rounded-lg hover:bg-[#4A4946]/20 ${
                      isScrolled ? 'text-foreground' : 'text-foreground'
                    } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                  >
                    {Object.values(t.nav)[index]}
                  </button>
                ))}
                {/* Language Toggle Mobile Menu */}
                <button
                  onClick={toggleLanguage}
                  className={`text-left text-sm tracking-widest uppercase py-3 px-4 transition-colors hover:text-primary font-futura-text flex items-center gap-2 rounded-lg hover:bg-[#4A4946]/20 ${
                    isScrolled ? 'text-foreground' : 'text-foreground'
                  } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`}
                >
                  <Languages className="w-4 h-4" />
                  {t.langFull}
                </button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
