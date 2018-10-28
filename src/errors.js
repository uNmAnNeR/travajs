// @flow


import { isString } from './utils';

export
class ValidationError<T> extends Error {
  message: string;
  raw: T;
  static extractErrorData: (Error) => string;

  constructor (data: T) {
    super(JSON.stringify(data));
    this.name = 'VALIDATION_ERROR';
    this.raw = data;
  }

  toString (): string {
    return JSON.stringify(this.raw);
  }
}
ValidationError.extractErrorData = function (error: Error): string {
  if (error instanceof ValidationError) return error.raw;
  return String(error);
}
