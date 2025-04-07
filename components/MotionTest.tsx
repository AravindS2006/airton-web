'use client';

import { motion } from 'framer-motion';

export default function MotionTest() {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Motion Test</h2>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="p-4 bg-blue-500 text-white rounded-lg"
      >
        This is a test of framer-motion
      </motion.div>
    </div>
  );
} 