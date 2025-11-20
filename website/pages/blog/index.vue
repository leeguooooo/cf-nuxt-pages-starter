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
    <div class="bg-gradient"></div>
    
    <div class="container">
      <header class="hero">
        <p class="label">Engineering Blog</p>
        <h1>Insights & <br><span class="gradient-text">Best Practices</span></h1>
        <p class="subtitle">
          深入解析脚手架的工程与体验决策，涵盖 Edge 架构、Wrangler 自动化、i18n 体验设计等主题。
        </p>
      </header>

      <section class="grid">
        <article v-for="post in posts" :key="post.slug" class="card-wrapper">
          <NuxtLink :to="`/blog/${post.slug}`" class="card">
            <div class="card-content">
              <div class="meta-top">
                <span class="badge">{{ post.topic }}</span>
                <span class="time">{{ post.readingTime }}</span>
              </div>
              
              <h2>{{ post.title }}</h2>
              <p class="excerpt">{{ post.excerpt }}</p>
              
              <div class="footer">
                <ul class="highlights">
                  <li v-for="tag in post.highlights" :key="tag">#{{ tag }}</li>
                </ul>
                <span class="read-more">Read Article →</span>
              </div>
            </div>
          </NuxtLink>
        </article>
      </section>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
  position: relative;
  min-height: 100vh;
  padding: 4rem clamp(1.5rem, 5vw, 4rem);
  font-family: 'Inter', sans-serif;
  color: #1e293b;
}

.bg-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, rgba(255, 255, 255, 0) 50%);
  z-index: -1;
  pointer-events: none;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

/* Hero */
.hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem 0;
}

.label {
  font-size: 0.875rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #6366f1;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  line-height: 1.1;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.03em;
}

.gradient-text {
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.125rem;
  color: #64748b;
  max-width: 600px;
  line-height: 1.6;
}

/* Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 2rem;
}

.card-wrapper {
  perspective: 1000px;
}

.card {
  display: block;
  height: 100%;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 1.5rem;
  text-decoration: none;
  color: inherit;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.card:hover {
  transform: translateY(-8px) scale(1.01);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  border-color: rgba(99, 102, 241, 0.3);
  background: rgba(255, 255, 255, 0.9);
}

.card-content {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
}

.meta-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.badge {
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.time {
  font-size: 0.875rem;
  color: #94a3b8;
  font-variant-numeric: tabular-nums;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.3;
  color: #0f172a;
  margin: 0;
}

.excerpt {
  color: #64748b;
  line-height: 1.6;
  flex-grow: 1;
}

.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(226, 232, 240, 0.6);
}

.highlights {
  display: flex;
  gap: 0.75rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.highlights li {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
}

.read-more {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6366f1;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.card:hover .read-more {
  opacity: 1;
  transform: translateX(0);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .blog-page {
    background: #020617;
    color: #e2e8f0;
  }

  .bg-gradient {
    background: radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.15) 0%, rgba(2, 6, 23, 0) 50%);
  }

  h1 { color: #f8fafc; }
  .subtitle { color: #94a3b8; }

  .card {
    background: rgba(30, 41, 59, 0.4);
    border-color: rgba(255, 255, 255, 0.05);
  }

  .card:hover {
    background: rgba(30, 41, 59, 0.8);
    border-color: rgba(99, 102, 241, 0.5);
  }

  h2 { color: #f8fafc; }
  .excerpt { color: #cbd5e1; }
  .time { color: #64748b; }
  
  .footer {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
  
  .highlights li { color: #94a3b8; }
}
</style>
