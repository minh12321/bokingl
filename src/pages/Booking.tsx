import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import CalendarPicker from '@/components/booking/CalendarPicker';
import TimeSlots from '@/components/booking/TimeSlots';
import BookingForm from '@/components/booking/BookingForm';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Clock, Calendar } from 'lucide-react';

const Booking = () => {
  const { t, language } = useLanguage();
  const { selectedService, selectedDate, selectedTime } = useBooking();
  const navigate = useNavigate();

  const [step, setStep] = React.useState<'calendar' | 'form'>('calendar');

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      setStep('form');
    }
  };

  if (!selectedService) {
    return (
      <Layout>
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-md mx-auto text-center py-12">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                {language === 'vi' ? 'Chưa chọn dịch vụ' : 'No service selected'}
              </h2>
              <p className="text-muted-foreground mb-6">
                {language === 'vi' 
                  ? 'Vui lòng chọn một dịch vụ để tiếp tục đặt lịch'
                  : 'Please select a service to continue booking'}
              </p>
              <Button 
                onClick={() => navigate('/services')}
                className="gradient-primary text-primary-foreground gap-2"
              >
                {language === 'vi' ? 'Chọn dịch vụ' : 'Select a service'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout hideFooter>
      <section className="py-8 min-h-[calc(100vh-64px)]">
        <div className="container mx-auto px-4">
          {/* Back button and service info */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <Button 
              variant="ghost" 
              onClick={() => step === 'form' ? setStep('calendar') : navigate('/services')}
              className="gap-2 w-fit"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('booking.back')}
            </Button>
            
            <div className="flex items-center gap-4 bg-card rounded-lg px-4 py-2 border border-border">
              <div className={`w-3 h-3 rounded-full ${selectedService.color}`} />
              <div>
                <span className="font-medium text-foreground">
                  {language === 'vi' ? selectedService.nameVi : selectedService.name}
                </span>
                <span className="text-muted-foreground mx-2">•</span>
                <span className="text-muted-foreground flex items-center gap-1 inline-flex">
                  <Clock className="w-3 h-3" />
                  {selectedService.duration} {t('services.min')}
                </span>
              </div>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              step === 'calendar' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium">1</span>
              <span className="text-sm font-medium">{t('calendar.title')}</span>
            </div>
            <div className="w-8 h-0.5 bg-border" />
            <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
              step === 'form' ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'
            }`}>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-medium">2</span>
              <span className="text-sm font-medium">{t('booking.title')}</span>
            </div>
          </div>

          {step === 'calendar' ? (
            <div className="max-w-4xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-6">
                <CalendarPicker />
                <TimeSlots />
              </div>
              
              {selectedDate && selectedTime && (
                <div className="mt-6 flex justify-center">
                  <Button 
                    onClick={handleContinue}
                    className="gradient-primary text-primary-foreground gap-2 px-8"
                    size="lg"
                  >
                    {language === 'vi' ? 'Tiếp tục' : 'Continue'}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <div className="max-w-md mx-auto">
              <BookingForm />
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Booking;
