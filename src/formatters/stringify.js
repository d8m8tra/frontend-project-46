import _ from 'lodash'

const stringify = (value, depth = 1) => {
  if (!_.isObject(value)) {
    return `${value}`
  }
  const spaceCount = 4
  const indent = ' '.repeat(depth * spaceCount)
  const bracketIndent = ' '.repeat(depth * spaceCount - spaceCount)
  const lines = Object
    .entries(value)
    .map(([key, val]) => `${indent}${key}: ${stringify(val, depth + 1)}`)

  return [
    '{',
    ...lines,
    `${bracketIndent}}`,
  ].join('\n')
}

export default stringify
