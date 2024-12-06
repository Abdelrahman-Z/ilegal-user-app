import Footer from "@/components/commercial-app/Footer";
import HeroCard from "@/components/commercial-app/HeroCard";
import SectionTitle from "@/components/commercial-app/SectionTitle";
const services = [
    {
      title: "Document Creation",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "/images/servicesImage.svg",
    },
    {
      title: "Document Creation",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "/images/servicesImage.svg",
    },
    {
      title: "Document Creation",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "/images/servicesImage.svg",
    },
    {
      title: "Document Creation",
      description:
        "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
      image: "/images/servicesImage.svg",
    },
  ];

export default function Home() {
  return (
    <div className="">
      <HeroCard
        heroDescription="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s."
        heroTitle="Our Practice Area"
        imagePath="'/images/landing5.svg'"
      />
      <div className="bg-gray-100 py-12 px-6 space-y-16">
        {/* Header */}
        <SectionTitle title="Our Services" className="mx-auto"/>

        {/* Services Rows */}
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col px-48 border-b-1 border-black pb-16 border-transparent ${
              index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
            } items-center gap-8`}
          >
            {/* Image Section */}
            <div className="sm:w-1/2 w-full">
              <div
                className="bg-gray-300 w-full h-64 rounded-lg flex items-end justify-center bg-cover bg-center"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <p className="bg-black/50 text-white text-sm py-2 px-4 rounded-b-lg">
                  {/* {service.title} */}
                </p>
              </div>
            </div>

            {/* Text Section */}
            <div className="sm:w-1/2 w-full text-center sm:text-left">
              <p className="text-gray-800 mb-4">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
