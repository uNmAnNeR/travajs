// @flow
import { type Validator } from './operators/types';


/** Checks if value is string */
export
function isString (str: mixed): boolean %checks {
  return typeof str === 'string' || str instanceof String;
}

type ValueAccessorValidator = Validator & { __valueAccessor: boolean };
export
function asValueAccessor (fn: Function): ValueAccessorValidator {
  fn.__valueAccessor = true;
  return fn;
}

export
function isValueAccessor (fn: Validator | ValueAccessorValidator): boolean {
  return fn.__valueAccessor;
}

export
function prepareErrorMessage (errorMsg: any, ...args: *) {
  if (typeof errorMsg === 'function') return errorMsg(...args);
  return errorMsg;
}

/* eslint-disable no-undef */
export
const g: any = typeof window !== 'undefined' && window ||
  typeof global !== 'undefined' && global.global === global && global ||
  typeof self !== 'undefined' && self.self === self && self ||
  {};
/* eslint-enable no-undef */
