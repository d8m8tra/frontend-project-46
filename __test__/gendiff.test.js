import { fileURLToPath } from 'url'
import { dirname } from 'path'
import fs from 'fs'
import path from 'path'
import { expect, test } from '@jest/globals'
import diff from '../src/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const getFixturePath = filename => path.join(__dirname, '..', '__fixtures__', filename)

const resultStylish = fs.readFileSync(getFixturePath('resultStylish.txt'), 'utf-8')
const resultPlain = fs.readFileSync(getFixturePath('resultPlain.txt'), 'utf-8')
const resultJson = fs.readFileSync(getFixturePath('resultJson.txt'), 'utf-8')

test('gendiff json', () => {
  expect(diff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish')).toBe(resultStylish)
  expect(diff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain')).toBe(resultPlain)
  expect(diff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'json')).toBe(resultJson)
  expect(diff(getFixturePath('file1.json'), getFixturePath('file2.json'))).toBe(resultStylish)
})

test('gendiff yml', () => {
  expect(diff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'stylish')).toBe(resultStylish)
  expect(diff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')).toBe(resultPlain)
  expect(diff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'json')).toBe(resultJson)
  expect(diff(getFixturePath('file1.yml'), getFixturePath('file2.yml'))).toBe(resultStylish)
})

test('gendiff yaml', () => {
  expect(diff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'stylish')).toBe(resultStylish)
  expect(diff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'plain')).toBe(resultPlain)
  expect(diff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'), 'json')).toBe(resultJson)
  expect(diff(getFixturePath('file1.yaml'), getFixturePath('file2.yaml'))).toBe(resultStylish)
})
