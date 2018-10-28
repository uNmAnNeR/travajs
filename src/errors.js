// @flow


import { isString } from './utils';

export
class ValidationError<T> extends Error {
  message: string;
  data: T;
  static extractData: (Error) => string;

  constructor (data: T) {
    super(JSON.stringify(data));
    this.name = 'VALIDATION_ERROR';
    this.data = data;
  }

  toString (): string {
    return JSON.stringify(this.data);
  }
}
ValidationError.extractData = function (error: Error): string {
  if (error instanceof ValidationError) return error.data;
  return String(error);
}
