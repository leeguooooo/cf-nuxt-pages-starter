<script setup lang="ts">
type Metric = { label: string; value: string; helper: string }
type Feature = { title: string; description: string; icon: string; highlight: string }
type Integration = { name: string; description: string; icon: string; href: string; badge: string }
type Post = { title: string; description: string; href: string; tag: string; date: string }

const heroLinks = [
  {
    label: '立即使用',
    href: 'https://github.com/leeguooooo/cf-nuxt-pages-starter',
    icon: 'i-lucide-rocket',
  },
  {
    label: '查看教程',
    to: '/tutorial',
    color: 'gray',
    variant: 'soft',
    icon: 'i-lucide-graduation-cap',
  },
]

const metrics: Metric[] = [
  { label: '部署耗时', value: '5 min', helper: 'Wrangler 脚本一键同步 preview / prod' },
  { label: '示例 API', value: '9 个', helper: '封装 Pages Functions、D1、KV、R2 场景' },
  { label: '内置脚本', value: '12 个', helper: '环境切换、日志跟踪、seed 数据' },
]

const features: Feature[] = [
  {
    title: 'Cloudflare 原生体验',
    description: 'Pages、Workers、D1、KV 等产品被完整接入，脚本可切换多账号并自动注入环境变量。',
    icon: 'i-lucide-cloud',
    highlight: 'Cloudflare Stack',
  },
  {
    title: 'Nuxt 4 最佳实践',
    description: '采用服务端数据抓取、动态路由、Pinia 状态树与可复用布局，新项目直接复刻即可。',
    icon: 'i-lucide-layout-dashboard',
    highlight: 'Nuxt 4 + Pinia',
  },
  {
    title: '企业级发布流程',
    description: '内建 staging、preview、production 三套流程，并提供日志/回滚命令确保回归安全。',
    icon: 'i-lucide-shield-check',
    highlight: 'Preview Ready',
  },
  {
    title: '营销页与模板同源',
    description: '官网与业务模板共用一套组件与设计系统，更新一次即可在两个站点同步呈现。',
    icon: 'i-lucide-layers',
    highlight: 'UI Sync',
  },
]

const integrations: Integration[] = [
  {
    name: 'Cloudflare Pages',
    description: '自动发布 preview / production，支持自定义域名、分支预览与仪表盘监控。',
    href: 'https://pages.cloudflare.com/',
    icon: 'i-lucide-rocket',
    badge: 'Preview + Prod',
  },
  {
    name: 'Wrangler CLI',
    description: '脚本化配置切换、日志跟踪与部署；大部分命令封装进 package scripts。',
    href: 'https://developers.cloudflare.com/workers/wrangler/',
    icon: 'i-lucide-terminal',
    badge: 'Automation',
  },
  {
    name: 'Nuxt + Pinia',
    description: 'Nuxt 4 App Router、Server API 与 Pinia store 模式开箱即用，兼容 Vite 热更新。',
    href: 'https://nuxt.com/',
    icon: 'i-lucide-component',
    badge: 'Frontend Stack',
  },
]

const posts: Post[] = [
  {
    title: '让 Cloudflare Pages 真正具备全栈能力',
    description: '通过 D1 与 Functions 打造零服务器后端，模板内含 SQL 迁移、种子数据与 KV 缓存示例。',
    href: 'https://github.com/leeguooooo/cf-nuxt-pages-starter',
    tag: '架构',
    date: '2025-01-08',
  },
  {
    title: '多账号 Wrangler 流程如何落地',
    description: '使用 use-wrangler-config.mjs 脚本动态切换 account/项目，实现 preview、staging、prod 分离。',
    href: 'https://github.com/leeguooooo/cf-nuxt-pages-starter',
    tag: '部署',
    date: '2024-12-12',
  },
  {
    title: 'Nuxt 4 + Cloudflare Pages 的性能面板',
    description: '结合 Nitro Cloudflare preset、R2 缓存与 Edge 函数调度，把首屏与 API 时延控制在 100ms 内。',
    href: 'https://github.com/leeguooooo/cf-nuxt-pages-starter',
    tag: '性能',
    date: '2024-11-30',
  },
]
</script>

