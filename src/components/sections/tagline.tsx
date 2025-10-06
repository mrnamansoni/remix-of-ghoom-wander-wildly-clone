"use client";

import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { motion, useInView, useScroll, useTransform, type Transition } from "framer-motion";
import { useRef } from "react";
import { PixelTrail } from "@/components/ui/pixel-trail"
import { useScreenSize } from "@/components/hooks/use-screen-size"

const TaglineSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const screenSize = useScreenSize()

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      } as Transition
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      } as Transition
    }
  };

  return (
    <section ref={ref} className="relative py-16 sm:py-24 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-background via-card/50 to-background z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ willChange: 'opacity' }}
      />

      {/* PixelTrail with visible debug background - mobile optimized size */}
      <div className="absolute inset-0 z-30">
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 30 : 60}
          fadeDuration={600}
          delay={100}
          pixelClassName="rounded-full bg-gradient-to-r from-primary/90 via-accent/90 to-primary/90 shadow-lg"
        />
      </div>

      {/* Floating decorative elements - smaller on mobile, reduced animation */}
      <motion.div
        className="absolute top-10 sm:top-20 left-5 sm:left-10 w-20 sm:w-32 h-20 sm:h-32 bg-primary/10 rounded-full blur-3xl z-10 pointer-events-none"
        variants={floatingVariants}
        animate="animate"
        style={{ willChange: 'transform' }}
      />
      <motion.div
        className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-24 sm:w-40 h-24 sm:h-40 bg-accent/10 rounded-full blur-3xl z-10 pointer-events-none"
        variants={floatingVariants}
        animate="animate"
        transition={{ delay: 1 }}
        style={{ willChange: 'transform' }}
      />

      <motion.div
        className="container mx-auto px-4 max-w-4xl sm:max-w-5xl relative z-20 pointer-events-none"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {/* Sparkle badge - smaller on mobile */}
        <motion.div
          className="flex justify-center mb-6 sm:mb-8"
          variants={wordVariants}
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold border border-primary/20 backdrop-blur-sm pointer-events-auto rounded-full"
            whileHover={{ 
              scale: 1.05, 
            }}
            style={{ willChange: 'transform' }}
          >
            <Sparkles className="w-3 sm:w-4 h-3 sm:h-4" />
            Your Adventure Awaits
          </motion.div>
        </motion.div>

        {/* Main Hindi tagline with gradient text - responsive sizes */}
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-6 sm:mb-8 leading-tight"
          variants={wordVariants}
        >
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-shimmer bg-[length:200%_100%]">
            Kabhi-Kabhi बस एक BAG उठाओ और निकल पड़ो...
          </span>
          <br />
          <motion.span
            className="inline-block mt-2 sm:mt-4"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
            style={{ willChange: 'transform' }}
          >
            Sahi रास्ते Hum बताएँगे :)
          </motion.span>
        </motion.h2>
        
        {/* Description - responsive text size */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-muted-foreground text-center mb-8 sm:mb-12 max-w-3xl sm:max-w-4xl mx-auto leading-relaxed"
          variants={wordVariants}
        >
          Discover our handpicked collection of extraordinary travel experiences, 
          designed for the modern adventurer seeking authentic connections
        </motion.p>
        
        {/* CTA Button with enhanced effects - full width on mobile */}
        <motion.div
          className="flex justify-center"
          variants={wordVariants}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto pointer-events-auto max-w-xs sm:max-w-none"
            style={{ willChange: 'transform' }}
          >
            <Button 
              size="lg" 
              className="group relative w-full sm:w-auto px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg font-bold bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full shadow-2xl overflow-hidden"
            >
              {/* Button content */}
              <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                SEE ALL PACKAGES
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
              </span>
            </Button>
          </motion.div>
        </motion.div>

        {/* Decorative lines - responsive */}
        <motion.div
          className="flex items-center justify-center gap-2 sm:gap-4 mt-12 sm:mt-16"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent to-primary" />
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          <div className="h-px w-16 sm:w-20 bg-gradient-to-l from-transparent to-primary" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default TaglineSection;