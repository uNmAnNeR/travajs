export as namespace Trava;
export = Trava;


declare function Trava (scheme: Trava.MixedValidator): Trava.Validator;
declare function Trava (scheme: Trava.MixedValidator, value: any): any;

declare namespace Trava {
  export type ValidateResult = any | Error;
  export type Validator = (data: any, ...args: any[]) => ValidateResult;
  export interface ObjectValidator { [k: string]: MixedValidator }
  export type MixedValidator = Validator | Array<Validator> | ObjectValidator;
  export type ValueAccessorValidator = Validator & { __valueAccessor: boolean };

  export interface EachOptions {
    errorsTo: any;  // actually available values are {Object, Array}
    requiredMessage?: any;
  }
  function Each (vs: MixedValidator, opts?: EachOptions): Validator;
  function Keys (vMap: { [k: string]: MixedValidator }): Validator;
  function Required (vs: MixedValidator, errorMsg?: any): Validator;
  function Optional (vs: MixedValidator, defaultValue?: any): Validator;
  function Nullable (vs: MixedValidator, defaultValue?: any): Validator;
  function Check (fn: (value: any) => boolean, errorMsg?: any): Validator;
  function Enum (values: Array<any>, errorMsg?: any): Validator;
  function Compose (vs: MixedValidator): Validator;
  function Some (vs: MixedValidator): Validator;

  function asValueAccessor (fn: Function): ValueAccessorValidator;
  function isValueAccessor (fn: Validator | ValueAccessorValidator): boolean;
  export class ValidationError<T> extends Error {
    message: string;
    data: T;

    static extractData (error: any): string;
    static stringify (error: any): string;

    constructor (data: T);
  }
}
