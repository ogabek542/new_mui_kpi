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
      scale: 1.1,
    },
    animate: {
      fill: ['#020D9E', '#2C79C7', '#020D9E'],
      scale: [1.01, 1.09, 1.01],
      transition: {
        repeat: Infinity,
        duration: 2.4,
        ease: 'easeIn',
      },
    },
  };

  return (
    <motion.svg
    //   style={{ width: '100%', height: '100%' }}
      viewBox="220 80 200 150" // Adjusted viewBox to include more of the SVG content
        width="400px" // Set the width explicitly
        height="350px" // Set the height explicitly
      initial="initial"
      animate="animate"
      variants={containerVariants}
    >
      {/* Group containing the paths */}
      <g id="Layer_1">
        {/* Path 1 (Letter U) */}
        <motion.path
          id="logo_svg"
        //   fillRule="nonzero"
          d="M340 157l0 38 -11 0 0 -52c3,1 6,3 7,7 0,0 5,1 4,7zm-4 30c0,3 -3,3 -3,0 0,-3 0,-5 0,-8l-2 0c0,3 0,6 0,8 0,2 1,3 3,3 2,0 3,-1 3,-3 0,-3 0,-6 0,-9l-1 0 0 8z"
          variants={pathVariants}
        />
        {/* Path 2 (Letter B) */}
        <motion.path
          id="logo_svg_0"
        //   fillRule="nonzero"
          d="M315 142l0 53 11 0 0 -53c-1,-1 -5,-2 -5,-2 0,0 -4,2 -6,2zm7 42c1,0 2,1 2,3 0,4 -4,3 -6,3l0 -11 3 0c1,0 3,0 3,3 0,1 0,3 -1,3zm0 3c0,-2 -1,-2 -3,-2l0 4c2,0 3,0 3,-2l0 0zm-3 -3c2,0 3,0 3,-2 0,-2 -1,-2 -3,-2l0 4z"
          variants={pathVariants}
        />
        {/* Path 3 (Letter N) */}
        <motion.path
          id="logo_svg_1"
        //   fillRule="nonzero"
          d="M302 157l0 38 11 0 0 -52c-3,1 -6,3 -7,7 0,0 -5,1 -4,7zm7 31l0 -9 1 0 0 11 -2 0 -3 -9 0 9 -1 0 0 -11c1,0 1,0 2,0l3 9z"
          variants={pathVariants}
        />
      </g>
    </motion.svg>
  );
};

export default AnimatedIcon;
