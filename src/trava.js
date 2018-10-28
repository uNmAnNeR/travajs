import { g } from './utils';

import Each from './operators/Each';
import Keys from './operators/Keys';
import Required from './operators/Required';
import Optional from './operators/Optional';
import Nullable from './operators/Nullable';
import Check from './operators/Check';
import Compose from './operators/Compose';
import Some from './operators/Some';


const Trava = function (scheme, data) {
  const vs = Compose(scheme);
  return vs(data);
};

Trava.Each = Each;
Trava.Keys = Keys;
Trava.Required = Required;
Trava.Optional = Optional;
Trava.Nullable = Nullable;
Trava.Check = Check;
Trava.Some = Some;

g.Trava = Trava;
export default Trava;
