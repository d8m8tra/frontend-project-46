import { parse } from './parser.js';
import * as fs from 'node:fs';
import * as path from 'node:path';
import buildTree from './treeBuilder.js';
import format from './formatters/index.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf-8');
  return data;
};

export default (filePath1, filePath2, formatName = 'stylish') => {
  const data1 = parse(readFile(filePath1), path.extname(filePath1));
  const data2 = parse(readFile(filePath2), path.extname(filePath2));
  const tree = buildTree(data1, data2);
  return format(tree, formatName);
};


// import * as path from 'node:path';
// import { parse } from './parser.js'
// import fs from 'fs'
// import path from 'path'
// import buildTree from './treeBuilder.js'
// import format from './formatters/index.js'

// const readFile = (filepath) => {
//   const fullPath = path.resolve(process.cwd(), filepath)
//   const data = fs.readFileSync(fullPath).toString()
//   return data
// }

// export default (filePath1, filePath2, formatName = 'stylish') => {
//   const data1 = parse(readFile(filePath1), path.extname(filePath1))
//   const data2 = parse(readFile(filePath2), path.extname(filePath2))
//   const tree = buildTree(data1, data2)
//   return format(tree, formatName) // if( type: 'nested') применяем рекурсию
// }
