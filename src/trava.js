import { g, asValueAccessor, isValueAccessor } from './utils';

import Each from './operators/Each';
import Keys from './operators/Keys';
import Required from './operators/Required';
import Optional from './operators/Optional';
import Nullable from './operators/Nullable';
import Check from './operators/Check';
import Enum from './operators/Enum';
import Compose from './operators/Compose';
import Some from './operators/Some';
import Const from './operators/Const';

import { ValidationError } from './errors';


const Trava = function (scheme, ...args) {
  const vs = Compose(scheme);
  if (!args.length) return vs;
  // possible opts to implement:
  // - skipErrors - return just valid fields, skip errors
  // - wrapExceptions - treat exceptions like validation errors
  return vs(...args);
};

Trava.Each = Each;
Trava.Keys = Keys;
Trava.Required = Required;
Trava.Optional = Optional;
Trava.Nullable = Nullable;
Trava.Check = Check;
Trava.Enum = Enum;
Trava.Compose = Compose;
Trava.Some = Some;
Trava.Const = Const;
Trava.ValidationError = ValidationError;
Trava.asValueAccessor = asValueAccessor;
Trava.isValueAccessor = isValueAccessor;


g.Trava = Trava;
export default Trava;
