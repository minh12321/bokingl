import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const IntegrationsSection = () => {
  const { language } = useLanguage();

  const integrations = [
    { name: 'Google Calendar', color: '#4285F4' },
    { name: 'Microsoft Outlook', color: '#0078D4' },
    { name: 'Zoom', color: '#2D8CFF' },
    { name: 'Slack', color: '#4A154B' },
    { name: 'Google Meet', color: '#00897B' },
    { name: 'Microsoft Teams', color: '#6264A7' },
    { name: 'Salesforce', color: '#00A1E0' },
    { name: 'HubSpot', color: '#FF7A59' },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {language === 'vi' ? 'Tích hợp với công cụ yêu thích của bạn' : 'Integrates with your favorite tools'}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === 'vi' 
              ? 'Kết nối liền mạch với các ứng dụng bạn đang sử dụng hàng ngày'
              : 'Seamlessly connect with the apps you use every day'}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className="group flex items-center gap-3 px-6 py-4 bg-card rounded-xl border border-border shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div 
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: integration.color }}
              >
                {integration.name.charAt(0)}
              </div>
              <span className="font-medium text-foreground">{integration.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IntegrationsSection;
