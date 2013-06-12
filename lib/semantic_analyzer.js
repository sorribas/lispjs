var _und = require('./underscore-min');

var isListOfIds = function(xs) {
  var rs = true;
  _und.each(xs, function(el) {
    if (el.type != 'id') {
      rs = false;
    }
  });

  return rs;
};

var getSemanticErrors = function(sTree) {
  var errs = [];
  if (!(sTree[0] instanceof Array)) {
    if (sTree[0].type == 'string' || sTree[0].type == 'number') {
      errs.push("Invalid function: '" + sTree[0].txt + "'");
    }

    if (sTree[0].txt == 'def' && sTree[1].type != 'id') {
      errs.push("Identifier expected.");
    }

    if (sTree[0].txt == 'lambda') {
      if (!isListOfIds(sTree[1])) {
        errs.push("Function parameters have to be identifiers");
      }
    }
  }

  _und.each(sTree, function(el) {
    if (el instanceof Array && el.length > 0) {
      errs = errs.concat(getSemanticErrors(el));
    }
  });
  return errs;
}

exports.getSemanticErrors = getSemanticErrors;
