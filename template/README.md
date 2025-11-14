# Cloudflare Nuxt Pages Kit（模板）

Nuxt 4 + Cloudflare Pages + D1 的基础模板，内置多账号 Wrangler 配置和部署脚本。

## 技术栈
- Nuxt 4（SPA + Pinia）
- Cloudflare Pages + D1
- Wrangler 多账号脚本

## 快速开始
```bash
pnpm install
pnpm wrangler:config:test
pnpm dev
```

## 部署
- 测试：`pnpm deploy:test`
- 生产：`pnpm deploy:prod`

## 监听日志
- 测试：`pnpm logs:test`
- 生产：`pnpm logs:prod`

更多细节见 `docs/DEPLOY.md` 与 `docs/WRANGLER_CONFIG.md`。
