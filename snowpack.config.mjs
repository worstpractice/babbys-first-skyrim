/** @type {import("snowpack").SnowpackUserConfig} */
export default {
  alias: {
    'src': './src',
  },
  mount: {
    assets: {
      url: '/assets',
    },
    public: {
      url: '/',
    },
    src: {
      url: '/dist',
    },
  },
  plugins: [
    //
    "@snowpack/plugin-react-refresh",
    "@snowpack/plugin-typescript",
  ],
};
