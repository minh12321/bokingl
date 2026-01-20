import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useBooking, Booking as BookingType } from '@/contexts/BookingContext';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone,
  MoreVertical,
  X,
  RefreshCcw,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  CalendarCheck
} from 'lucide-react';
import { format, isFuture, isPast } from 'date-fns';
import { vi, enUS } from 'date-fns/locale';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Dashboard = () => {
  const { t, language } = useLanguage();
  const { bookings, cancelBooking, services } = useBooking();

  const upcomingBookings = bookings.filter(
    (b) => isFuture(b.date) && b.status !== 'cancelled'
  );
  const pastBookings = bookings.filter(
    (b) => isPast(b.date) || b.status === 'cancelled'
  );

  const stats = [
    {
      label: t('dashboard.totalBookings'),
      value: bookings.length,
      icon: CalendarCheck,
      color: 'bg-primary/10 text-primary',
    },
    {
      label: t('dashboard.thisMonth'),
      value: bookings.filter(b => {
        const now = new Date();
        return b.date.getMonth() === now.getMonth() && b.date.getFullYear() === now.getFullYear();
      }).length,
      icon: TrendingUp,
      color: 'bg-accent/10 text-accent',
    },
    {
      label: t('dashboard.pending'),
      value: bookings.filter(b => b.status === 'pending').length,
      icon: AlertCircle,
      color: 'bg-warning/10 text-warning',
    },
    {
      label: t('dashboard.completed'),
      value: bookings.filter(b => b.status === 'completed').length,
      icon: CheckCircle,
      color: 'bg-success/10 text-success',
    },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-warning/10 text-warning',
      confirmed: 'bg-success/10 text-success',
      cancelled: 'bg-destructive/10 text-destructive',
      completed: 'bg-primary/10 text-primary',
    };
    const labels = {
      pending: language === 'vi' ? 'Chờ xử lý' : 'Pending',
      confirmed: language === 'vi' ? 'Đã xác nhận' : 'Confirmed',
      cancelled: language === 'vi' ? 'Đã hủy' : 'Cancelled',
      completed: language === 'vi' ? 'Hoàn thành' : 'Completed',
    };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    );
  };

  const BookingCard = ({ booking }: { booking: BookingType }) => (
    <div className="bg-card rounded-xl border border-border p-4 hover:shadow-card-hover transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-lg ${booking.service.color} flex items-center justify-center`}>
            <Calendar className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">
              {language === 'vi' ? booking.service.nameVi : booking.service.name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {format(booking.date, 'EEEE, dd MMM yyyy', { 
                locale: language === 'vi' ? vi : enUS 
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {getStatusBadge(booking.status)}
          {booking.status !== 'cancelled' && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="gap-2">
                  <RefreshCcw className="w-4 h-4" />
                  {t('dashboard.reschedule')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="gap-2 text-destructive"
                  onClick={() => cancelBooking(booking.id)}
                >
                  <X className="w-4 h-4" />
                  {t('dashboard.cancel')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{booking.time}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <User className="w-4 h-4" />
          <span className="truncate">{booking.name}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="w-4 h-4" />
          <span className="truncate">{booking.email}</span>
        </div>
        {booking.phone && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone className="w-4 h-4" />
            <span>{booking.phone}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              {t('dashboard.title')}
            </h1>
            <p className="text-muted-foreground">
              {language === 'vi' 
                ? 'Quản lý tất cả lịch hẹn của bạn tại đây'
                : 'Manage all your bookings in one place'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-card rounded-xl border border-border p-4 hover:shadow-card transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-5 h-5" />
                  </div>
                  <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bookings Tabs */}
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="upcoming" className="gap-2">
                <Calendar className="w-4 h-4" />
                {t('dashboard.upcoming')} ({upcomingBookings.length})
              </TabsTrigger>
              <TabsTrigger value="past" className="gap-2">
                <Clock className="w-4 h-4" />
                {t('dashboard.past')} ({pastBookings.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              {upcomingBookings.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {upcomingBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">{t('dashboard.noEvents')}</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {pastBookings.length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {pastBookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">
                    {language === 'vi' ? 'Chưa có sự kiện đã qua' : 'No past events'}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
