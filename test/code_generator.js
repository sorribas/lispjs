var libDir = process.env.LISPJS_COV==1 ? "../lib-cov/" : "../lib/";
var should = require('should');
var parser = require(libDir + 'syntax');
var codeGenerator = require(libDir + 'code_generator');
var LispJs = require(libDir + "lispjsfuncs.js").LispJs;

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
    eval(jsCode);
    theSalute.should.equal("Hello, my name is Edu");
  });

  it("should correctly generate basic arithmetic operations", function() {
    var code = "(def a (+ 2 9))";
    code += "(def b (- 8 2))";
    code += "(def c (* 2 2))";
    code += "(def d (/ 8 2))";
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    eval(jsCode);
    a.should.equal(11);
    b.should.equal(6);
    c.should.equal(4);
    d.should.equal(4);
  });

  it("should correctly generate map function calls", function() {
    var code = "(def mapped (map (list 1 2 3 4 5) (lambda (x) (+ x x))))";
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    eval(jsCode);
    mapped.should.eql([2, 4, 6, 8, 10]);
  });

  it("should correctly generate foldLeft function calls", function() {
    var code = "(def folded (foldLeft (list 1 2 3 4 5) (lambda (a b) (+ a b))))";
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    eval(jsCode);
    folded.should.equal(15);
  });

  it("should correctly generate foldRight function calls", function() {
    var code = "(def rfolded (foldRight (list 1 3 9) (lambda (a b) (- a b))))";
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    eval(jsCode);
    rfolded.should.equal(5);
  });

  it("should correctly generate cons function calls", function() {
    var code = "(def lst (cons 0 (list 1 2 3 4 5)))";
    var sTree = parser.parse(code);
    var jsCode = codeGenerator.generateCodeForList(sTree);
    eval(jsCode);
    lst.should.eql([0, 1, 2, 3, 4, 5]);
  });
});
