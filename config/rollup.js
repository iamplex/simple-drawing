// import noderesolve from 'rollup-plugin-node-resolve'
// import commonjs from 'rollup-plugin-commonjs'
// import buble from 'rollup-plugin-buble'
import { uglify } from 'rollup-plugin-uglify'
import sourcemaps from 'rollup-plugin-sourcemaps'

export default {
  input: 'build/index.js',
  output: {
    file: 'build/sd.js',
    format: 'es',
    name: 'sd',
    sourcemap: true,
  },
  plugins: [uglify(), sourcemaps()],
}
