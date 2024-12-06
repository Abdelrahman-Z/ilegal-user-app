import OverviewSection from "@/components/commercial-app/aboutUs/Overview";
import Footer from "@/components/commercial-app/Footer";
import HeroCard from "@/components/commercial-app/HeroCard";

export default function Home() {
  return (
    <div className="">
      <HeroCard
        heroDescription="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s."
        heroTitle="About our business"
        imagePath="'/images/landing2.svg'"
      />
      <OverviewSection />
      <div className="bg-gray-100 py-12 px-6 space-y-12 mx-16">
        {/* First Row */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          {/* Text Section */}
          <div className="sm:w-1/2 text-center sm:text-left">
            <p className="text-gray-800 mb-4">
              Lorem Ipsum has been the industrys standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged.
            </p>
            <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
              Learn more...
            </button>
          </div>

          {/* Image Section */}
          <div className="sm:w-1/2 sm:-mr-16 hidden sm:block">
            <div className="bg-gray-400 w-full h-48 rounded-lg"></div>
          </div>
        </div>

        {/* Second Row */}
        <div className="flex flex-col sm:flex-row-reverse items-center justify-center gap-6">
          {/* Text Section */}
          <div className="sm:w-1/2 text-center sm:text-left">
            <p className="text-gray-800 mb-4">
              Lorem Ipsum has been the industrys standard dummy text ever since
              the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not
              only five centuries, but also the leap into electronic
              typesetting, remaining essentially unchanged.
            </p>
            <button className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800">
              Learn more...
            </button>
          </div>

          {/* Image Section */}
          <div className="sm:w-1/2 sm:-ml-16 hidden sm:block">
            <div className="bg-gray-400 w-full h-48 rounded-lg"></div>
          </div>
        </div>
      </div>
      <OverviewSection />
      <Footer />
    </div>
  );
}
