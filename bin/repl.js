'use strict';

var compile = require('../lib/compile');
var LispJs = require('../lib/lispjsfuncs').LispJs;
var Repl = require('repl');
var vm = require('vm');

module.exports = function () {
  var sandbox = {LispJs: LispJs};
  vm.createContext(sandbox);

  var repl = Repl.start({
    useGlobal: true,
    eval: function (expr, context, filename, cb) {
      try {
        var code = compile(expr);
        var value = vm.runInContext(code, sandbox);
        cb(null, value);
      } catch (err) {
        cb(err);
      }
    }
  });
};
