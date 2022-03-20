import { SectionName, SectionTitle } from "./types";

const api = {
  dev: "http://localhost:5000/api",
  prod: "https://antonettiserena-api.herokuapp.com/api",
};

export const apiUrl =
  process.env.NODE_ENV === "production" ? api.prod : api.dev;

const baseUrl = "/";
const caseStudySectionUrl = (section?: SectionName) => `${baseUrl}${section}`;

export const caseStudySectionsTitles = {
  marketing: "Marketing" as SectionTitle,
  dashboard: "User flows" as SectionTitle,
  accessibility: "Accessibility" as SectionTitle,
  features: "Features" as SectionTitle,
  designSystem: "Design System" as SectionTitle,
};

const caseStudySections = {
  marketing: "marketing" as SectionName,
  dashboard: "user-flows" as SectionName,
  accessibility: "accessibility" as SectionName,
  features: "features" as SectionName,
  designSystem: "design-system" as SectionName,
};

export const routes = {
  intro: { title: "Intro", url: baseUrl },
  designSystem: {
    title: caseStudySectionsTitles.designSystem,
    url: caseStudySectionUrl(caseStudySections.designSystem),
  },
  marketing: {
    title: caseStudySectionsTitles.marketing,
    url: caseStudySectionUrl(caseStudySections.marketing),
  },
  dashboard: {
    title: caseStudySectionsTitles.dashboard,
    url: caseStudySectionUrl(caseStudySections.dashboard),
  },
  accessibility: {
    title: caseStudySectionsTitles.accessibility,
    url: caseStudySectionUrl(caseStudySections.accessibility),
  },
  features: {
    title: caseStudySectionsTitles.features,
    url: caseStudySectionUrl(caseStudySections.features),
  },
};
