var should = require('should');
var parser = require('../lib-cov/syntax');
var codeGenerator = require('../lib-cov/code_generator');
var LispJs = require("../lib-cov/lispjsfuncs.js").LispJs;

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
    var code = "(def avg (lambda(a b) (def sum (+ a b)) (/ sum 2)) ) (def avgResult (avg 2 4))";
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    var avgResult = 0;
    eval(jsCode);
    avgResult.should.equal(3);
  });

  it("should correctly generate objects", function() {
    var code = '(def edu (object (list "name" "Edu" "gender" "male")))';
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    eval(jsCode);
    edu.name.should.equal("Edu");
    edu.gender.should.equal("male");
  });

  it("should correctly generate a list", function() {
    var code = "(def xs (list 1 2 3 4) )";
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    eval(jsCode);
    xs[0].should.equal(1);
    xs[1].should.equal(2);
    xs[2].should.equal(3);
    xs[3].should.equal(4);
  });

  it("should correctly call functions within an object", function() {
    var code = '(def edu (object (list "name" "Edu" "gender" "male" "salute" (lambda () (+ "Hello, my name is " (-> this "name") ) ))))';
    code += '(def theSalute ((-> edu "salute")))';
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    console.log(jsCode);
    eval(jsCode);
    theSalute.should.equal("Hello, my name is Edu");
  });
});
