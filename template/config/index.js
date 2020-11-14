"use strict";

const path = require("path");
const cwd = process.cwd();
const pkg = require("../package.json");

// 版本号
const SDK_VERSION = pkg.version;

const entry = {
  "{{name}}": "./src/index.js",
}

// 文件路径
const filePath = {
  root: cwd,
  src: `${cwd}/src/`,
  dist: `${cwd}/dist/`, // dist 目录
  config: `${cwd}/config/` // config 目录
};

// 生产配置
const build = {
  // Paths
  assetsRoot: path.resolve(__dirname, '../dist'),
  assetsSubDirectory: 'static',
}


module.exports = {
  SDK_VERSION,
  filePath,
  entry,
  build
};
