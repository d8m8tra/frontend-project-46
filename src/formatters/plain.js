import { getType, getKey, getValue, getOldValue, getNewValue, getChildren } from './utils.js'
import _ from 'lodash'

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return String(value)
}

const plain = (tree, path = '') => {
  const result = tree.flatMap((node) => {
    const key = getKey(node)
    const value = formatValue(getValue(node))
    const oldValue = formatValue(getOldValue(node))
    const newValue = formatValue(getNewValue(node))
    const type = getType(node)

    const property = path ? `${path}.${key}` : key
    switch (type) {
      case 'added':
        return `Property '${property}' was added with value: ${value}`

      case 'removed':
        return `Property '${property}' was removed`

      case 'unchanged':
        return []

      case 'changed':
        return `Property '${property}' was updated. From ${oldValue} to ${newValue}`

      case 'nested':
        return plain(getChildren(node), property)

      default:
        throw new Error(`Unknown type: '${type}'!`)
    }
  })
  return result.join('\n')
}
export default plain
