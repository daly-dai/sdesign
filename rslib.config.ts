import { pluginLess } from '@rsbuild/plugin-less';
import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig, rspack } from '@rslib/core';

export default defineConfig({
  source: {
    entry: {
      index: ['./src/**'],
    },
  },
  tools: {
    rspack: (config, {}) => {
      config.module?.rules?.push({
        test: /\.md$/, // 忽略 md 文件
        // 忽略所有md文件,/demo/demos/docs目录下的所有文件
        exclude: [/\.md$/, /\/demo\//, /\/demos\//],
        loader: 'ignore-loader',
      });

      config.plugins?.push(
        new rspack.IgnorePlugin({
          // 过滤所有md文件和/demo或者demos目录下的所有文件
          resourceRegExp: /\.md$/, // 忽略 md 文件
        }),
      );

      config.plugins?.push(
        new rspack.IgnorePlugin({
          resourceRegExp: /\/(demo|demos)\/.*/, // 匹配任意路径下的 demo/ 或 demos/ 子目录
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
  },
  plugins: [pluginReact(), pluginLess()],
});
