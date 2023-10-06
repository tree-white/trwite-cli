#!/usr/bin/env node

import { program } from 'commander'
import download from 'download-git-repo'
import inquirer from 'inquirer'
import ora from 'ora'
import chalk from 'chalk'
import * as _ from './utils.js'
import fs from 'fs'
import { TEMPLATES, COMMAND } from './constant.js'
import figlet from 'figlet'
import path from 'path'
import { readPackageSync } from 'read-pkg'
import { writePackageSync } from 'write-pkg'
import { usePrompter } from './composables/usePrompter.js'
import terminalLink from 'terminal-link'

// 使用 Node 开发命令行工具所执行的 JavaScript 脚本必须在顶部加入 #!/usr/bin/env node 声明

const init = async () => {
  const // 统一常量
    ROOT_PATH = path.join(_.getDirPath(), '..'),
    ROOT_PATH_TEXT = terminalLink('Trwite-Cli', ROOT_PATH),
    PACKAGE_DATA = readPackageSync({ cwd: ROOT_PATH }),
    AUTHOR = `${PACKAGE_DATA.author.name}<${PACKAGE_DATA.author.email}>`,
    AUTHOR_BLOG = terminalLink('作者博客', 'http://bog.treewhite.com')

  console.log('PACKAGE_DATA =>', AUTHOR)

  /**
   * 执行开场白
   * 【参考】https://www.npmjs.com/package/figlet
   */
  const Prologue = figlet.textSync('TreeWhite  CLI', { width: 200, horizontalLayout: 'fitted' })
  console.log(Prologue)

  /**
   * 1. 设置命令帮助提示语
   * @example
   * trwite-cli [-h|--help|help] 一共4种方式
   */
  program
    .description(`TreeWhite CLI 脚手架帮助说明\nCurrent CLI Version: v${PACKAGE_DATA.version}`)
    .version(`TreeWhite CLI Version: v${PACKAGE_DATA.version}`)

  /**
   * 2. 创建项目指令
   * 可以创建初始化模版
   * @example
   * trwite-cli create
   */
  program
    .command('create')
    .description('初始化模版')
    .action(async () => {
      try {
        const promptOptions = [
          {
            type: 'list',
            name: 'manage',
            message: '请选择初始化工具',
            choices: ['npm', 'yarn', 'pnpm'],
            default: 'npm'
          },
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
          { type: 'input', name: 'author', message: '请输入作者名称', default: AUTHOR }
        ]
        // 1. 交互
        const answers = await inquirer.prompt(promptOptions)

        const { templateName, projectName, manage } = answers
        const { repository, replacePath } = TEMPLATES[templateName]
        const pd = usePrompter()

        pd.starting('开始下载模版中...')

        download(repository, projectName, { clone: true }, async downloadFail => {
          if (downloadFail) {
            // 下载失败提示
            pd.failed(`模版下载失败 => ${downloadFail.message}`)
            return
          }

          _.replaceValue(
            replacePath.map(path => `${projectName}/${path}`),
            answers
          )

          pd.succeeded('模版下载成功')

          pd.starting('开始安装依赖中...')
          const { install } = COMMAND[manage]
          const { status } = await _.execSync(`cd ${projectName} && ${install}`)
          if (!status) {
            pd.failed('依赖安装失败,请手动执行:')
            console.log('')
            console.log(_.Tip(`cd ${projectName}`))
            console.log(_.Tip(install))
            return
          }
          pd.succeeded('项目初始化成功')
          console.log('')
          console.log(_.Tip(`cd ${projectName}`))
        })
      } catch (error) {
        console.error('>>>>>> 异常终止=>', error)
      }
    })

  /**
   * 3. 查看模版列表指令
   */
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

  /**
   * 4. 把项目绑定到示例代码上
   */
  program
    .command('bind')
    .description('把项目绑定到示例代码上')
    .action(async () => {
      const branchName = path.basename(process.cwd())

      const answers = await inquirer.prompt([
        { type: 'confirm', name: 'bind', message: _.Text('是否将当前项目绑定至"TrwiteCli"上?') },
        {
          type: 'input',
          name: 'branchName',
          message: _.Text('请输入绑定分支名称'),
          default: branchName,
          validate: input => {
            const isValid = /^[0-9a-z\-_]*$/i.test(input)
            return isValid || '分支名称只能包含数字(0-9)字母(a-zA-Z)横杆(-)下划线(_)'
          }
        }
      ])

      if (!answers.bind) return

      // 获取当前绑定包路径
      const currentPackagePath = path.join(process.cwd(), `package.json`)

      const pt = usePrompter()

      pt.starting('开始初始化绑定配置项...')
      // 配置 package.json 模版
      if (fs.existsSync(currentPackagePath)) {
        pt.starting('找到 Package.json 开始初始化绑定配置项')
        const pkg = readPackageSync({ normalize: false })
        Object.assign(pkg, {
          name: '{{ projectName }}',
          description: '{{ description }}',
          author: '{{ author  }}'
        })
        delete pkg.readme
        writePackageSync(pkg, { normalize: false })

        pt.succeeded('完成初始化绑定配置项')
      }

      pt.starting('开始初始化Git并提交信息...')
      await _.execSync(`git init`)
      await _.execSync(`git add .`)
      await _.execSync(`git commit -m 'feat(all): Initial Template'`)
      pt.succeeded('完成初始化Git并提交信息')

      pt.starting('开始绑定到【Trwite-Cli】远程仓库...')
      await _.execSync('git remote add trwiteCli git@github.com:tree-white/trwite-cli.git')
      await _.execSync('git remote set-url trwiteCli git@github.com:tree-white/trwite-cli.git')
      await _.execSync('git fetch trwiteCli')
      pt.succeeded(`完成绑定到【Trwite-Cli】远程仓库`)

      pt.starting(`开始检测分支名是否冲突...`)
      const { data } = await _.execSync('git branch -a')
      let currentBranchName = ''
      const existBranch = data
        .split('\n')
        .filter(branch => {
          if (branch.includes('*')) {
            currentBranchName = branch.replace('*', '').trim()
          }
          return branch.includes('remotes/trwiteCli/')
        })
        .map(b => b.replace(/.*remotes\/trwiteCli\//, '').trim())
      if (existBranch.includes(branchName)) {
        pt.failed('分支名已存在,请重新绑定并输入新分支名')
        return
      }
      pt.succeeded(`完成检测，分支名可用`)

      pt.starting(`开始绑定分支【${branchName}】到远程仓库【Trwite-Cli】...`)
      const result = await _.execSync(`git push trwiteCli ${currentBranchName}:${branchName}`)
      if (result.status === 0) {
        pt.failed('绑定失败，请重新尝试')
        console.log(result.data)
        return
      }

      pt.succeeded(`已成功绑定，请到[${ROOT_PATH_TEXT}]中的[constant]添加配置`)
    })

  /**
   * 最终解析上面的所有指令。该命令可以理解为执行
   */
  program.parse()
}

init()
