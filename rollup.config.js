import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';


const isProd = process.env.NODE_ENV === 'production';
const format = process.env.BABEL_ENV || 'umd';

const isES = format === 'es';
const file = 'dist/trava' +
  (format !== 'umd' ? '.' + format : '') +
  (isProd ? '.min' : '') +
  '.js';

const input = 'src/trava.js'; // TODO isES ? 'src/trava.js' : 'src/trava.shim.js';


export default {
  input,
  output: {
    file,
    format,
    name: 'Trava',
    sourcemap: true,
  },
  plugins: [
    eslint({configFile: '.eslintrc'}),
    resolve(),
    babel(),
    !isES && commonjs(),
    isProd && terser()
  ]
}
