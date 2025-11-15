<script setup lang="ts">
type Locale = 'zh' | 'en' | 'ja'

const locales: Array<{ code: Locale; label: string }> = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
]

type Copy = {
  tag: string
  heroTitle: string
  heroBody: string
  ctaPrimary: string
  ctaSecondary: string
  ctaTutorial: string
  stats: Array<{ label: string; value: string; desc: string }>
  workflowTitle: string
  workflowSubtitle: string
  workflowActions: Array<{ title: string; code: string }>
  workflowBullets: string[]
  coreEyebrow: string
  coreTitle: string
  coreBody: string
  coreList: string[]
  modulesTitle: string
  modules: Array<{ title: string; body: string }>
}

const messages: Record<Locale, Copy> = {
  zh: {
    tag: 'Cloudflare Nuxt Pages Kit',
    heroTitle: '几分钟把 Nuxt 4 + Cloudflare Pages 推向线上',
    heroBody:
      '预设了多账号部署流、Pages Functions API、D1 数据库迁移与日志脚本，帮你把产品快速发布到 Cloudflare 边缘网络。本网站同样使用 Nuxt + @nuxt/ui 构建，效果即所得。',
    ctaPrimary: '立即使用',
    ctaSecondary: '查看文档',
    ctaTutorial: '零服务器教程',
    stats: [
      { label: '部署耗时', value: '5 min', desc: 'Wrangler 脚本同步 preview / prod' },
      { label: '示例 API', value: '9 个', desc: '封装 Pages Functions、D1、KV、R2 场景' },
      { label: '内置脚本', value: '12 个', desc: '环境切换、日志追踪、seed 数据' },
    ],
    workflowTitle: 'Cloudflare Workflow',
    workflowSubtitle: 'Preview, Staging, Production',
    workflowActions: [
      { title: '部署命令', code: 'pnpm deploy:test' },
      { title: '日志追踪', code: 'pnpm logs:prod' },
      { title: '切换账号', code: 'pnpm wrangler:config:prod' },
    ],
    workflowBullets: [
      '完整的 Cloudflare Pages + Functions 模板',
      'D1 schema、seed、clear SQL 脚本',
      '官网 (website) 与业务模板 (template) 双结构',
    ],
    coreEyebrow: '核心能力',
    coreTitle: '开箱即用的 Cloudflare × Nuxt 工程体系',
    coreBody:
      '沿用官方设计系统，快速组合同 Hero、Feature、Blog 等模块，减少自定义 CSS，保留暗色主题支持。',
    coreList: [
      '多语言 + 深色模式示例',
      '部署 / 日志 / 账号切换脚本齐全',
      '可扩展 Pages Functions、Cron Trigger、Queues',
    ],
    modulesTitle: '工程模块',
    modules: [
      { title: 'Nuxt Admin 模板', body: '含 Pinia、API mock、权限路由、D1 migrations 样例。' },
      { title: '官网 + 博客', body: 'Marketing 站点 + /tutorial 博客，内置 i18n。' },
      { title: 'Cloudflare DevOps', body: 'wrangler.account-*.toml 模板 + 多账号日志脚本。' },
    ],
  },
  en: {
    tag: 'Cloudflare Nuxt Pages Kit',
    heroTitle: 'Ship Nuxt 4 + Cloudflare Pages in minutes',
    heroBody:
      'Pre-wired multi-account deployments, Pages Functions APIs, D1 migrations, and log helpers let you launch straight to the Cloudflare edge. This site itself is built with Nuxt + @nuxt/ui.',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'View Docs',
    ctaTutorial: 'Serverless Tutorial',
    stats: [
      { label: 'Time to deploy', value: '5 min', desc: 'Wrangler syncs preview & prod' },
      { label: 'Sample APIs', value: '9', desc: 'Pages Functions, D1, KV, R2 scenarios' },
      { label: 'Built-in scripts', value: '12', desc: 'Env switch, log tail, seed data' },
    ],
    workflowTitle: 'Cloudflare Workflow',
    workflowSubtitle: 'Preview, Staging, Production',
    workflowActions: [
      { title: 'Deploy', code: 'pnpm deploy:test' },
      { title: 'Logs', code: 'pnpm logs:prod' },
      { title: 'Switch account', code: 'pnpm wrangler:config:prod' },
    ],
    workflowBullets: [
      'Complete Cloudflare Pages + Functions template',
      'D1 schema / seed / clear SQL ready',
      'Marketing site + app template dual repo',
    ],
    coreEyebrow: 'Core strengths',
    coreTitle: 'Production-ready Cloudflare × Nuxt stack',
    coreBody:
      'Nuxt UI tokens, ready-made hero / feature / blog slices, dark-mode friendly, minimal custom CSS.',
    coreList: [
      'i18n + dark mode examples',
      'Deployment / logging / account scripts included',
      'Extend to Pages Functions, Cron Triggers, Queues',
    ],
    modulesTitle: 'Modules',
    modules: [
      { title: 'Nuxt admin template', body: 'Pinia, mock APIs, auth routes, D1 migrations.' },
      { title: 'Website + blog', body: 'Marketing page + /tutorial blog with i18n.' },
      { title: 'Cloudflare DevOps', body: 'wrangler.account templates + log scripts.' },
    ],
  },
  ja: {
    tag: 'Cloudflare Nuxt Pages Kit',
    heroTitle: '数分で Nuxt 4 + Cloudflare Pages を公開',
    heroBody:
      'マルチアカウント配備、Pages Functions API、D1 マイグレーション、ログスクリプトを同梱。Cloudflare エッジへ即デプロイでき、このサイトも Nuxt + @nuxt/ui で構築。',
    ctaPrimary: '今すぐ利用',
    ctaSecondary: 'ドキュメント',
    ctaTutorial: 'サーバーレス手順',
    stats: [
      { label: 'デプロイ時間', value: '5 分', desc: 'Wrangler で preview / prod 同期' },
      { label: 'サンプル API', value: '9 本', desc: 'Pages Functions・D1・KV・R2' },
      { label: '内蔵スクリプト', value: '12 本', desc: '環境切替・ログ tail・seed SQL' },
    ],
    workflowTitle: 'Cloudflare Workflow',
    workflowSubtitle: 'Preview / Staging / Production',
    workflowActions: [
      { title: 'デプロイ', code: 'pnpm deploy:test' },
      { title: 'ログ', code: 'pnpm logs:prod' },
      { title: 'アカウント切替', code: 'pnpm wrangler:config:prod' },
    ],
    workflowBullets: [
      'Cloudflare Pages + Functions テンプレート',
      'D1 schema・seed・clear SQL を同梱',
      'Website とアプリテンプレの 2 リポ構成',
    ],
    coreEyebrow: 'コア機能',
    coreTitle: 'Cloudflare × Nuxt の実戦スタック',
    coreBody:
      '公式デザインシステムを活かして Hero / Feature / Blog を素早く構築。ダークテーマもサポート。',
    coreList: [
      '多言語 + ダークモード実装例',
      'デプロイ / ログ / 切替スクリプト',
      'Pages Functions・Cron Trigger・Queues に拡張可能',
    ],
    modulesTitle: 'モジュール',
    modules: [
      { title: 'Nuxt 管理テンプレート', body: 'Pinia・API モック・権限ルート・D1 マイグレーション。' },
      { title: 'サイト + ブログ', body: 'マーケページと /tutorial ブログ、i18n 対応。' },
      { title: 'Cloudflare DevOps', body: 'wrangler.account テンプレ + ログスクリプト。' },
    ],
  },
}

