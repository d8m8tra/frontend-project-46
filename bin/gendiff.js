#!/usr/bin/env node

import { Command } from 'commander'

const program = new Command();

program // инициализировали программу
    .name('gendiff') // объявили имя CLI-команды
    .description('Compares two configuration files and shows a difference') // задали описание
    .version('1.0.0') // задали версию
    .option('-f, --format [type]', 'output format') // добавили опцию
    .argument('<filepath1>')
    .argument('<filepath2>')

program.parse()