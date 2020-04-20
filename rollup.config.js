import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/sd.js',
    format: 'esm',
  },

  plugins: [
    typescript({
      tsconfig: 'tsconfig.json',
    }),

    terser(),
  ],
}
