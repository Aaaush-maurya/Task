// app/components/FeatureList.js
export default function FeatureList({ features, index, setIndex }) {
  return (
    <div className="flex flex-col gap-4">
      {features.map((f, i) => (
        <button
          key={i}
          onClick={() => setIndex(i)}
          className={`relative text-left px-3 py-2 rounded-md transition
            ${i === index ? "font-semibold text-black" : "text-gray-700 hover:text-black"}`}
        >
          {i === index && (
            <span className="absolute -left-3 top-0 h-full w-1 bg-blue-500 rounded"></span>
          )}
          {f.title}
        </button>
      ))}
    </div>
  );
}
