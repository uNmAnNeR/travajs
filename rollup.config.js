import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { eslint } from 'rollup-plugin-eslint';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';


const format = process.env.BABEL_ENV || 'umd';

const isES = format.indexOf('es') === 0;
const basePath = 'dist/trava' + (format !== 'umd' ? '.' + format : '');


export default [false, true].map(min => ({
  input: `src/trava${format === 'umd' ? '.umd' : ''}.js`,
  output: {
    file: `${basePath}${min ? '.min' : ''}.js`,
    format,
    name: 'Trava',
    sourcemap: true,
  },
  plugins: [
    eslint({configFile: '.eslintrc'}),
    resolve(),
    babel(),
    !isES && commonjs(),
    min && terser(),
  ],
}));
