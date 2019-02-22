import { ValidationError } from '../src/errors';
import assert from 'assert';


describe('ValidationError', function () {
  it('should create error', function () {
    const errorData = { a: 1 };
    const error = new ValidationError(errorData);

    assert.equal(error.name, 'ValidationError', 'Error is not ValidationError');
    assert.equal(error.data, errorData, 'Incorrect error data');
  });

  it('should set message from object', function () {
    const errorData = { a: 1 };
    const error = new ValidationError(errorData);

    assert.equal(error.message, JSON.stringify(errorData), 'Incorrect error message (from Object)');
  });

  it('should set message from Error', function () {
    const errorMsg = 'ERROR';
    const errorData = new Error(errorMsg);
    const error = new ValidationError(errorData);

    assert.equal(error.message, errorMsg, 'Incorrect error message (from Error)');
  });

  it('should set message from ValidationError', function () {
    const errorData = { a: 1 };
    const error = new ValidationError(errorData);
    const error2 = new ValidationError(error);

    assert.equal(error.message, error2.message, 'Incorrect error message (from ValidationError) (1)');
    assert.equal(error2.message, JSON.stringify(errorData), 'Incorrect error message (from ValidationError) (2)');
  });

  it('should extract data from Stringifyable', function () {
    const errorStr = 'ERROR';
    const errorData = { toJSON() { throw 'error'; }, toString() { return errorStr; } };
    const error = new ValidationError(errorData);

    assert.equal(error.message, errorStr, 'Can not extract error data from Stringifyable');
  });

  it('should extract data from any', function () {
    const errorStr = 'DATA';
    const errorData = { toString() { return errorStr; } };
    const error = new ValidationError(errorData);

    assert.equal(ValidationError.extractData(error), errorStr, 'Can not extract error data from any');
  });
});
