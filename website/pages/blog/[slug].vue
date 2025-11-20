<script setup lang="ts">
type ArticleSection = {
  heading: string
  body: string
  bullets?: string[]
  code?: string
}

type Article = {
  hero: string
  title: string
  summary: string
  topic: string
  readingTime: string
  sections: ArticleSection[]
  resources: Array<{ label: string; to: string }>
}

const articles: Record<string, Article> = {
  'edge-ready-admin': {
    hero: 'Edge Ready',
    title: 'Edge Ready Nuxt Admin：Cloudflare Pages + D1 主线实战',
    summary:
      '带你把 template/ 目录复制后的管理后台，在 preview 环境 5 分钟内上线，并利用 D1 schema.sql/test-data.sql 完成初始化与验证。',
    topic: 'Architecture',
    readingTime: '8 min read',
    sections: [
      {
        heading: '步骤一：复制脚手架与依赖安装',
        body:
          '运行 node create-project.mjs my-admin 即可把 template/ 复制到新目录，再执行 pnpm install。CLI 输出的 next steps 会贴合多账号流程，确保任何开发者复现时不会遗漏 wrangler 配置。',
        bullets: [
          'create-project.mjs 默认会检查目录是否存在，避免覆盖已有代码',
          'pnpm install 之后 pnpm wrangler:config:test 即可写入多账号配置',
          'postinstall 钩子会执行 nuxt prepare，保证边缘构建可用',
        ],
      },
      {
        heading: '步骤二：D1 schema 与 seed',
        body:
          '模板内的 schema.sql、test-data.sql、clear-test-data.sql 对应 D1 的迁移、样例数据与清理逻辑，在 CI 里可直接作为 artifacts。Preview 环境可使用 seed 数据快速验证 API。',
        code: `wrangler d1 migrations apply cf-nuxt-pages-db
wrangler d1 execute cf-nuxt-pages-db --file=./test-data.sql`,
      },
      {
        heading: '步骤三：构建与观测',
        body:
          'pnpm deploy:test 会先切换 account，再构建 Nuxt 并调用 wrangler pages deploy dist。部署完成后，pnpm logs:test 可接上 preview 环境日志，在没有自建服务器的情况下观察 Edge 调用链。',
        bullets: [
          'logs:test / logs:prod 默认输出 pretty 模式，方便排查 Pages Functions',
          'Wrangler 的多账号切换通过 scripts/use-wrangler-config.mjs 保证一致性',
          '完成验证后直接 pnpm deploy:prod，Production 与 Preview 每次都可复现',
        ],
      },
      {
        heading: '步骤四：接入 KV / R2 / Durable Objects',
        body:
          '在主线跑通后，可以按需把更多 Cloudflare 能力接入同一套脚手架：KV 用于缓存配置与会话、R2 存放用户上传文件、Durable Objects 作为长连接房间或有状态协调器。通过 runtimeConfig 读取 env 绑定，将这些服务与 Nuxt store、API 路由串联起来。',
        bullets: [
          '在 wrangler.account-*.toml 中增加 KV/R2/DO 绑定，再在 Pages 项目中开启对应资源',
          '在 server/api 中通过 useRuntimeConfig().cloudflare.env 访问 KV / R2 / DO，避免在组件里直接依赖全局变量',
          '清晰地划分边界：D1 做持久化数据，KV 做高频读取缓存，R2 存大文件，DO 管理会话/房间状态',
        ],
      },
    ],
    resources: [
      { label: '查看所有博客', to: '/blog' },
      { label: 'Docs：Cloudflare Workflow', to: '/docs' },
    ],
  },
  'wrangler-observability': {
    hero: 'DevOps',
    title: 'Wrangler 自动化与日志体系：从脚本到 CI',
    summary:
      '基础设施防线要求「不打补丁战」，因此 wrangler 流水线需要原子化。本文从 scripts/use-wrangler-config.mjs 起步，讲解如何把账号切换、日志 tail、SQL 执行全部写进自动化任务，并融入 CI。',
    topic: 'DevOps',
    readingTime: '6 min read',
    sections: [
      {
        heading: '账号切换：模板即规范',
        body:
          '脚本接受 test/prod 或自定义 *.toml 作为参数，将 wrangler.account-*.toml 复制为 wrangler.toml。CI 里可以在 job 前执行 pnpm wrangler:config:test 然后 cache dist，以此保证环境一致。',
        bullets: [
          '脚本会校验文件是否存在，缺失时直接 exit 1 阻断流水线',
          '命令输出 [wrangler-config] 日志，方便在 CI 面板中检索',
        ],
      },
      {
        heading: '日志追踪：pnpm logs:*',
        body:
          '借助 wrangler pages deployment tail，可以持续输出 preview/production 的请求详情。把该命令封装成 pnpm logs:test|prod 后，开发者本地 / CI 都能在统一入口订阅日志。',
        code: `pnpm wrangler:config:test && wrangler pages deployment tail \\
  --project-name cf-nuxt-pages-kit \\
  --environment preview \\
  --format pretty`,
      },
      {
        heading: 'CI 集成：一次成型',
        body:
          '在 GitHub Actions 中，把 wrangler CLI 与 pnpm 脚本结合：install 依赖、运行 lint/test、pnpm deploy:test。若需要部署 production，可以在保护分支上触发单独 workflow，以避免手动 patch。CI 中统一使用 wrangler.account-*.toml，保证本地与流水线环境一致。',
      },
      {
        heading: '多环境与回滚策略',
        body:
          '利用 Cloudflare Pages 的 preview/production 模型，可以为每个 PR 自动构建 preview，主干合并后再部署到 production。通过 wrangler pages deployment list/tail，你可以快速发现问题并回滚到上一个稳定 deployment，而不是在服务器上做危险操作。',
        bullets: [
          '在 CI 中为 main 分支配置「部署到 production」，为其他分支部署到 preview',
          '遇到故障时，通过 Dashboard 或 wrangler 指定 deployment 进行回滚',
          '日志与指标保持在同一个观测面板中，减少排障时间',
        ],
      },
    ],
    resources: [
      { label: 'Docs：Cloudflare Workflow', to: '/docs' },
      { label: '教程：零服务器全栈流程', to: '/tutorial' },
    ],
  },
  'marketing-i18n': {
    hero: 'UX',
    title: '多语言官网的 UX 设计：@nuxt/ui + Cloudflare Pages',
    summary:
      '官网 demo 与业务模板一样重要。本篇分享如何利用 @nuxt/ui token、Nuxt 状态管理与 Cloudflare Pages 的极速发布能力，打造真正可上线的多语言营销站点。',
    topic: 'UX',
    readingTime: '5 min read',
    sections: [
      {
        heading: '多语言数据结构',
        body:
          '网站首页的 messages 对象为 zh/en/ja 分别定义 copy，包括 Hero、Workflow、Modules 等区块。通过 useState 管理 locale，并在组件中响应式切换。',
        code: `type Locale = 'zh' | 'en' | 'ja'
const locale = useState<Locale>('site-locale', () => 'zh')
const content = computed(() => messages[locale.value])`,
      },
      {
        heading: '模块化切片',
        body:
          'Hero、Workflow、Core、Modules、Blog cards 都是可复用切片。通过统一的 card 与 badge 组件样式，在暗色模式下也能保持一致体验。',
        bullets: [
          'actions 使用 NuxtLink，确保跳转均为站内真实文章',
          'Blog 模块引用 /blog/[slug] 动态路由，读者可直接深入文章',
          'Resource Grid 按 Docs/Tutorial/Blog 分类，降低跳出率',
        ],
      },
      {
        heading: '部署与缓存',
        body:
          '官网与模板同 repo，不需要额外 monorepo。Pages 针对静态页面自动开启 CDN 缓存，同时保留 Functions 能力供表单或订阅 API 使用。通过 wrangler pages deploy .output/public --project-name=cf-nuxt-pages-kit-site 即可上云。',
        bullets: [
          '静态页面默认享受全局 CDN 缓存，适合文案与文档类内容',
          '对于需要个性化或实时数据的模块，可通过 server/api 配合 KV/D1 提供动态内容',
          '多语言内容建议统一通过数据结构管理（如 messages 对象），方便未来接入 CMS 或翻译流程',
        ],
      },
    ],
    resources: [
      { label: '继续阅读其他文章', to: '/blog' },
      { label: 'Docs：官网模块组成', to: '/docs' },
    ],
  },
}

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const article = computed(() => articles[slug.value])

