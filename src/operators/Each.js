import Compose from './Compose';


// TODO Currently works only for Arrays
export default
function Each (validator) {
  validator = Compose(validator);

  return function (coll, opts) {
    let errors;
    const valid = [];

    for (let i=0; i<coll.length; i++) {
      const [ierr, ival] = validator(coll[i], i, coll, opts);
      if (ierr) {
        if (!errors) errors = {};
        errors[i] = ierr;
      } else {
        valid.push(ival);
      }
    }

    return [errors, valid];
  }
}
