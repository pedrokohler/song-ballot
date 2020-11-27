"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.and = exports.not = void 0;

var not = function not(fn) {
  return function () {
    return !fn.apply(void 0, arguments);
  };
};

exports.not = not;

var and = function and() {
  for (var _len = arguments.length, fns = new Array(_len), _key = 0; _key < _len; _key++) {
    fns[_key] = arguments[_key];
  }

  return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return fns.every(function (fn) {
      return Boolean(fn.apply(void 0, args));
    });
  };
};

exports.and = and;