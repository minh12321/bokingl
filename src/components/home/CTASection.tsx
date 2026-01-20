import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  const { language } = useLanguage();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-primary opacity-95" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white opacity-5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-white opacity-5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>{language === 'vi' ? 'Bắt đầu miễn phí hôm nay' : 'Start free today'}</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            {language === 'vi' 
              ? 'Sẵn sàng đơn giản hóa việc lên lịch của bạn?' 
              : 'Ready to simplify your scheduling?'}
          </h2>

          <p className="text-lg text-white/80 mb-8 max-w-xl mx-auto">
            {language === 'vi'
              ? 'Tham gia cùng hàng triệu người dùng đã tin tưởng Calendly để quản lý thời gian của họ.'
              : 'Join millions of users who trust Calendly to manage their time effectively.'}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/services">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 gap-2 px-8 h-12 text-base font-semibold"
              >
                {language === 'vi' ? 'Bắt đầu miễn phí' : 'Get started for free'}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white hover:bg-white/10 h-12 text-base"
            >
              {language === 'vi' ? 'Liên hệ bán hàng' : 'Contact sales'}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
