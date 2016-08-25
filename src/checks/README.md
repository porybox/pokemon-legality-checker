## Adding checks

Each check should have two exports:

* `test: function (pkmnData) --> boolean`

The function that gets called to check a file. `pkmn` is parsed pk6 data ([sample](https://gist.github.com/Raia/ac7c4fd3b50f751446659180e1ea375a)). Should return a truthy value if the check passes, and a falsy value if the check fails.

A Pokémon is considered to be legal iff all checks pass.

* `description: string`

A description of what the check is testing for. This will get reported as the failure reason if the check fails.

---

A check can also have the following optional properties:

* `filter: Object|Function`

`filter` can be used to limit the scope of the checks, to make the `test` function more readable.

If `filter` is a function, it will be called before running the check, with one argument: `pkmn`. If the function returns a falsy value, the check will be skipped for the current Pokémon.

```js
module.exports = {
  description: '...',
  filter (pkmn) {
    return pkmn.dexNo >= 1 && pkmn.dexNo <= 151;
  },
  test (pkmn) {
    // This check will only be run for Pokémon with dex numbers between 1 and 151.
  }
};
```

If `filter` is an object, it will only be run if `pkmn` matches all of its properties.

```js
module.exports = {
  description: '...',
  filter: {level: 1, isShiny: true},
  test (pkmn) {
    // This check will only be run for shiny Pokémon at level 1.
  }
};
```
