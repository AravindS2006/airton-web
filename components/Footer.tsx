import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaTwitter, FaLinkedin, FaEye, FaBrain, FaCloudUploadAlt, FaMobileAlt, FaLock, FaChartLine } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.5 }}
      className="relative z-10 pt-24 pb-12 mt-16"
    >
      {/* Enhanced blur background */}
      <div className="absolute inset-0 bg-gradient-to-t from-background-color to-transparent z-0"></div>
      <div className="absolute inset-0 backdrop-blur-lg z-0"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary-color/50 to-transparent"></div>
      <div className="absolute top-0 left-[10%] w-32 h-32 blob-effect bg-secondary-color/10"></div>
      <div className="absolute top-0 right-[20%] w-48 h-48 blob-effect bg-primary-color/15"></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-secondary-color/80 to-primary-color/80 flex items-center justify-center">
                <FaEye className="text-white text-sm" />
              </div>
              <h3 className="text-xl font-bold gradient-text">Glaucoma AI</h3>
            </div>
            <p className="text-text-secondary text-sm">
              Advanced AI-powered eye health analysis using state-of-the-art deep learning technology.
            </p>
            <div className="flex items-center gap-6 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary-color transition-colors"
              >
                <FaGithub className="text-xl" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary-color transition-colors"
              >
                <FaTwitter className="text-xl" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary-color transition-colors"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Features</h3>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li className="flex items-center gap-3">
                <FaEye className="text-primary-color" />
                <span>Eye Image Analysis</span>
              </li>
              <li className="flex items-center gap-3">
                <FaBrain className="text-primary-color" />
                <span>AI-Powered Detection</span>
              </li>
              <li className="flex items-center gap-3">
                <FaCloudUploadAlt className="text-primary-color" />
                <span>Easy Image Upload</span>
              </li>
              <li className="flex items-center gap-3">
                <FaChartLine className="text-primary-color" />
                <span>Accuracy Reports</span>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Resources</h3>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li>
                <a href="#" className="hover:text-primary-color transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-color transition-colors">API Reference</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-color transition-colors">Research Papers</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-color transition-colors">Case Studies</a>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white">Contact</h3>
            <ul className="space-y-3 text-text-secondary text-sm">
              <li>
                <a href="mailto:info@glaucomaai.com" className="hover:text-primary-color transition-colors">info@glaucomaai.com</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-color transition-colors">Support Center</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-color transition-colors">Feedback</a>
              </li>
              <li className="flex items-center gap-3">
                <FaLock className="text-primary-color" />
                <span>Privacy Focused</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-text-secondary text-sm">
              &copy; {currentYear} Glaucoma AI. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-text-secondary text-sm hover:text-primary-color transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-text-secondary text-sm hover:text-primary-color transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-text-secondary text-sm hover:text-primary-color transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}