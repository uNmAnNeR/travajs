// @flow
import Check from './Check';
import { type Validator } from './types';


export default
function Enum (values: Array<any>, ...args: *): Validator {
  return Check(value => values.indexOf(value) >= 0, ...args);
}
