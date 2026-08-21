import { useState, useRef, useEffect } from 'react';
import { MapPin, Phone, Mail, Send, ArrowRight, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useLanguage } from '@/contexts/LanguageContext';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  const contactInfo = [
    {
      icon: MapPin,
      title: t.contact.location,
      content: 'Sancti Spíritus, Cuba',
    },
    {
      icon: Phone,
      title: t.contact.phone,
      content: '+53 5 4913006',
    },
    {
      icon: Mail,
      title: t.contact.emailLabel,
      content: 'bkestudio3darch@gmail.com',
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      content: '+53 5 4913006',
      action: () => window.open('https://wa.me/5354913006', '_blank'),
    },
    {
      icon: Facebook,
      title: 'Facebook',
      content: 'BK Estudio',
      action: () => window.open('https://www.facebook.com/share/1Di7GwkWwc/', '_blank'),
    },
    {
      icon: Instagram,
      title: 'Instagram',
      content: '@bkestudio',
      action: () => window.open('https://instagram.com/bkestudio_arch', '_blank'),
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create Gmail compose URL with form data
      const subject = encodeURIComponent(formData.subject);
      const body = encodeURIComponent(`Nombre: ${formData.name}\nEmail: ${formData.email}\n\nMensaje:\n${formData.message}`);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&to=bkestudio3darch@gmail.com&su=${subject}&body=${body}`;
      
      // Open Gmail in new tab
      window.open(gmailUrl, '_blank');
      
      toast.success('Abriendo Gmail...', {
        description: 'Por favor envía el email cuando se abra',
      });

      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error('Error al enviar el mensaje', {
        description: 'Por favor intenta nuevamente',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-16 md:py-24 bg-[#302F2C] text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <p className="text-primary/80 text-xs sm:text-sm tracking-[0.3em] uppercase mb-4">
            {t.contact.title}
          </p>
          <h2
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {t.contact.subtitle === 'Hablemos de tu próximo proyecto' ? (
              <>
                Hablemos de tu
                <br />
                <span className="font-bold text-primary">próximo proyecto</span>
              </>
            ) : (
              <>
                Let's Talk About Your
                <br />
                <span className="font-bold text-primary">Next Project</span>
              </>
            )}
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Form */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="text-muted-foreground leading-relaxed text-sm">
                    {t.contact.name}
                  </label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary mt-2"
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>
                <div>
                  <label className="text-muted-foreground leading-relaxed text-sm">
                    {t.contact.email}
                  </label>
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary mt-2"
                    placeholder={t.contact.emailPlaceholder}
                  />
                </div>
              </div>
              <div>
                <label className="text-muted-foreground leading-relaxed text-sm">
                  {t.contact.subject}
                </label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary mt-2"
                  placeholder={t.contact.subjectPlaceholder}
                />
              </div>
              <div>
                <label className="text-muted-foreground leading-relaxed text-sm">
                  {t.contact.message}
                </label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-primary focus:ring-primary resize-none mt-2"
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 sm:px-8 py-4 sm:py-6 text-sm tracking-widest uppercase font-medium w-full sm:w-auto"
              >
                {isSubmitting ? (
                  t.contact.sending
                ) : (
                  <>
                    {t.contact.sendButton}
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div
            className={`space-y-6 sm:space-y-8 transition-all duration-700 delay-400 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            {contactInfo.map((info, index: number) => {
              const Icon = info.icon;
              return (
                <div
                  key={info.title}
                  className={`flex items-start gap-4 sm:gap-6 group ${
                    info.action ? 'cursor-pointer hover:scale-[1.02] transition-all duration-300' : ''
                  }`}
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                  onClick={info.action}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 transition-colors flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: '#4A4946' }}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-medium mb-2">{info.title}</h4>
                    <p className="text-muted-foreground whitespace-pre-line leading-relaxed text-sm">
                      {info.content}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* CTA */}
            <div className="pt-6 sm:pt-8 border-t border-border">
              <p className="text-muted-foreground mb-4 text-sm">
                {t.contact.preferMeeting}
              </p>
              <button className="flex items-center gap-2 text-foreground hover:text-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                <span className="text-xs sm:text-sm tracking-widest uppercase">
                  {t.contact.scheduleMeeting}
                </span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
