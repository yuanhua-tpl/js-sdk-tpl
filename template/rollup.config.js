/**
 * 声明rollop配置文件
 * [文档]：
 * 1、https://www.rollupjs.com/guide/command-line-reference/#%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6configuration-files
 */

import nodeResolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
// https://github.com/TrySound/rollup-plugin-terser
import { terser } from "rollup-plugin-terser";
import nodePolyfills from "rollup-plugin-node-polyfills";
import builtins from "rollup-plugin-node-builtins";

const isProduction = process.env.NODE_ENV === "production";

export default {
  input: 'src/index.js',
  output: {
    file: `dist/{{name}}.js`,
    name: "{{name}}",
    format: "umd",
    sourcemap: true,
    globals: {
    },
  },
  watch: {
    include: "src/**"
  },
  plugins: [
    nodeResolve({
      // https://github.com/allex/rollup-plugin-node-resolve
      preferBuiltins: true // 显示配置，不写有警告！
    }),
    babel({
      // https://www.babeljs.cn/docs/usage
      exclude: "**/node_modules/**",
      babelHelpers: "runtime"
    }),
    commonjs(),
    json(),
    isProduction && terser(),
    nodePolyfills(),
    builtins()
  ],
  // 作为外部依赖
  external: [
  ],
};
