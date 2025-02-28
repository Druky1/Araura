"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import{ NumberTicker} from "@/components/magicui/number-ticker";

export function LoadingScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <div className="relative">
              <NumberTicker 
                value={100} 
                className="text-8xl font-medium tracking-tighter text-foreground"
              />
              <span className="absolute -right-8 top-0 text-2xl text-primary">%</span>
            </div>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, ease: "easeInOut" }}
              className="mt-4 h-1 w-full bg-primary"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 