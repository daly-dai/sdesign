import { defineConfig } from 'dumi';

import themeConfig from './config';
// 站点配置
export default defineConfig({
  base: '/sdesign',
  outputPath: 'docs-dist',
  publicPath: '/sdesign/',
  resolve: {
    // 组件的文档目录
    atomDirs: [{ type: 'component', dir: 'src/components' }],
  },
  alias: {
    '@': './src',
    '@daly/sdesign': '/src',
    '@daly/sdesign/*': '/src/*',
  },
  // mako: {},
  themeConfig,
  analyze: {},
  favicons: [`/sdesign/favicon.ico`],
});
