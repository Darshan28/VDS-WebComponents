import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command, mode }) => {
  const isLibraryBuild = command === 'build' && mode === 'production';
  
  return {
    resolve: {
      alias: {
        '@': resolve(__dirname, './packages')
      },
      extensions: ['.mjs', '.js', '.mts', '.ts', '.jsx', '.tsx', '.json']
    },
    optimizeDeps: {
      include: ['lit', 'lit/decorators.js', 'lit/directives/class-map.js']
    },
    esbuild: {
      target: 'es2020',
      format: 'esm'
    },
    ...(isLibraryBuild && {
      build: {
        lib: {
          entry: resolve(__dirname, 'packages/index.ts'),
          name: 'VDSWebComponents',
          fileName: 'index',
          formats: ['es']
        },
        rollupOptions: {
          external: ['lit'],
          output: {
            globals: {
              lit: 'lit'
            }
          }
        },
        sourcemap: true,
        minify: 'esbuild'
      }
    }),
    test: {
      globals: true,
      environment: 'happy-dom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
        exclude: [
          'node_modules/',
          'dist/',
          '**/*.test.ts',
          '**/*.spec.ts',
          '**/*.config.ts',
          'docs-site/'
        ],
        lines: 80,
        functions: 80,
        branches: 80,
        statements: 80
      }
    }
  };
});

