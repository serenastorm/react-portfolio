import { Dispatch, SetStateAction } from "react";

export type SingleFieldProps = {
  label: string;
  value: string;
};

export type FieldsetProps = {
  label: string;
  name: string;
};

export interface RadioButtonsFieldProps extends FieldsetProps {
  options: SingleFieldProps[];
  value: string;
  setFieldValue: Dispatch<SetStateAction<string>>;
}

export interface CheckBoxFieldProps extends FieldsetProps {
  isChecked: boolean;
  setFieldValue: Dispatch<SetStateAction<boolean>>;
}
