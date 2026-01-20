import React from 'react';
import Layout from '@/components/layout/Layout';
import ServiceCard from '@/components/services/ServiceCard';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/contexts/BookingContext';

const Services = () => {
  const { t } = useLanguage();
  const { services } = useBooking();

  return (
    <Layout>
      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12 animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {t('services.title')}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
