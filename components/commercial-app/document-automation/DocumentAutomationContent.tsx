'use client'

import Image from "next/image";

export default function DocumentAutomationContent() {
  const features = [
    {
      title: "Bilingual Template and Document Creation",
      description: "This tool is especially useful if you need to create documents quickly and efficiently. With iLegal®Works©, you can either access a library of pre-set templates (i.e. contracts, resolutions, and policies) that can be easily filled with your specific content or can customize your own templates. Also, in case you need more content customization, you can create a new template with easily modifiable text, clauses, and formatting.",
      image: "/images/data-analytics.svg"
    },
    {
      title: "Document Translation",
      description: "With this tool, you may convert the language of a document from Arabic to English (vice versa) quickly and easily. It is particularly useful for when a bilingual document is required to be signed between two parties or to adhere to local authority requirements. You can further have the document vetted and certified from a legal point of view, by opting for an add on premium service*.",
      image: "/images/translation.svg"
    },
    {
      title: "Bilingual Question and Answer",
      description: "You can efficiently and confidently verify the authenticity of a document with this tool. iLegal®Works© uses blockchain technology to validate authenticity of documents created on iLegal®Works©, ensuring that the document has not been altered after it is created on the platform and reducing the need for time consuming manual verification. The blockchain integration creates a secure and immutable record of all changes and updates made to the document. iLegal®Works© creates a digital signature for each document that is stored on the blockchain, making it easy to verify the authenticity of the document at any time. A change made to the document will create a new digital signature that is also stored on the blockchain, providing a record of all modifications made.",
      image: "/images/contextual-aware.svg"
    },
    {
      title: "Bilingual Fine-Tuned Optical Character Recognition",
      description: "An AI powered deep learning tool that can convert Arabic image formats into machine readable formats accurately with high precision in both Arabic and English.",
      image: "/images/document-flow.svg"
    }
  ];

  return (
    <section className="m-12 px-4 py-10 bg-deepBlue rounded-lg">
      <div className="container mx-auto px-6">
        <div className="space-y-20">
          {features.map((feature, index) => (
            <div key={feature.title} className="mb-16 last:mb-0">
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                  items-start gap-8 md:gap-12`}>
                {/* Content Side */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                    <h3 className="text-2xl font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-100 leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                {/* Vertical Line Separator */}
                <div className="hidden md:block w-[2px] bg-brightRed self-stretch mx-4"></div>

                {/* Image Side */}
                <div className="flex-1">
                  <div className="relative h-[300px] w-full rounded-lg overflow-hidden shadow-xl">
                    <Image
                      src={feature.image}
                      alt={feature.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 