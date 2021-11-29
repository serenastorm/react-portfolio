import { Dispatch, SetStateAction } from "react";

import "./Switch.scss";

type SwitchProps = {
  isChecked: boolean;
  setIsChecked: Dispatch<SetStateAction<boolean>>;
};

const Switch = ({ isChecked, setIsChecked }: SwitchProps) => {
  return (
    <div className="form-switch">
      <input
        name="isHighContrastMode"
        id="isHighContrastMode"
        type="checkbox"
        className="form-switch-input"
        checked={isChecked}
        onChange={(event) => setIsChecked(event.target.checked)}
      />
      <label htmlFor="isHighContrastMode" className="form-switch-label">
        High contrast mode
      </label>
    </div>
  );
};

export default Switch;
