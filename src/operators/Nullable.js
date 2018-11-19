import Compose from './Compose';
import { asValueAccessor } from '../utils';


export default
function Nullable (vs, defaultValue=null) {
  vs = Compose(vs);

  return asValueAccessor(function (d, ...args) {
    if (d == null) return defaultValue;
    return vs(d, ...args);
  });
}
