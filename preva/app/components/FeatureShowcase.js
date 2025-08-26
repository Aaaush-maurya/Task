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

      scrollTimeout.current = setTimeout(() => {
        scrollTimeout.current = null;
      }, 500);

      if (e.deltaY > 0) {
        // Scrolling down - go to next feature
        if (index < features.length - 1) {
          e.preventDefault();
          setIndex(index + 1);
        }
        // If at last feature, do nothing (allow normal page scrolling)
      } else {
        // Scrolling up - go to previous feature
        if (index > 0) {
          e.preventDefault();
          setIndex(index - 1);
        }
        // If at first feature, do nothing (allow normal page scrolling)
      }
    };

    container.style.overflow = "hidden";
    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
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
        {/* Center - Feature Image with buttons */}
        <div className="flex flex-col items-center justify-center">
          <FeatureImage
            title={title}
            image={image}
            prevFeature={prevFeature}
            nextFeature={nextFeature}
          />
        </div>

        {/* Left - Feature Content (positioned absolutely over center) */}
        <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/3">
          <FeatureContent index={index} title={title} description={description} />
        </div>

        {/* Right - Feature List (positioned absolutely over center) */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/3">
          <h3 className="text-base md:text-lg font-semibold mb-4">Feature Showcase</h3>
          <FeatureList features={features} index={index} setIndex={setIndex} />
        </div>
      </div>
    </div>
  );
}
