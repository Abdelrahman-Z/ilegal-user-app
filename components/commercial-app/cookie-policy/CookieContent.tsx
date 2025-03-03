import React from 'react';

const CookieContent: React.FC = () => {
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
          <h1 className="text-xl font-medium text-gray-800 whitespace-nowrap px-1">Cookie Policy</h1>
          <div className="flex items-center">
            <div className="w-1.5 h-1.5 rounded-full bg-deepBlue" />
            <div className="h-[1px] w-12 bg-gray-300" />
          </div>
        </div>

        <div className="space-y-6">
          {/* Introduction */}
          <section className="space-y-4">
            <p className="text-gray-700">
              We want your experience on <span className="text-blue-600">www.iLegal.works</span> to be efficient, simple and easy. To ensure that you can make the most of our services on your car tracker, tablet or mobile devices, you will need to accept cookies. If cookies are not activated on your device, many may limit your experience on this website. In some instances, it may mean that you cannot access some of our services at all. More precisely, we use cookies when delivering up to ensure that we can personalize your experience on our website.
            </p>
          </section>

          {/* What is a cookie? */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-gray-800">What is a cookie?</h2>
            <p className="text-gray-700">
              A cookie is deposited on your browser and is used by the website you are viewing to identify you as a user, enabling information to be stored on the hard drive of your device. Cookies allow us to recognize you when you return to our website and help us to understand your preferences and improve your experience on our website.
            </p>
            <p className="text-gray-700">
              This data is used to help us improve our website and to help us understand what content and services are most important to our users. In addition, some companies that advertise on third parties, in which case, we cannot be held responsible for such without prior.
            </p>
            <p className="text-gray-700">
              In addition, some companies that advertise on the "iLegalWorks" website may need programs that collect user information to determine how effective their advertisements are. Such advertisers, which are managed by third party to the privacy policy. Note: such user statistics via internal processes for the purpose of improving the quality of our data and measuring time.
            </p>
            <p className="text-gray-700">
              You can choose to accept or decline cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings (such as cookies, session settings, and app-specific programming) under "JavaScript" for the same purpose mentioned above.
            </p>
          </section>

          {/* Types of cookies */}
          <section className="space-y-4">
            <p className="text-gray-700">We use four categories of cookie on our websites:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Strictly necessary</li>
              <li>Functionality</li>
              <li>Targeting</li>
              <li>Performance</li>
            </ul>

            <p className="text-gray-700">
              We use First Session Cookies, which only exist for the duration of your visit and are deleted when you leave the website. Others are "Persistent Cookie", these stay on your device until they delete or expire.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">Strictly necessary cookies</h3>
            <p className="text-gray-700">
              Strictly necessary cookies are required for the operation of our website. These cookies are essential to enable you to navigate the website and use its features. Without these, we cannot guarantee that you can use all functionalities of our website.
            </p>
            <p className="text-gray-700">Our use of strictly necessary cookies includes:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Recording your account reference to maintain content and account information</li>
              <li>Providing secure access to protected areas of the website within the user session</li>
              <li>Authenticating and verifying web requests</li>
              <li>Ensuring the information entered on our website is secure and is not subject to access from third parties</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">Performance Cookies</h3>
            <p className="text-gray-700">
              These measure collected information about how visitors use a website, such as which pages visitors go to most often and if they get error messages from web pages. They do not collect information that identifies a visitor. All information these cookies collect is aggregated and therefore anonymous. It is only used to improve how a website works.
            </p>
            <p className="text-gray-700">Our use of Performance cookies includes:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Collecting anonymous aggregated information that is used to manage and plan enhancements to our service</li>
              <li>Assisting us in tailoring the website to customer needs</li>
              <li>Measuring advertising effectiveness</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">Functionality cookies</h3>
            <p className="text-gray-700">
              These cookies allow the website to remember choices you make (such as your user name, language or the region you are in) to provide enhanced and more personalized features. For example, these cookies can be used to remember changes you have made to text size, fonts and other parts of web pages that you can customize. They may also be used to provide services you have asked for such as watching a video or commenting on a blog. We may also use functionality cookies to target you with promotional emails, based on your context, and inform their content.
            </p>
            <p className="text-gray-700">Our use of functionality cookies includes:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Remembering preferences you have chosen to customize your experience</li>
              <li>Providing live chat functionality</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6">Targeting Cookies</h3>
            <p className="text-gray-700">
              Targeting cookies record your visit to our website, including the web pages you have visited and the links you have followed. We will use this information to make our website and the advertising displayed on it more relevant to your interests. We may also share this information with third parties for this purpose.
            </p>
            <p className="text-gray-700">
              Although these cookies do not collect information that you enter into forms on our website (such as your email address), we sometimes share user data with our service providers so that they can combine this information with other data they hold about you. This helps us to understand how our customers interact with our website and other websites.
            </p>
            <p className="text-gray-700">Our providers will use targeting cookies to:</p>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Improve our website, by enabling us to understand how our customers interact with our website</li>
              <li>Collect information about browsing patterns on third party websites</li>
              <li>Trigger promotional emails sent to you, based on your context, and inform their content</li>
              <li>Target ads on third party websites</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookieContent;
