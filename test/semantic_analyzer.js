var libDir = process.env.LISPJS_COV==1 ? "../lib-cov/" : "../lib/";
var should = require('should');
var parser = require(libDir + 'syntax');
var semanticAnalyzer = require(libDir + 'semantic_analyzer');

describe("semantic_analyzer", function() {
  it("should correctly detect a function call error", function() {
    var code = "(11861 hey)";
    var sTree = parser.parse(code);
    var errs = semanticAnalyzer.getSemanticErrors(sTree);
    errs[0].indexOf("Invalid function").should.not.equal(-1);

    code = '("myfunction" hey)';
    sTree = parser.parse(code);
    errs = semanticAnalyzer.getSemanticErrors(sTree);
    errs[0].indexOf("Invalid function").should.not.equal(-1);

    code = '(myfunction hey)';
    sTree = parser.parse(code);
    errs = semanticAnalyzer.getSemanticErrors(sTree);
    errs.length.should.equal(0);
  });

  it("should correctly detect a parameter list error", function() {
    var code = "(def myfunction (lambda (3 a b) (+ a b)))";
    var sTree = parser.parse(code);
    var errs = semanticAnalyzer.getSemanticErrors(sTree);
    errs[0].indexOf("Function parameters have to be identifiers").should.not.equal(-1);

    code = '(def myfunction (lambda ("a" b) (+ a b)))';
    sTree = parser.parse(code);
    errs = semanticAnalyzer.getSemanticErrors(sTree);
    errs[0].indexOf("Function parameters have to be identifiers").should.not.equal(-1);

    code = '(def myfunction (lambda (a b) (+ a b)))';
    sTree = parser.parse(code);
    errs = semanticAnalyzer.getSemanticErrors(sTree);
    errs.length.should.equal(0);
  });
});
