/* TODO: Need to find a way to import remote .MDX
files then clean this code + CodePreview folder
If you're reading this it's a work in progress don't judge me */

// import { useEffect, useState, Fragment } from "react";
import { SandpackSetup } from "@codesandbox/sandpack-react";
// import rehypeMetaAsAttributes from "./rehype-meta-as-attributes";
// import * as reactRuntime from "react/jsx-runtime.js";
// import { RunnerOptions } from "@mdx-js/mdx/lib/util/resolve-evaluate-options";
// import { compile, run } from "@mdx-js/mdx";
import { MDXProvider } from "@mdx-js/react";
import { CodePreview } from "..";
import SandPackMarkdown from "Main/pages/BlogArticle/SandPackContent.mdx";

import "./Sandpack.scss";

const Sandpack = ({
  markdown,
  setup,
}: {
  markdown: string;
  setup: SandpackSetup;
}) => {
  // const [mdxModule, setMdxModule] = useState<any | null>(null);
  // const SandpackContent = mdxModule?.default || Fragment;

  // useEffect(() => {
  //   const runtime = reactRuntime as RunnerOptions;

  //   const compileCode = async () =>
  //     String(
  //       await compile(markdown, {
  //         outputFormat: "function-body",
  //         // rehypePlugins: [rehypeMetaAsAttributes],
  //         format: "mdx",
  //         // jsx: true,
  //         // jsxRuntime: "classic",
  //         // jsxImportSource: "@mdx-js/react",
  //         // useDynamicImport: true,
  //       })
  //     );

  //   compileCode().then(async (compiledCode) => {
  //     console.log(compiledCode);
  //     setMdxModule(await run(compiledCode, runtime));
  //   });
  // }, [markdown]);

  // if (!mdxModule || !mdxModule.default) {
  //   return null;
  // }

  return (
    <MDXProvider
      components={{
        wrapper: (p) => <CodePreview setup={setup} {...p} />,
        pre: (p) => <pre {...p} />,
        code: (p) => <code {...p} />,
      }}
    >
      <SandPackMarkdown />
    </MDXProvider>
  );
};

export default Sandpack;
