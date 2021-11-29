import { ReactNode } from "react";
import { PrefersReducedMotionImage } from "CaseStudy/assets/Accessibility/PrefersReducedMotion";

import "./PrefersReducedMotion.scss";

const PrefersReducedMotionContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <div className="accessibility-prefersReducedMotion">{children}</div>;
};

const PrefersReducedMotionPreviewContainer = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <div className="accessibility-prefersReducedMotion-preview">{children}</div>
  );
};

const PrefersReducedMotionCaption = ({
  preference,
}: {
  preference: "reduce" | "no-preference";
}) => {
  return (
    <code>
      {preference === "no-preference" && (
        <span className="comment prefersReducedMotionText">
          If you can't see the animation above, it might be because of your own
          motion preferences.
        </span>
      )}
      prefers-reduced-motion: <span className="highlighted">{preference}</span>
    </code>
  );
};

const PrefersReducedMotion = () => {
  return (
    <div id="accessibility-prefersReducedMotion-container">
      <PrefersReducedMotionContainer>
        <PrefersReducedMotionPreviewContainer>
          <h5>Loading...</h5>
        </PrefersReducedMotionPreviewContainer>
        <PrefersReducedMotionCaption preference="reduce" />
      </PrefersReducedMotionContainer>
      <PrefersReducedMotionContainer>
        <PrefersReducedMotionPreviewContainer>
          <div className="circleLoader" aria-label="Animated loader" />
        </PrefersReducedMotionPreviewContainer>
        <PrefersReducedMotionCaption preference="no-preference" />
      </PrefersReducedMotionContainer>
      <PrefersReducedMotionContainer>
        <PrefersReducedMotionPreviewContainer>
          <img
            src={PrefersReducedMotionImage}
            alt="Modal appearing on the screen with no transition."
            className="accessibility-prefersReducedMotion-preview-img"
            id="accessibility-prefersReducedMotion-preview-img-reduce"
          />
        </PrefersReducedMotionPreviewContainer>
        <PrefersReducedMotionCaption preference="reduce" />
      </PrefersReducedMotionContainer>
      <PrefersReducedMotionContainer>
        <PrefersReducedMotionPreviewContainer>
          <img
            src={PrefersReducedMotionImage}
            alt="Modal appearing on the screen with a fade in transition from the bottom."
            className="accessibility-prefersReducedMotion-preview-img"
            id="accessibility-prefersReducedMotion-preview-img-noPreference"
          />
        </PrefersReducedMotionPreviewContainer>
        <PrefersReducedMotionCaption preference="no-preference" />
      </PrefersReducedMotionContainer>
    </div>
  );
};

export default PrefersReducedMotion;
