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
    <div className="colorPalette-color">
      <div className="colorPalette-color-hex" style={{ backgroundColor: hex }}>
        <h2 style={{ color: labelColor }}>{hex}</h2>
      </div>
      <h2>{label}</h2>
      <p>
        {contrast}
        {wcagRating && (
          <>
            {"  "}
            <span
              className={`colorPalette-color-rating colorPalette-color-rating-${wcagRating}`}
            >
              WCAG {wcagRating}
            </span>
          </>
        )}
      </p>
    </div>
  );
};

const ColorPalette = () => {
  const [isHighContrastMode, setIsHighContrastMode] = useState<boolean>(false);
  const colorsArray = isHighContrastMode ? darkModeColors : colors;
  return (
    <section className="colorPalette">
      <div className="colorPalette-header">
        <h2>Colour palette</h2>
        <Switch
          isChecked={isHighContrastMode}
          setIsChecked={setIsHighContrastMode}
        />
      </div>

      <div className="colorPalette-colors">
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
      </div>
    </section>
  );
};

export default ColorPalette;
