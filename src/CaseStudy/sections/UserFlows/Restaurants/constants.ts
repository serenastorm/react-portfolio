import { RestaurantsImages } from "CaseStudy/assets/UserFlows/Restaurants";
import { SlideImageProps } from "CaseStudy/components/BrowserSlider/types";

export const RestaurantsSectionsVisuals: SlideImageProps[] = [
  {
    img: RestaurantsImages[0],
    alt: "",
    slides: [0, 1],
    className: "",
    animation: "fade",
  },
  {
    img: RestaurantsImages[1],
    alt: "",
    slides: 1,
    className: "desktopMock-modal",
    animation: "modal",
  },
  {
    img: RestaurantsImages[2],
    alt: "",
    slides: 2,
    className: "",
    animation: "fade",
  },
  {
    img: RestaurantsImages[3],
    alt: "",
    slides: 3,
    className: "",
    animation: "fade",
  },
];

export const RestaurantsSectionsCaptions = [
  [
    "QR codes are associated to restaurants rather than menus",
    "This avoids having to print multiple QRs per restaurant",
  ],
  [
    "Users can preview their QR codes by testing them on their phone or clicking the preview link",
    "QR codes always have download links",
  ],
  [
    "The restaurant form is divided in three tabs",
    "Tabs are shown or hidden depending on a user’s subscription",
  ],
  "Users can schedule what menu a QR code should link to",
];
