import Footer from "@/components/commercial-app/Footer";
import HeroCard from "@/components/commercial-app/HeroCard";
import SectionTitle from "@/components/commercial-app/SectionTitle";
const content = [
  {
    title: "Lorem Ipsum",
    description1:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    description2:
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "Lorem Ipsum",
    description1:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    description2:
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
  {
    title: "Lorem Ipsum",
    description1:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
    description2:
      "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  },
];

export default function Home() {
  return (
    <div className="">
      <HeroCard
        heroDescription="Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s."
        heroTitle="Terms and Conditions"
        imagePath="'/images/landing4.svg'"
      />
      <div className="bg-gray-100 py-12 sm:px-40">
        {content.map((item, index) => (
          <div key={index} className=" p-6 space-y-4 border-solid border-black border-transparent border-l-1">
            {/* Header with Title */}
            <SectionTitle title={item.title} titleStyle="text-deepBlue" dotStyle="bg-deepBlue" lineStyle="bg-deepBlue" className="mx-auto" />

            {/* Description */}
            <p className="text-gray-700 mb-4">{item.description1}</p>
            <p className="text-gray-700">{item.description2}</p>
          </div>
        ))}
      </div>
      <Footer className="bg-gradient-to-r from-deepBlue to-lightBlue" />
    </div>
  );
}
