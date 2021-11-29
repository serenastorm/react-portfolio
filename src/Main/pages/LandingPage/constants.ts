import { routes } from "routes/constants";
import { LinkProps } from "./types";

export const projectLinks: LinkProps[] = [
  {
    label: "myqr.studio",
    description: "case study",
    url: routes.myqr.intro.url,
  },
  {
    label: "cmts2a",
    description: "custom wordpress theme",
    url: "https://cmts2a.fr/",
    isExternal: true,
  },
  {
    label: "react-native-side-nav",
    description: "open source npm package",
    url: "https://github.com/serenastorm/react-native-side-nav",
    isExternal: true,
  },
  {
    label: "antonettiserena2018",
    description: "2018 UI/UX portfolio",
    url: "",
    isExternal: true,
  },
];
