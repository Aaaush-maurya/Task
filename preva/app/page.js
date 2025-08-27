import FeatureShowcase from "./components/FeatureShowcase";

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <div className="flex-grow">
        <FeatureShowcase />
      </div>

    </div>
  );
}
