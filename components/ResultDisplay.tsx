'use client';

import { motion } from 'framer-motion';
import { Chip, Progress } from '@nextui-org/react';
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
              <span className={`text-sm font-medium ${isGlaucoma ? 'text-error' : 'text-success'}`}>
                {confidencePercentage}%
              </span>
            </div>
            <div className="relative h-6 glassmorphism-light rounded-lg overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${confidencePercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`absolute top-0 left-0 h-full ${isGlaucoma ? 'bg-gradient-to-r from-error/50 to-error' : 'bg-gradient-to-r from-success/50 to-success'}`}
              />
              <div className="absolute inset-0 flex items-center justify-end px-3">
                <span className="text-xs font-medium text-white">{confidencePercentage}% {isGlaucoma ? 'Positive' : 'Negative'}</span>
              </div>
            </div>
          </motion.div>
          
          {/* Analysis details */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="glassmorphism-light p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FaInfo className="text-primary" />
                <h4 className="font-medium">Analysis Details</h4>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Analysis Type:</span>
                  <span>Glaucoma Detection</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Model:</span>
                  <span>VGG19 Neural Network</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Accuracy Rate:</span>
                  <span>76.2% (Test Dataset)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Processed In:</span>
                  <span>1.8 seconds</span>
                </div>
              </div>
            </div>
            
            <div className="glassmorphism-light p-4 rounded-xl space-y-2">
              <div className="flex items-center gap-2 mb-2">
                <FaHospital className="text-secondary" />
                <h4 className="font-medium">Next Steps</h4>
              </div>
              <ul className="space-y-2 text-sm">
                {isGlaucoma ? (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="text-error text-lg">•</span>
                      <span>Consult an ophthalmologist</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-error text-lg">•</span>
                      <span>Schedule a comprehensive eye exam</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-error text-lg">•</span>
                      <span>Download and share these results</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2">
                      <span className="text-success text-lg">•</span>
                      <span>Continue regular eye check-ups</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success text-lg">•</span>
                      <span>Maintain eye health practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-success text-lg">•</span>
                      <span>Re-test if symptoms develop</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </motion.div>
          
          {/* What this means */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glassmorphism-light rounded-xl p-5 space-y-3"
          >
            <h4 className="font-medium flex items-center gap-2">
              <FaEye className="text-primary" />
              <span>What This Means</span>
            </h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              {isGlaucoma
                ? 'Our AI has detected signs of glaucoma in your eye image. Glaucoma is a group of eye conditions that damage the optic nerve, which is vital for good vision. This damage is often caused by abnormally high pressure in your eye. Early detection is crucial as vision loss from glaucoma cannot be recovered. We strongly recommend consulting an ophthalmologist for a comprehensive eye examination.'
                : 'Our AI has analyzed your eye image and did not detect signs of glaucoma. However, this is not a definitive diagnosis. Regular eye check-ups are still important for maintaining good eye health. Glaucoma can develop gradually without early symptoms, so continuing routine monitoring is recommended, especially if you have risk factors such as family history, age over 60, or existing medical conditions.'}
            </p>
          </motion.div>
          
          {/* Actions and disclaimer */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2 justify-center"
            >
              <button className="glassmorphism-light px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-white/10 transition-colors">
                <FaPrint className="text-primary" />
                <span>Print Results</span>
              </button>
              <button className="glassmorphism-light px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-white/10 transition-colors">
                <FaShare className="text-secondary" />
                <span>Share</span>
              </button>
              <button className="glassmorphism-light px-4 py-2 rounded-lg flex items-center gap-2 text-sm hover:bg-white/10 transition-colors">
                <FaDownload className="text-success" />
                <span>Download PDF</span>
              </button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <p className="text-xs text-gray-400 italic text-center">
                Note: This is an AI-assisted analysis and should not replace professional medical advice. 
                Always consult with a qualified healthcare provider for proper diagnosis and treatment.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 