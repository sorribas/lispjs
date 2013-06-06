var LispJs = { };

LispJs.plus = function() { 
  var res = arguments[0]; 
  for(var i = 1; i < arguments.length; ++i) {
    res += arguments[i];
  } 
  return res;
};

LispJs.minus = function() { 
  var res = arguments[0]; 
  for(var i = 1; i < arguments.length; ++i) {
    res -= arguments[i];
  } 
  return res;
};

LispJs.times = function() { 
  var res = 1; 
  for(var i = 0; i < arguments.length; ++i) {
    res *= arguments[i];
  } 
  return res;
};

LispJs.div = function() { 
  var res = arguments[0]; 
  for(var i = 1; i < arguments.length; ++i) {
    res /= arguments[i];
  } 
  return res;
};

LispJs.list = function() { return Array.prototype.slice.call(arguments); };
LispJs.createObjFromArray = function(xs) {
  var r = {};
  for (var i = 0; i < xs.length; i+=2) {
    r[xs[i]] = xs[i+1];
  }
  return r;
};

LispJs.equals = function(a, b) { return a == b; };
LispJs.lessThan = function(a, b) { return a < b; };
LispJs.greaterThan = function(a, b) { return a > b; };

LispJs.get = function(obj, i) { return obj[i]; };
LispJs.set = function(obj, i, val) { obj[i] = val; };
LispJs.car = function(xs) { return xs[0]};
LispJs.cdr = function(xs) { return xs.slice(1)};


// Underscore.JS functions

var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;
var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

LispJs.map = function(obj, iterator, context) {
  var results = [];
  if (obj == null) return results;
  if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
  each(obj, function(value, index, list) {
    results.push(iterator.call(context, value, index, list));
  });
  return results;
};

LispJs.foldl = function(obj, iterator, memo, context) {
  var initial = arguments.length > 2;
  if (obj == null) obj = [];
  if (nativeReduce && obj.reduce === nativeReduce) {
    if (context) iterator = LispJs.bind(iterator, context);
    return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
  }
  each(obj, function(value, index, list) {
    if (!initial) {
      memo = value;
      initial = true;
    } else {
      memo = iterator.call(context, memo, value, index, list);
    }
  });
  if (!initial) throw new TypeError(reduceError);
  return memo;
};

LispJs.foldr = function(obj, iterator, memo, context) {
  var initial = arguments.length > 2;
  if (obj == null) obj = [];
  if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
    if (context) iterator = LispJs.bind(iterator, context);
    return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
  }
  var length = obj.length;
  if (length !== +length) {
    var keys = LispJs.keys(obj);
    length = keys.length;
  }
  each(obj, function(value, index, list) {
    index = keys ? keys[--length] : --length;
    if (!initial) {
      memo = obj[index];
      initial = true;
    } else {
      memo = iterator.call(context, memo, obj[index], index, list);
    }
  });
  if (!initial) throw new TypeError(reduceError);
  return memo;
};

LispJs.bind = function(func, context) {
  var args, bound;
  if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
  if (typeof func === 'function') throw new TypeError;
  args = slice.call(arguments, 2);
  return bound = function() {
    if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
    ctor.prototype = func.prototype;
    var self = new ctor;
    ctor.prototype = null;
    var result = func.apply(self, args.concat(slice.call(arguments)));
    if (Object(result) === result) return result;
    return self;
  };
};

LispJs.filter = function(obj, iterator, context) {
  var results = [];
  if (obj == null) return results;
  if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
  each(obj, function(value, index, list) {
    if (iterator.call(context, value, index, list)) results.push(value);
  });
  return results;
};

if (typeof exports !== 'undefined') {
  exports.LispJs = LispJs;
}
