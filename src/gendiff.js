#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'node:fs'
import app from "./index.js"
import path from 'node:path'

const program = new Command();


const gendif = program // инициализировали программу

    .name('gendiff') // объявили имя CLI-команды
    .description('Compares two configuration files and shows a difference') // задали описание
    .version('1.0.0') // задали версию
    .option('-f, --format [type]', 'output format') // добавили опцию
    .argument('<filepath1>')
    .argument('<filepath2>')
    .action((filepath1, filepath2, options) => {
      console.log(app(filepath1, filepath2, options));
    })

gendif.parse();