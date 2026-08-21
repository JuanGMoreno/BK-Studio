import { Header } from './sections/Header';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Services } from './sections/Services';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { Toaster } from '@/components/ui/sonner';
import { LanguageProvider } from './contexts/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white text-foreground">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Services />
          <Contact />
        </main>
        <Footer />
        <Toaster position="bottom-right" richColors />
      </div>
    </LanguageProvider>
  );
}

export default App;
