/* eslint-env mocha */
'use strict';
const fs = require('fs');
const expect = require('chai').use(require('dirty-chai')).expect;
const pk6parse = require('pk6parse');

const legalityCheck = require('..');

describe('pokemon-legality-checker', () => {
  describe('checking legal Pokémon', () => {
    fs.readdirSync(`${__dirname}/pk6/legal`).filter(filename => filename.endsWith('.pk6')).forEach(filename => {
      it(`should classify ${filename} as legal`, () => {
        const parsedFile = pk6parse.parseFile(`${__dirname}/pk6/legal/${filename}`, {parseNames: true});
        expect(legalityCheck(parsedFile)).to.eql(
          {isLegal: true, reason: null},
          `Incorrectly classifies the legal Pokémon ${filename} as illegal`
        );
      });
    });
  });
  describe('checking illegal Pokémon', () => {
    fs.readdirSync(`${__dirname}/pk6/illegal`).filter(filename => filename.endsWith('.pk6')).forEach(filename => {
      it(`should classify ${filename} as illegal`, () => {
        const parsedFile = pk6parse.parseFile(`${__dirname}/pk6/illegal/${filename}`, {parseNames: true});
        const check = legalityCheck(parsedFile);
        expect(check.isLegal).to.be.false(`Incorrectly classifies the illegal Pokémon ${filename} as legal`);
        expect(check.reason).to.be.a('string');
      });
    });
  });
});
