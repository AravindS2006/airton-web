import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { FaLightbulb } from 'react-icons/fa'; // Added import for FaLightbulb

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon = <FaLightbulb />, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card-modern group hover:border-primary-color/30"
    >
      <div className="mb-4 p-3 bg-gradient-to-br from-primary-color/20 to-secondary-color/10 rounded-xl inline-block">
        <div className="text-primary-color text-xl">{icon}</div>
      </div>
      
      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary-color transition-colors">{title}</h3>
      
      <p className="text-text-secondary text-sm">{description}</p>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-color to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </motion.div>
  );
}
