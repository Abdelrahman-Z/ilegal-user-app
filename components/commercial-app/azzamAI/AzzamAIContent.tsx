'use client'

import Image from "next/image";

export default function AzzamAIContent() {

  const features = [
    {
      title: "Extraction",
      icon: "📄",
      description: "This tool allows you to extract information more efficiently from multiple or large documents and use it to create a detailed analysis, either based on pre-configured prompts or by way of an organization creating its own set of prompts. Simply upload scanned documents to AzzamAI and set up key types of information for the AzzamAI to look for.  The platform utilizes machine learning algorithms to extract the needed information and consolidate the extracted content accordingly in a new document. ",
      image: "/images/data-analytics.svg"
    },
    {
      title: "Document Review",
      icon: "📝",
      description: "This tool can help reduce the risk of errors in documents and ensure the content is accurate, consistent and compliant with an organization’s requirements. Initially, the platform provides a pre-set list of the most common questions relevant for that particular document type, but later, an organization can customize their own set of prompts for our AI to review and flag out the relevant outcome desired. The iLegal®Works© platform utilizes machine learning algorithms to scan uploaded documents and identify inconsistencies or anomalies in the text against your pre-set requirements.",
      image: "/images/document-review.svg"
    },
    {
      title: "Bilingual Question and Answer",
      icon: "💬",
      description: "This is an innovative tool designed to assist users in navigating complex regulations of specific jurisdictions (Jordan, Kingdom of Saudi Arabia, and United Arab Emirates). Leveraging state-of-the-art artificial intelligence, it provides concise answers to questions related to laws and regulations helping you to understand and clarify regulatory requirements without the need for extensive research. It has a user-friendly interface where you can type your questions and receive instant responses in both Arabic and English. Furthermore, you can rest assured of the confidentiality of the interactions, by maintaining the privacy of user queries and ensuring no sensitive data is stored, all while maintaining a track of where you left last.",
      image: "/images/bilingual-qa.svg"
    },
    {
      title: "Summarization",
      icon: "📊",
      description: "This tool is useful if you need to quickly identify the core points of extensive content, primarily designed to help with documents of legal nature or similar. It is powered by This tool is useful if you need to quickly identify the core points of extensive content, primarily designed to help with documents of legal nature or similar. It is powered by artificial intelligence software utilizing cutting edge machine learning algorithms. It can condense lengthy documents into concise and clear bullet points of customizable length, while being considerate of the context, the format needed per document type (e.g., contracts, research papers, reports) and language need. Furthermore, interactive editing is possible, and data security is guaranteed with encryption.",
      image: "/images/summarization.svg"
    }
  ];

  return (
    <>
      {/* Features Section */}
      <section className="m-12 px-4 py-10 bg-deepBlue rounded-lg">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16 text-white">Our AI-Powered Solutions</h2>
          
          <div className="space-y-20">
            {features.map((feature, index) => (
              <div key={feature.title} className="mb-16 last:mb-0">
                <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} 
                    items-start gap-8 md:gap-12`}>
                  {/* Content Side */}
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{feature.icon}</span>
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

      {/* Call to Action Section */}
      {/* <section className="bg-gradient-to-r from-deepBlue to-lightBlue py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 text-white">Ready to Experience the Power of AI?</h2>
          <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
            Transform your legal document processing with our advanced AI solutions
          </p>
          <button className="bg-white text-deepBlue hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300">
            Get Started Now
          </button>
        </div>
      </section> */}
    </>
  );
} 