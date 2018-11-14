// @flow
import Check from './Check';


export default
function Enum (values: Array<any>, ...args: *) {
  return Check(v => values.indexOf(v) >= 0, ...args);
}
