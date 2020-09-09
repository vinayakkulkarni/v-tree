import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import vue from 'rollup-plugin-vue';

export default [
  // ESM build to be used with webpack/rollup.
  {
    input: 'src/index.js',
    output: {
      format: 'esm',
      name: 'v-tree',
      file: 'dist/v-tree.esm.js',
    },
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      commonjs(),
      vue(),
    ],
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
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      commonjs(),
      vue(),
    ],
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
    plugins: [
      babel({
        exclude: 'node_modules/**',
      }),
      commonjs(),
      vue(),
    ],
    external: ['@vue/composition-api'],
  },
];
