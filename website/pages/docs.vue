<script setup lang="ts">
type DocSection = {
  title: string
  intro: string
  items: Array<{ label: string; body: string }>
}

const sections: DocSection[] = [
  {
    title: '主线 · 从零到可用',
    intro:
      '这一节对应「主线任务」：从安装 CLI 到本地开发、D1 初始化、部署 preview/production，一套流程跑通后，你就拥有一个可交付的 Nuxt + Cloudflare 应用。',
    items: [
      { label: 'Step 1 · 创建项目', body: '使用 create-cf-nuxt-pages 或 npx cf-nuxt-pages-kit 拉起新项目。' },
      { label: 'Step 2 · 本地开发', body: 'pnpm install && pnpm wrangler:config:test && pnpm dev，在本地对接 Cloudflare 账号。' },
      { label: 'Step 3 · 部署与日志', body: 'pnpm deploy:test / pnpm deploy:prod + pnpm logs:*，完成 preview/production 的部署与观测。' },
    ],
  },
  {
    title: '支线 · 平台与架构',
    intro:
      '理解 Nuxt 4 + Cloudflare Pages 的职责划分，有助于做出正确的架构决策：哪些逻辑放在前端、边缘函数、D1/KV/R2，避免「所有问题都用一个 Worker 解决」。',
    items: [
      { label: 'Pages & Functions', body: '静态资源与 Edge Functions 同属一个 Pages 项目，支持按环境拆分 preview/prod。' },
      { label: 'Nuxt + Nitro', body: 'nitro preset=cloudflare-pages，构建产物在 .output/public，中间层逻辑通过 server 目录暴露为边缘函数。' },
      { label: '多项目协作', body: 'template/ 与 website/ 共用一套理念：业务项目用 template，官网用 website，对外讲述产品。' },
    ],
  },
  {
    title: '支线 · 数据与运维',
    intro:
      '主线跑通之后，可以逐步把 D1、KV、R2、日志体系接入项目，让应用具备真正的生产可用性，而不是停留在 demo 阶段。',
    items: [
      { label: 'D1', body: '通过 schema.sql/test-data.sql/clear-test-data.sql 管理结构与样例数据，使用 wrangler d1 migrations 进行迁移。' },
      { label: 'KV & R2', body: 'KV 适合做配置、会话、短链；R2 适合作为静态资源与上传文件的存储层。' },
      { label: 'Wrangler + 日志', body: 'wrangler.account-*.toml + pnpm logs:test|prod 把多账号切换和日志 tail 固化到脚本中。' },
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
  <div class="docs-page">
    <!-- Background Elements -->
    <div class="bg-gradient-1"></div>
    <div class="bg-gradient-2"></div>

    <div class="container">
      <header class="hero">
        <div class="hero-content">
          <p class="label">Documentation</p>
          <h1>Cloudflare Nuxt Pages Kit <br><span class="gradient-text">Knowledge Hub</span></h1>
          <p class="subtitle">
            本页将内容拆成「主线任务」和「支线任务」：主线带你从 0 到部署上线，支线则帮助你按需深入 Workers / Pages / D1 / KV / R2 等相关能力。
          </p>
          <div class="cta">
            <NuxtLink to="/blog" class="btn ghost">阅读博客</NuxtLink>
            <NuxtLink to="/tutorial" class="btn primary">立即实践</NuxtLink>
          </div>
        </div>
      </header>

      <section class="install-section">
        <div class="install-content">
          <h2>安装 CLI 工具</h2>
          <p class="install-desc">使用 npm 全局安装或通过 npx 直接使用</p>
          <div class="install-grid">
            <div class="install-card">
              <h3>全局安装</h3>
              <CopyableCode code="npm install -g cf-nuxt-pages-kit" language="bash" />
              <p class="install-card-note">安装后可在任意目录使用 <code>create-cf-nuxt-pages</code> 命令</p>
            </div>
            <div class="install-card">
              <h3>创建项目</h3>
              <CopyableCode code="create-cf-nuxt-pages my-app" language="bash" />
              <p class="install-card-note">或使用 npx：<code>npx cf-nuxt-pages-kit my-app</code></p>
            </div>
          </div>
        </div>
      </section>

      <div class="content-grid">
        <section v-for="section in sections" :key="section.title" class="glass-card section">
          <div class="head">
            <h2>{{ section.title }}</h2>
            <p>{{ section.intro }}</p>
          </div>
          <div class="items">
            <article v-for="item in section.items" :key="item.label" class="item-card">
              <div class="item-icon"></div>
              <div>
                <p class="eyebrow">{{ item.label }}</p>
                <p class="body">{{ item.body }}</p>
              </div>
            </article>
          </div>
        </section>

        <section class="glass-card quick">
          <div class="head">
            <h2>Quick Access</h2>
            <p>从这里跳到文章或教程，持续加深理解。</p>
          </div>
          <div class="quick-grid">
            <NuxtLink v-for="item in quickLinks" :key="item.title" :to="item.to" class="quick-card">
              <div class="icon-box">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              </div>
              <div>
                <h3>{{ item.title }}</h3>
                <p>{{ item.body }}</p>
              </div>
              <span class="arrow">→</span>
            </NuxtLink>
          </div>
        </section>

        <section class="glass-card faq">
          <div class="head">
            <h2>FAQs</h2>
            <p>团队内最常见的 3 个问题，保持跨战线对齐。</p>
          </div>
          <div class="faq-list">
            <article v-for="item in faqs" :key="item.q" class="faq-item">
              <div class="q-row">
                <span class="q-icon">Q</span>
                <h3>{{ item.q }}</h3>
              </div>
              <p class="answer">{{ item.a }}</p>
            </article>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.docs-page {
  position: relative;
  min-height: 100vh;
  padding: 4rem clamp(1.5rem, 5vw, 4rem);
  color: #1e293b;
  overflow: hidden;
  font-family: 'Inter', sans-serif;
}

/* Ambient Backgrounds */
.bg-gradient-1 {
  position: absolute;
  top: -10%;
  left: -10%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(236, 72, 153, 0.15) 0%, rgba(255,255,255,0) 70%);
  filter: blur(60px);
  z-index: -1;
}

.bg-gradient-2 {
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 60vw;
  height: 60vw;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(255,255,255,0) 70%);
  filter: blur(60px);
  z-index: -1;
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
  padding: 2rem 0;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.label {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.875rem;
  font-weight: 600;
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  padding: 0.5rem 1rem;
  border-radius: 999px;
}

h1 {
  font-size: clamp(2.5rem, 5vw, 4rem);
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #0f172a;
}

.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #ec4899 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #64748b;
  max-width: 600px;
}

.cta {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.install-section {
  margin: 2rem 0;
}

.install-content {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.install-content h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin: 0 0 0.5rem 0;
}

.install-desc {
  color: #64748b;
  margin: 0 0 2rem 0;
}

.install-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.install-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.install-card h3 {
  font-size: 1.125rem;
  font-weight: 600;
  color: #0f172a;
  margin: 0;
}

.install-card-note {
  font-size: 0.875rem;
  color: #64748b;
  margin: 0;
  line-height: 1.5;
}

.install-card-note code {
  background: rgba(99, 102, 241, 0.1);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.875rem;
  color: #6366f1;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 999px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn.primary {
  background: #0f172a;
  color: #fff;
  box-shadow: 0 10px 20px -5px rgba(15, 23, 42, 0.3);
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 25px -5px rgba(15, 23, 42, 0.4);
}

.btn.ghost {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(15, 23, 42, 0.1);
  color: #0f172a;
  backdrop-filter: blur(4px);
}

.btn.ghost:hover {
  background: rgba(255, 255, 255, 0.8);
}

/* Glass Cards */
.glass-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02);
}

