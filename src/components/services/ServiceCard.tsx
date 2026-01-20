import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking, Service } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight, Video, Users, MessageSquare } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  const { t, language } = useLanguage();
  const { setSelectedService } = useBooking();
  const navigate = useNavigate();

  const handleSelect = () => {
    setSelectedService(service);
    navigate('/booking');
  };

  const formatDuration = (minutes: number) => {
    if (minutes >= 60) {
      const hours = minutes / 60;
      return `${hours} ${hours > 1 ? t('services.hours') : t('services.hour')}`;
    }
    return `${minutes} ${t('services.min')}`;
  };

  const getIcon = () => {
    switch (service.id) {
      case '1':
        return MessageSquare;
      case '2':
        return Users;
      case '3':
        return Video;
      case '4':
        return Users;
      default:
        return MessageSquare;
    }
  };

  const Icon = getIcon();

  return (
    <div className="group bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Color bar */}
      <div className={`h-1.5 ${service.color}`} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-12 h-12 rounded-xl ${service.color}/10 flex items-center justify-center`}>
            <Icon className={`w-6 h-6 ${service.color.replace('bg-', 'text-')}`} />
          </div>
          {service.price > 0 && (
            <div className="text-right">
              <span className="text-2xl font-bold text-foreground">${service.price}</span>
            </div>
          )}
          {service.price === 0 && (
            <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
              {language === 'vi' ? 'Miễn phí' : 'Free'}
            </span>
          )}
        </div>

        <h3 className="text-xl font-semibold text-foreground mb-2">
          {language === 'vi' ? service.nameVi : service.name}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-4">
          {language === 'vi' ? service.descriptionVi : service.description}
        </p>

        <div className="flex items-center gap-2 text-muted-foreground mb-6">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{formatDuration(service.duration)}</span>
        </div>

        <Button 
          onClick={handleSelect}
          className="w-full gradient-primary text-primary-foreground hover:opacity-90 gap-2 group"
        >
          {t('services.book')}
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </div>
  );
};

export default ServiceCard;
