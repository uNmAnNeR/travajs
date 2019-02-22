// @flow
export
class ValidationError<T> extends Error {
  message: string;
  data: T;

  static extractData (error: any): string {
    if (error instanceof ValidationError) return error.data;
    return String(error);
  }

  static stringify (error: any): string {
    if (error instanceof ValidationError) return ValidationError.stringify(error.data);
    if (error instanceof Error) return error.message;

    try {
      return JSON.stringify(error);
    } catch (e) {}

    try {
      return String(error);
    } catch (e) {}

    return '';
  }

  constructor (data: T) {
    super(ValidationError.stringify(data));
    this.name = 'ValidationError';
    this.data = data;
  }
}
