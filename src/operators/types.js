// @flow
export
type ValidateResult = any | Error;

export
type Validator = (data: any, ...args: *) => ValidateResult;

export
type MixedValidator = Validator | Array<Validator>;
