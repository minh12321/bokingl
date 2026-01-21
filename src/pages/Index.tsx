import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import IntegrationsSection from '@/components/home/IntegrationsSection';
import CTASection from '@/components/home/CTASection';
import { AutoReveal } from '@/components/Autoreveal';

const Index = () => {
  return (
    <Layout>
      <AutoReveal>
      <HeroSection />
      <FeaturesSection />
      <IntegrationsSection />
      <CTASection />
      </AutoReveal>
    </Layout>
  );
};

export default Index;
