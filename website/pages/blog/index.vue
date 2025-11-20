<script setup lang="ts">
type PostCard = {
  slug: string
  title: string
  excerpt: string
  topic: string
  readingTime: string
  highlights: string[]
}

const posts: PostCard[] = [
  {
    slug: 'edge-ready-admin',
    title: 'Edge Ready Nuxt Admin：Cloudflare Pages + D1 实战',
    excerpt:
      '如何把脚手架复制后的模板，在 5 分钟内部署到 preview、完成 D1 schema 初始化并做好日志观测，这篇文章给出端到端的流程。',
    topic: 'Architecture',
    readingTime: '8 min',
    highlights: ['Multi-account', 'D1 migrations'],
  },
  {
    slug: 'wrangler-observability',
    title: 'Wrangler 自动化与日志体系：从脚本到 CI',
    excerpt:
      '将 scripts/use-wrangler-config.mjs 融入流水线，在不同账号间切换并 tail pages 日志，构建「一次成型」的基础设施防线。',
    topic: 'DevOps',
    readingTime: '6 min',
    highlights: ['CI-ready', 'Logs'],
  },
  {
    slug: 'marketing-i18n',
    title: '多语言官网的 UX 设计：@nuxt/ui + Cloudflare Pages',
    excerpt:
      '官网如何同时服务中文 / English / 日本語 用户？本文分享 Hero、模块拆解与暗色模式兼容策略，让营销站真正可交付。',
    topic: 'UX',
    readingTime: '5 min',
    highlights: ['i18n', 'Dark Mode'],
  },
]
</script>

<template>
  <div class="blog-page">
    <header class="hero">
      <p class="label">Blog</p>
      <h1>Cloudflare Nuxt Pages Kit 知识库</h1>
      <p>
        深入解析脚手架的工程与体验决策，涵盖 Edge 架构、Wrangler 自动化、i18n 体验设计等主题。以下每一篇都可直接应用在你的
        Cloudflare Pages 项目里。
      </p>
    </header>

    <section class="grid">
      <article v-for="post in posts" :key="post.slug" class="card">
        <div class="meta">
          <span class="badge">{{ post.topic }}</span>
          <span class="time">{{ post.readingTime }}</span>
        </div>
        <h2>{{ post.title }}</h2>
        <p class="excerpt">{{ post.excerpt }}</p>
        <ul class="highlights">
          <li v-for="tag in post.highlights" :key="tag">{{ tag }}</li>
        </ul>
        <NuxtLink class="link" :to="`/blog/${post.slug}`">阅读文章 →</NuxtLink>
      </article>
    </section>
  </div>
</template>

<style scoped>
.blog-page {
  padding: 3rem clamp(1.5rem, 5vw, 4rem);
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.hero {
  background: linear-gradient(130deg, #0f172a, #312e81);
  color: #f8fafc;
  padding: clamp(2rem, 5vw, 3rem);
  border-radius: 2rem;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.35em;
  font-size: 0.8rem;
  opacity: 0.75;
}

.hero p {
  max-width: 52rem;
  line-height: 1.6;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.5rem;
}

.card {
  border-radius: 1.5rem;
  padding: 1.75rem;
  border: 1px solid rgba(15, 23, 42, 0.1);
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.08);
}

.meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  color: rgba(15, 23, 42, 0.65);
}

.badge {
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
  padding: 0.2rem 0.9rem;
  border-radius: 999px;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.time {
  font-size: 0.85rem;
}

.excerpt {
  color: rgba(15, 23, 42, 0.75);
  line-height: 1.6;
}

.highlights {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.highlights li {
  background: rgba(99, 102, 241, 0.12);
  color: #4c1d95;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.85rem;
}

.link {
  font-weight: 600;
  color: #0f172a;
  text-decoration: none;
}

@media (prefers-color-scheme: dark) {
  .blog-page {
    background: #020617;
    color: #e2e8f0;
  }

  .card {
    background: rgba(2, 6, 23, 0.8);
    border-color: rgba(148, 163, 184, 0.2);
    color: inherit;
  }

  .excerpt {
    color: inherit;
  }

  .link {
    color: #a5b4fc;
  }
}
</style>
