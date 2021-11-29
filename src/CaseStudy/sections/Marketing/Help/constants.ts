import { HelpImages } from "CaseStudy/assets/Marketing/Help";
import { SlideImageProps } from "CaseStudy/components/BrowserSlider/types";

export const HelpSectionsVisuals: SlideImageProps[] = [
  {
    img: HelpImages[0],
    alt: "Screenshot of the help homepage, with links to the following sections: Restaurants, Menus, Schedule, QR Codes, Orders, and Analytics.",
    slides: 0,
    animation: "fade",
  },
  // {
  //   img: HelpImages[0],
  //   alt: "",
  //   slides: 3,
  //   className: "",
  //   animation: "fade",
  // },
];

export const HelpSectionsCaptions = [
  "The help homepage links to the 6 main topics users might be interested about",
];
