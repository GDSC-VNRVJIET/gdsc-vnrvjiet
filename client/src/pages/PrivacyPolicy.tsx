import React from 'react';

// PrivacyPolicy component written in TypeScript
const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto my-16 p-8">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy for GDSC VNRVJIET</h1>

      <p className="mb-4">
        At GDSC VNRVJIET, accessible from{' '}
        <a href="https://gdsc-vnrvjiet.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
          https://gdsc-vnrvjiet.vercel.app/
        </a>, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by GDSC VNRVJIET and how we use it.
      </p>

      <p className="mb-4">
        If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Log Files</h2>
      <p className="mb-4">
        GDSC VNRVJIET follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Payment Processing</h2>
      <p className="mb-4">
        We use Razorpay as our payment processing partner. Razorpay may collect personal information from you to process your payments securely. The information collected by Razorpay includes your name, email address, billing information, and other necessary details required to complete the transaction. Razorpay adheres to stringent security measures to protect your information.
      </p>

      <p className="mb-4">
        Please review Razorpay's Privacy Policy to understand how they handle your information:{' '}
        <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer" className="text-blue-600">
          Razorpay Privacy Policy
        </a>.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Children's Information</h2>
      <p className="mb-4">
        Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
      </p>
      <p className="mb-4">
        GDSC VNRVJIET does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Online Privacy Policy Only</h2>
      <p className="mb-4">
        This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in GDSC VNRVJIET. This policy is not applicable to any information collected offline or via channels other than this website.
      </p>

      <h2 className="text-2xl font-bold mt-8 mb-4">Consent</h2>
      <p className="mb-4">
        By using our website, you hereby consent to our Privacy Policy and agree to its Terms and Conditions.
      </p>
    </div>
  );
};

export default PrivacyPolicy;
