import { Children, ReactNode, ReactElement } from "react";
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

import "./CodePreview.scss";

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

type CodePreviewProps = {
  children: ReactNode;
  setup?: SandpackSetup;
  template?: "react-ts" | "react";
};

const CodePreview = ({
  children,
  setup,
  template = "react-ts",
}: CodePreviewProps) => {
  const codeSnippets = Children.toArray(children) as ReactElement[];

  const files = codeSnippets.reduce(
    (result: Record<string, SandpackFile>, codeSnippet: ReactElement) => {
      if (codeSnippet.props.mdxType !== "pre") {
        return result;
      }
      const { props } = codeSnippet.props.children;
      const { metastring, className } = props;
      const match = /language-(\w+)/.exec(className || "");
      const language = match && match[1];

      let filePath; // path in the folder structure
      let fileHidden = false; // if the file is available as a tab
      let fileActive = false; // if the file tab is shown by default

      if (metastring) {
        const [name, ...params] = metastring.split(" ");
        filePath = "/" + name;
        if (params.includes("hidden")) {
          fileHidden = true;
        }
        if (params.includes("active")) {
          fileActive = true;
        }
      } else {
        if (className === "language-jsx" || className === "language-tsx") {
          filePath = `/App.${language}`;
        } else if (
          className === "language-css" ||
          className === "language-scss"
        ) {
          filePath = `/styles.${language}`;
        } else {
          throw new Error(
            `Code block is missing a filename: ${props.children}`
          );
        }
      }
      if (result[filePath]) {
        throw new Error(
          `File ${filePath} was defined multiple times. Each file snippet should have a unique path name`
        );
      }
      result[filePath] = {
        code: props.children as string,
        hidden: fileHidden,
        active: fileActive,
      };

      return result;
    },
    {}
  );

  return (
    <>
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
    </>
  );
};

export default CodePreview;
