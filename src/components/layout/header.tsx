"use client"

import { motion } from "framer-motion"
import logo from '@/capucho-logo.png'; // A imagem é importada aqui

const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full px-4 py-6 md:px-8 lg:px-12"
    >
      <div className="flex flex-col items-center justify-center gap-4 max-w-7xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <img 
            src={logo} 
            alt="Logotipo do Capucho Brindes" 
            className="w-20 h-20 md:w-24 md:h-24 rounded-lg object-cover shadow-soft"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-brand-text tracking-tight">
            CAPUCHO BRINDES
          </h1>
        </motion.div>
      </div>
    </motion.header>
  )
}

export default Header
