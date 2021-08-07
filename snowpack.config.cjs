"use strict";

/** @type {import("snowpack").SnowpackUserConfig} */
module.exports = {
  mount: {
    assets: {
      url: "/assets",
    },
    public: {
      url: "/",
    },
    src: {
      url: "/dist",
    },
  },
  optimize: {
    minify: true,
    preload: true,
    treeshake: true,
  },
  plugins: [
    //
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-typescript",
  ],
};
