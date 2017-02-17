/* eslint-env mocha */
'use strict';
const fs = require('fs');
const expect = require('chai').use(require('dirty-chai')).expect;
const pkparse = require('pkparse');

const legalityCheck = require('..');

const LEGAL_FILES = fs.readdirSync(`${__dirname}/pk6/legal`).concat(fs.readdirSync(`${__dirname}/pk7/legal`));
const ILLEGAL_FILES = fs.readdirSync(`${__dirname}/pk6/illegal`).concat(fs.readdirSync(`${__dirname}/pk7/illegal`));

describe('pokemon-legality-checker', () => {
  describe('checking legal Pokémon', () => {
    LEGAL_FILES.filter((filename) => /\.pk[67]$/.test(filename)).forEach((filename) => {
      it(`should classify ${filename} as legal`, () => {
        const gen = +filename.slice(-1);
        const filePath = `${__dirname}/pk${gen}/legal/${filename}`;
        const parsedFile = pkparse.parseFile(filePath, {parseNames: true, gen});
        expect(legalityCheck(parsedFile)).to.eql(
          {isLegal: true, errors: []},
          `Incorrectly classifies the legal Pokémon ${filename} as illegal`
        );
      });
    });
  });
  describe('checking illegal Pokémon', () => {
    ILLEGAL_FILES.filter((filename) => /\.pk[67]$/.test(filename)).forEach((filename) => {
      it(`should classify ${filename} as illegal`, () => {
        const gen = +filename.slice(-1);
        const filePath = `${__dirname}/pk${gen}/illegal/${filename}`;
        const parsedFile = pkparse.parseFile(filePath, {parseNames: true, gen});
        const check = legalityCheck(parsedFile);
        expect(check.isLegal).to.be.false(`Incorrectly classifies the illegal Pokémon ${filename} as legal`);
        expect(check.errors.length).to.not.be.equal(0);
        expect(check.errors[0].field).to.be.a('string');
        expect(check.errors[0].message).to.be.a('string');
      });
    });
  });
  describe('Multiple reasons', () => {
    it('should give multiple-reasons.pk6 multiple reasons', () => {
      const parsedFile = pkparse.parseFile(`${__dirname}/pk6/others/multiple-reasons.pk6`, {parseNames: true});
      const check = legalityCheck(parsedFile);
      expect(check.isLegal).to.be.false('Incorrectly classifies the illegal Pokémon multiple-reasons.pk6 as legal');
      expect(check.errors.length).to.be.above(1);
      for (const error of check.errors) {
        expect(error.field).to.be.a('string');
        expect(error.message).to.be.a('string');
      }
    });
  });
});
