import chalk from 'chalk'
import logSymbols from 'log-symbols'
import handlebars from 'handlebars'
import fs from 'fs'
import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { exec, execSync as execS } from 'child_process'

/**
 * 返回空格数量
 * @param {number} number 空格数量
 */
export const space = number => ' '.repeat(number)

/**
 *
 * @param {string} message
 * @param {string|string[]} colorType
 * @param {string|"info"|"success"|"warning"|"error"} prefix
 * @returns
 * @example
 * Text('哈哈','green')
 * Text('哈哈','green,bold')
 * Text('哈哈',[green,bold])
 * Text('哈哈',[green,bold],'success')
 * Text('哈哈',[green,bold],'$')
 */
export const Text = (message, colorType = 'white', prefix) => {
  colorType = Array.isArray(colorType) ? colorType : colorType.split(',')
  colorType.forEach(type => {
    message = chalk[type](message)
  })

  if (prefix) prefix = logSymbols[prefix] || prefix

  message = prefix ? `${chalk.greenBright(prefix)} ${message}` : message
  return message
}

/**
 *
 * @param  {[message:string,colorType:string|string[],prefix:string|undefined]} args
 * @returns
 */
export const Tip = (...args) => {
  if (args.length < 3) args[2] = '$'
  return `${Text(...args)}\n`
}

/**
 * 替换内容
 * @param {string|string[]} path 替换的路径 支持 数组形式
 * @param {any} data
 */
export const replaceValue = (path, data) => {
  path = Array.isArray(path) ? path : path.split(',')

  path.forEach(filePath => {
    const initialContent = fs.readFileSync(filePath, 'utf8')
    const replacedContent = handlebars.compile(initialContent)(data)
    fs.writeFileSync(filePath, replacedContent)
  })
}

/**
 * 返回当前项目路径
 */
export const getDirPath = () => dirname(fileURLToPath(import.meta.url))

/**
 * 同步执行命令
 * @param {string} command
 * @returns {Promise<{status: 0 | 1, data: any}>}
 */
export async function execSync(command) {
  return new Promise(resolve => {
    exec.call(this, command, (error, stdout, stderr) => {
      const status = Number(!error)
      const result = { status, data: status ? stdout : (error || stderr).message }
      // console.log('result =>', result)
      resolve(result)
    })
  })
}

/**
 * 睡眠等待
 * @param {number} time 等待时间(秒)
 * @return {true} 运行结束返回 true
 */
export const sleep = (time = 1) => {
  execS(`sleep ${time}`)
  return true
}
