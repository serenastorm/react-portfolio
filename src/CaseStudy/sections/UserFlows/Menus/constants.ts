import { MenusImages } from "CaseStudy/assets/UserFlows/Menus";
import { SlideImageProps } from "CaseStudy/components/BrowserSlider/types";

export const MenusSectionsVisuals: SlideImageProps[] = [
  {
    img: MenusImages.HomePage,
    alt: "",
    slides: 0,
    className: "",
    animation: "fade",
  },
  {
    img: [...MenusImages.Panel],
    alt: "",
    slides: 1,
    className: "",
    animation: "fade",
    animationProps: {
      totalSteps: 3,
      intervalInMs: 1500,
      animationClassName: "menuPanel",
      animationStages: ["isExpanded", "isHidden", "isHidden"],
    },
  },
  {
    img: [...MenusImages.Customisation],
    alt: "",
    slides: [2, 3],
    className: "",
    animation: "fade",
    animationProps: {
      totalSteps: 3,
      intervalInMs: 1500,
      animationClassName: "customisation",
    },
  },
  {
    img: MenusImages.EditItem,
    alt: "",
    slides: 3,
    className: "desktopMock-modal",
    animation: "modal",
  },
];

export const MenusSectionsCaptions = [
  "Menus can be managed from the Menus page",
  [
    "The menu editor is designed to let users preview their changes in real time",
    "It can be full screened by toggling the settings panel",
  ],
  "Users can customise the font and colors",
  "Items have a name, description, price, and add ons (e.g. sauces)",
];
