import FeatureShowcase from "./components/FeatureShowcase";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <div className="flex-grow">
        <FeatureShowcase />
      </div>

      <footer className="bg-gray-100 text-center py-4 text-gray-700 font-semibold">
        preva.care
      </footer>
    </div>
  );
}
