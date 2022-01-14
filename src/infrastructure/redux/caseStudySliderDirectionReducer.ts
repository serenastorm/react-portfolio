import { createSlice } from "@reduxjs/toolkit";

type SliderDirection = "left" | "right";

export const caseStudySliderDirectionSlice = createSlice({
  name: "caseStudySliderDirection",
  initialState: {
    value: "right" as SliderDirection,
  },
  reducers: {
    updateDirection: (state, action: { payload: SliderDirection }) => {
      const newScrollDirection = action.payload;
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = newScrollDirection;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateDirection } = caseStudySliderDirectionSlice.actions;

export default caseStudySliderDirectionSlice.reducer;
