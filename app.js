var parser = require('./syntax');
var sTree = parser.parse('(def a 3) (def hey "hey") (alert "Hey" world) (def double (lambda(x) (plus x x) ))');
//console.log(sTree);

var semErrors = require('./semantic_analyzer').getSemanticErrors(sTree);
//console.log(semErrors);

var code = require('./code_generator').generateCodeForList(sTree);
console.log(code);
