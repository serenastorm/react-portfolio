import {
  SandpackProvider,
  SandpackThemeProvider,
  SandpackFile,
  FileTabs,
  SandpackSetup,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpackNavigation,
  UnstyledOpenInCodeSandboxButton,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import { ActionIcons } from "CaseStudy/assets/DesignSystem/Icons/Actions";
import { CodeSnippetProps } from "../types";

import "./SandpackWrapper.scss";

const SandPackNavigation = () => {
  const { refresh } = useSandpackNavigation();

  return (
    <div className="sp-customNav">
      <FileTabs />
      <div className="sp-customNavBtns">
        <button
          type="button"
          onClick={() => refresh()}
          className="sp-customNavBtn"
        >
          <ActionIcons.Reload />
          Refresh
        </button>
        <UnstyledOpenInCodeSandboxButton className="sp-customNavBtn">
          <ActionIcons.OpenInNewTab />
          Open CodeSandbox
        </UnstyledOpenInCodeSandboxButton>
      </div>
    </div>
  );
};

type SandpackWrapperProps = {
  setup?: SandpackSetup;
  template?: "react-ts" | "react";
  codeSnippets: CodeSnippetProps[];
};

const SandpackWrapper = ({
  setup,
  template = "react-ts",
  codeSnippets,
}: SandpackWrapperProps) => {
  const files = codeSnippets.reduce(
    (result: Record<string, SandpackFile>, codeSnippet: CodeSnippetProps) => {
      result[codeSnippet.filePath] = {
        code: codeSnippet.code as string,
        hidden: codeSnippet.hidden,
        active: codeSnippet.active,
      };

      return result;
    },
    {}
  );

  return (
    <SandpackProvider
      template={template}
      customSetup={{ ...setup, files: files }}
    >
      <SandpackThemeProvider
        theme={{
          palette: {
            accent: "var(--pink)",
          },
        }}
      >
        <SandPackNavigation />

        <SandpackLayout>
          <SandpackCodeEditor
            showTabs={false}
            showInlineErrors
            showLineNumbers
            wrapContent={false}
          />
          <SandpackPreview
            showOpenInCodeSandbox={false}
            showRefreshButton={false}
          />
        </SandpackLayout>
      </SandpackThemeProvider>
    </SandpackProvider>
  );
};

export default SandpackWrapper;
