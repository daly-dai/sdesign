import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
    exclude: ['**/demo/**', '**/demos/**', '**/*.md'],
  },
  tools: {
    rspack: (config, { rspack }) => {
      config.plugins?.push(
        new rspack.IgnorePlugin({
          // 过滤所有md文件和/demo或者demos目录下的所有文件
          resourceRegExp: /\.md$/, // 忽略 md 文件
          contextRegExp: /(demo|demos|docs)/, // 忽略 demo/demos 目录下的所有文件
        }),
      );
      return config;
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: 'esm',
      // autoExternal: true,
      output: {
        externals: [
          'react',
          'react-dom',
          'antd',
          'dayjs',
          'lucide-react',
          '@ant-design/icons',
        ],
        distPath: './dist/esm',
      },
    },
    {
      bundle: false,
      dts: true,
      format: 'cjs',
      autoExternal: true,
      output: {
        externals: [
          'react',
          'react-dom',
          'antd',
          'dayjs',
          'lucide-react',
          '@ant-design/icons',
        ],
        distPath: './dist/cjs',
      },
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
  plugins: [
    pluginReact(),
    pluginLess(),
    // new IgnorePlugin({
    //   // 过滤所有md文件和/demo或者demos目录下的所有文件
    //   resourceRegExp: /\.md$/,
    //   contextRegExp: /\/(demo|demos)$/,
    // }),
  ],
});
