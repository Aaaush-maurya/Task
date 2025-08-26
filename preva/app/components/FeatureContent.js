// app/components/FeatureContent.js
export default function FeatureContent({ index, title, description }) {
  return (
    <div className="flex flex-col">
      <div>
        <p className="text-blue-500 font-semibold mb-2">
          Feature No.{index + 1} -
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
        <ul className="space-y-2 text-gray-600 text-sm md:text-base list-disc pl-5">
          {description.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
