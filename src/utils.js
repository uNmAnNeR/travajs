// @flow


/** Checks if value is string */
export
function isString (str: mixed): boolean %checks {
  return typeof str === 'string' || str instanceof String;
}

export
function asValueAccessor (fn: any) {
  fn.__valueAccessor = true;
  return fn;
}

export
function isValueAccessor (fn: any): boolean {
  return fn.__valueAccessor;
}

/* eslint-disable no-undef */
export
const g: any = typeof window !== 'undefined' && window ||
  typeof global !== 'undefined' && global.global === global && global ||
  typeof self !== 'undefined' && self.self === self && self ||
  {};
/* eslint-enable no-undef */
