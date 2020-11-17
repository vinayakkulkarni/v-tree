import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import vue from 'rollup-plugin-vue';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.js', '.ts', '.vue'];

export default {
  input: 'src/index.js',
  output: {
    format: 'umd',
    name: 'v-tree',
    file: 'dist/v-tree.min.js',
    globals: {
      '@vue/composition-api': 'vueCompositionApi',
    },
  },
  plugins: [
    alias(),
    resolve({ extensions, browser: true }),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
    }),
    commonjs(),
    terser(),
    vue({ isWebComponent: true, template: { isProduction: true } }),
    typescript({
      include: [/\.tsx?$/, /\.vue\?.*?lang=ts/],
      useTsconfigDeclarationDir: true,
    }),
  ],
  external: ['@vue/composition-api'],
};
