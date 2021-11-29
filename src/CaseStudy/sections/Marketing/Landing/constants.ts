import { LandingImages } from "CaseStudy/assets/Marketing/Landing";

export type LandingImageProps = {
  img: string | string[];
  alt: string;
  className?: string;
};

export const LandingSectionVisuals: LandingImageProps[] = [
  {
    img: LandingImages[0],
    alt: "Screenshot of the landing page hero and the website's navbar, both including a prominent 'Get started' link.",
  },
  {
    img: LandingImages[1],
    alt: "Screenshot of the landing product preview, showing a screenshot of the product dashboard and a sample menu.",
  },
  {
    img: LandingImages[2],
    alt: "Screenshot of the landing page features section, focusing on the following features: contactless, eco-friendly, save money, and editable.",
  },
  {
    img: LandingImages[3],
    alt: "Screenshot of the landing page 'Customise your menu' section, with a visual and a features list. The visual is a sample menu whose typography and colors can be updated.",
  },
  {
    img: LandingImages[4],
    alt: "Screenshot of the landing page Orders section, with a visual and a features list.",
  },
  {
    img: LandingImages[5],
    alt: "Screenshot of the landing page Analytics section, with a visual and a features list. Some list items have a 'Pro feature' pill next to them.",
  },
  {
    img: LandingImages[6],
    alt: "Screenshot of the landing page footer, with a section encouraging users to visit the pricing page for more information and a link to the feedback page.",
  },
];

export const LandingSectionsCaptions = [
  [
    "The visuals are cut off at the bottom of most desktop screens to entice users to scroll",
    "CTAs are easy to find",
  ],
  "Show users what the product looks and feels like with a preview of the dashboard and a sample menu",
  "Start by listing the main advantages of using the product",
  [
    "Then a more in-depth explanation of each feature",
    "The visuals are interactive and give users the chance to feel like they’re using the product",
  ],
  "Bullet points keep the information easy to scan",
  "Make it clear which features are part of a paid plan",
  "Allow users to have a say by sending feedback and requesting features",
];