<template>
  <main class="landing">
    <section class="hero">
      <UContainer class="hero-shell">
        <div class="hero-content">
          <UBadge color="violet" variant="soft">Cloudflare Nuxt Pages Kit</UBadge>
          <h1>几分钟把 Nuxt 4 + Cloudflare Pages 推向线上</h1>
          <p>
            预设了多账号部署、Pages Functions API、D1 数据库迁移与日志脚本，帮你把产品快速发布到
            Cloudflare 边缘网络。本站同样使用 Nuxt + @nuxt/ui 构建，效果即所得。
          </p>
          <div class="hero-actions">
            <UButton
              v-for="link in heroLinks"
              :key="link.label"
              v-bind="link"
              size="lg"
              :target="link.href ? '_blank' : undefined"
            />
          </div>
          <div class="hero-metrics">
            <UCard
              v-for="metric in metrics"
              :key="metric.label"
              :ui="{ base: 'metric-card' }"
              class="metric-card"
            >
              <p class="label">{{ metric.label }}</p>
              <p class="value">{{ metric.value }}</p>
              <p class="helper">{{ metric.helper }}</p>
            </UCard>
          </div>
        </div>
        <UCard class="hero-panel" variant="soft">
          <template #header>
            <div class="panel-header">
              <div>
                <p class="panel-title">Cloudflare Workflow</p>
                <p class="panel-helper">Preview、Staging、Production</p>
              </div>
              <UBadge color="gray" variant="soft">自动化脚本</UBadge>
            </div>
          </template>
          <div class="panel-grid">
            <div>
              <p class="panel-label">部署命令</p>
              <code>pnpm deploy:test</code>
            </div>
            <div>
              <p class="panel-label">日志追踪</p>
              <code>pnpm logs:prod</code>
            </div>
            <div>
              <p class="panel-label">切换账号</p>
              <code>pnpm wrangler:config:prod</code>
            </div>
          </div>
          <UDivider label="内置模板" />
          <ul class="panel-list">
            <li>
              <UIcon name="i-lucide-check-circle" />
              完整的 Cloudflare Pages + Functions 模板
            </li>
            <li>
              <UIcon name="i-lucide-check-circle" />
              D1 schema、seed、clear 脚本
            </li>
            <li>
              <UIcon name="i-lucide-check-circle" />
              官网（website）与业务模板（template）双 repo
            </li>
          </ul>
        </UCard>
      </UContainer>
    </section>

    <section id="features" class="section">
      <UContainer>
        <header class="section-header">
          <UBadge color="gray" variant="soft">核心能力</UBadge>
          <div>
            <h2>开箱即用的 Cloudflare x Nuxt 工程体系</h2>
            <p>沿用官方设计系统，快速组合 Hero、Feature、Blog 等模块，减少自定义 CSS。</p>
          </div>
        </header>
        <div class="feature-grid">
          <UCard v-for="feature in features" :key="feature.title" class="feature-card" variant="outline">
            <div class="feature-icon">
              <UIcon :name="feature.icon" />
            </div>
            <div class="feature-copy">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p>
            </div>
            <UBadge variant="soft" color="violet">{{ feature.highlight }}</UBadge>
          </UCard>
        </div>
      </UContainer>
    </section>

    <section id="integrations" class="section muted">
      <UContainer>
        <header class="section-header">
          <UBadge color="gray" variant="soft">生态集成</UBadge>
          <div>
            <h2>面向实战的工具链</h2>
            <p>无论是发布流程、前端架构还是 CLI 自动化，都已经打包好最佳实践。</p>
          </div>
        </header>
        <div class="integration-grid">
          <UCard
            v-for="integration in integrations"
            :key="integration.name"
            class="integration-card"
            :ui="{ body: { padding: 'p-5' } }"
          >
            <div class="integration-head">
              <div class="icon">
                <UIcon :name="integration.icon" />
              </div>
              <div>
                <p class="integration-name">{{ integration.name }}</p>
                <p class="integration-desc">{{ integration.description }}</p>
              </div>
            </div>
            <div class="integration-footer">
              <UBadge variant="soft">{{ integration.badge }}</UBadge>
              <UButton
                :href="integration.href"
                target="_blank"
                rel="noopener"
                variant="ghost"
                icon="i-lucide-arrow-up-right"
                size="sm"
              >
                了解更多
              </UButton>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <section id="blog" class="section">
      <UContainer>
        <header class="section-header">
          <UBadge color="gray" variant="soft">最新动态</UBadge>
          <div>
            <h2>产品更新与深度文章</h2>
            <p>关注 Nuxt 4、Cloudflare Pages、D1 与边缘应用的最佳实践。</p>
          </div>
        </header>
        <div class="blog-grid">
          <UCard v-for="post in posts" :key="post.title" class="blog-card" variant="soft">
            <UBadge variant="outline">{{ post.tag }}</UBadge>
            <p class="blog-date">{{ post.date }}</p>
            <h3>{{ post.title }}</h3>
            <p>{{ post.description }}</p>
            <UButton
              :href="post.href"
              target="_blank"
              rel="noopener"
              icon="i-lucide-arrow-up-right"
              variant="ghost"
              class="blog-link"
            >
              阅读文章
            </UButton>
          </UCard>
        </div>
      </UContainer>
    </section>
  </main>
