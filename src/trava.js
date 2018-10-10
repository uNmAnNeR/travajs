import { g, composeValidators } from './utils';

import Each from './validators/Each';
import Keys from './validators/Keys';
import Required from './validators/Required';
import Optional from './validators/Optional';


const IValidate = function (scheme, data) {
  const vs = composeValidators(scheme);
  return vs(data);
};

IValidate.Each = Each;
IValidate.Keys = Keys;
IValidate.Required = Required;
IValidate.Optional = Optional;

g.IValidate = IValidate;
export default IValidate;
