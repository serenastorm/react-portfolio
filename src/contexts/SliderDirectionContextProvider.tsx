import { createContext, useContext, ReactNode } from "react";

type SliderDirection = "left" | "right";

const SliderDirectionContext = createContext<SliderDirection>("right");

const SliderDirectionContextProvider = ({
  children,
  value,
}: {
  children: ReactNode;
  value: SliderDirection;
}) => {
  return (
    <SliderDirectionContext.Provider value={value}>
      {children}
    </SliderDirectionContext.Provider>
  );
};

const useSliderDirectionContext = () => {
  const context = useContext(SliderDirectionContext);
  if (context === undefined) {
    throw new Error(
      "useSliderDirectionContext must be used within a SliderDirectionContextProvider"
    );
  }
  return context;
};

export { SliderDirectionContextProvider, useSliderDirectionContext };
