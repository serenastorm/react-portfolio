/* eslint-disable react-hooks/rules-of-hooks */
const {
  override,
  getBabelLoader,
  useBabelRc,
  addWebpackResolve,
} = require("customize-cra");

const ignoreModulesWarnings = (value) => (config) => {
  config.ignoreWarnings = value;
  return config;
};

function supportMdxFiles(config) {
  const babelLoader = getBabelLoader(config);

  config.module.rules.map((rule) => {
    if (typeof rule.test !== "undefined" || typeof rule.oneOf === "undefined") {
      return rule;
    }

    rule.oneOf.unshift({
      test: /\.mdx?$/,
      use: [
        {
          loader: babelLoader.loader,
          options: babelLoader.options,
        },
        {
          loader: "@mdx-js/loader",
          options: { providerImportSource: "@mdx-js/react" },
        },
      ],
    });

    return rule;
  });
  return config;
}

module.exports = override(
  supportMdxFiles,
  ignoreModulesWarnings([/Failed to parse source map/]),
  useBabelRc(),
  addWebpackResolve({
    fallback: {
      url: false,
    },
  })
);
