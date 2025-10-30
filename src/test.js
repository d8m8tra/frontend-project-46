#!/usr/bin/env node

import { Command } from 'commander'
import fs from 'node:fs'

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference')
  .version('1.0.0')
  .option('-f, --format [type]', 'output format')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .action((filepath1, filepath2) => {
    const data = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
    const data1 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));
    console.log(typeof data);
    console.log(typeof data1);
  });

program.parse();