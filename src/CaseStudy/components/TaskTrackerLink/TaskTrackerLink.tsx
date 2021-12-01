import { SpeechBubbleIcon } from "CaseStudy/assets/Icons/Signs";
import { Tips } from "CaseStudy/components";
import { NewTabLink } from "Main/components";

const TaskTrackerLink = () => {
  return (
    <Tips
      title="By the way..."
      icon={<SpeechBubbleIcon />}
      copy={
        <>
          This project isn't completely finished, so you might encounter a few
          bugs and some styling issues. I'm keeping track of them in{" "}
          <NewTabLink
            copy="this
              Trello board"
            to="https://trello.com/b/hAGIHvhY/tasks"
            shouldOpenInNewTab
          />
        </>
      }
    />
  );
};

export default TaskTrackerLink;
