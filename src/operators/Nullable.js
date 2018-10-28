import Compose from './Compose';


export default
function Nullable (vs, defaultValue=null) {
  vs = Compose(vs);

  return function (d, ...args) {
    if (d == null) return defaultValue;
    return vs(d, ...args);
  };
}
