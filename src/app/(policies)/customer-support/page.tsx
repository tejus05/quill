import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const page = () => {
  return (
    <MaxWidthWrapper className="p-5">
      <div className="mb-4 flex flex-col space-y-5">
        <div>
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
        <h3 className="text-xl font-semibold">Customer Support</h3>
        <p>
          I do not have any team. As mentioned in the disclaimer, I&#39;m just
          an individual. Thus, I myself will try to provide a good and healthy
          customer support and try to answer all the queries. Please feel free
          to drop some queries, if you have some.
        </p>
        <ul className="list-none">
          <li>
            Mail :{" "}
            <a
              href="mailto:thequantumcoder@gmail.com"
              className="text-blue-500 hover:underline"
            >
              thequantumcoder@gmail.com
            </a>{" "}
            or{" "}
            <a
              href="mailto:tejus05.personal@gmail.com"
              className="text-blue-500 hover:underline"
            >
              tejus05.personal@gmail.com
            </a>
          </li>
          <li>
            Phone :{" "}
            <a href="tel:8618153283" className="text-blue-500 hover:underline">
              +91 8618153283
            </a>
          </li>
        </ul>
      </div>
    </MaxWidthWrapper>
  );
};

export default page;
