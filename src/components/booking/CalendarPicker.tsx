import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking } from '@/contexts/BookingContext';
import { Calendar } from '@/components/ui/calendar';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const CalendarPicker = () => {
  const { t } = useLanguage();
  const { selectedDate, setSelectedDate, setSelectedTime } = useBooking();

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date || null);
    setSelectedTime(null);
  };

  const disabledDays = [
    { before: new Date() },
    { dayOfWeek: [0] }, // Disable Sundays
  ];

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        {t('calendar.title')}
      </h3>
      
      <Calendar
        mode="single"
        selected={selectedDate || undefined}
        onSelect={handleDateSelect}
        disabled={disabledDays}
        className={cn("p-0 pointer-events-auto w-full")}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4 w-full",
          caption: "flex justify-center pt-1 relative items-center mb-4",
          caption_label: "text-lg font-semibold text-foreground",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            "h-9 w-9 bg-secondary hover:bg-secondary/80 rounded-lg p-0 flex items-center justify-center transition-colors"
          ),
          nav_button_previous: "absolute left-0",
          nav_button_next: "absolute right-0",
          table: "w-full border-collapse space-y-1",
          head_row: "flex w-full",
          head_cell: "text-muted-foreground rounded-md w-full font-medium text-[0.8rem] py-2",
          row: "flex w-full mt-1",
          cell: cn(
            "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 w-full"
          ),
          day: cn(
            "h-10 w-full p-0 font-normal rounded-lg transition-colors",
            "hover:bg-primary/10 hover:text-primary",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          ),
          day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground",
          day_today: "border-2 border-primary text-primary font-semibold",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-30 cursor-not-allowed hover:bg-transparent",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
      />
    </div>
  );
};

export default CalendarPicker;
