export default
function Check (fn, msg=Check.ErrorMessage) {
	return function (d, ...args) {
	  return fn(d) ?
	  	[null, d] :
	  	[msg];
	};
}
Check.ErrorMessage = "Incorrect value";
