import { CheckBoxFieldProps } from "../types";

import "./CheckBox.scss";

const CheckBox = ({
  label,
  name,
  isChecked,
  setFieldValue,
}: CheckBoxFieldProps) => (
  <label className="checkbox-container">
    {label}
    <input
      type="checkbox"
      name={name}
      id={name}
      value={name}
      checked={isChecked}
      onChange={(e) => setFieldValue(e.target.checked)}
    />
    <span className="checkbox-checkmark" />
  </label>
);

export default CheckBox;
