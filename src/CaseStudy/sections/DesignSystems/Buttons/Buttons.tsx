import { useState } from "react";
import { motion } from "framer-motion";
import { ConfirmIcon } from "CaseStudy/assets/Icons/Actions";
import { RadioButtons, CheckBox } from "CaseStudy/components/Form";
import {
  CornerOptions,
  VariantOptions,
  SizeOptions,
  InteractionOptions,
} from "./constants";
import { scrollAnimationVariants } from "helpers/animations";

import "./Buttons.scss";

const Buttons = () => {
  const [selectedVariant, setSelectedVariant] = useState<string>("primary");
  const [selectedSize, setSelectedSize] = useState<string>("sm");
  const [selectedCornerType, setSelectedCornerType] =
    useState<string>("default");
  const [showIcon, setShowIcon] = useState<boolean>(true);
  const [selectedInteraction, setSelectedInteraction] =
    useState<string>("none");

  const buttonClassNames = `button ${`button-${selectedSize}`}${
    selectedInteraction !== "none" ? ` button-${selectedInteraction}` : ""
  }${selectedCornerType === "round" ? ` button-pill` : ""}`;

  const buttonAriaProps = {
    tabIndex: -1,
  };

  const renderButtonContent = () => (
    <>
      {showIcon && <ConfirmIcon />}
      Save changes
    </>
  );

  return (
    <>
      <div className="designSystem-section">
        <motion.form
          id="buttonsForm"
          variants={scrollAnimationVariants({ delay: 0.5 })}
        >
          <CheckBox
            name="icon"
            label="With icon"
            isChecked={showIcon}
            setFieldValue={setShowIcon}
          />
          <RadioButtons
            name="variant"
            label="Variants"
            value={selectedVariant}
            options={VariantOptions}
            setFieldValue={setSelectedVariant}
          />
          <RadioButtons
            name="size"
            label="Size"
            value={selectedSize}
            options={SizeOptions}
            setFieldValue={setSelectedSize}
          />
          <RadioButtons
            name="cornerType"
            label="Corners"
            value={selectedCornerType}
            options={CornerOptions}
            setFieldValue={setSelectedCornerType}
          />
          <RadioButtons
            name="interaction"
            label="Interaction"
            value={selectedInteraction}
            options={InteractionOptions}
            setFieldValue={setSelectedInteraction}
          />
        </motion.form>
        <motion.output
          className="designSystem-preview designSystem-preview-buttons"
          form="buttonsForm"
          variants={scrollAnimationVariants({})}
          data-content={selectedVariant === "primary" ? "lg" : "sm"}
        >
          <button
            className={`${buttonClassNames} ${`button-${selectedVariant}`}`}
            data-caption="Primary action"
            {...buttonAriaProps}
          >
            {renderButtonContent()}
          </button>
          {(selectedVariant === "primary" || selectedVariant === "danger") && (
            <button
              className={`${buttonClassNames} ${`button-${selectedVariant}-light`}`}
              data-caption="Secondary action"
              {...buttonAriaProps}
            >
              {renderButtonContent()}
            </button>
          )}
          {(selectedVariant === "primary" || selectedVariant === "dark") && (
            <button
              className={`${buttonClassNames} ${`button-outline-${selectedVariant}`}`}
              data-caption="Secondary action"
              {...buttonAriaProps}
            >
              {renderButtonContent()}
            </button>
          )}
        </motion.output>
      </div>
    </>
  );
};

export default Buttons;
