'use client';

import { motion } from 'framer-motion';
import { Chip } from '@nextui-org/react';
import { FaEye, FaExclamationTriangle, FaCheckCircle, FaInfo, FaHospital, FaChartLine, FaPrint, FaShare, FaDownload } from 'react-icons/fa';

interface ResultDisplayProps {
  result: string | null;
  confidence?: number;
  loading: boolean;
}

export default function ResultDisplay({ result, confidence = 0, loading }: ResultDisplayProps) {
  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full"
      >
        <div className="glassmorphism rounded-2xl">
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl font-medium">Analyzing your image...</p>
            <p className="text-sm text-gray-400">Our AI model is processing your eye image</p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (!result) return null;

  const isGlaucoma = result.toLowerCase().includes('glaucoma');
  const confidencePercentage = typeof confidence === 'number' 
    ? (confidence > 1 ? Math.round(confidence) : Math.round(confidence * 100)) 
    : 0;
  const date = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className={`glassmorphism rounded-2xl overflow-hidden border ${isGlaucoma ? 'border-error/20' : 'border-success/20'}`}>
        {/* Top header with status */}
        <div 
          className={`p-6 ${isGlaucoma ? 'bg-error/10' : 'bg-success/10'} backdrop-blur-md`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isGlaucoma ? 'bg-error/20' : 'bg-success/20'}`}>
                {isGlaucoma ? (
                  <FaExclamationTriangle className="text-2xl text-error" />
                ) : (
                  <FaCheckCircle className="text-2xl text-success" />
                )}
              </div>
              <div>
                <h3 className="text-xl font-bold">
                  {isGlaucoma ? 'Glaucoma Detected' : 'No Glaucoma Detected'}
                </h3>
                <p className="text-sm text-gray-400">
                  Analysis completed on {date}
                </p>
              </div>
            </div>
            <Chip
              color={isGlaucoma ? 'danger' : 'success'}
              variant="flat"
              className="text-sm font-medium"
            >
              {isGlaucoma ? 'High Risk' : 'Low Risk'}
            </Chip>
          </div>
        </div>
        
        {/* Main content */}
        <div className="p-6 space-y-6">
          {/* Confidence bar */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <FaChartLine className={isGlaucoma ? 'text-error' : 'text-success'} />
                Confidence Level
              </span>
              <span className={`