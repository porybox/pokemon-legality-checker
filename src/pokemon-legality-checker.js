'use strict';
const fs = require('fs');
const _ = require('lodash');
const legalityChecks = fs.readdirSync(`${__dirname}/checks`)
  .filter(filename => filename.endsWith('.js'))
  .map(filename => {
    const check = require(`./checks/${filename}`);
    if (!_.isFunction(check.test)) throw new TypeError(`The check ${filename} is missing a 'test' function property`);
    if (!_.isString(check.description)) throw new TypeError(`The check ${filename} is missing a 'description' string property`);
    return check;
  });

module.exports = pkmn => {
  const failedCheck = legalityChecks.filter(check => matchesFilter(pkmn, check.filter)).find(check => !check.test(pkmn));
  return failedCheck ? {isLegal: false, reason: failedCheck.description} : {isLegal: true, reason: null};
};

function matchesFilter (pkmn, filter) {
  if (typeof filter === 'function') return filter(pkmn);
  if (typeof filter === 'object') return _.matches(filter)(pkmn);
  return true;
}
