import { PricingImage } from "CaseStudy/assets/Marketing/Pricing";
import { ImageWrapper } from "CaseStudy/components/Image";
import { ContentRowWithVisual, Tips } from "CaseStudy/components";

import "./Pricing.scss";

const Pricing = () => {
  return (
    <>
      <ContentRowWithVisual
        listItem={[
          "The more options people have, the harder it is for them to make a choice.",
          "The subscriptions on offer need to cover a maximum of use cases, my main target being small and medium sized businesses.",
          "The paid plans aim to offset the potential storage and API costs of the Basic plan users, while being affordable for small business owners.",
        ]}
        className="section-pricing"
        title="Pricing plans"
      >
        <ImageWrapper className="img-pricing">
          <img
            src={PricingImage}
            alt="Pricing table with two paid subscription and a free option, listing all the features of each."
          />
        </ImageWrapper>
      </ContentRowWithVisual>
      <Tips
        copy={
          <>
            If you don't have too many plans, a table is the best way for users
            to compare features as it's easier to scan. On smaller screens make
            use of <code>position: sticky</code> to keep the subscription names
            visible on scroll.
          </>
        }
      />
    </>
  );
};

export default Pricing;
