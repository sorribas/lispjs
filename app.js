var parser = require('./syntax');
var sTree = parser.parse('(def a 3)');
console.log(sTree);
