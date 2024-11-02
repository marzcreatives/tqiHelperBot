module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current", // Adjust according to your target environment
        },
        useBuiltIns: "entry", // Polyfills based on your usage
        corejs: 3, // Specify the core-js version
      },
    ],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-proposal-optional-chaining",
  ],
};
