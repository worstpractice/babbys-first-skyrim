"use strict";

/** @type {import("snowpack").SnowpackUserConfig} */
module.exports = {
  buildOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
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
    /* Example: Bundle your final build: */
    // "bundle": true,
  },
  packageOptions: {
    /* ... */
  },
  plugins: [
    //
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-typescript",
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
};
