// @flow
import { type Validator } from './types';
import { ValidationError } from '../errors';
import { g } from '../utils';


export default
function Compose (vs: Array<Validator> | Validator = (d) => d) {
  if (!Array.isArray(vs)) {
    if (vs && typeof vs === 'object') return g.Trava.Keys(vs);
    return vs;
  }
  vs = vs.map(Compose);

  return function (data: any, ...args: *) {
    let d=data;
    let res;

    for (let i=0; i<vs.length; ++i) {
      const v = vs[i];
      res = v(d, ...args);
      if (res instanceof Error) break;
    }

    return res;
  }
}
