"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to a container ref and adds the
 * "visible" class to any descendant elements that have the "reveal" class
 * when they enter the viewport. Each element is only triggered once.
 *
 * @param {Object} options
 * @param {number} [options.threshold=0.12]  - Fraction of element that must be visible
 * @param {string} [options.rootMargin="0px 0px -48px 0px"] - Shrink bottom to trigger slightly early
 * @returns {React.RefObject}  - Attach to the section wrapper element
 */
export function useScrollReveal({
  threshold = 0.12,
  rootMargin = "0px 0px -48px 0px",
} = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Respect user preference for reduced motion
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // Make everything visible immediately without animation
      const container = containerRef.current;
      if (!container) return;
      container.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const els = Array.from(container.querySelectorAll(".reveal"));
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target); // fire once only
          }
        });
      },
      { threshold, rootMargin }
    );

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return containerRef;
}
