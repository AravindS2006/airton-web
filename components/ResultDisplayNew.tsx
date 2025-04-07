'use client';

import { motion } from 'framer-motion';
import { Chip } from '@nextui-org/react';
import { FaEye, FaExclamationTriangle, FaCheckCircle, FaInfo, FaHospital, FaChartLine, FaPrint, FaShare, FaDownload } from 'react-icons/fa';

interface ResultDisplayProps {
  result: string | null;
  confidence?: number;
  loading: boolean;
}

export default function ResultDisplayNew({ result, confidence = 0, loading }: ResultDisplayProps) {
  if (loading) {
    return (
      <div className="w-full">
        <div className="glassmorphism rounded-2xl">
          <div className="flex flex-col items-center justify-center p-8 space-y-4">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xl font-medium">Analyzing your image...</p>
            <p className="text-sm text-gray-400">Our AI model is processing your eye image</p>
          </div>
        </div>
      </div>
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
    <div className="w-full">
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
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium flex items-center gap-2">
                <FaChartLine className={isGlaucoma ? 'text-error' : 'text-success'} />
                Confidence Level
              </span>
              <span className={`text-sm font-bold ${isGlaucoma ? 'text-error' : 'text-success'}`}>
                {confidencePercentage}%
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div 
                className={`h-full ${isGlaucoma ? 'bg-error' : 'bg-success'}`}
                style={{ width: `${confidencePercentage}%` }}
              />
            </div>
          </div>
          
          {/* Additional information */}
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/50">
              <FaInfo className="text-primary mt-1 flex-shrink-0" />
              <div>
                <h4 className="font-medium mb-1">What this means</h4>
                <p className="text-sm text-gray-300">
                  {isGlaucoma 
                    ? "Our AI has detected signs of glaucoma in your eye image. This is a serious condition that requires medical attention. Please consult with an ophthalmologist for a comprehensive examination."
                    : "Our AI has analyzed your eye image and found no signs of glaucoma. However, this is not a substitute for a professional medical examination. Regular eye check-ups are recommended for everyone."
                  }
                </p>
              </div>
            </div>
            
            {isGlaucoma && (
              <div className="flex items-start gap-3 p-4 rounded-xl bg-error/10 border border-error/20">
                <FaHospital className="text-error mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-medium mb-1">Next steps</h4>
                  <p className="text-sm text-gray-300">
                    Schedule an appointment with an ophthalmologist as soon as possible. Early detection and treatment can help prevent vision loss.
                  </p>
                </div>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 pt-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors">
              <FaPrint />
              <span>Print Report</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/20 hover:bg-secondary/30 text-secondary transition-colors">
              <FaShare />
              <span>Share</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-colors">
              <FaDownload />
              <span>Download</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 