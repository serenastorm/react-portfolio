import { useEffect } from "react";

const PageTitle = () => {
  useEffect(() => {
    document.title = "myqr | Case Study";
  }, []);

  return null;
};

export default PageTitle;
