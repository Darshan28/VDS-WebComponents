import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'vds-select.ts'),
      name: 'VDSSelect',
      fileName: 'vds-select',
      formats: ['es']
    },
    rollupOptions: {
      external: ['lit', 'choices.js'],
      output: {
        globals: {
          lit: 'lit',
          'choices.js': 'Choices'
        },
        // Include CSS imports in the bundle
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'vds-select.css';
          }
          return assetInfo.name || 'asset';
        }
      }
    },
    cssCodeSplit: false, // Bundle all CSS into a single file
    sourcemap: true,
    minify: 'esbuild',
    outDir: 'dist'
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  }
});

