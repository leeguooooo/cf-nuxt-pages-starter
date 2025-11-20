<script setup lang="ts">
const guides = [
  {
    title: 'Edge Ready Admin',
    body: '复制 template + 初始化 D1，preview 环境 5 分钟交付。',
    to: '/blog/edge-ready-admin',
  },
  {
    title: 'Wrangler 自动化',
    body: '多账号配置、日志 tail、SQL 执行一键完成。',
    to: '/blog/wrangler-observability',
  },
  {
    title: '多语言官网 UX',
    body: '@nuxt/ui + Pages 构建真正可上线的营销站点。',
    to: '/blog/marketing-i18n',
  },
]
</script>

<template>
  <div class="tutorial">
    <header class="hero">
      <p class="label">Serverless Playbook</p>
      <h1>用 Cloudflare 免费完成 Nuxt 全栈交付</h1>
      <p>
        利用 Pages + D1 + Workers KV，我们可以零服务器成本迭代应用：管理员后台用 Cloudflare Nuxt Pages Kit 初始化，数据层使用 D1，存储通过 R2／KV 扩展，整条链路只需一个 Cloudflare 账号即可运行。
      </p>
    </header>

    <section class="grid">
      <article>
        <h2>基础设施</h2>
        <ul>
          <li>Cloudflare Pages：部署 Nuxt 产物与 Edge Functions</li>
          <li>D1：SQLite 兼容，支持 SQL / migrations / dashboard 查询</li>
          <li>KV & R2：用来缓存会话或托管静态资源</li>
          <li>Wrangler：管理多账号、tail 日志、执行 SQL</li>
        </ul>
      </article>
      <article>
        <h2>零服务器优势</h2>
        <p>
          不需要自建 CI/CD 与 VPS：Pages 在 push/tag 后自动构建，Workers 在 150+ Edge 节点运行，D1 原生跨区备份。你唯一要做的就是维护 `wrangler.account-*.toml` 与数据库迁移脚本。
        </p>
      </article>
    </section>

    <section class="steps">
      <h2>零服务器全栈流程</h2>
      <ol>
        <li>
          <p>安装 CLI 工具并创建项目：</p>
          <CopyableCode code="npm install -g cf-nuxt-pages-kit" language="bash" />
          <CopyableCode code="create-cf-nuxt-pages my-app" language="bash" />
          <p class="step-note">或使用 npx：<code>npx cf-nuxt-pages-kit my-app</code></p>
        </li>
        <li>
          <p>安装依赖并配置 Wrangler：</p>
          <CopyableCode code="cd my-app" language="bash" />
          <CopyableCode code="pnpm install && pnpm wrangler:config:test" language="bash" />
          <p>创建 D1 数据库：</p>
          <CopyableCode code="wrangler d1 create cf-nuxt-pages-db" language="bash" />
          <p class="step-note">将返回的 database_id 写入模板的 wrangler.account-test.toml</p>
        </li>
        <li>
          <p>部署到预览环境并查看日志：</p>
          <CopyableCode code="pnpm deploy:test" language="bash" />
          <CopyableCode code="pnpm logs:test" language="bash" />
        </li>
        <li>
          <p>部署到生产环境：</p>
          <CopyableCode code="pnpm deploy:prod" language="bash" />
          <p class="step-note">在 Cloudflare Dashboard 绑定自定义域名</p>
        </li>
      </ol>
    </section>

    <section class="blog">
      <h2>示例：5 步搭建博客</h2>
      <ol>
        <li>
          在 `pages/blog/index.vue` 中新增博客列表，数据源可以来自 D1：
          <pre><code>const entries = await useFetch('/api/posts')</code></pre>
        </li>
        <li>
          在 `server/api/posts.get.ts` 中查询 D1：
          <pre><code>const db = useRuntimeConfig().cloudflare.env.DB
return await db.prepare('SELECT * FROM posts ORDER BY published_at DESC').all()</code></pre>
        </li>
        <li>
          使用 `scripts/use-wrangler-config.mjs` 切到需要的账号，执行 `wrangler d1 migrations apply DB` 更新 schema。
        </li>
        <li>
          利用 Pages Functions 在 `/api/rss` 导出 RSS，或直接存储到 R2。
        </li>
        <li>
          `pnpm deploy:test` -> `pnpm deploy:prod`，博客就会上线到 Cloudflare Edge，完全无需传统服务器。
        </li>
      </ol>
    </section>

    <section class="guides">
      <h2>进阶教程</h2>
      <p>如果你已经跑通零服务器流程，继续深入这些站内文章，获取更细粒度的实践指南。</p>
      <div class="guides-grid">
        <NuxtLink v-for="item in guides" :key="item.title" :to="item.to" class="guide-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
          <span>阅读 →</span>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<style scoped>
.tutorial {
  padding: 3rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  color: #0f172a;
}

.hero {
  background: linear-gradient(135deg, #0f172a, #1d4ed8);
  color: #f8fafc;
  padding: 2.5rem;
  border-radius: 1.5rem;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.75rem;
  opacity: 0.8;
}

.grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

.grid article {
  border: 1px solid rgba(2, 6, 23, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  background: #fff;
  box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
}

.steps,
.blog {
  background: #fff;
  border-radius: 1.25rem;
  padding: 2rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.07);
}

ol {
  padding-left: 1.25rem;
  line-height: 1.6;
}

ol li {
  margin-bottom: 1.5rem;
}

ol li p {
  margin: 0.5rem 0;
  color: #334155;
}

.step-note {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0.5rem 0 0 0;
  font-style: italic;
}

.step-note code {
  background: rgba(99, 102, 241, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  color: #6366f1;
  font-style: normal;
}

pre {
  background: #0f172a;
  color: #f8fafc;
  padding: 0.8rem;
  border-radius: 0.75rem;
  overflow-x: auto;
}

code {
  font-family: 'JetBrains Mono', Menlo, Consolas, monospace;
  font-size: 0.9rem;
}

.guides {
  background: rgba(248, 250, 252, 0.95);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 15px 35px rgba(15, 23, 42, 0.08);
}

.guides-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.guide-card {
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 1rem;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (prefers-color-scheme: dark) {
  .tutorial {
    color: #e2e8f0;
    background: #020617;
  }

  .grid article,
  .steps,
  .blog {
    background: rgba(15, 23, 42, 0.8);
    border-color: rgba(148, 163, 184, 0.2);
    color: #e2e8f0;
  }

  pre {
    background: rgba(2, 6, 23, 0.9);
  }

  .guides {
    background: rgba(15, 23, 42, 0.8);
    border-color: rgba(148, 163, 184, 0.2);
  }
}
</style>
