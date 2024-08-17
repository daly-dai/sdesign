const themeConfig = {
  name: '@daly/sdesign',
  apiHeader: {
    // 组件库包名，可以从 package.json 中引入名称
    pkg: '@daly/sdesign',
    sourceUrl: false,
    docUrl: false,
    // 匹配路由，默认为 /api 或 /components
    match: ['/components', '/tools'],
  },
  apiParser: {},
  // logo: '/pc/favicon.ico',
  rtl: true,
  resolve: {
    // 配置入口文件路径，API 解析将从这里开始
    entryFile: './src/index.tsx',
  },
  // 单语言时配置数组即可
  nav: [
    { title: '基础组件', link: '/components' },
    { title: '业务模板', link: '/template' },
    { title: '日志', link: '/version' },
  ],
};

export default themeConfig;
