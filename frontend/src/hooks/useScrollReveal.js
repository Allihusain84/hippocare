import { useEffect, useRef } from "react";

/**
 * useScrollReveal – Intersection Observer hook for scroll-triggered animations.
 *
 * Adds the `.revealed` class to each child with `.scroll-reveal` when it
 * enters the viewport.  The animation fires once and is never reversed.
 *
 * @param {object}  opts
 * @param {string}  opts.rootMargin   – IntersectionObserver rootMargin (default "0px 0px -60px 0px")
 * @param {number}  opts.threshold    – visibility ratio to trigger (default 0.15)
 * @param {number}  opts.staggerDelay – ms between siblings (default 100)
 */
const useScrollReveal = ({
  rootMargin = "0px 0px -60px 0px",
  threshold = 0.15,
  staggerDelay = 100,
} = {}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const targets = container.querySelectorAll(".scroll-reveal");
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin, threshold }
    );

    targets.forEach((el, i) => {
      // Apply stagger delay via CSS custom property
      el.style.transitionDelay = `${i * staggerDelay}ms`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, [rootMargin, threshold, staggerDelay]);

  return containerRef;
};

export default useScrollReveal;
