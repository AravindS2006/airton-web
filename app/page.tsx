'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ThreeJSBackground from '@/components/ThreeJSBackground';
import Header from '@/components/Header';
import DetectionSection from '@/components/DetectionSection';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';
import MotionTest from '@/components/MotionTest';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white relative overflow-hidden">
      {/* Subtle radial gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent"></div>
      
      {/* Three.js Animated Background with reduced opacity */}
      <div className="opacity-30">
        <ThreeJSBackground />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <MotionTest />
        <DetectionSection />
        <InfoSection />
        <Footer />
      </div>
    </div>
  );
}