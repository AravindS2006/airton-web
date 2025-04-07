'use client';

import { useState } from 'react';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@nextui-org/react';
import { FaEye, FaHistory, FaBrain, FaTimes, FaCheck, FaCalendarAlt, FaChartLine } from 'react-icons/fa';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import ResultDisplay from './ResultDisplay';

// Confidence type definition
type Confidence = {
  score: number;
  label: string;
};

// History item type definition
type HistoryItem = {
  id: string;
  date: Date;
  image: string;
  result: string;
  confidence: number;
};

export default function DetectionSection() {
  const { image, setImage, result, setResult } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const handlePredict = async () => {
    if (!image) return;
    
    setIsLoading(true);
    
    try {
      const response = await axios.post('/api/predict', { image });
      
      setResult(response.data.prediction);
      setConfidence({
        score: response.data.confidence,
        label: response.data.prediction === 'Glaucoma detected' ? 'Positive' : 'Negative'
      });
      
      // Add to history
      setHistory(prev => [
        {
          id: Date.now().toString(),
          date: new Date(),
          image,
          result: response.data.prediction,
          confidence: response.data.confidence
        },
        ...prev
      ]);
    } catch (error) {
      console.error('Prediction error:', error);
      setResult('Error during prediction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const clearResults = () => {
    setImage(null);
    setResult(null);
    setConfidence(null);
  };

  const removeHistoryItem = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-24 px-6 relative z-10">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
      
      <motion.div 
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Detect Glaucoma</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Upload an eye image to analyze and detect signs of glaucoma using our 
            advanced AI model. Get instant results with confidence scores.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload and controls column */}
          <motion.div 
            className="flex flex-col gap-6"
            variants={itemVariants}
          >
            <div className="glassmorphism rounded-2xl p-6">
              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                  <h3 className="text-xl font-bold">Upload Image</h3>
                </div>
                <Button
                  isIconOnly
                  color="primary"
                  variant="light"
                  onPress={clearResults}
                  isDisabled={!image}
                >
                  <FaTimes />
                </Button>
              </div>
              
              <div className="mb-6">
                <ImageUpload onImageUpload={setImage} />
              </div>
              
              <Button
                color="primary"
                size="lg"
                className="w-full"
                startContent={<FaEye />}
                onPress={handlePredict}
                isLoading={isLoading}
                isDisabled={!image}
              >
                {isLoading ? 'Analyzing...' : 'Detect Glaucoma'}
              </Button>
            </div>
            
            <motion.div 
              className="glassmorphism rounded-2xl p-6"
              variants={itemVariants}
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaHistory className="text-secondary" />
                  <h3 className="text-xl font-bold">Recent Analyses</h3>
                </div>
                <Button
                  color="secondary"
                  variant="light"
                  size="sm"
                  onPress={() => setShowHistory(!showHistory)}
                >
                  {showHistory ? 'Hide' : 'Show'}
                </Button>
              </div>
              
              <AnimatePresence>
                {showHistory && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    {history.length === 0 ? (
                      <div className="text-center py-6 text-gray-400">
                        <p>No analysis history yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {history.map((item) => (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            className="glassmorphism-light p-4 rounded-xl flex gap-4 items-center"
                          >
                            <div className="w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden border border-white/10">
                              <img src={item.image} alt="Eye scan" className="w-full h-full object-cover" />
                            </div>
                            
                            <div className="flex-grow">
                              <div className="flex items-center gap-2 mb-1">
                                {item.result.includes('No glaucoma') ? (
                                  <FaCheck className="text-success text-sm" />
                                ) : (
                                  <FaTimes className="text-error text-sm" />
                                )}
                                <span className={`text-sm font-medium ${
                                  item.result.includes('No glaucoma') ? 'text-success' : 'text-error'
                                }`}>
                                  {item.result}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-4 text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                  <FaCalendarAlt />
                                  <span>{item.date.toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <FaChartLine />
                                  <span>{Math.round(item.confidence * 100)}% confidence</span>
                                </div>
                              </div>
                            </div>
                            
                            <Button
                              isIconOnly
                              color="danger"
                              variant="light"
                              size="sm"
                              onPress={() => removeHistoryItem(item.id)}
                            >
                              <FaTimes size={14} />
                            </Button>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
          
          {/* Results column */}
          <motion.div variants={itemVariants}>
            <div className="glassmorphism rounded-2xl p-6 h-full">
              <div className="mb-6 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary animate-pulse"></div>
                <h3 className="text-xl font-bold">Analysis Results</h3>
              </div>
              
              <AnimatePresence mode="wait">
                {!image && !result ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[400px] flex flex-col items-center justify-center"
                  >
                    <div className="text-6xl text-gray-600 mb-4">
                      <FaEye />
                    </div>
                    <p className="text-gray-400 text-center max-w-sm">
                      Upload an eye image and click "Detect Glaucoma" to see the analysis results here
                    </p>
                  </motion.div>
                ) : isLoading ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-[400px] flex flex-col items-center justify-center"
                  >
                    <div className="relative mb-4">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent"
                      />
                      <FaBrain className="text-2xl text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-gray-400 text-center">Analyzing your eye image...</p>
                    <div className="w-48 h-2 bg-gray-700 rounded-full mt-4 overflow-hidden">
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: "100%" }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                        className="h-full bg-primary"
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <ResultDisplay 
                      result={result as string} 
                      confidence={confidence ? confidence.score : undefined}
                      loading={false}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
} 