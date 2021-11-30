import { HelpImages } from "CaseStudy/assets/Marketing/Help";
import { SlideImageProps } from "CaseStudy/components/BrowserSlider/types";

export const HelpSectionsVisuals: SlideImageProps[] = [
  {
    img: HelpImages[0],
    alt: "Screenshot of the help homepage, with links to the following sections: Restaurants, Menus, Schedule, QR Codes, Orders, and Analytics.",
    slides: 0,
    animation: "fade",
  },
  {
    img: HelpImages[1],
    alt: "",
    slides: 1,
    className: "",
    animation: "fade",
  },
  {
    img: HelpImages[2],
    alt: "",
    slides: 2,
    className: "",
    animation: "fade",
  },
];

export const HelpSectionsCaptions = [
  "The help homepage links to the 6 main topics users might be interested about",
  "Help articles are easy to navigate and contain a lot of visuals",
  "The privacy policy is written in plain language",
];
