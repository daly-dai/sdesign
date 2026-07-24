import path from 'node:path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    alias: {
      '@dalydb/sdesign': path.resolve(__dirname, 'src'),
      '@dalydb/sdesign/hooks': path.resolve(__dirname, 'src/hooks'),
      '@dalydb/sdesign/utils': path.resolve(__dirname, 'src/utils'),
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/__tests__/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/demos/**', 'src/**/index.md', 'src/**/metadata.json'],
    },
  },
});
