import _ from 'lodash'

const buildTree = (file1, file2) => {
  const keys1 = Object.keys(file1)
  const keys2 = Object.keys(file2)
  const keys = _.union(keys1, keys2)
  const sortedKeys = _.sortBy(keys)
  const result = sortedKeys.map((key) => {
    if (!Object.hasOwn(file2, key)) {
      return { key, value: file1[key], type: 'removed' }
    }
    if (!Object.hasOwn(file1, key)) {
      return { key, value: file2[key], type: 'added' }
    }
    if (_.isObject(file1[key]) && _.isObject(file2[key])) {
      return { key, children: buildTree(file1[key], file2[key]), type: 'nested' }
    }
    if (!_.isEqual(file1[key], file2[key])) {
      return { key, value1: file1[key], value2: file2[key], type: 'changed' }
    }
    if (_.isEqual(file1[key], file2[key])) {
      return { key, value: file2[key], type: 'unchanged' }
    }
  })
  return result
}

export default buildTree
