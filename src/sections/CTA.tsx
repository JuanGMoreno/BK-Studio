import { useEffect, useRef, useState } from 'react';
import { Download, Apple, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-orange-500 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-white/10 rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div
            className={`text-center lg:text-left transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-10'
            }`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Descarga Nuestra App
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-xl">
              Ordena tu comida favorita desde cualquier lugar. Recibe
              notificaciones en tiempo real, acumula puntos y obtén descuentos
              exclusivos.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-900 text-white px-6 py-6 rounded-xl"
              >
                <Apple className="w-8 h-8 mr-3" />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Descargar en</p>
                  <p className="font-semibold">App Store</p>
                </div>
              </Button>
              <Button
                size="lg"
                className="bg-black hover:bg-gray-900 text-white px-6 py-6 rounded-xl"
              >
                <Download className="w-8 h-8 mr-3" />
                <div className="text-left">
                  <p className="text-xs text-gray-400">Disponible en</p>
                  <p className="font-semibold">Google Play</p>
                </div>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-8 mt-10">
              <div className="text-white">
                <p className="text-3xl font-bold">100K+</p>
                <p className="text-white/70 text-sm">Descargas</p>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold">4.8</p>
                <p className="text-white/70 text-sm">Calificación</p>
              </div>
              <div className="text-white">
                <p className="text-3xl font-bold">50+</p>
                <p className="text-white/70 text-sm">Ciudades</p>
              </div>
            </div>
          </div>

          {/* Phone Mockup */}
          <div
            className={`hidden lg:flex justify-center transition-all duration-700 delay-300 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-72 h-[500px] bg-gray-900 rounded-[3rem] border-8 border-gray-800 shadow-2xl overflow-hidden">
                {/* Screen */}
                <div className="w-full h-full bg-white p-4">
                  {/* App Header */}
                  <div className="bg-orange-500 -mx-4 -mt-4 px-4 py-6 mb-4">
                    <div className="flex items-center gap-2 text-white">
                      <Smartphone className="w-6 h-6" />
                      <span className="font-bold">FoodExpress</span>
                    </div>
                  </div>

                  {/* App Content Mock */}
                  <div className="space-y-3">
                    <div className="h-32 bg-gray-100 rounded-xl" />
                    <div className="flex gap-2">
                      <div className="h-20 w-1/2 bg-gray-100 rounded-xl" />
                      <div className="h-20 w-1/2 bg-gray-100 rounded-xl" />
                    </div>
                    <div className="h-24 bg-gray-100 rounded-xl" />
                    <div className="h-24 bg-gray-100 rounded-xl" />
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-8 bg-white rounded-xl p-3 shadow-xl animate-bounce">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-xl">🎉</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">¡Pedido</p>
                    <p className="font-bold text-gray-900">Entregado!</p>
                  </div>
                </div>
              </div>

              <div
                className="absolute -bottom-4 -left-8 bg-white rounded-xl p-3 shadow-xl"
                style={{ animation: 'bounce 2s infinite 0.5s' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                    <span className="text-orange-600 text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Ganaste</p>
                    <p className="font-bold text-gray-900">100 Puntos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
