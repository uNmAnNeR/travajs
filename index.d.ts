export as namespace Trava;
export default Trava;


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
  export function Each (vs: MixedValidator, opts?: EachOptions): Validator;
  export function Keys (vMap: ObjectValidator): Validator;
  export function Required (vs: MixedValidator, errorMsg?: any): Validator;
  export function Optional (vs: MixedValidator, defaultValue?: any): Validator;
  export function Nullable (vs: MixedValidator, defaultValue?: any): Validator;
  export function Check (fn: (value: any) => boolean, errorMsg?: any): Validator;
  export function Enum (values: Array<any>, errorMsg?: any): Validator;
  export function Const (value: any, errorMsg?: any): Validator;
  export function Compose (vs: MixedValidator): Validator;
  export function Some (vs: Array<MixedValidator>): Validator;

  export function asValueAccessor (fn: Function): ValueAccessorValidator;
  export function isValueAccessor (fn: Validator | ValueAccessorValidator): boolean;
  export class ValidationError<T> extends Error {
    message: string;
    data: T;

    static extractData (error: any): string;
    static stringify (error: any): string;

    constructor (data: T);
  }
}
