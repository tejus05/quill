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

      <div className="p-4">
        <h2 className="text-2xl font-semibold underline">
          Cancellation and Refund Policy
        </h2>
        <br />

        <h3 className="text-xl font-semibold">1. Cancellation Policy</h3>
        <p>
          Due to the nature of our services being offered for learning and
          testing purposes, we do not guarantee cancellations once a payment has
          been made. All payments are considered final.
        </p>

        <h3 className="text-xl font-semibold">2. Refund Policy</h3>
        <p>
          As stated in the disclaimer, I do not guarantee any refunds. However,
          if you believe there has been an error in payment or if you have
          questions regarding a potential refund, please contact us at{" "}
          <a
            href="mailto:thequantumcoder@gmail.com"
            className="text-blue-500 hover:underline"
          >
            thequantumcoder@gmail.com
          </a>
          .
        </p>
        <p>
          This Cancellation and Refund Policy was last updated on Feb 12 2024.
        </p>
      </div>
    </MaxWidthWrapper>
  );
}

export default page