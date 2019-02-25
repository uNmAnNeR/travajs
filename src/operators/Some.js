// @flow
import { type Validator, type MixedValidator } from './types';
import Compose from './Compose';


export default
function Some (mv: Array<MixedValidator>) {
  const vs = mv.map(Compose);

  return function (value: any, ...args: *) {
    let res;

    for (let i=0; i<vs.length; ++i) {
      res = vs[i](value, ...args);
      if (!(res instanceof Error)) break;
    }

    return res;
  }
}
