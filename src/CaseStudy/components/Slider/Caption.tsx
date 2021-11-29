import { motion } from "framer-motion";
import { enterAndExitAnimationProps } from "helpers/animations";

type CaptionProps = {
  animated?: boolean;
  copy: string | string[];
};

const Caption = ({ animated = true, copy }: CaptionProps) => {
  const captions = typeof copy === "string" ? [copy] : copy;
  const captionClassName = "listItem";
  const captionWrapperProps = { className: captionClassName };

  const SingleCaptionWrapper = ({ children }: { children: string }) =>
    animated ? (
      <motion.p
        {...captionWrapperProps}
        {...enterAndExitAnimationProps({
          opacity: [0, 1],
          y: ["10%", 0, "-10%"],
        })}
      >
        {children}
      </motion.p>
    ) : (
      <p {...captionWrapperProps}>{children}</p>
    );

  return (
    <>
      {captions.map((caption) => (
        <SingleCaptionWrapper key={caption}>{caption}</SingleCaptionWrapper>
      ))}
    </>
  );
};

export default Caption;
