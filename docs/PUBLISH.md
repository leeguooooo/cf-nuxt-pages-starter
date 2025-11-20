# 发布指南

## 发布到 npm

### 前置准备

1. 确保已登录 npm：
```bash
npm login
```

2. 检查包名是否可用（如果已发布过可跳过）：
```bash
npm view cf-nuxt-pages-kit
```

### 发布步骤

1. 更新版本号（根据需要选择）：
```bash
# 补丁版本 (0.1.0 -> 0.1.1)
npm version patch

# 次要版本 (0.1.0 -> 0.2.0)
npm version minor

# 主要版本 (0.1.0 -> 1.0.0)
npm version major
```

2. 发布到 npm：
```bash
npm publish
```

3. 推送到 GitHub：
```bash
git push && git push --tags
```

### 验证发布

发布后可以通过以下方式验证：

```bash
# 测试安装
npx cf-nuxt-pages-kit test-project

# 或全局安装测试
npm install -g cf-nuxt-pages-kit
create-cf-nuxt-pages test-project
```

### 发布内容

根据 `package.json` 中的 `files` 字段，只会发布以下内容：
- `create-project.mjs` - CLI 脚本
- `template/` - 模板目录
- `README.md` - 说明文档

其他文件（如 `website/`、`node_modules/` 等）不会被打包。

### 注意事项

- 确保 `template/` 目录包含所有必要的文件
- 发布前建议在本地测试 CLI 工具
- 版本号遵循语义化版本控制（SemVer）

