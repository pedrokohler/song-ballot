const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const paths = require("./paths");

module.exports = {
  /**
   * Entry
   *
   * The first place Webpack looks to start building the bundle.
   */
  entry: [`${paths.src}/index.js`],
  node: {
    fs: "empty",
  },

  /**
   * Output
   *
   * Where Webpack outputs the assets and bundles.
   */
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  /**
   * Plugins
   *
   * Customize the Webpack build process.
   */
  plugins: [
    /**
     * CleanWebpackPlugin
     *
     * Removes/cleans build folders and unused assets when rebuilding.
     */
    new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ["**/*", "!.git"] }),

    /**
     * CopyWebpackPlugin
     *
     * Copies files from target to destination folder.
     */
    new CopyWebpackPlugin([
      {
        from: paths.static,
        to: "assets",
        ignore: ["*.DS_Store"],
      },
    ]),

    /**
     * HtmlWebpackPlugin
     *
     * Generates an HTML file from a template.
     */
    new HtmlWebpackPlugin({
      title: "Song Ballot",
      favicon: `${paths.static}/favicon.png`,
      template: `${paths.src}/template.html`, // template file
      filename: "index.html", // output file
    }),
    new HtmlWebpackPlugin({
      title: "Song Ballot",
      favicon: `${paths.static}/favicon.png`,
      template: `${paths.src}/404.html`, // template file
      filename: "404.html", // output file
      chunks: [],
    }),
  ],

  /**
   * Module
   *
   * Determine how modules within the project are treated.
   */
  module: {
    rules: [
      /**
       * JavaScript
       *
       * Use Babel to transpile JavaScript files.
       */
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"],
      },

      /**
       * Styles
       *
       * Inject CSS into the head with source maps.
       */
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          { loader: "css-loader", options: { sourceMap: true, importLoaders: 1 } },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },

      /**
       * Images
       *
       * Copy image files to build folder.
       */
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|webp|svg)$/i,
        loader: "file-loader",
        options: {
          name: "[path][name].[ext]",
          context: "src", // prevent display of src/ in filename
        },
      },

      /**
       * Fonts
       *
       * Inline font files.
       */
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: "[path][name].[ext]",
          context: "src", // prevent display of src/ in filename
        },
      },
    ],
  },
};