const repoUrl = 'https://github.com/leeguooooo/cf-nuxt-pages-starter'
const templateUrl = `${repoUrl}/tree/main/template`
const websiteUrl = `${repoUrl}/tree/main/website`
const deployGuideUrl = `${repoUrl}/blob/main/template/docs/DEPLOY.md`
const wranglerGuideUrl = `${repoUrl}/blob/main/template/docs/WRANGLER_CONFIG.md`

const locale = useState<Locale>('site-locale', () => 'zh')
const content = computed(() => messages[locale.value])

const navLinks = [
  { label: '功能', href: '#core' },
  { label: '模块', href: '#modules' },
  { label: '教程', to: '/tutorial' },
]

const resources = [
  {
    title: 'GitHub 仓库',
    body: '获取 Cloudflare Nuxt Pages Kit 最新源码与 issue 模板。',
    href: repoUrl,
  },
  {
    title: '脚手架模板',
    body: 'template/ 子包，包含 Pinia、D1、部署脚本等完整示例。',
    href: templateUrl,
  },
  {
    title: 'Wrangler 多账号',
    body: 'WRANGLER_CONFIG.md 详细说明 account 切换脚本的配置方式。',
    href: wranglerGuideUrl,
  },
  {
    title: '部署指南',
    body: 'DEPLOY.md 覆盖 Pages、D1、KV、日志 tail 的落地步骤。',
    href: deployGuideUrl,
  },
  {
    title: '官网源码',
    body: 'website/ 子包展示如何用 Nuxt UI 组装营销页面。',
    href: websiteUrl,
  },
]

