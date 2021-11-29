import { ReactNode } from "react";

import "./ContentRowWithVisual.scss";

type ChildrenProps = {
  children: ReactNode;
};

interface ContentRowWithVisualProps extends ChildrenProps {
  className?: string;
  listItem?: string | string[];
  imageBefore?: boolean;
  title?: string;
}

const ContentRowWrapper = ({ children }: ChildrenProps) => {
  return <div className="contentRow-copy">{children}</div>;
};

const ContentRowWithVisual = ({
  children,
  className = "",
  listItem,
  imageBefore,
  title,
}: ContentRowWithVisualProps) => {
  const wrapperProps = { className: `contentRow ${className}` };

  const renderTitle = () => {
    if (title) {
      return <h1>{title}</h1>;
    }
  };

  const renderCopy = () => {
    if (Array.isArray(listItem)) {
      return (
        <ContentRowWrapper>
          {renderTitle()}
          {listItem.map((item, itemIndex) => (
            <p className="listItem" key={`listItem-${itemIndex}`}>
              {item}
            </p>
          ))}
        </ContentRowWrapper>
      );
    } else {
      return (
        <ContentRowWrapper>
          {renderTitle()}
          <p className="listItem">{listItem}</p>
        </ContentRowWrapper>
      );
    }
  };

  const renderContent = () => (
    <>
      {listItem && !imageBefore && renderCopy()}
      {children}
      {listItem && imageBefore && renderCopy()}
    </>
  );

  return title ? (
    <section {...wrapperProps}>{renderContent()}</section>
  ) : (
    <div {...wrapperProps}>{renderContent()}</div>
  );
};

export default ContentRowWithVisual;
