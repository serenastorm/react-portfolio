import { configureStore } from "@reduxjs/toolkit";
import caseStudyCompletedSectionsReducer from "./caseStudyCompletedSectionsReducer";
import caseStudySliderDirectionReducer from "./caseStudySliderDirectionReducer";

export default configureStore({
  reducer: {
    caseStudyCompletedSections: caseStudyCompletedSectionsReducer,
    caseStudySliderDirection: caseStudySliderDirectionReducer,
  },
});
