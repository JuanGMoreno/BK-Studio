import { useEffect, useRef, useState } from 'react';
import { Smartphone, ChefHat, Bike, Utensils } from 'lucide-react';

const steps = [
  {
    icon: Smartphone,
    title: 'Elige tu Comida',
    description:
      'Explora nuestro menú con más de 100 platillos deliciosos. Filtra por categoría, precio o tiempo de entrega.',
    color: 'bg-blue-500',
    number: '01',
  },
  {
    icon: ChefHat,
    title: 'Preparamos tu Pedido',
    description:
      'Nuestros chefs expertos preparan tu comida con ingredientes frescos y de la más alta calidad.',
    color: 'bg-orange-500',
    number: '02',
  },
  {
    icon: Bike,
    title: 'Entrega Express',
    description:
      'Nuestros repartidores llevan tu pedido directamente a tu puerta en menos de 30 minutos.',
    color: 'bg-green-500',
    number: '03',
  },
  {
    icon: Utensils,
    title: 'Disfruta tu Comida',
    description:
      'Recibe tu comida caliente y fresca. ¡Buen provecho! No olvides calificar tu experiencia.',
    color: 'bg-purple-500',
    number: '04',
  },
];

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const stepIndex = parseInt(
              entry.target.getAttribute('data-step') || '0'
            );
            setVisibleSteps(prev => [...new Set([...prev, stepIndex])]);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-50px' }
    );

    const stepElements = sectionRef.current?.querySelectorAll('[data-step]');
    stepElements?.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-20 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at 2px 2px, orange 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            Proceso Simple
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            ¿Cómo Funciona?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ordenar tu comida favorita nunca fue tan fácil. Sigue estos simples
            pasos y disfruta de una experiencia gastronómica increíble.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isVisible = visibleSteps.includes(index);

            return (
              <div
                key={index}
                data-step={index}
                className={`relative group ${
                  isVisible ? 'opacity-100' : 'opacity-0'
                }`}
                style={{
                  transform: isVisible
                    ? 'translateY(0)'
                    : 'translateY(30px)',
                  transition: `all 0.6s ease-out ${index * 0.15}s`,
                }}
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gray-200 -z-10">
                    <div
                      className="h-full bg-orange-500 transition-all duration-1000"
                      style={{
                        width: isVisible ? '100%' : '0%',
                        transitionDelay: `${index * 0.3 + 0.5}s`,
                      }}
                    />
                  </div>
                )}

                {/* Card */}
                <div className="bg-gray-50 rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                  {/* Number Badge */}
                  <div className="absolute -top-3 -right-3 w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Banner */}
        <div className="mt-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 lg:p-12">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Pedidos Entregados' },
              { value: '30 min', label: 'Tiempo Promedio' },
              { value: '4.9', label: 'Calificación Promedio' },
              { value: '100+', label: 'Restaurantes' },
            ].map((stat, index) => (
              <div key={index} className="text-white">
                <p className="text-4xl lg:text-5xl font-bold mb-2">
                  {stat.value}
                </p>
                <p className="text-white/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