function setLocale(code: Locale) {
  locale.value = code
}
</script>

<template>
  <main class="page">
    <header class="site-header">
      <NuxtLink to="/" class="logo">Cloudflare Nuxt Pages Kit</NuxtLink>
      <nav aria-label="Primary">
        <template v-for="item in navLinks" :key="item.label">
          <NuxtLink v-if="item.to" :to="item.to" class="nav-link">{{ item.label }}</NuxtLink>
          <a v-else :href="item.href" class="nav-link">{{ item.label }}</a>
        </template>
        <a class="repo" :href="repoUrl" target="_blank" rel="noreferrer">GitHub</a>
      </nav>
    </header>

    <section class="hero">
      <div class="hero-left">
        <div class="locales" role="group" aria-label="Language switcher">
          <button
            v-for="item in locales"
            :key="item.code"
            type="button"
            :class="['locale-btn', { active: locale === item.code }]"
            @click="setLocale(item.code)"
          >
            {{ item.label }}
          </button>
        </div>
        <p class="tag">{{ content.tag }}</p>
        <h1>{{ content.heroTitle }}</h1>
        <p class="lead">{{ content.heroBody }}</p>
        <div class="actions">
          <a :href="repoUrl" target="_blank" rel="noreferrer">{{ content.ctaPrimary }}</a>
          <a :href="deployGuideUrl" target="_blank" rel="noreferrer" class="ghost">{{ content.ctaSecondary }}</a>
          <NuxtLink to="/tutorial" class="ghost nuxt-link">{{ content.ctaTutorial }}</NuxtLink>
        </div>
        <div class="stats">
          <article v-for="stat in content.stats" :key="stat.label">
            <p class="stat-label">{{ stat.label }}</p>
            <p class="stat-value">{{ stat.value }}</p>
            <p class="stat-desc">{{ stat.desc }}</p>
          </article>
        </div>
      </div>
      <div class="hero-right card">
        <div class="workflow-head">
          <div>
            <p class="workflow-title">{{ content.workflowTitle }}</p>
            <p class="workflow-sub">{{ content.workflowSubtitle }}</p>
          </div>
          <span class="badge">Wrangler</span>
        </div>
        <div class="workflow-cmds">
          <div v-for="item in content.workflowActions" :key="item.title" class="cmd">
            <p>{{ item.title }}</p>
            <code>{{ item.code }}</code>
          </div>
        </div>
        <ul class="workflow-list">
          <li v-for="bullet in content.workflowBullets" :key="bullet">{{ bullet }}</li>
        </ul>
      </div>
    </section>

    <section id="core" class="core card">
      <p class="eyebrow">{{ content.coreEyebrow }}</p>
      <h2>{{ content.coreTitle }}</h2>
      <p class="lead">{{ content.coreBody }}</p>
      <ul class="core-list">
        <li v-for="point in content.coreList" :key="point">{{ point }}</li>
      </ul>
    </section>

    <section id="modules" class="modules">
      <article v-for="module in content.modules" :key="module.title" class="card module">
        <h3>{{ module.title }}</h3>
        <p>{{ module.body }}</p>
      </article>
    </section>

    <section class="resources card">
      <div class="resource-head">
        <p class="eyebrow">Documentation & Source</p>
        <h2>真实链接，一键直达</h2>
        <p class="lead">所有按钮都指向仓库中的可用资源，避免“演示站”式的空链接。</p>
      </div>
      <div class="resource-grid">
        <a
          v-for="item in resources"
          :key="item.title"
          class="resource"
          :href="item.href"
          target="_blank"
          rel="noreferrer"
        >
          <h3>{{ item.title }}</h3>
          <p>{{ item.body }}</p>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>

    <footer class="site-footer">
      <div>
        <p class="eyebrow">准备好了吗？</p>
        <h2>Fork 仓库或直接运行 create-project</h2>
        <p>
          在终端执行
          <code>node create-project.mjs my-app</code>
          即可复制脚手架，并通过 <code>pnpm deploy:test</code> 推送到 Cloudflare Pages preview。
        </p>
      </div>
      <a :href="repoUrl" target="_blank" rel="noreferrer" class="footer-cta">访问 GitHub</a>
    </footer>
  </main>
