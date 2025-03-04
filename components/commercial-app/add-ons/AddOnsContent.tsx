import React from 'react';

const AddOnsContent: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-14">
      <div className="bg-white px-12 border-l-2 border-r-2 border-solid border-deepBlue">
        <h2 className="text-2xl font-bold mb-4">Legal Advisory Support</h2>
        <p className="text-gray-700 mb-4">
          Legal advisory support is offered as a premium add-on to any document being created or reviewed and consists of the following:
        </p>
        <ul className="list-disc pl-6 mb-4">
          <li>Template creation: Review of created template to ensure localization, legality, and concise alignment of content.</li>
          <li>Creation of document from template: Review of created document from template to ensure adequacy based on requirements of user per document.</li>
          <li>Document translation: Review of document post-translation to ensure adequacy of translation and alignment along the translated document.</li>
          <li>Extraction: Review of extracted content to ensure raised prompts are being responded to accurately and making all necessary adjustments to ensure all raised prompts are addressed.</li>
          <li>Summarization: Review of summarized content to ensure alignment and accuracy and adjusting the prompts according to user needs in relation to the document summarized.</li>
          <li>Q&A: Address Q&A of users on any specific matter outside the scope of the above.</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4">Legal Disclaimer</h2>
        <p className="text-gray-700 mb-4">
          iLegalWorks® is neither a law firm nor a legal consultancy platform and is further not associated with any regulatory authority. iLegalWorks® does not offer any legal services of any kind, and thus cannot be liable to any errors or losses due to the use of this service. All legal support services are being offered by iLegal Solutions Limited, a licensed legal consultancy firm based under Ras Al Khaimah Digital Assets Oasis Authority, UAE, holding license number 07010134.
        </p>
        <p className="text-gray-700 mb-4">
          This add-on Legal Advisory Support service is offered as a separate service and offered only for documents being used on iLegalWorks® platform and exclusively relevant to the specific document the add-on is required to receive support and further the service is performed exclusively through iLegal Solutions Limited. Please note that you are not required to connect to an add-on service, and that this service is totally optional to the user without any liability whatsoever on iLegalWorks®.
        </p>
      </div>
    </div>
  );
};

export default AddOnsContent; 