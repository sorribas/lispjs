'use strict';

var parser = require('./syntax');
var analyzer = require('../lib/semantic_analyzer');
var codegen = require('../lib/code_generator');

module.exports = function (source) {
  var sTree = parser.parse(source);
  var semErrors = analyzer.getSemanticErrors(sTree);
  codegen.clearCode();
  var code = codegen.generateCodeForList(sTree);
  return code;
};
