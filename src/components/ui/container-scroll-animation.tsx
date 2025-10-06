"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
  titleComponent,
  children,
}: {
  titleComponent: string | React.ReactNode;
  children: React.ReactNode;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = React.useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  const scaleDimensions = () => {
    return isMobile ? [0.8, 0.9] : [1.05, 1];
  };

  const rotate = useTransform(scrollYProgress, [0, 0.5], [10, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], scaleDimensions());
  const translate = useTransform(scrollYProgress, [0, 0.5], [0, -50]);

  return (
    <div
      className="h-[60rem] md:h-[80rem] flex items-center justify-center relative p-4 md:p-20"
      ref={containerRef}
    >
      <div
        className="w-full relative"
        style={{
          perspective: "1000px",
        }}
      >
        <Header translate={translate} titleComponent={titleComponent} />
        <Card rotate={rotate} translate={translate} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  );
};

export const Header = ({ translate, titleComponent }: any) => {
  return (
    <motion.div
      style={{
        translateY: translate,
      }}
      className="max-w-5xl mx-auto text-center mb-16"
    >
      {titleComponent}
    </motion.div>
  );
};

export const Card = ({
  rotate,
  scale,
  translate,
  children,
}: {
  rotate: MotionValue<number>;
  scale: MotionValue<number>;
  translate: MotionValue<number>;
  children: React.ReactNode;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      style={{
        rotateX: rotate,
        scale,
        translateY: translate,
      }}
      className="max-w-6xl mx-auto h-[45rem] md:h-[65rem] w-full relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main card with gradient effects */}
      <motion.div
        className="relative h-full w-full rounded-[32px] overflow-hidden"
        style={{
          backgroundColor: "rgba(14, 19, 31, 0.3)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 -10px 100px 10px rgba(78, 99, 255, 0.25), 0 0 10px 0 rgba(0, 0, 0, 0.5)",
        }}
        animate={{
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Bottom gradient glows */}
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
            opacity: isHovered ? 0.9 : 0.8,
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
            opacity: isHovered ? 0.85 : 0.75,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom edge glow */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px] z-[15]"
          style={{
            background: "linear-gradient(90deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.7) 50%, rgba(255, 255, 255, 0.05) 100%)",
          }}
          animate={{
            boxShadow: isHovered
              ? "0 0 20px 4px rgba(172, 92, 255, 0.9), 0 0 30px 6px rgba(138, 58, 185, 0.7), 0 0 40px 8px rgba(56, 189, 248, 0.5)"
              : "0 0 15px 3px rgba(172, 92, 255, 0.8), 0 0 25px 5px rgba(138, 58, 185, 0.6), 0 0 35px 7px rgba(56, 189, 248, 0.4)",
            opacity: isHovered ? 1 : 0.9,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Corner glows */}
        <motion.div
          className="absolute bottom-0 left-0 h-1/4 w-[1px] z-[15] rounded-full"
          style={{
            background: "linear-gradient(to top, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 80%)",
          }}
          animate={{
            boxShadow: isHovered
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
            boxShadow: isHovered
              ? "0 0 20px 4px rgba(56, 189, 248, 0.9)"
              : "0 0 15px 3px rgba(56, 189, 248, 0.8)",
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Glass overlay effect */}
        <motion.div
          className="absolute inset-0 z-[60] pointer-events-none"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 80%, rgba(255,255,255,0.05) 100%)",
          }}
          animate={{
            opacity: isHovered ? 0.7 : 0.5,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Content */}
        <div className="relative z-[40] h-full w-full p-6 md:p-10 flex items-center justify-center">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
};