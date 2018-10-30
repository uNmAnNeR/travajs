// @flow
import { ValidationError } from '../errors';


export default
function Check (fn: (v: any) => boolean, msg: any=Check.ErrorMessage) {
	return function (d: any, ...args: *) {
	  return fn(d) ? d : new ValidationError(msg);
	};
}
Check.ErrorMessage = "Incorrect value";
