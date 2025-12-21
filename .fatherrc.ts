import { defineConfig } from 'father';

export default defineConfig({
  // more father config: https://github.com/umijs/father/blob/master/docs/config.md
  esm: {
    output: 'dist',
    ignores: ['**/tests/**', '**/_tests_/**'],
  },
  cjs: { output: 'dist', ignores: ['**/tests/**', '**/_tests_/**'] },
  sourcemap: true,
  prebundle: {
    // 配置需要预打包的三方依赖
    deps: {
      react: {
        minify: true, // 开启代码压缩
        dts: true, // 打包类型声明文件
      },
      'react-dom': {
        minify: true,
        dts: true,
      },
      antd: {
        minify: true,
        dts: true,
      },
      '@ant-design/icons': {
        minify: true,
        dts: true,
      },
      dayjs: {
        minify: true,
        dts: true,
      },
      'lucide-react': {
        minify: true,
        dts: true,
      },
    },
    // 指定预打包产物的输出目录
    output: 'compiled',
  },
});
