"use client";

import { useState, useEffect, useRef } from "react";
import { features } from "../features";
import FeatureContent from "./FeatureContent";
import FeatureImage from "./FeatureImage";
import FeatureList from "./FeatureList";

export default function FeatureShowcase() {
  const [index, setIndex] = useState(0);
  const { title, description, image } = features[index];
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

      // Check if we can navigate to another feature
      const canGoNext = index < features.length - 1;
      const canGoPrev = index > 0;

      if (e.deltaY > 0 && canGoNext) {
        // Scrolling down and can go to next feature
        e.preventDefault();
        setIndex(index + 1);
        scrollTimeout.current = setTimeout(() => {
          scrollTimeout.current = null;
        }, 200);
      } else if (e.deltaY < 0 && canGoPrev) {
        // Scrolling up and go to previous feature
        e.preventDefault();
        setIndex(index - 1);
        scrollTimeout.current = setTimeout(() => {
          scrollTimeout.current = null;
        }, 200);
      }
      // If we can't navigate in that direction, allow normal page scrolling
    };

    // Touch/swipe support for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    let isSwiping = false;

    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
      isSwiping = false;
    };

    const handleTouchMove = (e) => {
      if (Math.abs(e.touches[0].clientY - touchStartY) > 10) {
        isSwiping = true;
      }
    };

    const handleTouchEnd = (e) => {
      if (!isSwiping) return;
      
      if (scrollTimeout.current) return;

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 200); // Same timeout as wheel events
      
      touchEndY = e.changedTouches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;
      const minSwipeDistance = 30; // Reduced minimum distance for better responsiveness

      if (Math.abs(swipeDistance) > minSwipeDistance) {
        if (swipeDistance > 0 && index < features.length - 1) {
          // Swipe up - go to next feature
          setIndex(index + 1);
        } else if (swipeDistance < 0 && index > 0) {
          // Swipe down - go to previous feature
          setIndex(index - 1);
        }
      }
    };

    container.style.overflow = "hidden";
    window.addEventListener("wheel", handleWheel, { passive: false });
    
    // Add touch event listeners
    container.addEventListener("touchstart", handleTouchStart, { passive: false });
    container.addEventListener("touchmove", handleTouchMove, { passive: false });
    container.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      container.style.overflow = "auto";
    };
  }, [index]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center bg-white p-6"
      style={{ overflow: "hidden" }}
    >
      <div className="relative max-w-7xl w-full">
        {/* Mobile Layout: Feature Content First, then Image */}
        <div className="md:hidden flex flex-col">
          {/* Feature Content - Mobile: First */}
          <div className="px-4 mb-8">
            <FeatureContent index={index} title={title} description={description} />
          </div>
          
          {/* Feature Image - Mobile: Second */}
          <div className="flex flex-col items-center justify-center">
            <FeatureImage
              title={title}
              image={image}
              prevFeature={prevFeature}
              nextFeature={nextFeature}
            />
          </div>
          

        </div>

        {/* Desktop Layout: Image Center, Content Left/Right */}
        <div className="hidden md:block">
          {/* Center - Feature Image with buttons */}
          <div className="flex flex-col items-center justify-center">
            <FeatureImage
              title={title}
              image={image}
              prevFeature={prevFeature}
              nextFeature={nextFeature}
            />
          </div>

          {/* Left - Feature Content */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3">
            <FeatureContent index={index} title={title} description={description} />
          </div>

          {/* Right - Feature List */}
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3">
            <h3 className="text-base md:text-lg font-semibold mb-4">Feature Showcase</h3>
            <FeatureList features={features} index={index} setIndex={setIndex} />
          </div>
        </div>
      </div>
    </div>
  );
}
