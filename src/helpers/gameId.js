const genMap = {
  1: 3, 2: 3, 3: 3, 4: 3, 5: 3, 15: 3, /* S, R, E, FR, LG, XD/Colo */
  7: 4, 8: 4, 10: 4, 11: 4, 12: 4, /* HG, SS, D, P, Pt */
  20: 5, 21: 5, 22: 5, 23: 5, /* W, B, W2, B2 */
  24: 6, 25: 6, 26: 6, 27: 6 /* X, Y, OR, AS */
};

exports.isFromXY = function (gameId) {
  return [24, 25].indexOf(gameId) > -1;
};

exports.isFromORAS = function (gameId) {
  return [26, 27].indexOf(gameId) > -1;
};

exports.originGen = function (gameId) {
  return genMap[gameId];
};
