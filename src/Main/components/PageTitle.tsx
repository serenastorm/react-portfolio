import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const PageTitle = () => {
  const { pathname } = useLocation();

  const isCaseStudyPage = pathname.startsWith("/myqr");

  useEffect(() => {
    document.title = isCaseStudyPage
      ? "myqr | Case Study"
      : "Serena Antonetti | Portfolio";
  }, [isCaseStudyPage]);

  return null;
};

export default PageTitle;