</template>

<style scoped>
.landing {
  background: linear-gradient(180deg, #f8fafc, #eef2ff 65%, #f8fafc);
  color: #0f172a;
}

.hero {
  padding: clamp(2rem, 4vw, 4rem) 0;
  background: radial-gradient(circle at 10% 20%, rgba(99, 102, 241, 0.25), transparent 50%), #f8fafc;
}

.hero-shell {
  display: grid;
  gap: 2.5rem;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
}

.hero-content h1 {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin-top: 1.25rem;
}

.hero-content p {
  color: #475569;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.75rem 0 0.5rem;
}

.hero-metrics {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
}

.metric-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 1rem;
}

.metric-card .label {
  font-size: 0.85rem;
  color: #64748b;
}

.metric-card .value {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0.25rem 0;
  color: #1e1b4b;
}

.metric-card .helper {
  font-size: 0.85rem;
  color: #64748b;
}

.hero-panel {
  background: #ffffff;
  border: 1px solid #e2e8f0;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.panel-title {
  font-weight: 600;
  margin: 0;
}

.panel-helper {
  font-size: 0.9rem;
  color: #64748b;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
  margin-bottom: 1rem;
}

.panel-label {
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 0.35rem;
}

.panel-grid code {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  background: #f1f5f9;
  padding: 0.35rem 0.75rem;
  border-radius: 0.5rem;
  display: inline-block;
}

.panel-list {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.panel-list li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #1e293b;
}

.panel-list :deep(svg) {
  color: #6366f1;
}

.section {
  padding: clamp(2.5rem, 5vw, 5rem) 0;
  background: transparent;
}

.section.muted {
  background: linear-gradient(180deg, #eef2ff, rgba(248, 250, 252, 0));
}

.section-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 2.5rem;
}

.section-header h2 {
  font-size: clamp(1.8rem, 3vw, 2.6rem);
  margin: 0;
}

.section-header p {
  color: #475569;
  max-width: 640px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.25rem;
}

.feature-card {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  background: #ffffff;
  border: 1px solid #e2e8f0;
}

.feature-icon {
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: rgba(99, 102, 241, 0.15);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #8b5cf6;
}

.feature-copy h3 {
  margin: 0;
  font-size: 1.25rem;
  color: #0f172a;
}

.integration-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.integration-head {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.integration-head .icon {
  width: 44px;
  height: 44px;
  border-radius: 12px;
  background: rgba(99, 102, 241, 0.1);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.integration-name {
  font-weight: 600;
  margin: 0;
  color: #0f172a;
}

.integration-desc {
  color: #475569;
  margin: 0.35rem 0 0;
}

.integration-footer {
  margin-top: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 1.25rem;
}

.blog-card h3 {
  margin-top: 0.5rem;
  font-size: 1.2rem;
}

.blog-card p {
  color: #475569;
}

.blog-date {
  font-size: 0.85rem;
  color: #94a3b8;
}

.blog-link {
  margin-top: 1rem;
  align-self: flex-start;
}

@media (max-width: 640px) {
  .integration-footer {
    flex-direction: column;
    gap: 0.75rem;
    align-items: flex-start;
  }

  .hero-shell {
    grid-template-columns: 1fr;
  }
}
</style>
