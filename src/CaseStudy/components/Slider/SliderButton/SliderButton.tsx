import { CSSProperties } from "react";
import "./SliderButton.scss";

type SliderButtonProps = {
  direction: "Next" | "Prev";
  onClick: () => void;
};

const SliderButton = ({ direction, onClick }: SliderButtonProps) => {
  const radius = 256;
  const stroke = 32;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  const startDashoffset = circumference;
  const endDashoffset = circumference - circumference;

  return (
    <button
      onClick={() => onClick()}
      className={`imgSlider-button imgSlider-button-is${direction}`}
      aria-label={`${direction === "Prev" ? "Previous" : direction} slide`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={radius * 2}
        height={radius * 2}
        fill="none"
        viewBox="0 0 512 512"
      >
        <circle
          stroke="#fff"
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          strokeWidth={stroke}
        ></circle>

        <circle
          cx={radius}
          cy={radius}
          r={normalizedRadius}
          stroke="#000"
          strokeWidth={stroke}
          strokeDasharray={circumference + " " + circumference}
          style={
            {
              "--progress-dashoffset-min": startDashoffset,
              "--progress-dashoffset-max": endDashoffset,
            } as CSSProperties
          }
        ></circle>
        <path
          fill="#000"
          fillRule="evenodd"
          d="M319.321 241.422l-.014-.014v.014H153.305a5.983 5.983 0 00-5.924 5.893v13.786c0 3.45 2.458 5.908 5.908 5.908h166.52l-30.612 30.599-45.912 46.212a4.932 4.932 0 00-1.764 3.088 6.151 6.151 0 001.764 5.278l9.848 9.359c1.969 2.458 5.908 2.458 8.382 0L364.431 258.66a5.676 5.676 0 001.367-6.482 5.686 5.686 0 00-1.367-1.9l-102.901-102.9a6.223 6.223 0 00-4.443-1.844 5.037 5.037 0 00-3.97 1.844l-9.847 9.359c-2.458 2.457-2.458 6.396 0 8.366l76.35 76.319h-.299z"
          clipRule="evenodd"
        ></path>
      </svg>
      <span className="imgSlider-button-text" aria-hidden="true">
        {direction === "Prev" ? "Previous" : direction}
      </span>
    </button>
  );
};

export default SliderButton;
