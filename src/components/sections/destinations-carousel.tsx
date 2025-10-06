"use client";

import * as React from "react";
import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion";
import { X } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";

interface CarouselImage {
  url: string;
  title: string;
}

interface ThreeDCarouselProps {
  images?: CarouselImage[];
  radius?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
}

const ThreeDCarousel: React.FC<ThreeDCarouselProps> = ({
  images = [
  { url: "https://ghoomosasteme.com/images/offer/manali", title: "Manali" },
  { url: "https://ghoomosasteme.com/images/offer/rishikesh", title: "Rishikesh" },
  { url: "https://ghoomosasteme.com/images/offer/kedarnath", title: "Kedarnath" },
  { url: "https://ghoomosasteme.com/images/offer/goa", title: "Goa" },
  { url: "https://ghoomosasteme.com/images/offer/mcleodganj", title: "Mcleodganj" },
  { url: "https://ghoomosasteme.com/images/offer/shimla", title: "Shimla" },
  { url: "https://ghoomosasteme.com/images/offer/chakrata", title: "Chakrata" },
  { url: "https://ghoomosasteme.com/images/offer/chopta", title: "Chopta" },
  { url: "https://ghoomosasteme.com/images/offer/jibhi", title: "Jibhi" },
  { url: "https://ghoomosasteme.com/images/offer/kedarkantha", title: "Kedarkantha" },
  { url: "https://ghoomosasteme.com/images/offer/kheerganga", title: "Kherganga" },
  { url: "https://ghoomosasteme.com/images/offer/udaipur", title: "Udaipur" }],

  radius = 800,
  autoRotate = true,
  autoRotateSpeed = 0.2
}) => {
  const [isCarouselActive, setIsCarouselActive] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState<CarouselImage | null>(null);
  const [isPopupHovered, setIsPopupHovered] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const popupRef = React.useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const transform = useTransform(rotation, (value) => `rotate3d(0, 1, 0, ${value}deg)`);

  // Detect mobile on mount
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Mobile-optimized settings
  const mobileRadius = 350;
  const mobileFaceWidth = 200;
  const desktopRadius = radius;
  const desktopFaceWidth = 300;
  
  const effectiveRadius = isMobile ? mobileRadius : desktopRadius;
  const faceWidth = isMobile ? mobileFaceWidth : desktopFaceWidth;
  const effectiveAutoRotateSpeed = isMobile ? 0.1 : autoRotateSpeed;

  const faceCount = images.length;
  const anglePerItem = 360 / faceCount;

  React.useEffect(() => {
    if (autoRotate && isCarouselActive && !selectedImage) {
      const interval = setInterval(() => {
        rotation.set(rotation.get() + effectiveAutoRotateSpeed);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [autoRotate, isCarouselActive, rotation, effectiveAutoRotateSpeed, selectedImage]);

  const handleImageClick = (image: CarouselImage) => {
    setSelectedImage(image);
    setIsCarouselActive(false);
  };

  const handleClosePopup = () => {
    setSelectedImage(null);
    setIsCarouselActive(true);
  };

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/917827372844", "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div className="w-full h-full min-h-[500px] md:min-h-[600px] flex items-center justify-center overflow-visible">
        <div
          className="relative w-full h-full flex items-center justify-center overflow-visible"
          style={{
            perspective: isMobile ? "1200px" : "2000px",
            transformStyle: "preserve-3d",
            willChange: 'transform'
          }}>

          <motion.div
            drag={isCarouselActive ? "x" : false}
            className="relative h-full origin-center cursor-grab active:cursor-grabbing"
            style={{
              transform,
              rotateY: rotation,
              width: faceWidth,
              transformStyle: "preserve-3d",
              willChange: 'transform'
            }}
            onDrag={(_, info) => {
              if (isCarouselActive) {
                const sensitivity = isMobile ? 0.08 : 0.05;
                rotation.set(rotation.get() + info.offset.x * sensitivity);
              }
            }}
            onDragEnd={(_, info) => {
              if (isCarouselActive) {
                const velocityMultiplier = isMobile ? 0.03 : 0.05;
                controls.start({
                  rotateY: rotation.get() + info.velocity.x * velocityMultiplier,
                  transition: {
                    type: "spring",
                    stiffness: isMobile ? 80 : 100,
                    damping: isMobile ? 35 : 30,
                    mass: 0.1
                  }
                });
              }
            }}
            animate={controls}>

            {images.map((image, i) => {
              const itemAngle = i * anglePerItem;
              const imageHeight = isMobile ? 200 : 300;
              return (
                <motion.div
                  key={`carousel-item-${i}`}
                  className="absolute flex h-full origin-center items-center justify-center"
                  style={{
                    width: `${faceWidth}px`,
                    transform: `rotateY(${itemAngle}deg) translateZ(${effectiveRadius}px)`,
                    left: "50%",
                    top: "50%",
                    marginLeft: `-${faceWidth / 2}px`,
                    marginTop: isMobile ? "-80px" : "-100px",
                    willChange: 'transform'
                  }}>

                  <div
                    className="relative w-full rounded-xl overflow-hidden shadow-2xl group cursor-pointer"
                    style={{ height: `${imageHeight}px` }}
                    onClick={() => handleImageClick(image)}>

                    <img
                      src={image.url}
                      alt={image.title}
                      className="w-full h-full object-cover"
                      loading="lazy" />

                    <div className="absolute bottom-0 left-0 w-full p-3 md:p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
                      <h3 className="text-base md:text-xl font-bold">{image.title}</h3>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      {selectedImage && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-start justify-center p-4 sm:p-8 bg-black/85 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClosePopup}>

          <motion.div
            ref={popupRef}
            className="relative max-w-3xl w-full my-8 rounded-[32px] overflow-hidden"
            style={{
              backgroundColor: "#0e131f",
              boxShadow: "0 -10px 100px 10px rgba(78, 99, 255, 0.25), 0 0 10px 0 rgba(0, 0, 0, 0.5)",
            }}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: isPopupHovered ? -5 : 0,
            }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            onClick={(e) => e.stopPropagation()}
            onMouseEnter={() => setIsPopupHovered(true)}
            onMouseLeave={() => setIsPopupHovered(false)}>

            <motion.div
              className="absolute inset-0 z-[60] pointer-events-none"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
              }}
              animate={{
                opacity: isPopupHovered ? 0.7 : 0.5,
              }}
              transition={{ duration: 0.3 }}
            />

            <div
              className="absolute inset-0 z-0"
              style={{
                background: "linear-gradient(180deg, #000000 0%, #000000 70%)",
              }}
            />

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-2/3 z-[10]"
              style={{
                background: `
                  radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.7) -10%, rgba(79, 70, 229, 0) 70%),
                  radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.7) -10%, rgba(79, 70, 229, 0) 70%)
                `,
                filter: "blur(40px)",
              }}
              animate={{
                opacity: isPopupHovered ? 0.9 : 0.8,
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-2/3 z-[11]"
              style={{
                background: `radial-gradient(circle at bottom center, rgba(161, 58, 229, 0.7) -20%, rgba(79, 70, 229, 0) 60%)`,
                filter: "blur(45px)",
              }}
              animate={{
                opacity: isPopupHovered ? 0.85 : 0.75,
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-[2px] z-[15]"
              style={{
                background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
              }}
              animate={{
                boxShadow: isPopupHovered
                  ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
                  : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
                opacity: isPopupHovered ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="absolute bottom-0 left-0 h-1/4 w-[1px] z-[15] rounded-full"
              style={{
                background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 80%)",
              }}
              animate={{
                boxShadow: isPopupHovered
                  ? "0 0 20px 4px rgba(172, 92, 255, 0.9)"
                  : "0 0 15px 3px rgba(172, 92, 255, 0.8)",
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="absolute bottom-0 right-0 h-1/4 w-[1px] z-[15] rounded-full"
              style={{
                background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 80%)",
              }}
              animate={{
                boxShadow: isPopupHovered
                  ? "0 0 20px 4px rgba(56, 189, 248, 0.9)"
                  : "0 0 15px 3px rgba(56, 189, 248, 0.8)",
              }}
              transition={{ duration: 0.3 }}
            />

            <motion.div
              className="absolute inset-0 z-[70] pointer-events-none"
              style={{
                background: "linear-gradient(110deg, transparent 20%, rgba(255, 215, 0, 0.3) 45%, rgba(64, 224, 208, 0.3) 50%, rgba(255, 215, 0, 0.3) 55%, transparent 80%)",
              }}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ 
                x: "200%",
                opacity: [0, 1, 1, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut"
              }}
            />

            <button
              onClick={handleClosePopup}
              className="absolute top-4 right-4 z-[80] p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors">
              <X className="w-6 h-6" />
            </button>

            <div className="relative z-[40]">
              <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[500px] bg-black/20">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain" />

                <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                    {selectedImage.title}
                  </h2>
                </div>
              </div>

              <div className="p-6 md:p-8 text-center">
                <p className="text-lg text-gray-300 mb-6">
                  Discover the beauty of {selectedImage.title}. Book your adventure today!
                </p>
                
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="relative px-8 py-4 text-lg font-bold text-primary-foreground rounded-full overflow-hidden group"
                  whileHover={{ 
                    scale: 1.05,
                    filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.5))"
                  }}
                  whileTap={{ scale: 0.95 }}>

                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary"
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      backgroundSize: "200% 100%"
                    }} />

                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: [
                        "0 0 20px rgba(241, 196, 15, 0.6), 0 0 40px rgba(241, 196, 15, 0.4)",
                        "0 0 40px rgba(241, 196, 15, 0.8), 0 0 60px rgba(241, 196, 15, 0.6)",
                        "0 0 20px rgba(241, 196, 15, 0.6), 0 0 40px rgba(241, 196, 15, 0.4)"
                      ]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }} />

                  <span className="relative z-10 flex items-center gap-2 justify-center">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Book on WhatsApp
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

// New Auto-Changing Image Carousel Component
const AutoImageCarousel = () => {
  const carouselImages = [
    "https://ghoomosasteme.com/kyuuu/all5000",
    "https://ghoomosasteme.com/kyuuu/1",
    "https://ghoomosasteme.com/kyuuu/2",
    "https://ghoomosasteme.com/kyuuu/3"
  ];
  
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  return (
    <div className="relative w-full h-full">
      {carouselImages.map((url, index) => (
        <motion.img
          key={url}
          src={url}
          alt={`Unmatched deal ${index + 1}`}
          className="absolute inset-0 w-full h-full object-contain rounded-2xl"
          style={{
            mixBlendMode: "screen",
            opacity: 0.95,
            filter: "brightness(1.1) contrast(1.05) drop-shadow(0 0 30px rgba(255, 255, 255, 0.4))",
          }}
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: currentImageIndex === index ? 0.95 : 0,
            scale: currentImageIndex === index ? 1 : 1.05
          }}
          transition={{ 
            duration: 0.7,
            ease: "easeInOut"
          }}
        />
      ))}
      
      {/* Image indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {carouselImages.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full bg-white/50"
            animate={{
              scale: currentImageIndex === index ? 1.5 : 1,
              backgroundColor: currentImageIndex === index ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.5)"
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default function AICaseStudies() {
  return (
    <section className="relative pt-16 sm:pt-24 pb-16 sm:pb-24 overflow-hidden">
      {/* Simplified animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5"
        style={{ willChange: 'opacity' }}
      />

      {/* Simplified floating gradient orbs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
        animate={{
          x: [0, 50, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ willChange: 'transform' }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        animate={{
          x: [0, -50, 0],
          y: [0, 25, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
        style={{ willChange: 'transform' }}
      />


      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-4">
          <motion.h2
            className="text-4xl lg:text-6xl text-foreground mb-2 !whitespace-pre-line md:!text-[#795036] !font-extrabold md:!text-[58px]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>{`\nUnmatched Deals !!`}
          </motion.h2>
          
          <motion.p
            className="text-lg !whitespace-pre-line !text-[#ffde5a] !font-bold mb-3"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}>
            Tap to know more
          </motion.p>

          {/* Descriptive content */}
          <motion.div
            className="max-w-3xl mx-auto mb-4 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}>
            
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              Explore our handpicked collection of breathtaking destinations across India. 
              From the snow-capped peaks of Manali to the serene beaches of Goa, 
              each location offers a unique experience waiting to be discovered.
            </p>
            
            <div className="flex flex-wrap justify-center gap-3 pt-1">
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                🏔️ Mountain Escapes
              </span>
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold border border-accent/20">
                🏖️ Beach Getaways
              </span>
              <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold border border-primary/20">
                ⛰️ Trek Adventures
              </span>
              <span className="px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold border border-accent/20">
                🏰 Heritage Tours
              </span>
            </div>
          </motion.div>
        </div>

        {/* NEW: Scroll Animation Subsection */}
        <div className="mb-16">
          <ContainerScroll
            titleComponent={
              <div className="space-y-2 mb-12">
                <motion.h3 
                  className="text-4xl md:text-6xl font-bold font-devanagari bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  style={{ backgroundSize: "200% auto" }}
                  animate={{
                    backgroundPosition: ["0% center", "200% center", "0% center"]
                  }}
                >
                  Wondering
                </motion.h3>
                <motion.h3 
                  className="text-3xl md:text-5xl font-bold font-devanagari bg-gradient-to-r from-accent via-primary to-accent bg-clip-text text-transparent"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ backgroundSize: "200% auto" }}
                  animate={{
                    backgroundPosition: ["0% center", "200% center", "0% center"]
                  }}
                >
                  Unmatched Deals Kaise ?
                </motion.h3>
              </div>
            }
          >
            <AutoImageCarousel />
          </ContainerScroll>
        </div>
        
        {/* Rotating carousel with mobile-optimized padding */}
        <div className="w-full max-w-7xl mx-auto h-[600px] md:h-[700px] pb-[45rem] sm:pb-[50rem] md:pb-[56rem]">
          <ThreeDCarousel />
        </div>
      </div>
    </section>
  );
}