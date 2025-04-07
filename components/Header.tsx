'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { FaGithub, FaInfoCircle, FaBrain, FaChartLine, FaLightbulb, FaBars, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

const navItems = [
  { name: 'Home', href: '#', icon: FaLightbulb },
  { name: 'Detection', href: '#detection', icon: FaBrain },
  { name: 'About', href: '#about', icon: FaInfoCircle },
  { name: 'Results', href: '#results', icon: FaChartLine },
];

// Default placeholder image URL
const PLACEHOLDER_IMAGE = "https://placehold.co/600x600/0F172A/60A5FA?text=AI+Glaucoma+Detection";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { scrollY } = useScroll();
  
  const headerOpacity = useTransform(scrollY, [0, 100], [0.8, 1]);
  const headerBackdrop = useTransform(scrollY, [0, 100], [8, 12]);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ 
          opacity: headerOpacity,
          backdropFilter: `blur(${headerBackdrop}px)`,
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Gradient background with reduced opacity */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/90 to-slate-950/90 z-0"></div>
        
        {/* Animated gradient border */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-primary-color/50 to-transparent"></div>
        
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center relative z-10">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-3"
            >
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-color to-secondary-color p-[1px]">
                <div className="h-full w-full rounded-xl bg-slate-950 flex items-center justify-center">
                  <FaLightbulb className="text-primary-color text-lg" />
                </div>
              </div>
              <span className="text-xl font-bold gradient-text">Glaucoma AI</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors relative group py-2"
                >
                  <item.icon className="text-primary-color/70 group-hover:text-primary-color transition-colors" />
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-color/50 scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
                </a>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                className="bg-slate-800/50 hover:bg-slate-800/80 text-white border-1 border-white/10 px-4 h-10"
                startContent={<FaGithub className="text-lg" />}
                variant="flat"
                radius="full"
              >
                GitHub
              </Button>
              <Button
                className="bg-gradient-to-r from-primary-color to-secondary-color text-white px-4 h-10"
                radius="full"
              >
                Try Now
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white transition-colors"
            >
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="md:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-white/10"
            >
              <div className="px-6 py-4 space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors p-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="text-primary-color" />
                    {item.name}
                  </a>
                ))}
                <div className="pt-4 flex flex-col gap-3">
                  <Button
                    className="w-full bg-slate-800/50 hover:bg-slate-800/80 text-white border-1 border-white/10"
                    startContent={<FaGithub />}
                    variant="flat"
                    radius="full"
                  >
                    GitHub
                  </Button>
                  <Button
                    className="w-full bg-gradient-to-r from-primary-color to-secondary-color text-white"
                    radius="full"
                  >
                    Try Now
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Main hero section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 pt-32 pb-16 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Add colorful blob decorations */}
          <div className="absolute top-20 right-[10%] w-64 h-64 blob-effect bg-primary-color/20"></div>
          <div className="absolute top-40 left-[5%] w-80 h-80 blob-effect bg-secondary-color/15"></div>
          
          <div className="frosted-panel p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-color to-transparent"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  AI-Powered <span className="gradient-text">Glaucoma</span> Detection
                </h1>
                <p className="text-lg text-text-secondary leading-relaxed">
                  Early detection saves sight. Our advanced AI analyzes eye images with 
                  high precision to help identify glaucoma risk factors before vision loss occurs.
                </p>
                <div className="flex gap-4 pt-4">
                  <Button 
                    size="lg" 
                    color="primary" 
                    className="px-6 rounded-full glow-animation"
                  >
                    Upload Image
                  </Button>
                  <Button 
                    size="lg" 
                    variant="bordered" 
                    color="secondary" 
                    className="px-6 rounded-full"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-color/20 to-secondary-color/20 rounded-full blur-3xl"></div>
                <div className="w-full max-w-md aspect-square rounded-3xl overflow-hidden gradient-border">
                  <div className="w-full h-full p-2 bg-surface-color rounded-3xl relative">
                    <Image 
                      src={imageError ? PLACEHOLDER_IMAGE : PLACEHOLDER_IMAGE}
                      alt="Eye Scan Visualization"
                      fill
                      className="object-cover rounded-2xl"
                      priority
                      onError={() => setImageError(true)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}