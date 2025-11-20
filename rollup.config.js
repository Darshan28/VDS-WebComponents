import typescript from '@rollup/plugin-typescript';
import { resolve } from 'path';

export default {
  input: 'packages/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: true,
    entryFileNames: '[name].js'
  },
  external: ['lit'],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist',
      rootDir: './packages'
    })
  ]
};

