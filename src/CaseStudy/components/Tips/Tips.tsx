import { ReactNode } from "react";
import { TipsIcon } from "CaseStudy/assets/Icons/Signs";

import "./Tips.scss";

type TipsProps = {
  copy: string | ReactNode;
  icon?: ReactNode;
  title?: string;
};

const Tips = ({
  copy,
  icon = <TipsIcon />,
  title = "Tips & tricks",
}: TipsProps) => {
  return (
    <div className="tips">
      <div className="tips-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{copy}</p>
    </div>
  );
};

export default Tips;
