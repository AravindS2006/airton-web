'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, Button } from '@nextui-org/react';
import { FaBrain, FaEye, FaCloudUploadAlt, FaChartLine, FaShieldAlt, FaHistory } from 'react-icons/fa';

export default function InfoSection() {
  const [activeTab, setActiveTab] = useState(0);
  
  const features = [
    {
      title: "AI-Powered Analysis",
      description: "Our application uses a state-of-the-art VGG19 deep learning model trained on thousands of eye images to accurately detect signs of glaucoma.",
      icon: <FaBrain className="text-3xl text-secondary" />,
      stats: "76% accuracy on test datasets"
    },
    {
      title: "Simple Image Upload",
      description: "Easily upload your eye images with our intuitive drag-and-drop interface. We support various image formats and provide instant feedback.",
      icon: <FaCloudUploadAlt className="text-3xl text-primary" />,
      stats: "Supports JPG, PNG, WEBP formats"
    },
    {
      title: "Instant Results",
      description: "Get immediate analysis results with confidence scores, helping you understand the likelihood of glaucoma presence in the uploaded image.",
      icon: <FaChartLine className="text-3xl text-success" />,
      stats: "Results in less than 2 seconds"
    },
    {
      title: "Privacy Focused",
      description: "Your data remains private. Images are processed securely and not stored permanently on our servers after analysis is complete.",
      icon: <FaShieldAlt className="text-3xl text-warning" />,
      stats: "HIPAA compliant processing"
    }
  ];

  const tabVariants = {
    active: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    inactive: {
      y: 20,
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 px-6 relative z-10">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">How It Works</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            Our glaucoma detection system combines advanced AI technology with a user-friendly 
            interface to provide accurate and accessible eye health analysis.
          </p>
        </motion.div>
        
        {/* Process steps */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mb-24"
        >
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary/30 transform -translate-x-1/2 hidden md:block"></div>
          
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col md:flex-row items-center mb-16 relative"
          >
            <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Upload Eye Image</h3>
              <p className="text-gray-300">
                Capture a clear image of your eye or upload an existing one. 
                Our system accepts various image formats and provides guidelines for optimal results.
              </p>
            </div>
            
            <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center glassmorphism">
                <FaEye className="text-2xl" />
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-12 flex justify-center md:justify-start">
              <div className="glassmorphism p-4 rounded-2xl max-w-xs w-full">
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <img 
                    src="https://images.unsplash.com/photo-1559077103-2adb4634668d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Eye scan" 
                    className="w-full h-48 object-cover"
                  />
                </div>
                <div className="text-center mt-4">
                  <FaCloudUploadAlt className="text-primary text-xl inline-block" />
                  <span className="text-sm ml-2">Upload your eye image</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col md:flex-row-reverse items-center mb-16 relative"
          >
            <div className="md:w-1/2 md:pl-12 md:text-left mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">AI Processes Image</h3>
              <p className="text-gray-300">
                Our advanced deep learning model analyzes the eye image, looking for subtle patterns 
                and indicators that could suggest the presence of glaucoma.
              </p>
            </div>
            
            <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-secondary to-primary flex items-center justify-center glassmorphism">
                <FaBrain className="text-2xl" />
              </div>
            </div>
            
            <div className="md:w-1/2 md:pr-12 flex justify-center md:justify-end">
              <div className="glassmorphism p-4 rounded-2xl max-w-xs w-full">
                <div className="h-48 rounded-xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-900/50 to-purple-900/50 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block relative">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 5, ease: "linear" }}
                        className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent"
                      />
                      <FaBrain className="text-2xl text-primary absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <p className="text-sm mt-4">AI processing image...</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "80%" }}
                      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                      className="h-full bg-primary"
                    />
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "60%" }}
                      transition={{ repeat: Infinity, duration: 1.8, delay: 0.2, ease: "easeInOut" }}
                      className="h-full bg-secondary"
                    />
                  </div>
                  <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: "0%" }}
                      animate={{ width: "75%" }}
                      transition={{ repeat: Infinity, duration: 1.2, delay: 0.4, ease: "easeInOut" }}
                      className="h-full bg-success"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col md:flex-row items-center relative"
          >
            <div className="md:w-1/2 md:pr-12 md:text-right mb-8 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">View Detection Results</h3>
              <p className="text-gray-300">
                Receive detailed analysis results within seconds, including a prediction about 
                the presence of glaucoma and a confidence score to guide further actions.
              </p>
            </div>
            
            <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10 mb-8 md:mb-0">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-success to-secondary flex items-center justify-center glassmorphism">
                <FaChartLine className="text-2xl" />
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-12 flex justify-center md:justify-start">
              <div className="glassmorphism p-4 rounded-2xl max-w-xs w-full">
                <div className="p-4 bg-gray-800/30 rounded-xl border border-white/10">
                  <div className="flex justify-between items-center mb-6">
                    <h4 className="font-bold">Analysis Results</h4>
                    <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">Complete</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Prediction:</span>
                        <span className="text-success font-semibold">No Glaucoma</span>
                      </div>
                      <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
                        <div className="h-full bg-success w-4/5"></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-gray-400">80% confidence</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-gray-400 pt-2 border-t border-gray-700">
                      <div className="flex justify-between mb-1">
                        <span>Model:</span>
                        <span>VGG19</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Processed in:</span>
                        <span>1.2 seconds</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  color="success" 
                  className="w-full mt-4" 
                  size="sm"
                  startContent={<FaHistory />}
                >
                  Save to History
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Features section */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-6">
              <span className="gradient-text">Key Features</span>
            </h2>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with a user-friendly interface to make 
              glaucoma detection accessible to everyone.
            </p>
          </motion.div>
          
          {/* Feature tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={`cursor-pointer relative overflow-hidden`}
                onClick={() => setActiveTab(index)}
              >
                <div 
                  className={`p-4 rounded-xl text-center transition-all duration-300 ${
                    activeTab === index 
                      ? 'glassmorphism scale-105 border border-white/20' 
                      : 'glassmorphism-light hover:scale-105'
                  }`}
                >
                  <div className="flex justify-center mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                </div>
                {activeTab === index && (
                  <motion.div
                    layoutId="highlight"
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary"
                  />
                )}
              </motion.div>
            ))}
          </div>
          
          {/* Feature detail */}
          <div className="glassmorphism p-8 rounded-2xl">
            <div className="min-h-48">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  variants={tabVariants}
                  initial="inactive"
                  animate={activeTab === index ? "active" : "inactive"}
                  className={`${activeTab === index ? 'block' : 'hidden'}`}
                >
                  <div className="md:flex md:items-center md:gap-8">
                    <div className="md:w-1/3 flex justify-center pb-6 md:pb-0">
                      <div className="w-32 h-32 rounded-full gradient-border flex items-center justify-center p-8">
                        <div className="w-full h-full flex items-center justify-center">
                          {feature.icon}
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-2/3">
                      <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                      <p className="text-gray-300 mb-6">{feature.description}</p>
                      <div className="flex items-center">
                        <div className="h-8 w-2 bg-gradient-to-b from-primary to-secondary rounded-full mr-4"></div>
                        <p className="text-primary">{feature.stats}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 