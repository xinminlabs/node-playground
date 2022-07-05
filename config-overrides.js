const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");

module.exports = function override(config, environment) {
  config.plugins = [
    ...config.plugins,
    new MonacoWebpackPlugin({
      languages: ["javascript", "typescript"],
    }),
  ];

  return config;
};
