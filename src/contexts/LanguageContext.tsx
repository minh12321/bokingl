import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'vi';

interface Translations {
  [key: string]: {
    en: string;
    vi: string;
  };
}

export const translations: Translations = {
  // Navbar
  'nav.home': { en: 'Home', vi: 'Trang chủ' },
  'nav.services': { en: 'Services', vi: 'Dịch vụ' },
  'nav.booking': { en: 'Book Now', vi: 'Đặt lịch' },
  'nav.dashboard': { en: 'Dashboard', vi: 'Quản lý' },
  'nav.login': { en: 'Log In', vi: 'Đăng nhập' },
  'nav.signup': { en: 'Sign Up Free', vi: 'Đăng ký miễn phí' },
  'nav.logout': { en: 'logout', vi: 'Đăng xuất' },
  'nav.info': { en: 'I', vi: 'i' },
  
  // Hero
  'hero.title': { en: 'Easy scheduling ahead', vi: 'Đặt lịch dễ dàng' },
  'hero.subtitle': { en: 'Calendly is your scheduling automation platform for eliminating the back-and-forth emails to find the perfect time — and so much more.', vi: 'Nền tảng tự động hóa lịch hẹn giúp loại bỏ việc trao đổi email qua lại để tìm thời gian phù hợp — và nhiều hơn thế nữa.' },
  'hero.cta': { en: 'Get started for free', vi: 'Bắt đầu miễn phí' },
  'hero.demo': { en: 'See how it works', vi: 'Xem cách hoạt động' },
  
  // Features
  'features.title': { en: 'Why choose us?', vi: 'Tại sao chọn chúng tôi?' },
  'features.easy.title': { en: 'Easy to use', vi: 'Dễ sử dụng' },
  'features.easy.desc': { en: 'Simple and intuitive interface for seamless booking experience', vi: 'Giao diện đơn giản và trực quan cho trải nghiệm đặt lịch mượt mà' },
  'features.secure.title': { en: 'Secure & Private', vi: 'Bảo mật & Riêng tư' },
  'features.secure.desc': { en: 'Your data is protected with enterprise-grade security', vi: 'Dữ liệu của bạn được bảo vệ với bảo mật cấp doanh nghiệp' },
  'features.integrate.title': { en: 'Integrations', vi: 'Tích hợp' },
  'features.integrate.desc': { en: 'Connect with your favorite calendar and video apps', vi: 'Kết nối với ứng dụng lịch và video yêu thích của bạn' },
  'features.customize.title': { en: 'Customizable', vi: 'Tùy chỉnh' },
  'features.customize.desc': { en: 'Personalize your booking page to match your brand', vi: 'Cá nhân hóa trang đặt lịch phù hợp với thương hiệu của bạn' },
  
  // Services
  'services.title': { en: 'Our Services', vi: 'Dịch vụ của chúng tôi' },
  'services.subtitle': { en: 'Choose the service that fits your needs', vi: 'Chọn dịch vụ phù hợp với nhu cầu của bạn' },
  'services.consultation': { en: 'Consultation', vi: 'Tư vấn' },
  'services.consultation.desc': { en: '30-minute one-on-one consultation session', vi: 'Buổi tư vấn 1-1 trong 30 phút' },
  'services.meeting': { en: 'Business Meeting', vi: 'Họp doanh nghiệp' },
  'services.meeting.desc': { en: '60-minute business discussion and planning', vi: 'Thảo luận và lên kế hoạch kinh doanh 60 phút' },
  'services.interview': { en: 'Interview', vi: 'Phỏng vấn' },
  'services.interview.desc': { en: '45-minute interview session', vi: 'Buổi phỏng vấn 45 phút' },
  'services.workshop': { en: 'Workshop', vi: 'Hội thảo' },
  'services.workshop.desc': { en: '2-hour interactive workshop session', vi: 'Buổi hội thảo tương tác 2 giờ' },
  'services.book': { en: 'Book Now', vi: 'Đặt ngay' },
  'services.duration': { en: 'Duration', vi: 'Thời lượng' },
  'services.min': { en: 'min', vi: 'phút' },
  'services.hour': { en: 'hour', vi: 'giờ' },
  'services.hours': { en: 'hours', vi: 'giờ' },
  
  // Calendar
  'calendar.title': { en: 'Select Date & Time', vi: 'Chọn ngày & giờ' },
  'calendar.timezone': { en: 'Timezone', vi: 'Múi giờ' },
  'calendar.available': { en: 'Available times', vi: 'Thời gian có sẵn' },
  'calendar.noSlots': { en: 'No available slots', vi: 'Không có khung giờ trống' },
  'calendar.selected': { en: 'Selected', vi: 'Đã chọn' },
  
  // Booking Form
  'booking.title': { en: 'Confirm Your Booking', vi: 'Xác nhận đặt lịch' },
  'booking.name': { en: 'Full Name', vi: 'Họ và tên' },
  'booking.email': { en: 'Email', vi: 'Email' },
  'booking.phone': { en: 'Phone Number', vi: 'Số điện thoại' },
  'booking.notes': { en: 'Additional Notes', vi: 'Ghi chú thêm' },
  'booking.confirm': { en: 'Confirm Booking', vi: 'Xác nhận đặt lịch' },
  'booking.back': { en: 'Back', vi: 'Quay lại' },
  'booking.success': { en: 'Booking Confirmed!', vi: 'Đặt lịch thành công!' },
  'booking.successMsg': { en: 'You will receive a confirmation email shortly.', vi: 'Bạn sẽ nhận được email xác nhận trong thời gian ngắn.' },
  
  // Dashboard
  'dashboard.title': { en: 'Dashboard', vi: 'Bảng điều khiển' },
  'dashboard.upcoming': { en: 'Upcoming Events', vi: 'Sự kiện sắp tới' },
  'dashboard.past': { en: 'Past Events', vi: 'Sự kiện đã qua' },
  'dashboard.noEvents': { en: 'No upcoming events', vi: 'Không có sự kiện sắp tới' },
  'dashboard.cancel': { en: 'Cancel', vi: 'Hủy' },
  'dashboard.reschedule': { en: 'Reschedule', vi: 'Đổi lịch' },
  'dashboard.stats': { en: 'Statistics', vi: 'Thống kê' },
  'dashboard.totalBookings': { en: 'Total Bookings', vi: 'Tổng số đặt lịch' },
  'dashboard.thisMonth': { en: 'This Month', vi: 'Tháng này' },
  'dashboard.pending': { en: 'Pending', vi: 'Chờ xử lý' },
  'dashboard.completed': { en: 'Completed', vi: 'Hoàn thành' },
  
  // Footer
  'footer.about': { en: 'About', vi: 'Về chúng tôi' },
  'footer.privacy': { en: 'Privacy', vi: 'Quyền riêng tư' },
  'footer.terms': { en: 'Terms', vi: 'Điều khoản' },
  'footer.contact': { en: 'Contact', vi: 'Liên hệ' },
  'footer.rights': { en: 'All rights reserved', vi: 'Bảo lưu mọi quyền' },
  
  // Common
  'common.loading': { en: 'Loading...', vi: 'Đang tải...' },
  'common.error': { en: 'Something went wrong', vi: 'Đã xảy ra lỗi' },
  'common.save': { en: 'Save', vi: 'Lưu' },
  'common.cancel': { en: 'Cancel', vi: 'Hủy' },
  'common.delete': { en: 'Delete', vi: 'Xóa' },
  'common.edit': { en: 'Edit', vi: 'Sửa' },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
