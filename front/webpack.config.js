// webpack.config.js
const path = require("path");

module.exports = {
  // entry: "./src/index.tsx", // 번들링 시작 위치
  // output: {
  //   path: path.join(__dirname, "/dist"), // 번들 결과물 위치
  //   filename: "bundle.js",
  // },
  entry: "./src/index.tsx",
  // output: {
  //   path: path.join(__dirname, "/dist"),
  //   filename: "[name].js",
  // },
  module: {
    rules: [
      {
        test: /[\.js]$/, // .js 에 한하여 babel-loader를 이용하여 transpiling
        exclude: /node_module/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.tsx$/, // .ts 에 한하여 ts-loader를 이용하여 transpiling
        exclude: /node_module/,
        use: {
          loader: "ts-loader",
        },
      },
      {
        test: /\.(png|jpg|gif|svg|jpeg)$/, // 확장자가 png, jpg, gif, svg인것에 대해서만 등록
        use: {
          loader: 'file-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  resolve: {
    modules: [path.join(__dirname, "src"), "node_modules"], // 모듈 위치
    extensions: [".js", ".jsx", ".ts", ".tsx", '.css'],
  },
};
