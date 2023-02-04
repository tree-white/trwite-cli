import chalk from 'chalk'
import logSymbols from 'log-symbols'

export const space = number => ' '.repeat(number)

export const Text = (message, colorType = 'white', prefix) => {
  colorType = Array.isArray(colorType) ? colorType : colorType.split(',')
  colorType.forEach(type => {
    message = chalk[type](message)
  })

  if (prefix) prefix = logSymbols[prefix] || prefix

  message = prefix ? `${chalk.greenBright(prefix)} ${message}` : message
  return message
}

export const Tip = (...args) => {
  if (args.length < 3) args[2] = '$'
  return `\n${Text(...args)}\n`
}
