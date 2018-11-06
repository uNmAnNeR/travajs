import { g } from './utils';

import Each from './operators/Each';
import Keys from './operators/Keys';
import Required from './operators/Required';
import Optional from './operators/Optional';
import Nullable from './operators/Nullable';
import Check from './operators/Check';
import Compose from './operators/Compose';
import Some from './operators/Some';

import { ValidationError } from './errors';


const Trava = function (scheme, data, opts) {
  const vs = Compose(scheme);
  // possible opts to implement:
  // - skipErrors - return just valid fields, skip errors
  // - wrapExceptions - treat exceptions like validation errors
  return vs(data, opts);
};

Trava.Each = Each;
Trava.Keys = Keys;
Trava.Required = Required;
Trava.Optional = Optional;
Trava.Nullable = Nullable;
Trava.Check = Check;
Trava.Compose = Compose;
Trava.Some = Some;
Trava.ValidationError = ValidationError;

g.Trava = Trava;
export default Trava;
