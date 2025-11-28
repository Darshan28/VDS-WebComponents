import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'vds-tab.ts'),
      name: 'VDSTab',
      fileName: 'vds-tab',
      formats: ['es']
    },
    rollupOptions: {
      external: ['lit', '@vds/tab-item', '@vds/button', '@vds/icon'],
      output: {
        globals: {
          lit: 'lit',
          '@vds/tab-item': '@vds/tab-item',
          '@vds/button': '@vds/button',
          '@vds/icon': '@vds/icon'
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

