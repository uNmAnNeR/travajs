import Compose from './Compose';

export default
function Keys (vMap) {
  return function (coll, opts) {
    let errors;
    const valid = {};

    Object.keys(vMap).forEach(k => {
      const validator = Compose(vMap[k]);
      const [kerr, kval] = validator(coll[k], k, coll, opts);
      if (kerr) {
        if (!errors) errors = {};
        errors[k] = kerr;
      } else if (k in coll){
        valid[k] = kval;
      }
    });

    return [errors, valid];
  }
}
