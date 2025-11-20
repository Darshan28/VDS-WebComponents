import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
    include: ['packages/**/*.a11y.test.ts', 'packages/**/*.a11y.spec.ts'],
    setupFiles: ['./tests/a11y-setup.ts']
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './packages')
    }
  }
});

