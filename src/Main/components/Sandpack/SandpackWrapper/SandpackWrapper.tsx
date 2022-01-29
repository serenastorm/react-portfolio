import {
  useEffect,
  useState,
  useRef,
  MutableRefObject,
  SetStateAction,
  Dispatch,
  CSSProperties,
} from "react";
import {
  SandpackProvider,
  SandpackThemeProvider,
  SandpackFile,
  FileTabs,
  SandpackSetup,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useActiveCode,
  useSandpackNavigation,
  UnstyledOpenInCodeSandboxButton,
} from "@codesandbox/sandpack-react";
import "@codesandbox/sandpack-react/dist/index.css";
import scrollIntoView from "scroll-into-view-if-needed";
import { ActionIcons } from "CaseStudy/assets/DesignSystem/Icons/Actions";
import { ExpandIcon } from "CaseStudy/assets/Icons/Actions";
import { CodeSnippetProps } from "../types";

import "./SandpackWrapper.scss";

type SandPackExpandButtonProps = {
  buttonContainerHeight: number;
  codeEditorRef: MutableRefObject<HTMLDivElement | null>;
  codeEditorHeight: string;
  setCodeEditorHeight: Dispatch<SetStateAction<string>>;
  scrollContainerInView: () => void;
};

const SandPackExpandButton = ({
  buttonContainerHeight,
  codeEditorRef,
  codeEditorHeight,
  setCodeEditorHeight,
  scrollContainerInView,
}: SandPackExpandButtonProps) => {
  const [codeEditorHeightInPixels, setCodeEditorHeightInPixels] =
    useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { code } = useActiveCode();
  const totalLines = code.split(/\r\n|\r|\n/).length;
  const lineHeight = 25;
  const visibleLines =
    (codeEditorHeightInPixels - buttonContainerHeight) / lineHeight;

  useEffect(() => {
    if (codeEditorRef?.current) {
      const codeEditorBoundingValues =
        codeEditorRef.current.getBoundingClientRect();
      const { height } = codeEditorBoundingValues;

      setCodeEditorHeightInPixels(height);
    }
  }, [codeEditorHeight, codeEditorRef, code]);

  if (
    codeEditorHeightInPixels === 0 ||
    (totalLines < visibleLines && !isExpanded)
  ) {
    return null;
  }

  return (
    <div className="sp-customExpand">
      <button
        className="sp-customBtn"
        onClick={() => {
          if (isExpanded) {
            setIsExpanded(false);
            setCodeEditorHeight("var(--sp-layout-height)");
            scrollContainerInView();
          } else {
            setIsExpanded(true);
            setCodeEditorHeight("max-content");
          }
        }}
      >
        <ExpandIcon direction={isExpanded ? "up" : "down"} />
        {isExpanded ? "Show less" : "Show more"}
      </button>
    </div>
  );
};

const SandPackNavigation = () => {
  const { refresh } = useSandpackNavigation();

  return (
    <div className="sp-customNav">
      <FileTabs />
      <div className="sp-customNavBtns">
        <button
          type="button"
          onClick={() => refresh()}
          className="sp-customBtn"
        >
          <ActionIcons.Reload />
          Refresh
        </button>
        <UnstyledOpenInCodeSandboxButton className="sp-customBtn">
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
  const [codeEditorHeight, setCodeEditorHeight] = useState<string>(
    "var(--sp-layout-height)"
  );
  const containerRef = useRef<HTMLDivElement | null>(null);
  const codeEditorRef = useRef<HTMLDivElement | null>(null);
  const buttonContainerHeight = 42;

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

  const scrollContainerInView = () => {
    if (containerRef?.current) {
      // TODO: Pretty sure this isn't working because of framer-motion
      scrollIntoView(containerRef.current, {
        scrollMode: "if-needed",
        block: "nearest",
        inline: "nearest",
      });
    }
  };

  return (
    <div
      ref={containerRef}
      style={
        {
          "--sp-expand-height": `${buttonContainerHeight / 10}rem`,
        } as CSSProperties
      }
    >
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
          <div ref={codeEditorRef} style={{ position: "relative" }}>
            <SandpackLayout>
              <SandpackCodeEditor
                showTabs={false}
                showInlineErrors
                showLineNumbers
                wrapContent={false}
                customStyle={{
                  height: codeEditorHeight,
                }}
              />
              <SandpackPreview
                showOpenInCodeSandbox={false}
                showRefreshButton={false}
                customStyle={{
                  height: "auto",
                }}
              />
            </SandpackLayout>
            <SandPackExpandButton
              buttonContainerHeight={buttonContainerHeight}
              codeEditorRef={codeEditorRef}
              codeEditorHeight={codeEditorHeight}
              setCodeEditorHeight={setCodeEditorHeight}
              scrollContainerInView={scrollContainerInView}
            />
          </div>
        </SandpackThemeProvider>
      </SandpackProvider>
    </div>
  );
};

export default SandpackWrapper;
