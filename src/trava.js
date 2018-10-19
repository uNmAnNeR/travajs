import { g, composeValidators } from './utils';

import Each from './validators/Each';
import Keys from './validators/Keys';
import Required from './validators/Required';
import Optional from './validators/Optional';
import Nullable from './validators/Nullable';
import Check from './validators/Check';


const Trava = function (scheme, data) {
  const vs = composeValidators(scheme);
  return vs(data);
};

Trava.composeValidators = composeValidators;
Trava.Each = Each;
Trava.Keys = Keys;
Trava.Required = Required;
Trava.Optional = Optional;
Trava.Nullable = Nullable;
Trava.Check = Check;

g.Trava = Trava;
export default Trava;
