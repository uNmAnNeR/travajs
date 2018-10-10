import { composeValidators } from '../utils';


export default
function Optional (vs) {
  vs = composeValidators(vs);

  return function (d, ...args) {
    if (d === undefined) return [null, d];
    return vs(d, ...args);
  };
}
