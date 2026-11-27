"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

export default function CountUp({
  value,
  duration = 1.5,
  prefix = "",
  suffix,
  className = "",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduce = useReducedMotion();

  const raw = String(value ?? "0");
  const match = raw.match(/^([^\d.-]*)(\d+(?:\.\d+)?)(.*)$/);
  const target = match ? Number(match[2]) : 0;
  const resolvedPrefix = prefix || (match ? match[1] : "");
  const resolvedSuffix = suffix !== undefined ? suffix : match ? match[3] : "";

  const [displayValue, setDisplayValue] = useState(shouldReduce ? target : 0);

  useEffect(() => {
    if (shouldReduce) {
      setDisplayValue(target);
      return;
    }
    if (!isInView) return;

    const controls = animate(0, target, {
      duration,
      ease: "easeOut",
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [isInView, target, duration, shouldReduce]);

  return (
    <span ref={ref} className={className}>
      {resolvedPrefix}
      {shouldReduce ? target : displayValue}
      {resolvedSuffix}
    </span>
  );
}
