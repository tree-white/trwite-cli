import chalk from 'chalk'
import logSymbols from 'log-symbols'
import handlebars from 'handlebars'
import fs from 'fs'

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
