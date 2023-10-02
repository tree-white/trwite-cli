import ora from 'ora'
import * as _ from '../utils.js'
import chalk from 'chalk'

/**
 * 使用提示器
 */
export const usePrompter = () => {
  /** 定义一个新进程 */
  const prompter = ora()

  /**
   * 进行中
   * @param {string} text 提示文本 默认：进行中...
   * @param {number|boolean|string} sleepTime 睡眠等等 默认1秒
   */
  const starting = (text = '进行中...', sleepTime = 1) => {
    const ora = prompter.start(_.Text(text, 'yellowBright,bold'))
    sleepTime && _.sleep(+sleepTime)
    return ora
  }

  /**
   * 已失败
   * @param {string} text 提示文本 默认：失败了!!!
   * @param {number|boolean|string} sleepTime 睡眠等等 默认1秒
   */
  const failed = (text = '失败了!!!', sleepTime = 1) => {
    const ora = prompter.fail(chalk.redBright(_.Text(text, 'redBright')))
    sleepTime && _.sleep(+sleepTime)
    return ora
  }

  /**
   * 已成功
   * @param {string} text 提示文本 默认：成功了!!!
   * @param {number|boolean|string} sleepTime 睡眠等等 默认1秒
   */
  const succeeded = (text = '成功了!!!', sleepTime = 1) => {
    const ora = prompter.succeed(_.Text(text, 'greenBright'))
    sleepTime && _.sleep(+sleepTime)
    return ora
  }

  return { starting, failed, succeeded, prompter }
}
