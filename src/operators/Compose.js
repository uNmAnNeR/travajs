// @flow
import { type MixedValidator, type Validator } from './types';
import { ValidationError } from '../errors';
import { g } from '../utils';


export default
function Compose (mv: MixedValidator = (v) => v): Validator {
  if (!Array.isArray(mv)) {
    if (mv && typeof mv === 'object') return g.Trava.Keys(mv);
    return mv;
  }
  const vs = mv.map(Compose);

  return function (value: any, ...args: *) {
    let res = value;

    for (let i=0; i<vs.length; ++i) {
      res = vs[i](res, ...args);
      if (res instanceof Error) break;
    }

    return res;
  }
}
