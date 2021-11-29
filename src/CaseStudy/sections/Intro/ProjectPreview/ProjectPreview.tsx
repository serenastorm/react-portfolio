import { useState, useEffect, useRef } from "react";
import { FullScreenImageContainer } from "CaseStudy/components/Image";
import { ProjectPreviewImages } from "CaseStudy/assets/Intro/ProjectPreview";

import "./ProjectPreview.scss";

const ProjectPreview = () => {
  const [containerViewportScrollDistance, setContainerViewportScrollDistance] =
    useState<number>(0);

  const imageContainer = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (imageContainer?.current) {
        const { pageYOffset, innerHeight, scrollY } = window;

        const imageContainerBoundingValues =
          imageContainer.current.getBoundingClientRect();

        const imageContainerYPosition =
          imageContainerBoundingValues.top + scrollY;

        const imageContainerHeight = imageContainerBoundingValues.height;

        const imageContainerTopEdge = imageContainerYPosition - innerHeight;
        const imageContainerBottomEdge =
          imageContainerYPosition + imageContainerHeight;

        const isContainerInView =
          imageContainerTopEdge < pageYOffset &&
          imageContainerBottomEdge > pageYOffset;

        const scrollDistanceInPercentage =
          ((scrollY - imageContainerTopEdge) * 100) /
          (imageContainerBottomEdge - imageContainerTopEdge);

        if (isContainerInView) {
          setContainerViewportScrollDistance(scrollDistanceInPercentage);
        }
      }
    };
    window.addEventListener("scroll", updatePosition);
    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  const transformStrength = 0.1;
  const firstImageTransform =
    50 + containerViewportScrollDistance * transformStrength;
  const secondImageTransform =
    50 - containerViewportScrollDistance * transformStrength;

  return (
    <FullScreenImageContainer
      bg="Dark"
      imageClassName="projectPreview"
      containerRef={imageContainer}
    >
      <div className="imgWrapper-projectPreview">
        {ProjectPreviewImages.map((imgSrc, imgIndex) => (
          <img
            src={imgSrc}
            alt={
              imgIndex === 0
                ? "Grid of images with screenshots from the finished product."
                : ""
            }
            key={`projectPreview-img-${imgIndex}`}
            style={{
              transform: `translate(-50%, -${
                imgIndex === 0 ? firstImageTransform : secondImageTransform
              }%)`,
            }}
          />
        ))}
      </div>
    </FullScreenImageContainer>
  );
};

export default ProjectPreview;
