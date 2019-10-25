// @flow
import Check from './Check';
import { type Validator } from './types';


export default
function Const (v: any, ...args: *): Validator {
  return Check(value => value === v, ...args);
}
