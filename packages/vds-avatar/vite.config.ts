import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'vds-avatar.ts'),
      name: 'VDSAvatar',
      fileName: 'vds-avatar',
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

