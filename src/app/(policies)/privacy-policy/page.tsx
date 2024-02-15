import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const page = () => {
  return (
    <MaxWidthWrapper className="p-5">
      <div>
        <div className="p-4">
          <p className="font-bold italic underline">Disclaimer</p>
          <p>
            I am an individual trying to integrate payment gateways in my
            website just for learning purposes. Stripe or RazorPay requires us
            to provide a website with pages such as Terms of Service, Privacy
            Policy, etc.. Thus, I&#39;ve created this webpage. All the
            information provided here is true such as my contact information.
            Also, I have intentionally kept the prices low just for learning,
            testing or exploring purposes. Please do not make any unintentional
            payments. It would be an extra work for an explorer like me to get
            into refunds and all (though I do not guarantee any refunds, just a
            possibility).
          </p>
        </div>

        <div className="p-2">
          <h2 className="text-2xl font-semibold">Privacy Policy</h2>
          <p>
            This Privacy Policy describes how thequantumcoder (&quot;we,&quot;
            &quot;us,&quot; or &quot;our&quot;) collects, uses, and protects
            your personal information when you visit our website at
            www.example.com (&quot;the Website&quot;). By using the Website, you
            agree to the terms outlined in this Privacy Policy.
          </p>
          <h3 className="text-xl font-semibold">Information We Collect</h3>
          <p>
            We may collect the following types of personal information when you
            interact with the Website:
          </p>
          <ol className="list-decimal list-outside pl-6">
            <li>
              <p>
                <b>Personal Information:</b> When you contact us through forms
                on the Website, we may collect personal information such as your
                name, email address and other details.
              </p>
            </li>
          </ol>
          <h3 className="text-xl font-semibold">How We Use Your Information</h3>
          <p>We use the collected information for the following purposes:</p>
          <ol className="list-decimal list-outside pl-6">
            <li>
              <p>
                <b>Communication:</b> We may use your contact information to
                respond to your inquiries or provide information you requested.
              </p>
            </li>
          </ol>
          <h3 className="text-xl font-semibold">Third-Party Services</h3>
          <p>
            We may use third-party services, such as analytics tools or social
            media plugins, that may collect information from you. These
            third-party services have their own privacy policies, and we
            encourage you to review them.
          </p>
          <h3 className="text-xl font-semibold">Information Sharing</h3>
          <p>
            We do not sell, trade, or otherwise transfer your personal
            information to third parties without your consent, except as
            described in this Privacy Policy or as required by law.
          </p>
          <h3 className="text-xl font-semibold">Security</h3>
          <p>
            We implement security measures to protect your personal information.
            However, no method of transmission over the internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>
          <h3 className="text-xl font-semibold">Your Choices</h3>
          <p>
            Users may or may not be able to delete their data, which wouldn't be
            used for any purposes other than communicating with the customer.
          </p>
          <h3 className="text-xl font-semibold">
            Updates to this Privacy Policy
          </h3>
          <p>
            We may update this Privacy Policy to reflect changes in our
            practices or legal requirements. We will notify you of any
            significant changes by posting the updated Privacy Policy on the
            Website.
          </p>
          <h3 className="text-xl font-semibold">Contact Us</h3>
          <p>
            If you have any questions, please contact us at{" "}
            <a
              href="mailto:thequantumcoder@gmail.com"
              className="text-blue-500 hover:underline"
            >
              thequantumcoder@gmail.com
            </a>
            .
          </p>
          <p>This Privacy Policy was last updated on Feb 12 2024.</p>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
