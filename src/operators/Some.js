// @flow


import { type Validator } from './types';
import Compose from './Compose';

export default
function Some (vs: Array<Validator>) {
  vs = vs.map(Compose);

  return function (data: any, ...args: *) {
    let d=data;
    let err;

    for (let i=0; i<vs.length; ++i) {
      const v = vs[i];
      [err, d] = v(d, ...args);
      if (!err) break;
    }

    return [err, d];
  }
}
