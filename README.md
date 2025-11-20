# Cloudflare Nuxt Pages Kit

Cloudflare Pages + Nuxt 4 的全栈脚手架，预置 D1、Pinia、Nitro 配置，并支持多 Cloudflare 账号/项目一键部署。同时提供 Nuxt 官网模板，方便搭建产品站点。

- ✅ 多账号 Wrangler 流程（`wrangler.account-*.toml` + 自动复制脚本）
- ✅ 一键复制模板并初始化依赖
- ✅ 文档/SQL/脚本齐全，可直接落地
- ✅ 官网（`website/`）同样基于 Nuxt + Pages
- ✅ 预置 `pnpm logs:test|prod`，自动切换账号并 tail Cloudflare Pages 日志
- ✅ 官网支持中文 / English / 日本語 三语言切换，并附带零服务器教程页（/tutorial）

## 快速开始

### 使用 CLI 工具（推荐）

```bash
# 使用 npx（无需安装）
npx cf-nuxt-pages-kit my-app

# 或全局安装后使用
npm install -g cf-nuxt-pages-kit
create-cf-nuxt-pages my-app

cd my-app
pnpm install
pnpm wrangler:config:test && pnpm dev
```

### 从源码使用

```bash
# 复制模板到 ./my-admin
node create-project.mjs my-admin

cd my-admin
pnpm install
pnpm deploy:test
```

官网示例请参考 `website/README.md`。

## 在脚手架仓库内开发

```bash
# 安装所有子包依赖
pnpm install

# 运行模板示例
pnpm template:dev

# 运行官网
pnpm website:dev

# （可选）部署官网（默认 project name cf-nuxt-pages-kit-site）
cd website && pnpm deploy
```

> `pnpm-workspace.yaml` 将 `template/` 与 `website/` 纳入工作空间，根目录执行 `pnpm install` 即可一次性安装所有依赖。
