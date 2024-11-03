# @dalydb/sdesign

### 基于 antd 二次封装的业务组件，主要用于提升管理页面相关业务组件的复用性。

## Usage

<!-- TODO -->

## Options

<!-- TODO -->

## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ npm run dev

# build library source code
$ npm run build

# build library source code in watch mode
$ npm run build:watch

# build docs
$ npm run docs:build

# check your project for potential problems
$ npm run doctor
```

## css in js 方案

```bash
# 基于 antd-style进行css in js 改造
$ pnpm install antd-style
```

## LICENSE

MIT

## 分支说明

| 分支名      | 描述     |
| ----------- | -------- |
| master      | 无用分支 |
| prod        | 正式分支 |
| dev         | 开发分支 |
| feature\_\* | 功能分支 |

## 重复代码检查

```bash
npm install -g jscpd

jscpd ./src -o 'report'
```
