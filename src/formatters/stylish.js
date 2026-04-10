import stringify from './stringify.js'
import { getType, getKey, getValue, getOldValue, getNewValue, getIndent, getChildren, spaceCount } from './utils.js'

const stylish = (tree, depth = 1) => {
  const result = tree.reduce((acc, elem) => {
    const type = getType(elem)
    const key = getKey(elem)
    const value = stringify(getValue(elem), depth + 1)
    const oldValue = stringify(getOldValue(elem), depth + 1)
    const newValue = stringify(getNewValue(elem), depth + 1)

    switch (type) {
      case 'removed':
        return `${acc}${getIndent(depth, 'removed')}- ${key}: ${value}\n`

      case 'added':
        return `${acc}${getIndent(depth, 'added')}+ ${key}: ${value}\n`

      case 'unchanged':
        return `${acc}${getIndent(depth)}${key}: ${value}\n`

      case 'changed':
        return `${acc}${getIndent(depth, 'removed')}- ${key}: ${oldValue}\n${getIndent(depth, 'added')}+ ${key}: ${newValue}\n`

      case 'nested':
        return `${acc}${getIndent(depth)}${key}: ${stylish(getChildren(elem), depth + 1)}\n`

      default:
        throw new Error(`Unknown type: '${type}'!`)
    }
  }, '')
  const bracketIndent = ' '.repeat(depth * spaceCount - spaceCount)
  return `{\n${result}${bracketIndent}}`
}

export default stylish
