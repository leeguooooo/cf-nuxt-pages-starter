# Cloudflare Nuxt Pages Kit 官网

 Nuxt 4 静态官网，可作为脚手架的产品介绍页。默认内置中文 / 英文 / 日文三语言切换，并在 `/tutorial` 页面提供“无需服务器，免费搭建全栈/博客”的图文教程。

## 开发
```bash
pnpm install
pnpm dev
```

## 部署
```bash
pnpm build
wrangler pages deploy dist --project-name=<your-pages-project>
```

可以在 Cloudflare Pages 中同样使用 `wrangler.account-*.toml` 多账号方案，但官网通常只需要一个账号，因此示例仅提供 `wrangler.pages.toml`（单账号）。

或者直接运行脚本（默认项目名 `cf-nuxt-pages-kit-site`）：

```bash
pnpm run deploy
```
