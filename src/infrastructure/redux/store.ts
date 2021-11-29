import { configureStore } from "@reduxjs/toolkit";
import caseStudyCompletedSectionsReducer from "./caseStudyCompletedSectionsReducer";

export default configureStore({
  reducer: {
    caseStudyCompletedSections: caseStudyCompletedSectionsReducer,
  },
});
