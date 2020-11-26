export const not = (fn) => (...args) => !fn(...args);

export const and = (...fns) => (...args) => fns.every((fn) => Boolean(fn(...args)));
