import ts from 'rollup-plugin-typescript2'
import dts from 'rollup-plugin-dts'
import path from 'node:path'

const fullPath = suffix => path.resolve(path.resolve(), `./dist/index.${suffix}`)

export default [
  {
    input: 'src/core/index.ts',
    output: [
      { file: fullPath('esm.js'), format: 'es' },
      { file: fullPath('cjs.js'), format: 'cjs' },
      { file: fullPath('js'), format: 'umd', name: "Subscribe" },
    ],
    plugins: [ts()]
  },
  {
    input: 'src/types/index.ts',
    output: [{ file: fullPath('d.ts'), format: 'es' }],
    plugins: [dts()]
  }
]
