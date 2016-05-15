'use strict';

const genExec = function(gen, result) {
  var {done, value} = gen.next(result);
  return done ? value : value.then((result) => genExec(gen, result));
};

module.exports = genExec;
