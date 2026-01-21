import React, { useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturesSection from '@/components/home/FeaturesSection';
import IntegrationsSection from '@/components/home/IntegrationsSection';
import CTASection from '@/components/home/CTASection';
import { AutoReveal } from '@/components/Autoreveal';
import { userApi } from '@/api/User.api';

const Index = () => {
  useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await userApi.getProfile();
  //       console.log(res.data); 
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUser();
  // 
  }, []);
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
