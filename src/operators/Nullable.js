// @flow
import Compose from './Compose';
import { asValueAccessor } from '../utils';
import { type MixedValidator } from './types';


export default
function Nullable (vs: MixedValidator, defaultValue: any=null) {
  const v = Compose(vs);

  return asValueAccessor(function (value: any, ...args: *) {
    if (value == null) return defaultValue;
    return v(value, ...args);
  });
}
