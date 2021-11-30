import { CSSProperties, Dispatch, ReactNode, SetStateAction } from "react";
import { TabProps } from "./types";

import "./Tabs.scss";

type TabsProps = {
  children: ReactNode;
  currentTab: TabProps;
  tabs: TabProps[];
  setTab: Dispatch<SetStateAction<TabProps>>;
};

const Tabs = ({ children, currentTab, tabs, setTab }: TabsProps) => {
  const currentTabIndex = tabs.findIndex(
    (tab) => tab.value === currentTab.value
  );

  return (
    <>
      <div
        className={`tabs tabs-activeTab-${currentTabIndex + 1}`}
        role="tablist"
        style={{ "--total-tabs": tabs.length } as CSSProperties}
      >
        {tabs.map((tab) => (
          <button
            role="tab"
            key={tab.value}
            aria-controls={`${tab.value}-tab`}
            id={tab.value}
            aria-selected={tab.value === currentTab.value ? "true" : "false"}
            onClick={() => setTab(tab)}
            onFocus={() => setTab(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div
        role="tabpanel"
        id={`${currentTab.value}-tab`}
        aria-labelledby={currentTab.value}
      >
        {children}
      </div>
    </>
  );
};

export default Tabs;