if (!article.value) {
  throw createError({ statusCode: 404, statusMessage: 'Article not found' })
}

useHead(() => ({
  title: `${article.value.title} · Cloudflare Nuxt Pages Kit`,
  meta: [
    {
      name: 'description',
      content: article.value.summary,
    },
  ],
}))
</script>

<template>
  <article class="post-page">
    <div class="bg-gradient"></div>
    
    <div class="container">
      <header class="hero">
        <div class="hero-meta">
          <span class="badge">{{ article.topic }}</span>
          <span class="time">{{ article.readingTime }}</span>
        </div>
        <h1>{{ article.title }}</h1>
        <p class="summary">{{ article.summary }}</p>
      </header>

      <div class="content-wrapper">
        <section v-for="section in article.sections" :key="section.heading" class="section">
          <h2>{{ section.heading }}</h2>
          <p>{{ section.body }}</p>
          <ul v-if="section.bullets" class="bullets">
            <li v-for="item in section.bullets" :key="item">{{ item }}</li>
          </ul>
          <div v-if="section.code" class="code-block">
            <div class="code-header">
              <span class="dot red"></span>
              <span class="dot yellow"></span>
              <span class="dot green"></span>
            </div>
            <pre><code>{{ section.code }}</code></pre>
          </div>
        </section>

        <section v-if="article.resources.length" class="resources">
          <h3>Further Reading</h3>
          <div class="resource-grid">
            <NuxtLink v-for="item in article.resources" :key="item.label" :to="item.to" class="resource-link">
              {{ item.label }} <span class="arrow">→</span>
            </NuxtLink>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>

