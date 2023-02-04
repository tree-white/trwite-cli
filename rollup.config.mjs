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
      // 如果需要 umd 支持，请配置 name 以便在全局支持使用
      { file: fullPath('js'), format: 'umd', name: '{{ projectName }}' }
    ],
    plugins: [ts()]
  },
  {
    input: 'src/types/index.ts',
    output: [{ file: fullPath('d.ts'), format: 'es' }],
    plugins: [dts()]
  }
]
