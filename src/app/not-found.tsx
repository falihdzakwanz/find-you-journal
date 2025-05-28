'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <head>
        <title>Page Not Found | Find You</title>
      </head>
      
      <div className="h-screen bg-neutral flex flex-col items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.h1 
            className="text-7xl lg:text-9xl font-bold text-primary mb-4"
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop'
            }}
          >
            404
          </motion.h1>
          
          <motion.h2 
            className="text-3xl md:text-4xl font-semibold text-dark-brown mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Oops! Page Not Found
          </motion.h2>
          
          <motion.p 
            className="text-lg text-dark-brown max-w-md mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.6 }}
          >
            <Link href="/">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-accent text-white rounded-lg shadow-lg hover:bg-dark-brown transition-colors"
              >
                Return Home
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <p className="text-dark-brown text-sm">
            Still lost?{' '}
            <Link href="/contact" className="text-primary hover:underline">
              Contact us
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  )
}