</template>

<style scoped>
:global(body) {
  background: #f4f5fb;
}

.page {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: clamp(1.5rem, 4vw, 3rem);
}

.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.logo {
  font-weight: 700;
  font-size: 1.1rem;
  color: #0f172a;
  text-decoration: none;
}

nav {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.nav-link {
  color: rgba(15, 23, 42, 0.75);
  text-decoration: none;
  font-weight: 500;
}

.nav-link:hover {
  color: #0f172a;
}

.repo {
  padding: 0.35rem 0.9rem;
  border: 1px solid rgba(15, 23, 42, 0.15);
  border-radius: 999px;
}

.hero {
  background: linear-gradient(135deg, #eef2ff, #f1f5f9 70%);
  border-radius: 2rem;
  padding: clamp(1.5rem, 4vw, 3rem);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.hero-left {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.hero-right {
  background: #fff;
}

.card {
  border-radius: 1.5rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #fff;
  box-shadow: 0 30px 60px rgba(15, 23, 42, 0.07);
}

.locales {
  display: inline-flex;
  gap: 0.5rem;
}

.locale-btn {
  border: 1px solid rgba(15, 23, 42, 0.15);
  border-radius: 999px;
  background: transparent;
  color: #0f172a;
  padding: 0.3rem 0.8rem;
  cursor: pointer;
}

.locale-btn.active {
  background: #0f172a;
  color: #fff;
}

.tag {
  font-size: 0.8rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(15, 23, 42, 0.6);
}

h1 {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin: 0;
  color: #0f172a;
}

.lead {
  color: rgba(15, 23, 42, 0.75);
  line-height: 1.6;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.actions a,
.actions .nuxt-link {
  text-decoration: none;
  padding: 0.8rem 1.6rem;
  border-radius: 999px;
  border: 1px solid rgba(15, 23, 42, 0.15);
  color: #0f172a;
  font-weight: 600;
}

.actions a:first-child {
  background: linear-gradient(120deg, #22d3ee, #6366f1);
  color: #fff;
  border: none;
}

.actions .ghost {
  background: rgba(15, 23, 42, 0.03);
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 1rem;
}

.stats article {
  background: #fff;
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(15, 23, 42, 0.6);
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.3rem 0;
}

.stat-desc {
  color: rgba(15, 23, 42, 0.6);
  font-size: 0.9rem;
}

.workflow-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  padding: 1.5rem;
}

.workflow-title {
  font-weight: 600;
  margin: 0;
}

.workflow-sub {
  margin: 0.3rem 0 0;
  color: rgba(15, 23, 42, 0.5);
}

.badge {
  background: rgba(99, 102, 241, 0.12);
  color: #4338ca;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  font-size: 0.8rem;
}

.workflow-cmds {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
  padding: 1.5rem;
}

.cmd {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 1rem;
  padding: 1rem;
}

.cmd code {
  display: inline-block;
  margin-top: 0.5rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0.75rem;
  background: rgba(15, 23, 42, 0.05);
}

.workflow-list {
  list-style: none;
  padding: 0 1.5rem 1.5rem;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  color: rgba(15, 23, 42, 0.75);
}

.core {
  padding: 2.5rem;
}

.eyebrow {
  letter-spacing: 0.3em;
  text-transform: uppercase;
  font-size: 0.75rem;
  color: rgba(15, 23, 42, 0.5);
}

.core-list {
  list-style: none;
  padding: 0;
  margin-top: 1.5rem;
  display: grid;
  gap: 0.8rem;
}

.modules {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1.5rem;
}

.module {
  padding: 1.5rem;
}

.module h3 {
  margin-bottom: 0.6rem;
}

.resources {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.resource-head h2 {
  margin: 0.4rem 0;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
}

.resource {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 1rem;
  padding: 1.2rem;
  text-decoration: none;
  color: #0f172a;
  background: #fff;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.resource span {
  margin-top: auto;
  font-size: 1.2rem;
}

.site-footer {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 1.5rem;
  padding: 2rem;
  display: flex;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background: #0f172a;
  color: #f8fafc;
}

.footer-cta {
  background: linear-gradient(120deg, #22d3ee, #6366f1);
  padding: 0.9rem 1.8rem;
  border-radius: 999px;
  text-decoration: none;
  color: #fff;
  font-weight: 600;
}

.site-footer code {
  background: rgba(15, 23, 42, 0.5);
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
}

@media (max-width: 600px) {
  .site-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
