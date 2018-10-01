// @flow

type Validator = (data: any, ...args: *) => [any, any];

export function
composeValidators (vs: Array<Validator> | Validator = (d) => [null, d]) {
  if (!Array.isArray(vs)) return vs;
  vs = vs.map(composeValidators);

  return function (data: any, ...args: *) {
    let d=data;
    let err;

    for (let i=0; i<vs.length; ++i) {
      const v = vs[i];
      [err, d] = v(d, ...args);
      if (err) break;
    }

    return [err, d];
  }
}

/* eslint-disable no-undef */
export
const g: any = typeof window !== 'undefined' && window ||
  typeof global !== 'undefined' && global.global === global && global ||
  typeof self !== 'undefined' && self.self === self && self ||
  {};
/* eslint-enable no-undef */
