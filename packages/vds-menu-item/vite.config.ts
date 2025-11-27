import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'vds-menu-item.ts'),
      name: 'VDSMenuItem',
      fileName: 'vds-menu-item',
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
    minify: 'esbuild',
    outDir: 'dist'
  },
  test: {
    globals: true,
    environment: 'happy-dom'
  }
});

