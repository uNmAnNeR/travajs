import Compose from './Compose';
import { asValueAccessor } from '../utils';


export default
function Optional (vs, defaultValue) {
  vs = Compose(vs);

  return asValueAccessor(function (d, ...args) {
    if (d === undefined) return defaultValue;
    return vs(d, ...args);
  });
}
