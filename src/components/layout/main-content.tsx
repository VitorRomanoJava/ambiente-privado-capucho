"use client"

import { motion } from "framer-motion"

const MainContent = () => {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="flex-1 flex items-center justify-center px-4 py-8 md:px-8 lg:px-12"
    >
      <div className="w-full max-w-4xl">
        {/* Área central reservada para futuras implementações */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="min-h-[400px] md:min-h-[500px] lg:min-h-[600px] bg-card/30 rounded-3xl border border-border/30 flex items-center justify-center"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="w-32 h-32 mx-auto bg-muted/50 rounded-2xl flex items-center justify-center"
            >
              <span className="text-muted-foreground text-sm font-medium">
                Área Reservada
              </span>
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="text-muted-foreground text-lg font-light max-w-md mx-auto"
            >
              Este espaço está preparado para futuras implementações
            </motion.p>
          </div>
        </motion.div>
      </div>
    </motion.main>
  )
}

export default MainContent