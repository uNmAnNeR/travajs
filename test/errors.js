import { ValidationError } from '../src/errors';
import assert from 'assert';


describe('ValidationError', function () {
  it('Should create error', function () {
    const errorData = { a: 1 };
    const error = new ValidationError(errorData);

    assert(error.name === 'ValidationError', 'Error is not ValidationError');
    assert(error.data === errorData, 'Incorrect error data');
    assert(error.message === JSON.stringify(errorData), 'Incorrect error message');
  })
});
