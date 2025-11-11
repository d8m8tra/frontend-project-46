import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync } from 'node:fs';

import gendiff from '../src/index.js'

// с учетом того, что __dirname есть только в CommonJS-модулях 
// с помощью кастыля делаем свои:
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// получаем путь к папке фикстуры и файлам в ней
const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);
const pathJSON1 = getFixturePath('file1.json');
const pathJSON2 = getFixturePath('file2.json');
const pathYML1 = getFixturePath('file1.yml')
const pathYML2 = getFixturePath('file2.yml')

// строка для сравнения 
const expectStringJson = readFileSync(getFixturePath('expectedJSON.txt'), 'utf8');

test('testing function gendiff(filepath1, filepath2, format = "json")', () => {
  expect(gendiff(pathJSON1, pathJSON2, 'json')).toBe(expectStringJson);
});
test('testing function gendiff(filepath1, filepath2, format = "yml")', () => {
  expect(gendiff(pathYML1, pathYML2, 'yml')).toBe(expectStringJson);
});