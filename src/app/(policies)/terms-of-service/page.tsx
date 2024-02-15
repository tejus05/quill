import MaxWidthWrapper from "@/components/MaxWidthWrapper"

const page = () => {
  return (
    <MaxWidthWrapper className="p-5">
      <div className="p-4">
        <p className="font-bold italic underline">Disclaimer</p>
        <p>
          I am an individual trying to integrate payment gateways in my website
          just for learning purposes. Stripe or RazorPay requires us to provide
          a website with pages such as Terms of Service, Privacy Policy, etc..
          Thus, I've created this webpage. All the information provided here is
          true such as my contact information. Also, I have intentionally kept
          the prices low just for learning, testing or exploring purposes.
          Please do not make any unintentional payments. It would be an extra
          work for an explorer like me to get into refunds and all (though I do
          not guarantee any refunds, just a possibility).
        </p>
      </div>

      <div className="p-2">
        <h2 className="text-2xl font-semibold">Terms of Service</h2>
        <p>
          By accessing and using this website ("thequantumcoder"), you agree to
          comply with and be bound by the following terms and conditions. If you
          do not agree to these terms, please do not use this website.
        </p>
        <ol className="list-decimal list-outside pl-6">
          <li>
            <h3 className="text-xl font-semibold">Introduction</h3>
            <p>
              These terms and conditions ("Terms") govern your use of
              thequantumcoder website. The website is owned and operated by
              Tejus S, an individual developer located in India. Throughout the
              Terms, "we," "us," and "our" refer to thequantumcoder and its
              owner, i.e., Tejus S.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">Website Use</h3>
            <p>
              This website is provided for educational and learning purposes
              only. You must not use this website in any way that causes, or may
              cause, damage to the website or impairment of the availability or
              accessibility of the website. Unauthorized use of this website may
              give rise to a claim for damages.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">
              Intellectual Property Rights
            </h3>
            <p>
              All content on this website, including text, graphics, logos,
              images, and software, belongs to their respective owners and is
              protected by applicable intellectual property laws.
              Thequantumcoder does not claim ownership of any third-party
              content displayed on this website. Users are granted permission to
              freely view, use, and distribute third-party content for personal,
              educational, or non-commercial purposes without the need for a
              formal license.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">Disclaimer</h3>
            <p>
              All information provided on this website is for educational
              purposes only. While we strive to keep the information up-to-date
              and accurate, we make no representations or warranties of any
              kind, express or implied, about the completeness, accuracy,
              reliability, suitability, or availability with respect to the
              website or the information, products, services, or related
              graphics contained on the website for any purpose.
            </p>
            <p>
              Any reliance you place on such information is therefore strictly
              at your own risk. In no event will we be liable for any loss or
              damage, including without limitation, indirect or consequential
              loss or damage, or any loss or damage whatsoever arising from loss
              of data or profits arising out of, or in connection with, the use
              of this website.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">Changes to Terms</h3>
            <p>
              We reserve the right to modify these Terms at any time. Changes
              will be effective immediately upon posting on the website. Your
              continued use of the website after changes are posted constitutes
              your acceptance of the updated Terms.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-semibold">Contact Information</h3>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a
                href="mailto:thequantumcoder@gmail.com"
                className="text-blue-500 hover:underline"
              >
                thequantumcoder@gmail.com
              </a>
              .
            </p>
          </li>
        </ol>
        <p>These Terms of Service were last updated on Feb 12 2024.</p>
      </div>
    </MaxWidthWrapper>
  );
}

export default page