<style scoped>
.post-page {
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
  height: 60vh;
  background: linear-gradient(180deg, rgba(236, 72, 153, 0.05) 0%, rgba(255, 255, 255, 0) 100%);
  z-index: -1;
  pointer-events: none;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* Hero */
.hero {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0;
}

.hero-meta {
  display: flex;
  align-items: center;
  gap: 1rem;
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
  color: #64748b;
}

h1 {
  font-size: clamp(2rem, 4vw, 3rem);
  line-height: 1.2;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.02em;
}

.summary {
  font-size: 1.125rem;
  line-height: 1.7;
  color: #64748b;
  max-width: 650px;
}

/* Content */
.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #0f172a;
  margin-top: 1rem;
  letter-spacing: -0.01em;
}

p {
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #334155;
}

.bullets {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-left: 1rem;
}

.bullets li {
  position: relative;
  padding-left: 1.5rem;
  font-size: 1.0625rem;
  line-height: 1.7;
  color: #334155;
}

.bullets li::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #6366f1;
}

/* Code Block */
.code-block {
  background: #1e293b;
  border-radius: 1rem;
  overflow: hidden;
  margin: 1.5rem 0;
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.2);
}

.code-header {
  background: #0f172a;
  padding: 0.75rem 1rem;
  display: flex;
  gap: 0.5rem;
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.red { background: #ef4444; }
.yellow { background: #f59e0b; }
.green { background: #22c55e; }

pre {
  padding: 1.5rem;
  overflow-x: auto;
  margin: 0;
}

code {
  font-family: 'Fira Code', monospace;
  font-size: 0.9rem;
  color: #e2e8f0;
  line-height: 1.6;
}

/* Resources */
.resources {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid rgba(226, 232, 240, 0.8);
}

.resources h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 1.5rem;
}

.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.resource-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 0.75rem;
  text-decoration: none;
  color: #334155;
  font-weight: 500;
  transition: all 0.2s;
}

.resource-link:hover {
  background: #fff;
  border-color: #6366f1;
  color: #6366f1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
}

.arrow {
  transition: transform 0.2s;
}

.resource-link:hover .arrow {
  transform: translateX(4px);
}

/* Dark Mode */
@media (prefers-color-scheme: dark) {
  .post-page {
    background: #020617;
    color: #e2e8f0;
  }

  .bg-gradient {
    background: linear-gradient(180deg, rgba(236, 72, 153, 0.05) 0%, rgba(2, 6, 23, 0) 100%);
  }

  h1, h2, .resources h3 { color: #f8fafc; }
  p, .bullets li, .summary { color: #cbd5e1; }

  .resource-link {
    background: rgba(30, 41, 59, 0.5);
    border-color: rgba(255, 255, 255, 0.1);
    color: #cbd5e1;
  }

  .resource-link:hover {
    background: rgba(30, 41, 59, 0.8);
    border-color: #6366f1;
    color: #818cf8;
  }
  
  .footer {
    border-top-color: rgba(255, 255, 255, 0.1);
  }
}
</style>