.content-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.head h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 0.5rem;
}

.head p {
  color: #64748b;
}

/* Section Items */
.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.item-card {
  background: rgba(255, 255, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.6);
  padding: 1.5rem;
  border-radius: 1rem;
  display: flex;
  gap: 1rem;
  align-items: flex-start;
}

.item-icon {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6366f1;
  margin-top: 0.5rem;
  flex-shrink: 0;
}

.eyebrow {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  color: #6366f1;
  margin-bottom: 0.25rem;
}

.body {
  font-size: 0.95rem;
  line-height: 1.6;
  color: #334155;
}

/* Quick Links */
.quick-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.quick-card {
  background: linear-gradient(145deg, #ffffff, #f8fafc);
  border: 1px solid rgba(226, 232, 240, 0.8);
  padding: 1.5rem;
  border-radius: 1rem;
  text-decoration: none;
  color: inherit;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  transition: all 0.3s ease;
}

.quick-card:hover {
  border-color: #6366f1;
  transform: translateY(-2px);
}

.icon-box {
  width: 40px;
  height: 40px;
  background: rgba(99, 102, 241, 0.1);
  color: #6366f1;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quick-card h3 {
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 0.25rem;
}

.quick-card p {
  font-size: 0.875rem;
  color: #64748b;
  line-height: 1.5;
}

.arrow {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  color: #cbd5e1;
  transition: color 0.3s;
}

.quick-card:hover .arrow {
  color: #6366f1;
}

/* FAQ */
.faq-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.faq-item {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.q-row {
  display: flex;
  gap: 0.75rem;
  align-items: flex-start;
}

.q-icon {
  background: #0f172a;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.faq-item h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #0f172a;
  line-height: 1.5;
}

.answer {
  padding-left: 2.25rem;
  font-size: 0.95rem;
  color: #475569;
  line-height: 1.6;
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .docs-page {
    background: #020617;
    color: #e2e8f0;
  }

  .bg-gradient-1 {
    background: radial-gradient(circle, rgba(236, 72, 153, 0.1) 0%, rgba(2, 6, 23, 0) 70%);
  }

  .bg-gradient-2 {
    background: radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, rgba(2, 6, 23, 0) 70%);
  }

  h1 { color: #f8fafc; }
  .subtitle { color: #94a3b8; }

  .btn.primary {
    background: #f8fafc;
    color: #0f172a;
  }

  .btn.ghost {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
    color: #f8fafc;
  }

  .glass-card {
    background: rgba(15, 23, 42, 0.6);
    border-color: rgba(255, 255, 255, 0.1);
  }

  .head h2 { color: #f8fafc; }
  .head p { color: #94a3b8; }

  .item-card {
    background: rgba(255, 255, 255, 0.03);
    border-color: rgba(255, 255, 255, 0.05);
  }

  .body { color: #cbd5e1; }

  .quick-card {
    background: rgba(30, 41, 59, 0.5);
    border-color: rgba(255, 255, 255, 0.05);
  }

  .quick-card h3 { color: #f8fafc; }
  .quick-card p { color: #94a3b8; }

  .q-icon {
    background: #38bdf8;
    color: #0f172a;
  }

  .faq-item h3 { color: #f8fafc; }
  .answer { color: #cbd5e1; }
}
</style>
