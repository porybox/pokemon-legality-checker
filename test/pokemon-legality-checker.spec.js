'use strict';
const expect = require('chai').use(require('dirty-chai')).expect;

const legalityChecker = require('..');

describe('pokemon-legality-checker', () => {
  it('upholds the laws of logic (placeholder test, please replace)', () => {
    expect(true).to.be.true();
    expect(false).to.be.false();
    expect(true).not.to.be.false();
    expect(0).to.equal(0);
    expect(0).to.not.equal(1);
  });
  it('is a function', () => {
    // (we can make it something other than a function if we come up with a better API)
    expect(legalityChecker).to.be.a('function');
  });
});
