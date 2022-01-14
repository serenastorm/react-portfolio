import { routes } from "infrastructure/routes/constants";
import { SVGAttributes } from "react";
import { Link, useLocation } from "react-router-dom";

import "./NavButton.scss";

const NavButton = () => {
  const { pathname } = useLocation();

  const svgProps = {
    width: "24",
    height: "24",
    fill: "none",
    stroke: "currentColor",
    strokeLinecap: "round" as SVGAttributes<SVGSVGElement>["strokeLinecap"],
    strokeLinejoin: "round" as SVGAttributes<SVGSVGElement>["strokeLinejoin"],
    strokeWidth: "2",
    viewBox: "0 0 24 24",
  };

  const isSnippets = pathname.startsWith("/snippets");
  const isHomepage = pathname === "/";

  if (!isSnippets && !isHomepage) {
    return null;
  }

  return (
    <ul className="navButtons">
      <div
        className="navButton-indicator"
        data-active-btn-index={isSnippets ? "2" : "1"}
      />
      <li>
        <Link
          to={routes.home}
          className={isSnippets ? "" : "navButton-active"}
          aria-label="Home"
        >
          <svg {...svgProps}>
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
            <path d="M9 22L9 12 15 12 15 22"></path>
          </svg>
        </Link>
        <p aria-hidden="true">Home</p>
      </li>
      <li>
        <Link
          to={routes.blog.snippets.url}
          className={isSnippets ? "navButton-active" : ""}
          aria-label="Code snippets"
        >
          <svg {...svgProps}>
            <path d="M16 18L22 12 16 6"></path>
            <path d="M8 6L2 12 8 18"></path>
          </svg>
        </Link>
        <p aria-hidden="true">Snippets</p>
      </li>
    </ul>
  );
};

export default NavButton;
