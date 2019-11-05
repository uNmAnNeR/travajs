import assert from 'assert';
import sinon, { fake, spy } from 'sinon';

import Trava from '../src/trava';
import Check from '../src/operators/Check';
import Compose from '../src/operators/Compose';
import Each from '../src/operators/Each';
import Enum from '../src/operators/Enum';
import Keys from '../src/operators/Keys';
import Nullable from '../src/operators/Nullable';
import Optional from '../src/operators/Optional';
import Required from '../src/operators/Required';
import Some from '../src/operators/Some';
import Const from '../src/operators/Const';
import { ValidationError } from '../src/errors';
import { isValueAccessor } from '../src/utils';


describe('Operators', function () {
  afterEach(() => sinon.restore());

  describe('Check', function () {
    it('should return data', function () {
      const data = 'DATA';
      const v = Check(value => true);
      const validData = v(data);

      assert.equal(validData, data, 'Check returns invalid data');
    });

    it('should return error', function () {
      const data = 'DATA';
      const errorMsg = 'ERROR';
      const v = Check(value => false, errorMsg);
      const validData = v(data);

      assert(validData instanceof ValidationError, 'Check result is not error');
      assert.equal(validData.message, errorMsg, 'Invalid error message');
    });

    it('should format error with function', function () {
      const POS_MSG = 'POS';
      const errorMsg = val => (val > 0 ? POS_MSG : 'NEG');
      const v = Check(value => false, errorMsg);

      const resPos = v(1);
      assert(resPos instanceof ValidationError, 'Check result is not error');
      assert.equal(resPos.message, POS_MSG, 'Invalid error message');
    });
  });


  describe('Enum', function () {
    it('should work', function () {
      const v = Enum([1, 2, 3]);

      assert.equal(v(1), 1, 'Enum returns invalid data');
      assert(v(4) instanceof ValidationError, 'Enum result is not error');
    });
  });


  describe('Compose', function () {
    it('should return single validator', function () {
      const v = () => true;

      assert.equal(Compose(v), v, 'Composed validator is not the same as single validator');
    });

    it('should return composition of several validators', function () {
      const v1 = fake.returns(1);
      const v2 = fake.returns(2);
      const v = Compose([v1, v2]);

      assert.equal(v(0), 2, 'Invalid composition');
      assert(v1.lastCall.calledWith(0), 'Invalid argument 1');
      assert(v2.lastCall.calledWith(1), 'Invalid argument 2');
    });

    it('should return first error of composed', function () {
      const error = 'ERROR';
      const v0 = fake.returns(0);
      const v1 = fake.returns(new ValidationError(error));
      const v2 = fake.returns(2);
      const v = Compose([v0, v1, v2]);

      const d = v(0);

      assert(d instanceof ValidationError, 'Invalid result');
      assert.equal(d.message, error, 'Invalid error message');
      assert(v1.lastCall.calledWith(0), 'Invalid argument 1');
      assert(!v2.lastCall, 'Invalid validator call');
    });

    it('should be called recursively', function () {
      const v1 = fake.returns(1);
      const v2 = fake.returns(2);
      const v = Compose([[v1, v2]]);

      assert.equal(v(0), 2, 'Invalid composition');
      assert(v1.lastCall.calledWith(0), 'Invalid argument 1');
      assert(v2.lastCall.calledWith(1), 'Invalid argument 2');
    });

    it('should work with objects', function () {
      const spyKeys = spy(Trava, 'Keys');
      const v = Compose([{ a: () => 1 }]);

      assert(spyKeys.calledOnce, 'Trava.Keys is not called');

      spyKeys.restore();
    });
  });

  describe('Each', function () {
    it('should validate elements', function () {
      const v = Each(Check(e => e > 0));
      const data = [1, 2, 3];

      assert.deepEqual(v(data), data, 'Invalid each data check');
    });

    it('should return error', function () {
      const error = 'ERROR';
      const v = Each(Check(e => e > 0, error));
      const data = [0, 1, 2, 3];

      const r = v(data);

      assert(r instanceof ValidationError, 'Result is not error');
      assert.deepEqual(r.data, { 0: error }, 'Invalid error data');
    });

    it('should save errors to array', function () {
      const error = 'ERROR';
      const v = Each(Check(e => e > 1, error), { errorsTo: Array });
      const data = [0, 1, 2, 3];

      const r = v(data);

      assert(r instanceof ValidationError, 'Result is not error');
      assert(Array.isArray(r.data), 'Error data is not Array');
      assert.deepEqual(r.data, [ error, error ], 'Invalid error data');
    });

    it('should apply Required by default', function () {
      const error = 'ERROR';
      const requiredError = 'REQUIRED!';
      const v = Each(Check(e => e > 0, error), { requiredMessage: requiredError });
      const data = [undefined, 1, 2];

      const r = v(data);

      assert(r instanceof ValidationError, 'Result is not error');
      assert.deepEqual(r.data, { 0: requiredError }, 'Invalid error data');
    });

    it('should not apply Required if another accessor is set', function () {
      const error = 'ERROR';
      const v = Each(Optional(Check(e => e > 0, error)));
      const data = [undefined, 1, 2];

      const r = v(data);

      assert.deepEqual(r, data, 'Invalid result')
    });

    it('should compose nested validators', function () {
      const error = 'ERROR';
      const v = Each([
        Check(a => a > 0),
        Check(a => a < 10),
      ]);

      assert.deepEqual(v([1, 2]), [1, 2], 'Invalid result');
      assert(v([0, 1]) instanceof ValidationError, 'Result is not error');
      assert(v([1, 11]) instanceof ValidationError, 'Result is not error');
    });
  });

  describe('Keys', function () {
    it('should validate values', function () {
      const v = Keys({
        a: Check(a => a > 0),
        c: Optional(c => c >= 5, 5),
      });

      const data = { a: 1, b: 2 };

      const r = v(data);

      assert.deepEqual(r, { a: 1, c: 5 }, 'Invalid result');
      assert(!('b' in r), 'Contains invalid key');
    });

    it('should return error', function () {
      const error = 'ERROR';

      const v = Keys({
        a: Check(a => a > 0, error)
      });

      const data = {
        a: 0,
        b: 2,
      };

      const r = v(data);

      assert(r instanceof ValidationError, 'Result is not error');
      assert.deepEqual(r.data, { a: error }, 'Invalid error');
    });

    it('should compose nested validators', function () {
      const v = Keys({
        a: [
          Check(a => a > 0),
          Check(a => a < 10),
        ]
      });

      assert.deepEqual(v({ a: 1 }), { a: 1 }, 'Invalid result');
      assert(v({ a: 0 }) instanceof ValidationError, 'Result is not error');
      assert(v({ a: 10 }) instanceof ValidationError, 'Result is not error');
    });

    it('should handle non-objects', function () {
      const v = Keys({ a: Check(Number.isInteger) });
      const vOpt = Keys({ a: Optional(Check(Number.isInteger)) });

      assert(v('string is not object!') instanceof ValidationError, 'Result is not error');
      assert.deepEqual(vOpt('string is not object!'), {}, 'Invalid result');
    });
  });

  describe('Nullable', function () {
    it('should bypass if not null', function () {
      const v = Nullable(c => c > 0);

      assert.equal(v(1), 1, 'Invalid result');
      assert.equal(v(null), null, 'Result is not null');
    });

    it('should return default if null', function () {
      const v = Nullable(c => c > 0, 1);

      assert.equal(v(null), 1, 'Result is null');
    });

    it('should mark as value accessor', function () {
      const v = Nullable(c => c > 0);

      assert(isValueAccessor(v), 'Not a value accessor');
    });

    it('should compose nested validators', function () {
      const v = Nullable([
        Check(a => a > 0),
        Check(a => a < 10),
      ]);

      assert.equal(v(1), 1, 'Invalid result');
      assert(v(0) instanceof ValidationError, 'Result is not error');
      assert(v(10) instanceof ValidationError, 'Result is not error');
    });
  });

  describe('Optional', function () {
    it('should bypass if not null', function () {
      const v = Optional(c => c > 0);

      assert.equal(v(1), 1, 'Invalid result');
      assert.equal(v(undefined), undefined, 'Result is not null');
    });

    it('should return default if null', function () {
      const v = Optional(c => c > 0, 1);

      assert.equal(v(undefined), 1, 'Result is null');
    });

    it('should return bypass null', function () {
      const v = Optional(a => a == null ? 0 : 1);

      assert.equal(v(null), 0, 'Invalid result');
      assert.equal(v(5), 1, 'Invalid result');
    });

    it('should mark as value accessor', function () {
      const v = Optional(c => c > 0);

      assert(isValueAccessor(v), 'Not a value accessor');
    });

    it('should compose nested validators', function () {
      const v = Optional([
        Check(a => a > 0),
        Check(a => a < 10),
      ]);

      assert.equal(v(1), 1, 'Invalid result');
      assert(v(0) instanceof ValidationError, 'Result is not error');
      assert(v(10) instanceof ValidationError, 'Result is not error');
    });
  });

  describe('Required', function () {
    it('should bypass if defined', function () {
      const errorMsg = 'ERROR';
      const v = Required(c => c > 0, errorMsg);

      assert.equal(v(1), 1, 'Invalid result');

      const err = v(undefined);
      assert(err instanceof ValidationError, 'Result is not error');
      assert.equal(err.message, errorMsg, 'Invalid error message');
    });

    it('should mark as value accessor', function () {
      const v = Required(c => c > 0);

      assert(isValueAccessor(v), 'Not a value accessor');
    });

    it('should compose nested validators', function () {
      const v = Required([
        Check(a => a > 0),
        Check(a => a < 10),
      ]);

      assert.equal(v(1), 1, 'Invalid result');
      assert(v(0) instanceof ValidationError, 'Result is not error');
      assert(v(10) instanceof ValidationError, 'Result is not error');
    });

    it('should format error with function', function () {
      const POS_MSG = 'POS';
      const errorMsg = (val, arg) => (arg > 0 ? POS_MSG : 'NEG');
      const v = Required(value => value, errorMsg);

      const resPos = v(undefined, 1);
      assert(resPos instanceof ValidationError, 'Check result is not error');
      assert.equal(resPos.message, POS_MSG, 'Invalid error message');
    });
  });

  describe('Some', function () {
    it('should return first non error', function () {
      const v = Some([
        Check(c => c < 1),
        Check(c => c > 10),
      ]);

      assert.equal(v(0), 0, 'Invalid result');
      assert.equal(v(11), 11, 'Invalid result');
    });

    it('should return last error', function () {
      const errorMsg1 = 'MORE THAN 1';
      const errorMsg2 = 'LESS THAN 10';
      const v = Some([
        Check(c => c < 1, errorMsg1),
        Check(c => c > 10, errorMsg2),
      ]);

      const err = v(5);
      assert(err instanceof ValidationError, 'Result is not error');
      assert.equal(err.message, errorMsg2, 'Invalid error message');
    });

    it('should compose nested validators', function () {
      const v = Some([
        [Check(a => a > 0), Check(a => a < 10)],
        [Check(a => a > 20), Check(a => a < 30)],
      ]);

      assert.equal(v(1), 1, 'Invalid result');
      assert.equal(v(25), 25, 'Invalid result');
      assert(v(0) instanceof ValidationError, 'Result is not error');
      assert(v(15) instanceof ValidationError, 'Result is not error');
    });
  });

  describe('Const', function () {
    it('should work', function () {
      const v = Const(1);

      assert.equal(v(1), 1, 'Const returns invalid data');
      assert(v(4) instanceof ValidationError, 'Const result is not error');
    });
  });
});
