export const getType = tree => tree.type

export const getKey = tree => tree.key

export const getValue = tree => tree.value

export const getOldValue = tree => tree.value1

export const getNewValue = tree => tree.value2

export const getChildren = tree => tree.children

export const spaceCount = 4

const specialSymbols = 2

export const getIndent = (depth, type = 'unchanged') => {
  if (type === 'added' || type === 'removed') return ' '.repeat(spaceCount * depth - specialSymbols)
  return ' '.repeat(spaceCount * depth)
}
