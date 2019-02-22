// @flow
import Compose from './Compose';
import { asValueAccessor } from '../utils';
import { type MixedValidator, type Validator } from './types';


export default
function Optional (vs: MixedValidator, defaultValue: any): Validator {
  const v = Compose(vs);

  return asValueAccessor(function (value, ...args) {
    if (value === undefined) return defaultValue;
    return v(value, ...args);
  });
}
