import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MessageSquare, 
  Calendar,
  Clock,
  CheckCircle,
  ArrowLeft
} from 'lucide-react';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';

const BookingForm = () => {
  const { t, language } = useLanguage();
  const { 
    selectedService, 
    selectedDate, 
    selectedTime, 
    addBooking,
    setSelectedService,
    setSelectedDate,
    setSelectedTime
  } = useBooking();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService || !selectedDate || !selectedTime) {
      toast({
        title: language === 'vi' ? 'Lỗi' : 'Error',
        description: language === 'vi' 
          ? 'Vui lòng chọn dịch vụ, ngày và giờ' 
          : 'Please select service, date and time',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    addBooking({
      service: selectedService,
      date: selectedDate,
      time: selectedTime,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      notes: formData.notes,
      status: 'confirmed',
    });

    setIsSubmitting(false);
    setIsSuccess(true);

    toast({
      title: t('booking.success'),
      description: t('booking.successMsg'),
    });
  };

  const handleBack = () => {
    if (isSuccess) {
      setSelectedService(null);
      setSelectedDate(null);
      setSelectedTime(null);
      navigate('/');
    } else {
      navigate('/booking');
    }
  };

  const handleNewBooking = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: '', email: '', phone: '', notes: '' });
    setIsSuccess(false);
    navigate('/services');
  };

  if (isSuccess) {
    return (
      <div className="bg-card rounded-xl border border-border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-success" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {t('booking.success')}
        </h2>
        <p className="text-muted-foreground mb-6">
          {t('booking.successMsg')}
        </p>
        
        <div className="bg-secondary/50 rounded-lg p-4 mb-6 text-left">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">
                {selectedDate && format(selectedDate, 'EEEE, dd MMMM yyyy', { 
                  locale: language === 'vi' ? vi : enUS 
                })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground">{selectedTime}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={handleBack} className="flex-1">
            {language === 'vi' ? 'Về trang chủ' : 'Go to Home'}
          </Button>
          <Button onClick={handleNewBooking} className="flex-1 gradient-primary text-primary-foreground">
            {language === 'vi' ? 'Đặt lịch mới' : 'New Booking'}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">
        {t('booking.title')}
      </h3>

      {/* Booking Summary */}
      {selectedService && selectedDate && selectedTime && (
        <div className="bg-primary/5 rounded-lg p-4 mb-6 border border-primary/10">
          <h4 className="font-medium text-foreground mb-2">
            {language === 'vi' ? selectedService.nameVi : selectedService.name}
          </h4>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>
                {format(selectedDate, 'dd/MM/yyyy', { locale: language === 'vi' ? vi : enUS })}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{selectedTime}</span>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="flex items-center gap-2 mb-2">
            <User className="w-4 h-4" />
            {t('booking.name')} *
          </Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder={language === 'vi' ? 'Nhập họ và tên' : 'Enter your full name'}
          />
        </div>

        <div>
          <Label htmlFor="email" className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4" />
            {t('booking.email')} *
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder={language === 'vi' ? 'Nhập email' : 'Enter your email'}
          />
        </div>

        <div>
          <Label htmlFor="phone" className="flex items-center gap-2 mb-2">
            <Phone className="w-4 h-4" />
            {t('booking.phone')}
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            placeholder={language === 'vi' ? 'Nhập số điện thoại' : 'Enter your phone number'}
          />
        </div>

        <div>
          <Label htmlFor="notes" className="flex items-center gap-2 mb-2">
            <MessageSquare className="w-4 h-4" />
            {t('booking.notes')}
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows={3}
            placeholder={language === 'vi' ? 'Ghi chú thêm (không bắt buộc)' : 'Additional notes (optional)'}
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => navigate('/booking')}
            className="flex-1 gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('booking.back')}
          </Button>
          <Button 
            type="submit" 
            className="flex-1 gradient-primary text-primary-foreground"
            disabled={isSubmitting || !selectedDate || !selectedTime}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                {language === 'vi' ? 'Đang xử lý...' : 'Processing...'}
              </span>
            ) : (
              t('booking.confirm')
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
