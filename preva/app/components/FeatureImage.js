// app/components/FeatureImage.js
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function FeatureImage({ title, image, prevFeature, nextFeature }) {
  return (
    <div className="flex flex-col items-center justify-between">
      <div className="flex-1 flex items-center justify-center p-4">
        <img
          src={image}
          alt={title}
          className="max-h-[60vh] md:max-h-[70vh] w-auto object-contain"
        />
      </div>

      {/* Arrows with blue separator */}
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={prevFeature}
          aria-label="Previous feature"
          className="p-2 border rounded-full hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        <div className="w-px h-8 bg-blue-500"></div>

        <button
          onClick={nextFeature}
          aria-label="Next feature"
          className="p-2 border rounded-full hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}
