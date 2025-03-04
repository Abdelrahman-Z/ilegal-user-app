'use client'

export default function BilingualTemplateSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 border-x-2 border-deepBlue">
        {/* Title with decorative lines */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-[1px] flex-1 bg-deepBlue max-w-[200px]"></div>
          <div className="w-2 h-2 rounded-full bg-deepBlue"></div>
          <h2 className="text-2xl font-semibold text-deepBlue text-center">
            Bilingual Template and Document Creation
          </h2>
          <div className="w-2 h-2 rounded-full bg-deepBlue"></div>
          <div className="h-[1px] flex-1 bg-deepBlue max-w-[200px]"></div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <p className="text-gray-700 leading-relaxed text-center">
            This tool is especially useful if you need to create documents quickly and efficiently. 
            With iLegal®Works©, you can either access a library of pre-set templates (i.e. 
            contracts, resolutions, and policies) that can be easily filled with your specific content 
            or can customize your own templates. Also, in case you need more content 
            customization, you can create a new template with easily modifiable text, clauses, 
            and formatting.
          </p>
        </div>
      </div>
    </section>
  );
} 