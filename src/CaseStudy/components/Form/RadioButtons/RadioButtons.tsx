import { RadioButtonsFieldProps } from "../types";

import "./RadioButtons.scss";

const RadioButtons = ({
  label,
  name,
  options,
  value,
  setFieldValue,
}: RadioButtonsFieldProps) => (
  <fieldset>
    <legend>{label}</legend>
    {options.map((option) => (
      <label className="radio-container" key={option.value}>
        {option.label}
        <input
          type="radio"
          name={name}
          id={option.value}
          value={option.value}
          checked={option.value === value}
          onChange={(e) => setFieldValue(e.target.value)}
        />
        <span className="radio-checkmark" />
      </label>
    ))}
  </fieldset>
);

export default RadioButtons;
