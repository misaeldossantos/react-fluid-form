import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser'
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import dts from "rollup-plugin-dts";

const production = !process.env.ROLLUP_WATCH

const PACKAGE_ROOT_PATH = process.cwd()
const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH } = process.env

const pkg = require(PACKAGE_ROOT_PATH + "/package.json")

export default {
  input: `${PACKAGE_ROOT_PATH}/index.ts`,
  external: [
    "react",
    /node_modules/,
    ...Object.keys(pkg.peerDependencies || {})
  ],
  sourceMap: 'inline',
  output: [
    {
      file: `bundle.cjs.js`,
      format: 'cjs',
    },
    {
      file: 'bundle.esm.js',
      format: 'esm'
    },
    {
      name: LERNA_PACKAGE_NAME,
      file: 'bundle.umd.js',
      format: 'umd',
      sourcemap: true
    }
  ],
  plugins: [
    commonjs(),
    external(),
    nodeResolve(),
    typescript({
      tsconfig: `${LERNA_ROOT_PATH}/tsconfig.json`
    }),
    babel({
      exclude: 'node_modules/**',
      rootMode: 'upward',
      babelHelpers: 'runtime'
    }),
    production && terser(),
  ]
}