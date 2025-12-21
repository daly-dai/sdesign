import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
    },
  ],
  output: {
    target: 'web',
    distPath: 'dist',
    sourceMap: true,
    externals: [
      'react',
      'react-dom',
      'antd',
      'dayjs',
      'lucide-react',
      '@ant-design/icons',
    ],
  },
  plugins: [pluginReact(), pluginLess()],
});
