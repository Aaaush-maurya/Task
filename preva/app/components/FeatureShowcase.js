"use client";

import { useState, useEffect, useRef } from "react";
import { features } from "../features";
import FeatureContent from "./FeatureContent";
import FeatureImage from "./FeatureImage";
import FeatureList from "./FeatureList";

export default function FeatureShowcase() {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const scrollTimeout = useRef(null);

  const prevFeature = () =>
    setIndex((prev) => (prev === 0 ? features.length - 1 : prev - 1));
  const nextFeature = () =>
    setIndex((prev) => (prev === features.length - 1 ? 0 : prev + 1));

  useEffect(() => {
    const container = containerRef.current;

    const handleWheel = (e) => {
      if (scrollTimeout.current) return;
      e.preventDefault();

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 300); // Slightly longer for smoother UX

      if (e.deltaY > 0) nextFeature();
      else if (e.deltaY < 0) prevFeature();
    };

    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;

      if (scrollTimeout.current) return;
      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 300);

      if (swipeDistance > 30) nextFeature();
      else if (swipeDistance < -30) prevFeature();
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") nextFeature();
      if (e.key === "ArrowLeft") prevFeature();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const { title, description, image } = features[index];

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-white p-6 overflow-hidden"
    >
      <div className="relative max-w-7xl w-full transition-opacity duration-500 ease-in-out">
        {/* Mobile Layout */}
        <div className="md:hidden flex flex-col">
          <div className="px-4 mb-8">
            <FeatureContent index={index} title={title} description={description} />
          </div>
          <div className="flex flex-col items-center justify-center">
            <FeatureImage
              title={title}
              image={image}
              prevFeature={prevFeature}
              nextFeature={nextFeature}
            />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="flex flex-col items-center justify-center">
            <FeatureImage
              title={title}
              image={image}
              prevFeature={prevFeature}
              nextFeature={nextFeature}
            />
          </div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3">
            <FeatureContent index={index} title={title} description={description} />
          </div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3">
            <h3 className="text-base md:text-lg font-semibold mb-4">Feature Showcase</h3>
            <FeatureList features={features} index={index} setIndex={setIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}