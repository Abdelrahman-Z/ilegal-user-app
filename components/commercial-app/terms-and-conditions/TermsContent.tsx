import React from "react";

const TermsContent: React.FC = () => {
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
          <h1 className="text-xl font-medium text-gray-800 whitespace-nowrap px-1">
            Terms & Conditions
          </h1>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-deepBlue" />
            <div className="h-[1px] w-12 bg-gray-300" />
          </div>
        </div>

        <div className="space-y-8">
          <section className="space-y-6">
            {/* Introduction */}
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                iLegalWorks is a multi-language document automation platform, with
                varied services from creating bilingual documents to modifying,
                correcting, signing, approving, summarizing, extracting to overall
                managing documents all the way to concluding a verification system
                on the blockchain for securing the authenticity of the created
                document.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Content through iLegalWorks is available on any screen that can
                connect to the internet; from Desktops and mobiles, to tablets and
                TV's.
              </p>
              <p className="text-gray-700 leading-relaxed">
                iLegalWorks is designed to keep people well informed,
                educated, inspired and nudge them in the right direction.
              </p>
            </div>

            {/* Definitions */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Definitions</h2>
              <ul className="space-y-3 text-gray-700">
                <li className="flex">
                  <span className="font-medium">"we" "us" "our" and "iLegalWorks":</span>
                  <span>all mean the iLegalWorks website www.ilegal.works owned by iLegal Technologies Limited.</span>
                </li>
                <li className="flex">
                  <span className="font-medium">"You" and "your":</span>
                  <span>and all similar expressions refer to the user of the iLegalWorks website.</span>
                </li>
                <li className="flex">
                  <span className="font-medium">"Service Provider":</span>
                  <span>any individual or institution legally authorized to upload content on the platform in the respective jurisdictions.</span>
                </li>
                <li className="flex">
                  <span className="font-medium">"Service":</span>
                  <span>A multi-language document automation platform offering services such as document creation, modification, signing, approval, and blockchain verification.</span>
                </li>
              </ul>
            </div>

            {/* Note Points */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Note Points</h2>
              <p className="text-gray-700 mb-4">
                We set out below the important points for you to note when using the website. These summary points are not part of our Terms and Conditions and are for reference only:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>You must provide accurate and complete information when using this website so that we can direct you to the most appropriate and relevant content for you to review.</li>
                <li>All information data and copyright material contained on this website must not be reproduced or used without our prior written consent.</li>
              </ul>
            </div>

            {/* Numbered Sections */}
            <div className="space-y-8">
              {/* Section 1 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. General Terms and Conditions</h2>
                <div className="space-y-2 text-gray-700 pl-6">
                  <p>1.1 These Terms and Conditions apply to your use of this website.</p>
                  <p>1.2 By using this website you agree to these Terms and Conditions. If you do not wish to be bound by these Terms and Conditions, you should not use this website.</p>
                </div>
              </div>

              {/* Section 2 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Use of this Website</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>2.1 By using this website you agree that:</p>
                  <div className="pl-6 space-y-2">
                    <p>2.1.1 You will not do anything that affects the integrity or security of this website or causes or may cause harm, damage or unreasonable inconvenience to other users of this website or us.</p>
                    <p>2.1.2 You will not gather, extract, download, reproduce and/or display or advertise on any other website, other online or off-line service or otherwise, any material on or from this website.</p>
                    <p>2.1.3 If you breach any of the clauses set out at 2.1 above, we may take such action as we deem appropriate, including denying you access to this website, bringing legal proceedings against you and disclosing such information to the appropriate legal and/or regulatory bodies.</p>
                  </div>
                  <p>2.2 If you use "www.iLegal.works", you are responsible for maintaining the confidentiality of your Account and its password and for restricting access to your computer, and you agree to accept responsibility for all activities that occur under your Account or password.</p>
                  <p>2.3 "iLegalWorks" is intended for offering specific Services to adults above 18 years old, in the event minors are using the platform, they shall do so while supervised by their adult family members.</p>
                </div>
              </div>

              {/* Section 3 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Submission on the Website</h2>
                <div className="space-y-4 text-gray-700">
                  <p>You are welcome to contact us directly at any time with information, reference, ideas, concepts, know-how, techniques, comments, or suggestions.</p>
                  <p>Subject to the following:</p>
                  <div className="space-y-4 pl-6">
                    <p>3.1 You must not misuse iLegalWorks website by knowingly introducing material which is malicious or technologically harmful or that is designed to interrupt, destroy or limit the functionality of any computer software, hardware or interfere with or disrupt your documents.</p>
                    <p>3.2 You are responsible for ensuring that the computer or other devices you use to access your documents are sufficiently protected against viruses, harmful material or unauthorized access.</p>
                    <p>3.3 You must upload accurate and complete information as requested by us on the website.</p>
                    <p>3.4 The information you provide to us or post to your account is yours. We do not own this information, but you give us a right to use your information to enable us to provide you with access to relevant content.</p>
                    <p>3.5 We reserve the right to refuse or delete any information you provide, at our own discretion.</p>
                    <p>3.6 We reserve the right at any time to terminate or restrict or suspend access to account without prior notice.</p>
                    <p>3.7 "We" reserve the right to refuse Service or access to the Website, terminate accounts, or cancel access at our sole discretion.</p>
                    <p>3.8 You are only permitted to view the materials contained on iLegalWorks website for your own personal non-commercial use.</p>
                    <p>3.9 If you copy or download or publish or make available any content of your documents in breach of the terms and conditions, your right to use your access and content in your account will cease immediately.</p>
                  </div>
                </div>
              </div>

              {/* Section 4 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Your Obligations</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>4.1 "iLegalWorks" website is only for personal use and exclusive to the platform customer and agreement holders and is non-transferable to any third party.</p>
                  <p>4.2 It is your responsibility to ensure that all information you supply to us or enter onto this website is complete and accurate.</p>
                  <p>4.3 You are required to share a valid email address in addition to a valid mobile number to receive information related to your access on to the platform.</p>
                  <p>4.4 You will need to answer a number of questions in order to provide you with the appropriate service.</p>
                </div>
              </div>

              {/* Section 5 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Our Service</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>5.1 iLegalWorks service provides its customers access to a multi-language document automation platform, with varied services from creating bilingual documents to modifying, correcting, signing, approving and overall managing documents all the way to concluding a verification system on the blockchain for securing the authenticity of the created document.</p>
                  <p>5.2 The information provided by you will assist us in providing you with the best services and most suitable content to your request.</p>
                </div>
              </div>

              {/* Section 6 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Orders</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>6.1 All orders are subject to acceptance and availability.</p>
                  <p>6.2 We reserve the right to refuse to accept any order without giving any reason. In the event that we do not accept your order, we will advise you of this and ensure that you are not charged.</p>
                  <p>6.3 You will be charged for the service once you have confirmed your order and payment has been authorized.</p>
                  <p>6.4 We may update the pricing from time to time. We will ensure that you are aware of the current pricing before you place your order.</p>
                </div>
              </div>

              {/* Section 7 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Liability</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>7.1 We will not be liable for any loss or damage caused by us or our employees or agents in circumstances where:</p>
                  <div className="pl-6 space-y-2">
                    <p>7.1.1 There is no breach of a legal duty of care owed to you by us or by any of our employees or agents;</p>
                    <p>7.1.2 Such loss or damage was not reasonably foreseeable by both parties;</p>
                    <p>7.1.3 Such loss or damage is caused by you breaching these terms and conditions;</p>
                    <p>7.1.4 Such loss or damage relates to a business of yours;</p>
                    <p>7.1.5 Such loss or damage relates to any falling in the value of the service provided.</p>
                  </div>
                  <p>7.2 Nothing in these terms and conditions excludes or limits our liability for death or personal injury caused by our negligence or for fraud or fraudulent misrepresentation.</p>
                </div>
              </div>

              {/* Section 8 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. SMS Messages</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>8.1 By providing us with your mobile phone number, you agree that we may send you SMS messages.</p>
                  <p>8.2 You may opt out of receiving SMS messages at any time by contacting us.</p>
                  <p>8.3 Standard message and data rates may apply.</p>
                </div>
              </div>

              {/* Section 9 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Intellectual Property</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>9.1 All intellectual property rights in this website and the material published on it belong to us or our licensors.</p>
                  <p>9.2 You may print off one copy and may download extracts of any page(s) from our website for your personal reference.</p>
                  <p>9.3 You must not modify the paper or digital copies of any materials you have printed off or downloaded in any way.</p>
                  <p>9.4 Our status (and that of any identified contributors) as the authors of material on our website must always be acknowledged.</p>
                </div>
              </div>

              {/* Section 10 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Privacy Policy</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>10.1 We take your privacy seriously and will only use your personal information in accordance with our Privacy Policy.</p>
                  <p>10.2 By using our website, you consent to the processing described therein and warrant that all data provided by you is accurate.</p>
                </div>
              </div>

              {/* Section 11 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. External Links</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>11.1 Links to third party websites on this website are provided solely for your convenience.</p>
                  <p>11.2 If you use these links, you leave our website.</p>
                  <p>11.3 We have not reviewed these third party websites and do not control them.</p>
                  <p>11.4 We are not responsible for these websites or their content or availability.</p>
                </div>
              </div>

              {/* Section 12 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Termination</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>12.1 We reserve the right to terminate your access to the website immediately without notice.</p>
                  <p>12.2 Upon termination, you must immediately cease using the website.</p>
                  <p>12.3 All provisions of these terms which by their nature should survive termination shall survive termination.</p>
                </div>
              </div>

              {/* Section 13 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Governing Law</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>13.1 These terms and conditions are governed by and construed in accordance with the laws of the United Arab Emirates.</p>
                  <p>13.2 Any disputes relating to these terms and conditions shall be subject to the exclusive jurisdiction of the courts of the United Arab Emirates.</p>
                </div>
              </div>

              {/* Section 14 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Adjustments to Terms and Conditions</h2>
                <div className="space-y-4 text-gray-700 pl-6">
                  <p>14.1 We reserve the right to make changes to these terms and conditions at any time.</p>
                  <p>14.2 You will be subject to the terms and conditions in force at the time that you use the website.</p>
                  <p>14.3 If any of these terms and conditions are determined to be illegal, invalid or otherwise unenforceable, then to the extent and within the jurisdiction in which that term or condition is illegal, invalid or unenforceable, it shall be severed and deleted from these terms and conditions and the remaining terms and conditions shall survive and continue to be binding and enforceable.</p>
                </div>
              </div>

              {/* Section 15 */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">15. Complaints Procedure</h2>
                <p className="text-gray-700">
                  We aim to provide a high standard of service to all our customers. If you have any queries or complaints, please connect with us on /Contact Us – ContactUs@iLegal.Works
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsContent;
