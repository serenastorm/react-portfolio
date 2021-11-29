import { createSlice } from "@reduxjs/toolkit";

type CompletedSection = number;
type CompletedSections = CompletedSection[];

export const caseStudyCompletedSectionSlice = createSlice({
  name: "caseStudyCompletedSection",
  initialState: {
    value: [] as CompletedSections,
  },
  reducers: {
    addSection: (state, action: { payload: CompletedSection }) => {
      const currentCompletedSections = state.value;
      const newCompletedSection = action.payload;
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      currentCompletedSections.push(newCompletedSection);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addSection } = caseStudyCompletedSectionSlice.actions;

export default caseStudyCompletedSectionSlice.reducer;
