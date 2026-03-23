import { useState, useEffect } from "react";

/**
 * useSlider – auto-advancing slider hook.
 * @param {number} count   Total number of slides
 * @param {number} [ms=3500] Interval in milliseconds
 * @returns {[number, Function]} [currentIndex, setIndex]
 */
const useSlider = (count, ms = 3500) => {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (count <= 1) return;
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % count);
    }, ms);
    return () => clearInterval(timer);
  }, [count, ms]);

  return [slide, setSlide];
};

export default useSlider;
