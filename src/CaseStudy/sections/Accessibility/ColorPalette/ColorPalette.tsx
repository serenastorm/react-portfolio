import { useState } from "react";
import { Color } from "./types";
import { colors, darkModeColors } from "./constants";
import Switch from "./Switch/Switch";

import "./ColorPalette.scss";

const ColorPaletteColor = ({
  hex,
  label,
  labelColor,
  contrast,
  wcagRating,
}: Color) => {
  return (
    <li className="colorPalette-color">
      <div className="colorPalette-color-hex" style={{ backgroundColor: hex }}>
        <h2 style={{ color: labelColor }} aria-hidden="true">
          {hex}
        </h2>
      </div>
      <h2>{label}</h2>
      {/* ARIA role="text" prevents 'text splitting' in VoiceOver iOS https://axesslab.com/text-splitting/  */}
      {/* eslint-disable-next-line jsx-a11y/aria-role */}
      <p role="text">
        <span className="screenReaderText">Contrast:</span>
        {contrast}
        {wcagRating && (
          <>
            {"  "}
            <span
              className={`colorPalette-color-rating colorPalette-color-rating-${wcagRating}`}
            >
              WCAG <span className="screenReaderText">Rating:</span>
              {wcagRating}
            </span>
          </>
        )}
      </p>
    </li>
  );
};

const ColorPalette = () => {
  const [isHighContrastMode, setIsHighContrastMode] = useState<boolean>(false);
  const colorsArray = isHighContrastMode ? darkModeColors : colors;
  return (
    <section className="colorPalette" aria-labelledby="colorPaletteHeading">
      <div className="colorPalette-header">
        <h2 id="colorPaletteHeading">Colour palette</h2>
        <Switch
          isChecked={isHighContrastMode}
          setIsChecked={setIsHighContrastMode}
        />
      </div>

      <ul className="colorPalette-colors">
        {colorsArray.map((color) => (
          <ColorPaletteColor
            hex={color.hex}
            label={color.label}
            labelColor={color.labelColor}
            contrast={color.contrast}
            wcagRating={color.wcagRating}
            key={color.label}
          />
        ))}
      </ul>
    </section>
  );
};

export default ColorPalette;
