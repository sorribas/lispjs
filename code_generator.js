var code = "";
var _und = require('./underscore-min');
var indentlevel = 0;

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
  var i = 0;
  _und.each(xs, function(el) {
    code += el;
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
  generateCodeForList(node.slice(2));
  indentlevel--;
  addIndent();
  code += "}";
}

var generateFuncCall = function(node) {
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
    code += node.txt;
  }
}

var generateCodeForList = function(sTree) {

  _und.each(sTree, function(el) {
    addIndent();
    generateCodeForNode(el);
    code += ";\n";
  });

  return code;
}

exports.generateCodeForList = generateCodeForList;
