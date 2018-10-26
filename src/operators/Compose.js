// @flow


type Validator = (data: any, ...args: *) => [any, any];

export default
function Compose (vs: Array<Validator> | Validator = (d) => [null, d]) {
  if (!Array.isArray(vs)) return vs;
  vs = vs.map(Compose);

  return function (data: any, ...args: *) {
    let d=data;
    let err;

    for (let i=0; i<vs.length; ++i) {
      const v = vs[i];
      [err, d] = v(d, ...args);
      if (err) break;
    }

    return [err, d];
  }
}
