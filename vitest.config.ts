import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: './tests/test-setup.ts',
    environment: 'jsdom',
    globals: true,
    alias: {
      '@': './src',
      '@dalydb/sdesign': '/src',
      '@dalydb/sdesign/*': '/src/*',
    },
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'json', 'lcov'],
    },
  },
});
