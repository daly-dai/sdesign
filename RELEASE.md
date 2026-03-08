# 版本发布说明

## v1.3.0 (2025-03-02)

### 🎯 发布概要

本次版本主要聚焦于 **Detail 组件重构优化**、**性能提升** 和 **文档完善**。包含多个组件的性能优化、代码结构改进以及完整的技术文档补充。

---

### 📋 发布检查清单

- [x] 版本号更新 (`package.json`)
- [x] 更新日志编写 (`CHANGELOG.md`)
- [x] 代码审查完成
- [x] 测试通过
- [x] 文档更新
- [ ] 构建成功
- [ ] 发布到 npm
- [ ] 创建 git tag

---

### 🚀 主要变更

#### 1. Detail 组件全面优化

**改进点：**

- 使用 React 18 `useId` 替代随机 key 生成，避免 hydration 不匹配
- 简化 `useDetail` hook，移除未使用的 `containerWidth` 逻辑
- 提取 `TYPE_RENDERERS` 到模块级别，避免每次渲染重新创建
- 优化 `getDetailVal` 和 `getItemLabelStyle` 函数实现
- 修复 `Array.isArray` 类型检查问题
- 新增 471 行完整技术文档

**影响范围：**

- 性能提升：减少不必要的重渲染
- 代码量减少：约 108 行
- 可维护性：更好的类型定义和代码结构

#### 2. Form 组件增强

- 支持 Ant Design Form 方法和组件
- 性能监控功能
- 丰富的示例文档

#### 3. SearchTable 组件改进

- 删除数据后自动刷新
- 外部表单集成支持
- 自动初始化数据请求
- 错误处理优化

#### 4. 性能优化

- Button 组件紧凑模式
- Input 组件 `useCallback` 优化
- Form 组件性能提升

---

### 📦 安装/升级

```bash
# 新安装
pnpm add @dalydb/sdesign

# 升级
pnpm update @dalydb/sdesign

# 指定版本
pnpm add @dalydb/sdesign@1.3.0
```

---

### 🔗 相关链接

- [更新日志](./CHANGELOG.md)
- [Detail 技术文档](./docs/components/detail-documentation.md)
- [npm 包页面](https://www.npmjs.com/package/@dalydb/sdesign)

---

### 🙏 贡献者

感谢所有为本次版本做出贡献的开发者！

---

### 📞 问题反馈

如果在升级过程中遇到任何问题，请通过以下方式反馈：

- 提交 [Issue](https://github.com/your-repo/sdesign/issues)
- 查看 [文档](https://your-docs-url.com)

---

## 历史版本

| 版本  | 发布日期   | 主要变更                            |
| ----- | ---------- | ----------------------------------- |
| 1.3.0 | 2025-03-02 | Detail 组件重构、性能优化、文档完善 |
| 1.2.1 | 2024-XX-XX | peerDependencies 更新               |
| 1.2.0 | 2024-XX-XX | 移除上传组件、useSearchTable 优化   |
| 1.1.6 | 2024-XX-XX | 组件性能优化                        |
