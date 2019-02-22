// @flow
import { type Validator } from './types';
import Compose from './Compose';


export default
function Some (vs: Array<Validator>) {
  vs = vs.map(Compose);

  return function (value: any, ...args: *) {
    let res;

    for (let i=0; i<vs.length; ++i) {
      res = vs[i](value, ...args);
      if (!(res instanceof Error)) break;
    }

    return res;
  }
}
