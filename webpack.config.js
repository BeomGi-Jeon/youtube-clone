const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const BASE_JS = "./src/client/js/";

module.exports = {
  entry: {
    header: BASE_JS + "header.js",
    pre: BASE_JS + "pre.js",
    base: BASE_JS + "base.js",
    videoPlayer: BASE_JS + "videoPlayer.js",
    commentSection: BASE_JS + "commentSection.js",
    thumbnail: BASE_JS + "thumbnail.js",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/styles.css",
    }),
  ],
  output: {
    filename: "js/[name].js",
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", {
          loader: "sass-loader",
          options: {
            sassOptions: {
              // Deprecated legacy-js-api 경고 차단
              silenceDeprecations: ['legacy-js-api'],
            },
          },
        },],
      },
    ],
  },
};