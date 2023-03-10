#!/usr/bin/env node

import { program } from 'commander'
import download from 'download-git-repo'
import inquirer from 'inquirer'
import ora from 'ora'
import chalk from 'chalk'
import * as _ from './utils.js'
import { exec } from 'child_process'
import fs from 'fs'

// 使用 Node 开发命令行工具所执行的 JavaScript 脚本必须在顶部加入 #!/usr/bin/env node 声明

const TEMPLATES = {
  'rollup+ts': {
    repository: 'github:tree-white/trwite-cli#rollup+ts',
    description: '初始Rollup打包工具 + TS超集 项目模版,主要用于开发组件/依赖库',
    replacePath: ['package.json', 'dome.html', 'rollup.config.mjs']
  },
  nestjs: {
    repository: 'github:tree-white/trwite-cli#nestjs',
    description: 'NestJs + TS + MySql 初始包',
    replacePath: ['package.json']
  }
}
const COMMAND = {
  npm: { install: 'npm install' },
  yarn: { install: 'yarn' },
  pnpm: { install: 'pnpm install' }
}

// 1. 获取用户输入命令
// 使用 commander 第三方库事项命令行管理
program.description('Trwite前端脚手架').version('0.1.0')

// 创建项目指令
program
  .command('create')
  .description('初始化模版')
  .action(async () => {
    try {
      // 1. 交互
      const answers = await inquirer.prompt([
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
        { type: 'input', name: 'author', message: '请输入作者名称', default: 'Trwite <trwite@126.com>' },
        { type: 'list', name: 'manage', message: '请选择初始化工具', choices: ['npm', 'yarn', 'pnpm'], default: 'npm' }
      ])

      const { templateName, projectName, manage } = answers
      const { repository, replacePath } = TEMPLATES[templateName]
      const initial = ora(_.Text('开始下载模版中...', 'yellowBright,bold')).start()

      download(repository, projectName, { clone: true }, async downloadFail => {
        if (downloadFail) {
          initial.fail(chalk.redBright(_.Text(`模版下载失败 => ${downloadFail.message}`, 'redBright'))) // 下载失败提示
          return
        }

        _.replaceValue(
          replacePath.map(path => `${projectName}/${path}`),
          answers
        )

        initial.succeed(_.Text('模版下载成功', 'greenBright'))

        const installBundles = ora(_.Text('安装依赖中...', 'blue,bold')).start()
        const { install } = COMMAND[manage]
        const { status } = await execSync(`cd ${projectName} && ${install}`)
        if (!status) {
          installBundles.fail(_.Text('依赖安装失败,请手动执行:', 'redBright,bold'))
          console.log('')
          console.log(_.Tip(`cd ${projectName}`))
          console.log(_.Tip(install))
          return
        }
        installBundles.succeed(_.Text('项目初始化成功', 'greenBright,bold'))
      })
    } catch (error) {
      console.log('>>>>>> 错误了=>', error)
    }
  })

// 查看模版列表指令
program
  .command('list')
  .description('列出所有可用模版')
  .action(async () => {
    console.log('')
    console.log(_.Tip('可选模版 ↓', 'greenBright'))

    const spacing = 30
    Object.entries(TEMPLATES).forEach(([name, data]) => {
      const space = name.length >= spacing ? 5 : spacing - name.length
      console.log(
        _.Tip(`${name}${_.space(space)}${_.Text(data.description, 'greenBright')}`, 'blueBright,bold', 'success')
      )
    })
  })

// 把项目绑定到示例代码上
program
  .command('bind')
  .description('把项目绑定到示例代码上')
  .action(async () => {
    const { bind } = await inquirer.prompt([
      { type: 'confirm', name: 'bind', message: _.Text('是否将当前项目绑定至"TrwiteCli"上?') }
    ])
    if (!bind) return

    const file = fs.readFileSync('package.json', 'utf-8')
    console.log('>>>>>> file=>', file)
  })
program.parse()

/**
 * 同步执行命令
 * @param {string} command
 * @returns {{status: 0 | 1, data: any}}
 */
async function execSync(command) {
  return new Promise(resolve => {
    exec.call(this, command, (error, stdout, stderr) => {
      const status = +!(error || stderr)
      resolve({ status, data: status ? stdout : (error || stderr).message })
    })
  })
}
