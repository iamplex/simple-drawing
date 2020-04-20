import { eslint } from 'rollup-plugin-eslint'
import typescript from 'rollup-plugin-typescript2'
import { terser } from 'rollup-plugin-terser'

export default {
  input: 'src/index.ts',
  output: {
    file: 'build/sd.js',
    format: 'esm',
  },
  plugins: [
    eslint({
      throwOnWarning: true,
      throwOnError: true,
    }),

    typescript({
      tsconfig: 'tsconfig.json',
    }),

    terser(),
  ],
}
