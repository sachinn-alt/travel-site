import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

export const SplitText = ({
  text,
  className = "",
  delay = 0,
  tag = "h1",
  staggerDuration = 0.04
}) => {
  const words = text.split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 18,
        stiffness: 120,
      },
    },
  };

  const Component = motion[tag] || motion.h1;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("inline-flex flex-wrap gap-x-2.5", className)}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants}
          className="inline-block"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};
