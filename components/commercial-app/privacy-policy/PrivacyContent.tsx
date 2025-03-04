import React from 'react';

const PrivacyContent: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 relative flex">
      {/* Vertical Line */}
      <div className="w-[4px] bg-deepBlue self-stretch mr-12" />
      
      <div className="prose prose-lg flex-1">
        {/* Title with decorative lines */}
        <div className="flex items-center justify-center mb-12 space-x-4">
          <div className="flex items-center">
            <div className="h-[1px] w-12 bg-gray-300" />
            <div className="w-1.5 h-1.5 rounded-full bg-deepBlue" />
          </div>
          <h1 className="text-xl font-medium text-gray-800 whitespace-nowrap px-1">Privacy Policy</h1>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-deepBlue" />
            <div className="h-[1px] w-12 bg-gray-300" />
          </div>
        </div>

        <div className="space-y-6">
          <section>
            <p className="text-gray-700">
              We take data protection very seriously in compliance with the regulations of the United Arab Emirates (UAE) and in the interest of the user, and it is important for us for you to understand how we use your personal data.
            </p>
            <p className="text-gray-700">
              This privacy policy details the purposes by which we process your personal data, with whom we share it, the rights you own with respect to that data and everything else we believe is important for to you to know.
            </p>
            <p className="text-gray-700">
              You should read this privacy policy to ensure you understand Our privacy practices of which are applicable to its services that may be provided through the entire world. Use of any of the online services available at this website implies that you accept these terms and conditions. If you do not accept these terms and conditions, please do not access this website, or use any of the online services available at this website.
            </p>
            <p className="text-gray-700">
              The main purpose for which we process your personal data is to provide you with the services you request from us through www.iLegal.works (the website) or our application. We may need some information from you to do this and cannot provide our services without this data. We will also process personal data for other purposes, such as marketing (where you agree), market research, where you agree, and fraud prevention. We will only keep your personal data if it is necessary for the purpose we need for personal data as per the applicable rules and regulations within the UAE.
            </p>
            <p className="text-gray-700">
              We will need to share some of your personal data with certain third parties that offer you services through our website or application by performing checks on you and assess specific relevant content to share with you in fully automated ways. These partners are responsible for how they process your personal data and should you wish to see their policies through their public websites, please refer to their public websites directly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">1. Definitions</h2>
            <p className="text-gray-700">
              We US OUR iLegalWorks: iLegalWorks website www.iLegal.works or iLegalWorks app. This website is operated by (iLegal Technologies Limited); additional details about iLegalWorks are provided in our website usage terms.
              <br /><br />
              YOU YOUR: A user to the website or the application.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">2. Scope of policy</h2>
            <p className="text-gray-700">
              Please be aware that this privacy policy applies only to this website. Within this website, you may see links or references to other websites which are not covered by this policy and are likely to have different information practices. We therefore encourage you to read the privacy policy of each website you visit. We provide these references and links for your convenience; they should not be construed as an endorsement of such websites, their content, or their information practices. You are solely responsible for any interactions you may have with such websites.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">3. No Warranties</h2>
            <p className="text-gray-700">
              Due to the nature of the internet, iLegalWorks does not warrant that this website or the server that makes it available are free of viruses or other harmful components or that other contaminating or destructive properties will be transmitted or that no damage will occur to your computer system. As user, you have the sole responsibility for adequate protection and back up of your data and/or equipment and for undertaking reasonable and appropriate precautions to scan for computer viruses or other destructive properties. The user assumes the entire cost of all necessary maintenance, repair or correction of its own hardware or software.
              <br /><br />
              We make no representations or warranties regarding the accuracy, functionality or performance of any third-party software that may be used in connection with the website, or the services offered through this website.
              <br /><br />
              The information on this website is provided on an as is and as available basis. All express or implied warranties of any kind are excluded to the fullest extent permitted by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">4. How we use your information and who we share it with</h2>
            <p className="text-gray-700">
              Your privacy is very important to us, and we have designed our Privacy Policy with the objective of maintaining your trust, confidence and respecting your right of protecting your personal information. We will use your information to manage your insurance with us, including underwriting, claims handling and statistical analysis. This may include disclosing your information within the iLegalWorks internal service and other service providers who are authorized by official authorities to share content on our platform.
            </p>
            <p className="text-gray-700">
              We do not disclose your information to anyone outside the iLegalWorks service except:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>Where we have your permission</li>
              <li>Where we are required or permitted to do so by law</li>
              <li>To other companies who provide a service to us or you</li>
              <li>Where we may transfer rights and obligations under this Privacy Policy to a third party as permitted by law</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">5. Collection of Information</h2>
            <p className="text-gray-700">
              Most of the data we process will be data we collect directly from you when you request to use our service. We will ask you various questions to collect the data we need for ensuring we direct you to the proper channels on our platform. We will only be able to offer the most relevant service if you answer the mandatory questions. We are doing our utmost to ensure that that information is accurate and up to date, please assist us in this by advising us of any changes as soon as possible.
              <br /><br />
              We are constantly striving to improve the quality of our service and the efficiency of our systems and so, from time to time, we may use your personal information during staff training and/or system testing.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">6. Exchange of Information</h2>
            <p className="text-gray-700">
              At various times, we will exchange personal information with certain other approved organizations where required or permitted by law. Also, your personal information will sometimes be used and analyzed by us and other partners participating on our platform for the following purposes:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-2 text-gray-700">
              <li>Considering any applications for products you may request and to help in making related decisions about you where appropriate</li>
              <li>Helping ILegalWorks to develop new and innovative products and services</li>
            </ul>
            <p className="text-gray-700 mt-4">
              We may send data in confidence for processing to other companies, therefore, by entering your details onto our website, you are consenting to such use of your personal data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">7. Use of Personal Information for Promotional Purposes</h2>
            <p className="text-gray-700">
              The information you provide may be used by us, other members of iLegalWorks and carefully selected third parties for market research purposes or to inform you of other products or services that may be of interest to you, or to create a better experience for you on our website, unless you have advised us otherwise in writing. You will always be given the option to opt out of any further communication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">8. Dealing with Other People</h2>
            <p className="text-gray-700">
              If your spouse or one of your family members contacts us on your behalf, due to data protection, we will be unable to answer their queries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">9. Data Security</h2>
            <p className="text-gray-700">
              Although we take reasonable steps to protect the personally identifiable information that you provide via this website, no system is 100% secure or error-free. Therefore, we do not, and cannot, guarantee the security or accuracy of the information we gather or provide via this website. You also acknowledge and agree to your knowledge without any liability to us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">10. Copyright and Trademarks</h2>
            <p className="text-gray-700">
              iLegalWorks owns or has license to use the trademarks, logos, copyrighted content and service marks displayed on this website. These may not be copied, shared, or distributed from iLegalWorks website, without the prior written permission of iLegalWorks. You consent that you will be subject to liability and payment of liquidated damages to iLegalWorks if you make any kind of improper and contrary use of the terms and conditions mentioned here.
              <br /><br />
              iLegalWorks website is only for a personal use and exclusive to the concerned individual and non-transferable to any third party.
              <br /><br />
              Materials on this website are protected by registration of copyright and trademark. No part of these materials may be modified, reproduced, stored in a retrieval system, transmitted, copied, distributed, or used in any other way for commercial or public purposes without iLegalWorks prior written consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">11. Amendments</h2>
            <p className="text-gray-700">
              We may change this privacy policy at any time without prior or subsequent notice. You are responsible to keep yourself updated by reading this privacy policy before you access your account on the website. You agree that the current version of the privacy policy applies to your use of the website www.iLegal.works
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">12. Inquiries</h2>
            <p className="text-gray-700">
              Any questions or comments about the website or privacy policy should be directed via email using the form on the page Contact Us on www.iLegal.works
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">13. Applicable law and competent courts</h2>
            <p className="text-gray-700">
              These terms of use shall be governed by and construed in accordance with the laws of the United Arab Emirates. Disputes arising of the terms of shall be subject to the exclusive jurisdiction of the local courts of Dubai.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyContent;
