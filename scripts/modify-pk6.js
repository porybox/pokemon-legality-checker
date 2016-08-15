'use strict';
const fs = require('fs');
const inquirer = require('inquirer');
inquirer.prompt([
  {
    type: 'input',
    name: 'filename',
    message: 'What file would you like to update?',
    validate (filename) {
      try {
        fs.accessSync(filename);
        return true;
      } catch (e) {
        return 'That file does not exist.';
      }
    }
  },
  {
    type: 'input',
    name: 'offset',
    message: 'Enter the byte offset of the value that should be updated.',
    filter: offset => parseInt(offset),
    validate: result => !Number.isNaN(result) && result >= 8 && result < 260 || 'Offset must be an integer between 8 and 259'
  },
  {
    type: 'list',
    name: 'inputType',
    message: 'What type of value should be inserted at this offset?',
    choices: [
      '8-bit int',
      '16-bit int',
      '32-bit int',
      '48-bit int',
      'utf16 string'
    ]
  },
  {
    type: 'input',
    name: 'newValue',
    message: 'Enter the updated value that should appear at this offset.',
    validate (newValue, answersSoFar) {
      return !(answersSoFar.inputType.endsWith('int') && Number.isNaN(parseInt(newValue))) || 'Please enter an integer';
    }
  }
]).then(answers => {
  const existingFile = fs.readFileSync(answers.filename);
  if (answers.inputType === '8-bit int') existingFile.writeUInt8(answers.newValue, answers.offset);
  else if (answers.inputType === '16-bit int') existingFile.writeUInt16LE(answers.newValue, answers.offset);
  else if (answers.inputType === '32-bit int') existingFile.writeUInt32LE(answers.newValue, answers.offset);
  else if (answers.inputType === '48-bit int') existingFile.writeUIntLE(answers.newValue, answers.offset, 3);
  else if (answers.inputType === 'utf16 string') {
    existingFile.write(answers.newValue, answers.offset, answers.newValue.length * 2, 'utf16le');
  } else throw new Error(`unexpected error: unknown input type ${answers.inputType}`);
  let sum = 0;
  for (let i = 8; i < 232; i += 2) sum += existingFile.readUInt16LE(i);
  existingFile.writeUInt16LE(sum & 0xffff, 6);
  fs.writeFileSync(answers.filename, existingFile);
}).catch(console.error); // eslint-disable-line no-console
