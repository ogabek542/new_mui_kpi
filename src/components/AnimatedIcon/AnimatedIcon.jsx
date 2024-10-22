import React from 'react';
import { motion } from 'framer-motion';

const AnimatedIcon = () => {
  // Animation variants
  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.3,
        repeat: Infinity,
        repeatDelay: 0.5,
      },
    },
  };

  const pathVariants = {
    initial: {
      fill: '#BF945D',
      scale: 1.1,
    },
    animate: {
      fill: ['#020D9E', '#0156B4', '#020D9E'],
      scale: [1.01, 1.07, 1.01],
      transition: {
        repeat: Infinity,
        duration: 2.4,
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}
      viewBox="220 80 200 150" // Adjusted viewBox to include more of the SVG content
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      {/* Group containing the paths */}
      <g id="Layer_1">
        {/* Path 1 (Letter U) */}
        <motion.path
          id="logo_svg"
          fillRule="nonzero"
          d="M340 157 l0 38 -11 0 0 -52 c3 1 6 3 7 7 0 0 5 1 4 7 z m -4 30 c0 3 -3 3 -3 0 0 -3 0 -5 0 -8 l-2 0 c0 3 0 6 0 8 0 2 1 3 3 3 2 0 3 -1 3 -3 0 -3 0 -6 0 -9 l-1 0 0 8 z"
          variants={pathVariants}
        />
        {/* Path 2 (Letter B) */}
        <motion.path
          id="logo_svg_0"
          fillRule="nonzero"
          d="M315 142 l0 53 11 0 0 -53 c-1 -1 -5 -2 -5 -2 0 0 -4 2 -6 2 z m 7 42 c1 0 2 1 2 3 0 4 -4 3 -6 3 l0 -11 3 0 c1 0 3 0 3 3 0 1 0 3 -1 3 z m 0 3 c0 -2 -1 -2 -3 -2 l0 4 c2 0 3 0 3 -2 z m -3 -3 c2 0 3 0 3 -2 0 -2 -1 -2 -3 -2 l0 4 z"
          variants={pathVariants}
        />
        {/* Path 3 (Letter N) */}
        <motion.path
          id="logo_svg_1"
          fillRule="nonzero"
          d="M302 157 l0 38 11 0 0 -52 c-3 1 -6 3 -7 7 0 0 -5 1 -4 7 z m 7 31 l0 -9 1 0 0 11 -2 0 -3 -9 0 9 -1 0 0 -11 c1 0 1 0 2 0 l3 9 z"
          variants={pathVariants}
        />
      </g>
    </motion.svg>
  );
};

export default AnimatedIcon;
