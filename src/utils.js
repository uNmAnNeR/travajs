// @flow


/* eslint-disable no-undef */
export
const g: any = typeof window !== 'undefined' && window ||
  typeof global !== 'undefined' && global.global === global && global ||
  typeof self !== 'undefined' && self.self === self && self ||
  {};
/* eslint-enable no-undef */
