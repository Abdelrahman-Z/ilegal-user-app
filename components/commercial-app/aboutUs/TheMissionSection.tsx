'use client'

export const TheMissionSection = () => {
  return (
    <div className="w-full bg-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Title with decorative elements */}
        <div className="flex items-center justify-center gap-4 mb-12">
          {/* Left decorative line with point */}
          <div className="flex items-center">
            <div className="w-24 h-[2px] bg-[#114B7E]" />
            <div className="w-2 h-2 rounded-full bg-[#114B7E]" />
          </div>

          <h2 className="text-2xl md:text-3xl font-semibold text-[#114B7E] px-4">The Mission</h2>

          {/* Right decorative line with point */}
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-[#114B7E]" />
            <div className="w-24 h-[2px] bg-[#114B7E]" />
          </div>
        </div>

        {/* Content with vertical lines */}
        <div className="relative max-w-4xl mx-auto text-center px-12">
          {/* Left vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[#114B7E]" />
          
          {/* Content */}
          <div className="space-y-6">
            <p className="text-gray-700 leading-relaxed text-lg">
              Lorem ipsum has been the industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a type specimen book. It
              has survived not only five centuries, but also the leap into electronic typesetting,
              remaining essentially unchanged.
            </p>
            <p className="text-gray-700 leading-relaxed text-lg">
              It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum
              passages, and more recently with desktop publishing software like Aldus PageMaker
              including versions of Lorem Ipsum
            </p>
          </div>

          {/* Right vertical line */}
          <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-[#114B7E]" />
        </div>
      </div>
    </div>
  );
};

export default TheMissionSection;
