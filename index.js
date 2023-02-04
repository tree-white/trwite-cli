#!/usr/bin/env node

import { program } from 'commander'
import download from 'download-git-repo'
import handlebars from 'handlebars'
import inquirer from 'inquirer'
import fs from 'fs'
import ora from 'ora'
import chalk from 'chalk'
import * as _ from './utils.js'
import logSymbols from 'log-symbols'

// 使用 Node 开发命令行工具所执行的 JavaScript 脚本必须在顶部加入 #!/usr/bin/env node 声明

const TEMPLATES = {
  'rollup+ts': {
    github: 'github:tree-white/trwite-cli#rollup+ts',
    description: '初始Rollup打包工具 + TS超集 项目模版,主要用于开发组件/依赖库'
  },
  'vue3+ts+vite': {
    github: 'https://github.com:tree-white/trwite-cli#rollup+ts',
    description: '初始Rollup打包工具 + TS超集 项目模版,主要用于开发组件/依赖库'
  }
}

// 1. 获取用户输入命令
// 使用 commander 第三方库事项命令行管理
program.description('Trwite前端脚手架').version('0.1.0')

// 创建项目指令
program
  .command('create')
  .description('初始化模版')
  .action(() => {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'templateName',
          message: '请选择模版',
          choices: Object.entries(TEMPLATES).map(([name]) => name)
        },
        {
          type: 'input',
          name: 'projectName',
          message: '请输入项目名称',
          validate: input => !!input || `项目名称必填 ${_.Text('(Control+C|Ctrl+C)', 'red,bold')} 可退出创建`
        },
        {
          type: 'input',
          name: 'description',
          message: '请输入简介',
          default: ({ projectName }) => `${projectName}的简介`
        },
        { type: 'input', name: 'author', message: '请输入作者名称', default: 'Trwite <trwite@126.com>' }
      ])
      .then(({ templateName, projectName }) => {
        const { github } = TEMPLATES[templateName]
        const spinner = ora(_.Text('开始下载模版中...', 'yellowBright,bold')).start()
        download(github, projectName, { clone: true }, downloadFail => {
          if (downloadFail) {
            spinner.fail(chalk.redBright(`模版下载失败 => ${downloadFail.message}`)) // 下载失败提示
            return
          }

          // 用户输入的数据解析替换到 package.json 文件中
          const packagePath = `${projectName}/package.json`
          const packageContent = fs.readFileSync(packagePath, 'utf8')
          const packageResult = handlebars.compile(packageContent)(answers)
          console.log('>>>>>> packageResult=>', packageResult)
          fs.writeFileSync(packagePath, packageResult)

          spinner.succeed('项目初始化成功')
        })
      })
      .catch(error => {
        console.log('>>>>>> 错误了=>', error)
      })

    // 使用 ora 做命令行 loading 效果
    // const spinner = ora(chalk.yellowBright('正在下载模版中...')).start()
    // download(downloadUrl, projectName, { clone: true }, err => {
    //   if (err) {
    //     spinner.fail(chalk.redBright('模版下载失败')) // 下载失败提示
    //     return
    //   }
    //   spinner.succeed(chalk.greenBright('模版下成功')) // 下载成功提示
    //   // 读取 package.json 读取出来 并修改动态值
    //   inquirer
    //     .prompt([
    //       { type: 'input', name: 'name', message: '请输入项目名称' },
    //       { type: 'input', name: 'description', message: '请输入简介' },
    //       { type: 'input', name: 'author', message: '请输入作者名称' }
    //     ])
    //     .then(answers => {
    //       console.log('>>>>>> answers=>', answers)
    //       // 用户输入的数据解析替换到 package.json 文件中
    //       const packagePath = `${projectName}/package.json`
    //       const packageContent = fs.readFileSync(packagePath, 'utf8')
    //       const packageResult = handlebars.compile(packageContent)(answers)
    //       console.log('>>>>>> packageResult=>', packageResult)
    //       fs.writeFileSync(packagePath, packageResult)
    //       console.log('初始化模版成功')
    //     })
    //     .catch(error => {
    //       console.log('>>>>>> error=>', error)
    //     })
    // })
  })

// 查看模版列表指令
program
  .command('list')
  .description('列出所有可用模版')
  .action(() => {
    console.log(_.Tip('可选模版 ↓', 'greenBright'))
    Object.entries(TEMPLATES).forEach(([name, data]) => {
      console.log(_.Text(name, 'blueBright,bold', 'success'), _.space(10), data.description)
    })
  })

program.parse()
