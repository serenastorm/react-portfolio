import { useState } from "react";
import { isMobile } from "react-device-detect";
import { AnimatePresence, motion } from "framer-motion";
import { HelpIcon } from "CaseStudy/assets/Icons/Actions";
import { enterAndExitAnimationProps } from "helpers/animations";

import "./ToggleTip.scss";

type ToggleTipProps = {
  content: string;
  label: string;
};

const ToggleTip = ({ content, label }: ToggleTipProps) => {
  const [showToggleTip, setShowToggletip] = useState<boolean>(false);
  const buttonProps = isMobile
    ? {
        onClick: () => {
          if (showToggleTip) {
            setShowToggletip(false);
          } else {
            setShowToggletip(true);
          }
        },
      }
    : {
        onMouseEnter: () => setShowToggletip(true),
        onFocus: () => setShowToggletip(true),
        onBlur: () => setShowToggletip(false),
        onMouseLeave: () => setShowToggletip(false),
      };

  return (
    <div className="toggletip-container">
      <button
        aria-label={label}
        data-toggletip-content={content}
        {...buttonProps}
      >
        <HelpIcon />
      </button>
      <span role="status">
        <AnimatePresence>
          {showToggleTip && (
            <motion.span
              className="toggletip-bubble"
              key="toggletip"
              {...enterAndExitAnimationProps({
                duration: 0.25,
                opacity: [0, 1],
                y: ["10%", 0, "-10%"],
              })}
            >
              {content}
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </div>
  );
};

export default ToggleTip;
