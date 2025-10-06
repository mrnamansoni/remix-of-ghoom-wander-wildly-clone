import React, { useRef, useState, useEffect } from "react";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { PixelTrail } from '@/components/ui/pixel-trail';
import { useIsMobile } from '@/hooks/use-mobile';

interface PackageCardProps {
  pkg: {
    title: string;
    description: string;
    image: string;
    price: string;
    link: string;
    features: string[];
  };
  index: number;
}

const PackageCard: React.FC<PackageCardProps> = ({ pkg, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Scroll-based flip for mobile only
  useEffect(() => {
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsFlipped(true);
          } else {
            setIsFlipped(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isMobile]);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative group perspective-1000"
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={isMobile ? {} : { y }}
    >
      <motion.div
        className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transition-all duration-700"
        style={{ transformStyle: "preserve-3d" }}
        animate={isFlipped && isMobile ? { rotateY: 180 } : { rotateY: 0 }}
      >
        {/* Front of the card */}
        <div className="absolute inset-0 backface-hidden">
          <Image
            src={pkg.image}
            alt={pkg.title}
            width={500}
            height={300}
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {pkg.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
              {pkg.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {pkg.price}
              </span>
              <Button
                onClick={() => setIsFlipped(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
              >
                View Details
              </Button>
            </div>
            <ul className="text-gray-700 dark:text-gray-200 space-y-2">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Back of the card */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-gray-50 dark:bg-gray-900 p-6 rounded-xl flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {pkg.title} Details
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {pkg.description}
            </p>
            <ul className="text-gray-700 dark:text-gray-200 space-y-2">
              {pkg.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    ></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex justify-between items-center mt-4">
            <Button
              onClick={() => setIsFlipped(false)}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Back
            </Button>
            <Button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Book Now
            </Button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PackageCard;