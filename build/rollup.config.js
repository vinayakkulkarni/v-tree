import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import vue from 'rollup-plugin-vue';
import typescript from 'rollup-plugin-typescript2';

const extensions = ['.js', '.ts', '.vue'];

const plugins = [
  alias(),
  resolve({ extensions, browser: true }),
  babel({
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
  }),
  commonjs(),
  vue({ isWebComponent: true, template: { isProduction: true } }),
  typescript({
    include: [/\.tsx?$/, /\.vue\?.*?lang=ts/],
    useTsconfigDeclarationDir: true,
  }),
];
export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      name: 'v-tree',
      file: 'dist/v-tree.esm.js',
    },
    plugins,
    external: ['@vue/composition-api'],
  },
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      format: 'cjs',
      name: 'v-tree',
      file: 'dist/v-tree.cjs.js',
    },
    plugins,
    external: ['@vue/composition-api'],
  },
  // UMD build.
  {
    input: 'src/index.js',
    output: {
      format: 'umd',
      name: 'v-tree',
      file: 'dist/v-tree.js',
      globals: {
        '@vue/composition-api': 'vueCompositionApi',
      },
    },
    plugins,
    external: ['@vue/composition-api'],
  },
];
