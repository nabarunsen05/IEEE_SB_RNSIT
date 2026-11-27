"use client";

import { motion, useReducedMotion } from "framer-motion";

const groupVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 16 },
  },
};

export default function Pop({ children, delay = 0, className = "" }) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className || undefined}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: false, amount: 0.25 }}
      transition={{ type: "spring", stiffness: 120, damping: 16, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PopGroup({ children, className = "", amount = "some" }) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className || undefined}>{children}</div>;
  }

  return (
    <motion.div
      variants={groupVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function PopItem({ children, className = "" }) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return <div className={className || undefined}>{children}</div>;
  }

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
}
