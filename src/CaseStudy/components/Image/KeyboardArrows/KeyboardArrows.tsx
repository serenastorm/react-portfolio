import { useEffect, useState } from "react";

import "./KeyboardArrows.scss";

const animationDurationInMs = 300;

type Direction = "top" | "right" | "bottom" | "left";

type KeyboardArrowProps = {
  direction: Direction;
  isClickable: boolean;
  isPressed: boolean;
  onArrowClick?: (direction: Direction) => void;
};

type KeyboardArrowsProps = {
  animationStep: number;
  clickableDirections: Direction[];
  keyPressed?: Direction;
  onArrowClick?: (direction: Direction) => void;
};

const KeyboardArrow = ({
  direction,
  isClickable,
  isPressed,
  onArrowClick,
}: KeyboardArrowProps) => {
  return (
    <button
      className={`keyboardArrow keyboardArrow-${direction}${
        isPressed ? " keyboardArrow-isPressed" : ""
      }`}
      onClick={() => {
        if (onArrowClick && isClickable) {
          onArrowClick(direction);
        }
      }}
      aria-label={
        isClickable ? `Simulate ${direction} arrow key press` : undefined
      }
      title={isClickable ? `Simulate ${direction} arrow key press` : undefined}
      aria-hidden={isClickable ? "false" : "true"}
      tabIndex={isClickable ? 0 : -1}
      style={{ cursor: isClickable ? "pointer" : "not-allowed" }}
    />
  );
};

const KeyboardArrows = ({
  animationStep,
  clickableDirections,
  keyPressed,
  onArrowClick,
}: KeyboardArrowsProps) => {
  const [clickedArrowDirection, setClickedArrowDirection] =
    useState<Direction | null>(null);
  const [stepWasUpdated, setStepWasUpdated] = useState<boolean>(false);
  const directions: Direction[] = ["top", "right", "bottom", "left"];

  const onKeyboardArrowClick = (direction: Direction) => {
    setClickedArrowDirection(direction);

    setTimeout(() => {
      setClickedArrowDirection(null);
    }, animationDurationInMs);

    if (onArrowClick) {
      onArrowClick(direction);
    }
  };

  useEffect(() => {
    setStepWasUpdated(true);
    const stepUpdateTimeOut = setTimeout(() => {
      setStepWasUpdated(false);
    }, animationDurationInMs);

    return () => clearTimeout(stepUpdateTimeOut);
  }, [animationStep]);

  const isKeyPressed = (direction: Direction) =>
    clickedArrowDirection
      ? clickedArrowDirection === direction
      : direction === keyPressed && stepWasUpdated;

  return (
    <div className="keyboardArrows">
      {directions.map((direction) => (
        <KeyboardArrow
          direction={direction}
          isClickable={clickableDirections.includes(direction)}
          isPressed={isKeyPressed(direction)}
          onArrowClick={onKeyboardArrowClick}
          key={direction}
        />
      ))}
    </div>
  );
};

export default KeyboardArrows;
