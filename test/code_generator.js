var should = require('should');
var parser = require('../syntax');
var codeGenerator = require('../code_generator');
var LispJs = require("../lispjsfuncs.js").LispJs;

describe("code_generator", function() {

  beforeEach(function() {
    codeGenerator.clearCode();
  });

  it("should correctly generate a definition", function() {
    var code = "(def a 11861)";
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    eval(jsCode);
    a.should.equal(11861);
  });

  it("should correctly generate a function definition with several parameters and a call for it", function() {
    var codeGenerator = require('../code_generator');

    var code = "(def avg (lambda(a b) (def sum (+ a b)) (/ sum 2)) ) (def avgResult (avg 2 4))";
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    var avgResult = 0;
    eval(jsCode);
    avgResult.should.equal(3);
  });
});
