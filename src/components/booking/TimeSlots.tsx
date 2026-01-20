import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/contexts/BookingContext';
import { Clock } from 'lucide-react';
import { format } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';

const TimeSlots = () => {
  const { t, language } = useLanguage();
  const { selectedDate, selectedTime, setSelectedTime } = useBooking();

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
    '17:00', '17:30'
  ];

  // Simulate some slots being unavailable
  const unavailableSlots = ['10:30', '14:00', '15:30'];

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    if (language === 'en') {
      const period = hour >= 12 ? 'PM' : 'AM';
      const displayHour = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
      return `${displayHour}:${minutes} ${period}`;
    }
    return time;
  };

  if (!selectedDate) {
    return (
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          {t('calendar.available')}
        </h3>
        <div className="text-center py-8 text-muted-foreground">
          <Clock className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>{language === 'vi' ? 'Vui lòng chọn ngày trước' : 'Please select a date first'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          {t('calendar.available')}
        </h3>
        <span className="text-sm text-muted-foreground">
          {format(selectedDate, 'EEEE, dd MMM', { locale: language === 'vi' ? vi : enUS })}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {timeSlots.map((time) => {
          const isUnavailable = unavailableSlots.includes(time);
          const isSelected = selectedTime === time;

          return (
            <button
              key={time}
              onClick={() => !isUnavailable && setSelectedTime(time)}
              disabled={isUnavailable}
              className={`
                py-3 px-4 rounded-lg text-sm font-medium transition-all duration-200
                ${isSelected
                  ? 'bg-primary text-primary-foreground shadow-md scale-105'
                  : isUnavailable
                  ? 'bg-secondary/50 text-muted-foreground cursor-not-allowed opacity-50'
                  : 'bg-secondary hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary'
                }
              `}
            >
              {formatTime(time)}
            </button>
          );
        })}
      </div>

      {selectedTime && (
        <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/20">
          <div className="flex items-center gap-2 text-primary">
            <Clock className="w-4 h-4" />
            <span className="font-medium">
              {t('calendar.selected')}: {formatTime(selectedTime)}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSlots;
