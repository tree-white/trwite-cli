import chalk from 'chalk'
import logSymbols from 'log-symbols'

export const space = number => ' '.repeat(number)

export const Text = (message, type = 'white', prefix) => {
  type = Array.isArray(type) ? type : type.split(',')
  type.forEach(v => (message = chalk[v](message)))

  if (prefix) prefix = logSymbols[prefix] || '$'

  message = prefix ? `${prefix} ${message}` : message
  return message
}

export const Tip = (...args) => {
  if (args.length < 2) args[2] = '$'
  return `\n${Text(...args)}\n`
}
