import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'vds-dropdown-button.ts'),
      name: 'VDSDropdownButton',
      fileName: 'vds-dropdown-button',
      formats: ['es']
    },
    rollupOptions: {
      external: ['lit', '../vds-icon/vds-icon.js'],
      output: {
        globals: {
          lit: 'lit'
        }
      }
    },
    sourcemap: true,
    minify: 'esbuild',
    outDir: 'dist'
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  }
});

