"use client";

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PixelTrail } from '@/components/ui/pixel-trail';
import { useIsMobile } from '@/hooks/use-mobile';
import PackageCard from './PackageCard';

interface Package {
  label: string;
  title: string;
  year: string;
  type: string;
  highlights: string[];
  description: string;
  price: string;
  originalPrice?: string;
  imageUrl: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
  image: string;
  link: string;
  features: string[];
}

const packagesData: Package[] = [
  {
    label: 'FEATURED WORK 01',
    title: 'Europe Explorer Adventure',
    year: '2025',
    type: 'International Expedition',
    highlights: [
      'Multi-Country Journey, Cultural Immersion, Historic Sites, Local Experiences',
      '15 European Countries, 21 Days, Premium Hotels, Expert Guides',
      'Paris to Rome, Amsterdam to Vienna, Complete European Experience',
    ],
    description:
      "Embark on the ultimate European adventure across 15 magnificent countries. From the romantic streets of Paris to the ancient wonders of Rome, experience Europe's rich tapestry of cultures, cuisines, and breathtaking landscapes in our most comprehensive international package.",
    price: '₹1,49,999',
    originalPrice: '₹2,50,000',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/5fcea5e6-d6bb-4169-8c84-f1c10f122fc2-preview--ghoom-wander-wildly-82-lovable-app/assets/images/photo-1467269204594-9661b134dd2b-2.webp',
    imageAlt: 'Scenic view of a European city street next to a canal',
    imagePosition: 'right',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/5fcea5e6-d6bb-4169-8c84-f1c10f122fc2-preview--ghoom-wander-wildly-82-lovable-app/assets/images/photo-1467269204594-9661b134dd2b-2.webp',
    link: '#',
    features: [
      'Multi-Country Journey, Cultural Immersion, Historic Sites, Local Experiences',
      '15 European Countries, 21 Days, Premium Hotels, Expert Guides',
      'Paris to Rome, Amsterdam to Vienna, Complete European Experience',
    ],
  },
  {
    label: 'FEATURED WORK 02',
    title: 'Mystical Himalayas Expedition',
    year: '2025',
    type: 'Mountain Adventure',
    highlights: [
      'High Altitude Trekking, Mountain Photography, Monastery Visits, Local Culture',
      'Leh Ladakh Region, 8 Days, Acclimatization Support, Professional Guides',
      'Pangong Lake, Nubra Valley, Khardung La Pass, Ancient Monasteries',
    ],
    description:
      "Journey to the roof of the world in the mystical Himalayas. Experience the raw beauty of Ladakh's landscapes, from pristine high-altitude lakes to ancient Buddhist monasteries, creating memories that will last a lifetime.",
    price: '₹21,999',
    originalPrice: '₹35,000',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/5fcea5e6-d6bb-4169-8c84-f1c10f122fc2-preview--ghoom-wander-wildly-82-lovable-app/assets/images/photo-1506905925346-21bda4d32df4-8.webp',
    imageAlt: 'Majestic view of the Himalayas with a group of trekkers',
    imagePosition: 'left',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/5fcea5e6-d6bb-4169-8c84-f1c10f122fc2-preview--ghoom-wander-wildly-82-lovable-app/assets/images/photo-1506905925346-21bda4d32df4-8.webp',
    link: '#',
    features: [
      'High Altitude Trekking, Mountain Photography, Monastery Visits, Local Culture',
      'Leh Ladakh Region, 8 Days, Acclimatization Support, Professional Guides',
      'Pangong Lake, Nubra Valley, Khardung La Pass, Ancient Monasteries',
    ],
  },
  {
    label: 'FEATURED WORK 03',
    title: 'Tropical Paradise Collection',
    year: '2025',
    type: 'Beach & Island',
    highlights: [
      'Island Hopping, Water Sports, Beach Photography, Cultural Tours',
      'Bali & Thailand, 7-9 Days, Luxury Resorts, Adventure Activities',
      'Ubud Rice Terraces, Phi Phi Islands, Temple Tours, Sunset Cruises',
    ],
    description:
      "Discover the ultimate tropical getaway across Southeast Asia's most stunning destinations. From Bali's spiritual temples to Thailand's pristine beaches, experience paradise with our carefully crafted island adventures.",
    price: '₹49,999',
    originalPrice: '₹75,000',
    imageUrl: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/5fcea5e6-d6bb-4169-8c84-f1c10f122fc2-preview--ghoom-wander-wildly-82-lovable-app/assets/images/photo-1518548419970-58e3b4079ab2-4.webp',
    imageAlt: 'A beautiful tropical beach with clear water and palm trees at sunset',
    imagePosition: 'right',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/5fcea5e6-d6bb-4169-8c84-f1c10f122fc2-preview--ghoom-wander-wildly-82-lovable-app/assets/images/photo-1518548419970-58e3b4079ab2-4.webp',
    link: '#',
    features: [
      'Island Hopping, Water Sports, Beach Photography, Cultural Tours',
      'Bali & Thailand, 7-9 Days, Luxury Resorts, Adventure Activities',
      'Ubud Rice Terraces, Phi Phi Islands, Temple Tours, Sunset Cruises',
    ],
  },
];

export function FeaturedPackages() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);

  const variants = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative py-20 lg:py-32 bg-gray-50 dark:bg-gray-950 overflow-hidden">
      {mounted && (
        <motion.div
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          style={isMobile ? {} : { y }}
        >
          <PixelTrail
            className="absolute inset-0"
            pixelClassName="rounded-full bg-gradient-to-br from-[#FFA500] to-[#4ecdc4] shadow-lg"
            pixelSize={60}
          />
        </motion.div>
      )}
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="space-y-8 sm:space-y-12 lg:space-y-20">
          {packagesData.map((pkg, index) => (
            <PackageCard
              key={index}
              pkg={{
                title: pkg.title,
                description: pkg.description,
                image: pkg.imageUrl,
                price: pkg.price,
                link: "#", // Assuming a default link or you can add it to your Package type
                features: pkg.highlights,
              }}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedPackages;