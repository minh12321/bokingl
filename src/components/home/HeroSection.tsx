import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play, Calendar, Check } from 'lucide-react';

const HeroSection = () => {
  const { t } = useLanguage();

  const features = [
    'Free forever for individuals',
    'No credit card required',
    'Set up in minutes',
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full gradient-primary opacity-5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-accent opacity-5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Calendar className="w-4 h-4" />
              <span>Scheduling made simple</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              {t('hero.title')}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8">
              {t('hero.subtitle')}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Link to="/services">
                <Button size="lg" className="gradient-primary text-primary-foreground hover:opacity-90 gap-2 px-8 h-12 text-base">
                  {t('hero.cta')}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 h-12 text-base border-2"
              >
                <Play className="w-4 h-4" />
                {t('hero.demo')}
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-success" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Calendar Preview */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="relative z-10 bg-card rounded-2xl shadow-card-hover border border-border p-6 max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-lg">JD</span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">John Doe</h3>
                  <p className="text-sm text-muted-foreground">30 Minute Meeting</p>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
                {Array.from({ length: 35 }, (_, i) => {
                  const day = i - 3;
                  const isToday = day === 15;
                  const isAvailable = [14, 15, 16, 17, 21, 22, 23, 24].includes(day);
                  
                  return (
                    <div
                      key={i}
                      className={`aspect-square flex items-center justify-center text-sm rounded-lg transition-colors ${
                        day < 1 || day > 31
                          ? 'text-transparent'
                          : isToday
                          ? 'bg-primary text-primary-foreground font-semibold'
                          : isAvailable
                          ? 'text-foreground hover:bg-primary/10 cursor-pointer'
                          : 'text-muted-foreground/50'
                      }`}
                    >
                      {day > 0 && day <= 31 ? day : ''}
                    </div>
                  );
                })}
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground mb-3">Available times</p>
                <div className="grid grid-cols-3 gap-2">
                  {['9:00am', '10:00am', '11:00am', '2:00pm', '3:00pm', '4:00pm'].map((time) => (
                    <button
                      key={time}
                      className="py-2 px-3 text-sm rounded-lg border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl gradient-accent opacity-20 blur-xl animate-float" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-full gradient-primary opacity-20 blur-xl animate-float" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
