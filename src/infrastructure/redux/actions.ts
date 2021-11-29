export const updateLandingSection = (newCompletedSections: number[]) => ({
  type: "UPDATE_COMPLETED_SECTIONS",
  completedSections: newCompletedSections,
});
