import { composeValidators } from '../utils';

export default
function Keys (vMap) {
  return function (coll, opts) {
    let errors;
    const valid = {};

    Object.keys(vMap).forEach(k => {
      const validator = composeValidators(vMap[k]);
      const [kerr, kval] = validator(coll[k], k, coll, opts);
      if (kerr) {
        if (!errors) errors = {};
        errors[k] = kerr;
      } else {
        valid[k] = kval;
      }
    });

    return [errors, valid];
  }
}
