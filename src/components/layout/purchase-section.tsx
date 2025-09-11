"use client"

import { motion } from "framer-motion"
import { PurchaseButton } from "@/components/ui/purchase-button"

const PurchaseSection = () => {
  const handlePurchaseClick = () => {
    // Placeholder para futura implementação
    console.log("Purchase button clicked")
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-brand-cream via-brand-cream/90 to-transparent"
    >
      <div className="max-w-md mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        >
          <PurchaseButton
            onClick={handlePurchaseClick}
            className="w-full rounded-2xl"
            size="large"
          >
            COMPRAR
          </PurchaseButton>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default PurchaseSection