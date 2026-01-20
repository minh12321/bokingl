import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Zap, 
  Shield, 
  Puzzle, 
  Palette,
  Clock,
  Users,
  BarChart,
  Bell
} from 'lucide-react';

const FeaturesSection = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Zap,
      title: t('features.easy.title'),
      description: t('features.easy.desc'),
      color: 'bg-primary/10 text-primary',
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.desc'),
      color: 'bg-success/10 text-success',
    },
    {
      icon: Puzzle,
      title: t('features.integrate.title'),
      description: t('features.integrate.desc'),
      color: 'bg-accent/10 text-accent',
    },
    {
      icon: Palette,
      title: t('features.customize.title'),
      description: t('features.customize.desc'),
      color: 'bg-warning/10 text-warning',
    },
  ];

  const stats = [
    { icon: Clock, value: '10M+', label: 'Meetings scheduled' },
    { icon: Users, value: '100K+', label: 'Active users' },
    { icon: BarChart, value: '99.9%', label: 'Uptime' },
    { icon: Bell, value: '24/7', label: 'Support' },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('features.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your schedule efficiently and professionally.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card rounded-xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 border border-border hover:-translate-y-1"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6"
            >
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
