import Trava from '../src/trava';
import Compose from '../src/operators/Compose';
import Check from '../src/operators/Check';
import Optional from '../src/operators/Optional';
import assert from 'assert';


describe('Trava root', function () {
  it('create validator if 1 arg', function () {
    const scheme = {
      a: [
        Check(a => a > 0),
        Check(a => a < 10),
      ],
      b: {
        c: Optional(c => c > 5, 10),
      },
    };

    const data = {
      a: 5,
      b: { }
    };

    const tv = Trava(scheme);
    const cv = Compose(scheme);

    assert.deepEqual(tv(data), cv(data), 'Incorrect result');
  });

  it('create validator and validate if 2 args', function () {
    const scheme = {
      a: [
        Check(a => a > 0),
        Check(a => a < 10),
      ],
      b: {
        c: Optional(c => c > 5, 10),
      },
    };

    const data = {
      a: 5,
      b: { }
    };

    const tres = Trava(scheme, data);
    const cv = Compose(scheme);

    assert.deepEqual(tres, cv(data), 'Incorrect result');
  });
});
