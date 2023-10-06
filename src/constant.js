export const TEMPLATES = {
  'rollup+ts': {
    repository: 'github:tree-white/trwite-cli#rollup+ts',
    description: '初始Rollup打包工具 + TS超集 项目模版,主要用于开发组件/依赖库',
    replacePath: ['package.json', 'dome.html', 'rollup.config.mjs']
  },
  nestjs: {
    repository: 'github:tree-white/trwite-cli#nestjs',
    description: 'NestJs + TS + MySql 初始包',
    replacePath: ['package.json']
  },
  'uniapp+vue3+ts': {
    repository: 'github:tree-white/trwite-cli#uniapp-vue3-ts',
    description: 'uni-app + Vue3 + TS 初始包，已规加入规范化配件',
    replacePath: ['package.json']
  },
  'vue3+vite+ts': {
    repository: 'github:tree-white/trwite-cli#vue3+ts',
    description: 'Vue3 + Vite + TS 初始包, 已加入规范化配件',
    replacePath: ['package.json']
  }
}

export const COMMAND = {
  npm: { install: 'npm install' },
  yarn: { install: 'yarn' },
  pnpm: { install: 'pnpm install' }
}
