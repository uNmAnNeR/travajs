import Compose from './Compose';


export default
function Optional (vs, defaultValue) {
  vs = Compose(vs);

  return function (d, ...args) {
    if (d === undefined) return defaultValue;
    return vs(d, ...args);
  };
}
