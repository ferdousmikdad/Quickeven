import { CrowdCanvas } from "@/components/v1/skiper39";

// Using just the crowd canvas
const CustomCrowd = () => {
  return (
    <div className="relative h-screen w-full">
      <CrowdCanvas src="/images/peeps/all-peeps.png" rows={15} cols={7} />
    </div>
  );
};

export default CustomCrowd;