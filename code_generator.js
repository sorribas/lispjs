var code = "";
var _und = require('./underscore-min');
var indentlevel = 0;
var ljsIdentifiers = {
  '+' : 'LispJs.plus',
  '-' : 'LispJs.minus',
  '*' : 'LispJs.times',
  '/' : 'LispJs.div',
  '=' : 'LispJs.equals',
  '<' : 'LispJs.lessThan',
  '>' : 'LispJs.greaterThan',
  '->' : 'LispJs.get',
  '->=' : 'LispJs.set',

  'list' : 'LispJs.list',
  'object' : 'LispJs.createObjFromArray',
  'map' : 'LispJs._.map',
  'fold-left' : 'LispJs._.foldl',
  'fold-right' : 'LispJs._.foldr',
  'filter' : 'LispJs._.filter',
  'call' : 'LispJs.callFunWithObj'
}

var addIndent = function() {
  for (var i = 0; i < indentlevel; i++) {
    code += "  ";
  };
}

var generateDefinition = function(node) {
  code += node[1].txt + " = ";
  generateCodeForNode(node[2]);
}

var generateParameterList = function(xs) {
  // TODO validate this in semantic analyzer
  _und.each(xs, function(el, i) {
    code += el.txt;
    if (i < xs.length -1) {
      code += ", ";
    }
  });
}

var generateLambda = function(node) {
  code += "function(";
  generateParameterList(node[1]);
  code += ") {\n";
  indentlevel++;
  generateCodeForList(node.slice(2), true);
  addIndent();
  code += "return (";
  generateCodeForNode(node.slice(2)[node.slice(2).length - 1]);
  code += ");\n";
  indentlevel--;
  addIndent();
  code += "}";
}

var generateFuncCall = function(node) {
  if (node[0].txt == '->') {
    generateArrowAccess(node);
    return;
  }
  generateCodeForNode(node[0]);
  code += "(";

  var i = 0;
  var xs = node.slice(1);
  _und.each(xs, function(el) {
    generateCodeForNode(el);
    if (i < xs.length - 1) {
      code += ", "
    }
    i++;
  });

  code += ")";
}

var generateArrowAccess = function(node) {
  code += "(";
  generateCodeForNode(node[1]);
  code += ")." + node[2].txt.replace(/\"/g, "" );
}

var generateCodeForNode = function(node) {
  if (node instanceof Array) {
    if (typeof node[0].type != 'undefined' && node[0].txt == 'def') {
      generateDefinition(node);
    } else if (typeof node[0].type != 'undefined' && node[0].txt == 'lambda') {
      generateLambda(node);
    } else {
      generateFuncCall(node);
    }
  } else {
    var identifier = typeof ljsIdentifiers[node.txt] != 'undefined' ? ljsIdentifiers[node.txt] : node.txt;
    code += identifier;
  }
}

var generateCodeForList = function(sTree, isInFunction) {
  if (typeof isInFunction == 'undefined') {
    isInFunction = false;
  }

  var i = 0;
  _und.each(sTree, function(el) {
    if (isInFunction && i == sTree.length - 1) {
      // do nothing...
    } else {
      addIndent();
      generateCodeForNode(el);
      code += ";\n";
    }

    i++;
  });

  return code;
}

var clearCode = function() {
  code = "";
  indentlevel = 0;
}

exports.generateCodeForList = generateCodeForList;
exports.clearCode = clearCode;
