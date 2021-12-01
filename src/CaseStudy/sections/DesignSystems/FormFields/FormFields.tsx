import { useState } from "react";
import { motion } from "framer-motion";
import { RadioButtons, CheckBox } from "CaseStudy/components/Form";
import { ShowPasswordIcon } from "CaseStudy/assets/Icons/Actions";
import { LinkIcon } from "CaseStudy/assets/Icons/Signs";
import { TypeOptions, StatusOptions } from "./constants";
import { scrollAnimationVariants } from "helpers/animations";

import "./FormFields.scss";

const FormFields = () => {
  const [isFocused, setIsFocused] = useState<boolean>(true);
  const [selectedType, setSelectedType] = useState<string>("text");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("valid");

  const inputProps = () => {
    switch (selectedType) {
      case "text":
        return {
          label: "Restaurant name",
          placeholder: "Restaurant name",
          error: "Please enter a valid restaurant name.",
        };
      case "password":
        return {
          label: "Password",
          placeholder: "Password",
          error: "Please enter a valid password.",
        };
      case "url":
        return {
          label: "Website URL",
          placeholder: "http://yourwebsite.com",
          error: "Please enter a valid URL.",
        };
      default:
        return {
          label: "Restaurant name",
          placeholder: "Restaurant name",
          error: "Please enter a valid restaurant name.",
        };
    }
  };

  const renderInputValue = () => {
    if (selectedStatus === "empty") {
      return "";
    } else if (selectedStatus === "valid") {
      switch (selectedType) {
        case "text":
          return "My restaurant";
        case "password":
          return "Hey, don't look!";
        case "url":
          return "antonettiserena.com";
      }
    } else {
      switch (selectedType) {
        case "text":
          return "My restaurant ~%00";
        case "password":
          return "Hey, don't look!";
        case "url":
          return "website!,com";
      }
    }
  };

  const renderInput = () => (
    <input
      readOnly
      tabIndex={-1}
      name="formField"
      placeholder={inputProps().placeholder}
      type={selectedType === "password" && !showPassword ? "password" : "text"}
      id="formField"
      className={`form-control ${
        selectedStatus === "invalid" ? "form-control-isInvalid" : ""
      } ${selectedStatus === "empty" ? "form-control-isEmpty" : ""} ${
        isFocused ? "form-control-isFocused" : ""
      }`}
      value={renderInputValue()}
    />
  );

  return (
    <>
      <div className="designSystem-section">
        <motion.output
          className="designSystem-preview designSystem-preview-form"
          form="buttonsForm"
          variants={scrollAnimationVariants({ delay: 0.5 })}
        >
          <div className="form-group">
            <label
              className={`form-label${
                selectedType === "password" ? " form-label-with-content" : ""
              }`}
              htmlFor="formField"
            >
              {inputProps().label}
              {selectedType === "password" && (
                <span className="reset-password">Forgot Password?</span>
              )}
            </label>
            {selectedType === "password" && (
              <div className="input-group-with-append input-group">
                {renderInput()}
                <div className="input-group-append">
                  <button
                    className="button button-form-append"
                    title={`${showPassword ? "Hide" : "Show"} password`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <ShowPasswordIcon isHidden={!showPassword} />
                  </button>
                </div>
              </div>
            )}
            {selectedType === "url" && (
              <div
                className={`input-group-with-prepend input-group ${
                  selectedStatus === "valid"
                    ? "input-group-with-prepend-isValid"
                    : ""
                }`}
              >
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <LinkIcon />
                  </span>
                </div>
                {renderInput()}
              </div>
            )}
            {selectedType === "text" && renderInput()}
            <div
              className="invalid-feedback"
              aria-hidden={selectedStatus === "invalid" ? "false" : "true"}
              style={{ opacity: selectedStatus === "invalid" ? 1 : 0 }}
            >
              {inputProps().error}
            </div>
          </div>
        </motion.output>
        <motion.form id="buttonsForm" variants={scrollAnimationVariants({})}>
          <CheckBox
            name="focused"
            label="Focused"
            isChecked={isFocused}
            setFieldValue={setIsFocused}
          />
          <RadioButtons
            name="type"
            label="Type"
            value={selectedType}
            options={TypeOptions}
            setFieldValue={setSelectedType}
          />
          <RadioButtons
            name="validation"
            label="Validation"
            value={selectedStatus}
            options={StatusOptions}
            setFieldValue={setSelectedStatus}
          />
        </motion.form>
      </div>
    </>
  );
};

export default FormFields;
