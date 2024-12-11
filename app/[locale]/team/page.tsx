import Footer from "@/components/commercial-app/Footer";
import HeroCard from "@/components/commercial-app/HeroCard";
import SectionTitle from "@/components/commercial-app/SectionTitle";

const partners = [
  {
    name: "Lorem Ipsum",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
    image: "/images/suit.jpg",
  },
  {
    name: "Lorem Ipsum",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
    image: "/images/suit.jpg",
  },
  {
    name: "Lorem Ipsum",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer...",
    image: "/images/suit.jpg",
  },
];

export default function Home() {
  return (
    <div className="">
      <HeroCard
        heroDescription="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s."
        heroTitle="Our Team"
        imagePath="'/images/landing6.svg'"
      />
      <div className="bg-gray-50 py-12 px-8 flex flex-col items-center sm:flex-row gap-6">
        {/* Vertical Line and Title */}
        <div className="flex items-start sm:w-1/3">
          <div className="flex flex-row items-center gap-2 sm:gap-4">
            {/* Vertical Line */}
            <div className="w-[1px] h-24 bg-gray-400 hidden sm:block"></div>

            {/* Text Content */}
            <div>
              <p className="text-gray-600 text-sm uppercase tracking-wide">
                Service With A Smile
              </p>
              <h2 className="text-2xl font-bold text-gray-800">
                Meet Our People
              </h2>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="sm:w-2/3 text-gray-700 space-y-4">
          <p>
            Lorem Ipsum has been the industrys standard dummy text ever since
            the 1500s, when an unknown printer took a galley of type and
            scrambled it to make a type specimen book.
          </p>
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>
        </div>
      </div>
      <div className="bg-gray-50 py-12 px-8">
        {/* Header */}
        <SectionTitle title="The Partners" className="mx-auto my-20" />

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="relative bg-gray-300 rounded-lg overflow-hidden group"
            >
              {/* Partner Image */}
              <div
                className="bg-cover bg-center w-full h-80"
                style={{ backgroundImage: `url(${partner.image})` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-bold">{partner.name}</h3>
                <p className="text-white text-sm text-center px-4 mt-2">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 py-12 px-8">
        {/* Header */}
        <SectionTitle title="Attorneys" className="mx-auto my-20" />

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="relative bg-gray-300 rounded-lg overflow-hidden group"
            >
              {/* Partner Image */}
              <div
                className="bg-cover bg-center w-full h-80"
                style={{ backgroundImage: `url(${partner.image})` }}
              ></div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-bold">{partner.name}</h3>
                <p className="text-white text-sm text-center px-4 mt-2">
                  {partner.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* testmonials */}
      <div className="bg-gray-50 py-12 px-8 flex flex-col sm:flex-row items-center gap-8">
        {/* Left Section: Title and Line */}
        <div className="flex  items-center gap-10 sm:w-1/3">
          {/* Vertical Line */}
          <div className="flex flex-row sm:flex-col items-center sm:gap-4">
            <div className="hidden sm:block w-[1px] h-24 bg-gray-400"></div>
          </div>
          {/* Text */}
          <div>
            <p className="text-sm uppercase tracking-wide text-gray-500">
              What People Say About Us
            </p>
            <h2 className="text-2xl font-bold text-gray-800 mt-2">
              Client Testimonials
            </h2>
          </div>
        </div>

        {/* Middle Section: Image */}
        <div className="sm:w-1/3 w-full flex justify-center">
          <div className="w-48 h-48 rounded-md overflow-hidden bg-[#226191]">
            <img
              src="/images/man.jpg"
              alt="Client"
              className="w-full h-full object-cover -mt-2 -ml-2"
            />
          </div>
        </div>

        {/* Right Section: Text */}
        <div className="sm:w-1/3 text-gray-700 space-y-4 text-center sm:text-left">
          <p>
            It has survived not only five centuries, but also the leap into
            electronic typesetting, remaining essentially unchanged.
          </p>
          <p>
            <strong>Name</strong>
          </p>
          <p>It has survived</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
