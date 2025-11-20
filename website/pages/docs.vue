<script setup lang="ts">
type DocSection = {
  title: string
  intro: string
  items: Array<{ label: string; body: string }>
}

const sections: DocSection[] = [
  {
    title: '架构概览',
    intro:
      'Cloudflare Pages + Nuxt 4 + D1 的职责划分：前端与 Edge Functions 走 Pages 项目，数据层由 D1/KV/R2 支持，Wrangler 负责连接账号与部署。',
    items: [
      { label: 'Pages', body: '部署 Nuxt 产物与 Functions，preview/prod 双环境自动化。' },
      { label: 'D1', body: 'SQLite 兼容的数据库，使用 schema/test-data.sql 管理变更。' },
      { label: 'Wrangler', body: '脚本切换账号、执行 migrations、tail 日志。' },
    ],
  },
  {
    title: 'DevOps 流水线',
    intro:
      '一次成型的 CI/CD，需要将 wrangler 配置、构建、部署、日志追踪收敛到一套脚本中。以下步骤可直接写入 GitHub Actions 或自托管流水线。',
    items: [
      { label: 'Step 1', body: 'pnpm install && pnpm lint：保证模板/官网同时通过静态检查。' },
      { label: 'Step 2', body: 'pnpm wrangler:config:test && pnpm template:build：切换账号并构建应用。' },
      {
        label: 'Step 3',
        body: 'wrangler pages deploy dist：Cloudflare 自动分发到 Edge；pnpm logs:test 校验结果。',
      },
    ],
  },
  {
    title: '产品体验',
    intro:
      '官网 + 模板组成双引擎：网站负责讲述产品故事，模板为业务方提供可扩展的 Nuxt 项目。下面的体验建议可以直接执行。',
    items: [
      { label: '多语言', body: '沿用 pages/index.vue 的 messages 数据结构，快速扩充语言。' },
      { label: '教程', body: 'tutorial.vue 提供零服务器流程，可新增更多步骤与截图。' },
      { label: '博客', body: '/blog/[slug].vue 封装文章结构，可持续扩展内容。' },
    ],
  },
]

const quickLinks = [
  {
    title: 'Edge Ready Nuxt Admin',
    body: '把 template/ 推向 preview & prod，并附带 D1 初始化流程。',
    to: '/blog/edge-ready-admin',
  },
  {
    title: 'Wrangler 自动化',
    body: '脚本驱动的多账号配置与日志追踪，解决环境漂移问题。',
    to: '/blog/wrangler-observability',
  },
  {
    title: 'Serverless Tutorial',
    body: '零服务器交付的 4 个阶段，含 CLI、D1、deploy、prod 域名绑定。',
    to: '/tutorial',
  },
]

const faqs = [
  {
    q: '为什么脚手架默认只包含 template 与 website？',
    a: 'Monorepo 仅保留最核心的两个包，避免额外维护成本；真正的业务项目通过 create-project CLI 复制 template 即可。',
  },
  {
    q: '如何扩展更多 API？',
    a: 'Nuxt 4 + Nitro 已预置 Cloudflare Pages preset，可直接在 server/api 内新增 *.ts，或通过 server/middleware 处理认证。',
  },
  {
    q: 'CI/CD 是否支持多账号？',
    a: '是的，wrangler.account-*.toml + scripts/use-wrangler-config.mjs 可以在 job 中切换 test/prod，保证 preview/prod 互不污染。',
  },
]
</script>

<template>
  <div class="docs">
    <header class="hero">
      <p class="label">Docs</p>
      <h1>Cloudflare Nuxt Pages Kit 文档</h1>
      <p>
        本页汇总了脚手架的核心概念、运维流程与体验建议，适合在实现纵队 / 重构纵队 / 向上管理纵队之间共享，确保所有流程、接口契约一次成型。
      </p>
      <div class="cta">
        <NuxtLink to="/blog" class="ghost">阅读博客</NuxtLink>
        <NuxtLink to="/tutorial" class="primary">立即实践</NuxtLink>
      </div>
    </header>

    <section v-for="section in sections" :key="section.title" class="section card">
      <div class="head">
        <h2>{{ section.title }}</h2>
        <p>{{ section.intro }}</p>
      </div>
      <div class="items">
        <article v-for="item in section.items" :key="item.label">
          <p class="eyebrow">{{ item.label }}</p>
          <p>{{ item.body }}</p>
        </article>
      </div>
    </section>

    <section class="quick card">
      <div class="head">
        <h2>Knowledge Hub</h2>
        <p>从这里跳到文章或教程，持续加深理解。</p>
      </div>
      <div class="quick-grid">
        <NuxtLink v-for="item in quickLinks" :key="item.title" :to="item.to" class="quick-card">
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
          <span>查看详情 →</span>
        </NuxtLink>
      </div>
    </section>

    <section class="faq card">
      <div class="head">
        <h2>FAQs</h2>
        <p>团队内最常见的 3 个问题，保持跨战线对齐。</p>
      </div>
      <div class="faq-list">
        <article v-for="item in faqs" :key="item.q">
          <h3>{{ item.q }}</h3>
          <p>{{ item.a }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<style scoped>
.docs {
  padding: 3rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: #0f172a;
}

.hero {
  background: linear-gradient(140deg, #fdf2f8, #eff6ff);
  border-radius: 2rem;
  padding: clamp(2rem, 5vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.4em;
  color: rgba(15, 23, 42, 0.5);
  font-size: 0.8rem;
}

.cta {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.cta .ghost,
.cta .primary {
  text-decoration: none;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  font-weight: 600;
}

.ghost {
  border: 1px solid rgba(15, 23, 42, 0.2);
  color: #0f172a;
}

.primary {
  background: linear-gradient(120deg, #ec4899, #6366f1);
  color: #fff;
}

.card {
  border-radius: 1.5rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #fff;
  padding: 1.75rem;
  box-shadow: 0 25px 45px rgba(15, 23, 42, 0.08);
}

.section .items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.eyebrow {
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.5);
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.quick-card {
  border: 1px solid rgba(99, 102, 241, 0.2);
  border-radius: 1rem;
  padding: 1.25rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.faq-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

@media (prefers-color-scheme: dark) {
  .docs {
    background: #020617;
    color: #e2e8f0;
  }

  .card {
    background: rgba(2, 6, 23, 0.8);
    border-color: rgba(148, 163, 184, 0.25);
  }

  .hero {
    background: linear-gradient(140deg, rgba(236, 72, 153, 0.25), rgba(99, 102, 241, 0.25));
  }
}
</style>
