"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export default function Parallax({ children, speed = 0.2, className = "" }) {
  const ref = useRef(null);
  const shouldReduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const maxOffset = Math.min(Math.abs(speed) * 160, 80) * (speed < 0 ? -1 : 1);
  const y = useTransform(scrollYProgress, [0, 1], [-maxOffset, maxOffset]);
  const disabled = shouldReduce || isMobile;

  return (
    <div ref={ref} className={className}>
      <motion.div style={disabled ? undefined : { y }} className="h-full w-full">
        {children}
      </motion.div>
    </div>
  );
}
