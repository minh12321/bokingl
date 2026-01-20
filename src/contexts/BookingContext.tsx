import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Service {
  id: string;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  duration: number;
  price: number;
  color: string;
}

export interface Booking {
  id: string;
  service: Service;
  date: Date;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
}

interface BookingContextType {
  selectedService: Service | null;
  setSelectedService: (service: Service | null) => void;
  selectedDate: Date | null;
  setSelectedDate: (date: Date | null) => void;
  selectedTime: string | null;
  setSelectedTime: (time: string | null) => void;
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  cancelBooking: (id: string) => void;
  services: Service[];
}

const services: Service[] = [
  {
    id: '1',
    name: 'Consultation',
    nameVi: 'Tư vấn',
    description: '30-minute one-on-one consultation session',
    descriptionVi: 'Buổi tư vấn 1-1 trong 30 phút',
    duration: 30,
    price: 0,
    color: 'bg-primary',
  },
  {
    id: '2',
    name: 'Business Meeting',
    nameVi: 'Họp doanh nghiệp',
    description: '60-minute business discussion and planning',
    descriptionVi: 'Thảo luận và lên kế hoạch kinh doanh 60 phút',
    duration: 60,
    price: 50,
    color: 'bg-accent',
  },
  {
    id: '3',
    name: 'Interview',
    nameVi: 'Phỏng vấn',
    description: '45-minute interview session',
    descriptionVi: 'Buổi phỏng vấn 45 phút',
    duration: 45,
    price: 0,
    color: 'bg-secondary',
  },
  {
    id: '4',
    name: 'Workshop',
    nameVi: 'Hội thảo',
    description: '2-hour interactive workshop session',
    descriptionVi: 'Buổi hội thảo tương tác 2 giờ',
    duration: 120,
    price: 100,
    color: 'bg-success',
  },
];

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: '1',
      service: services[0],
      date: new Date(Date.now() + 86400000 * 2),
      time: '10:00',
      name: 'John Doe',
      email: 'john@example.com',
      phone: '+1234567890',
      status: 'confirmed',
      createdAt: new Date(),
    },
    {
      id: '2',
      service: services[1],
      date: new Date(Date.now() + 86400000 * 5),
      time: '14:00',
      name: 'Jane Smith',
      email: 'jane@example.com',
      phone: '+0987654321',
      status: 'pending',
      createdAt: new Date(),
    },
  ]);

  const addBooking = (booking: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setBookings((prev) => [...prev, newBooking]);
  };

  const cancelBooking = (id: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
    );
  };

  return (
    <BookingContext.Provider
      value={{
        selectedService,
        setSelectedService,
        selectedDate,
        setSelectedDate,
        selectedTime,
        setSelectedTime,
        bookings,
        addBooking,
        cancelBooking,
        services,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
