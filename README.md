# UniApp + Vue3 + TS

## 介绍

- 基于 vue3 + typescript + vite + uniapp 开发
- 使用 eslint + prettier + husky + lint-staged 进行代码检查
- 使用 commitlint 限制提交要求，并加入 commitizen 规范提交信息以及引导

## 安装

```bash
pnpm install

# 运行微信小程序，请先配置微信ID
pnpm dev:mp-weixin

# 运行 H5，请先配置 H5 环境
pnpm dev:h5

# 安卓IOS真机调试需要使用 HBuilder 工具进行
```

## 使用

由于使用了提交规范约束，在 `git add .` 后准备提交的时候，请采用 `pnpm cz` 来执行提交
