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
    title: 'Edge Ready Nuxt Admin：Cloudflare Pages + D1 实战拆解',
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
      '基础设施防线要求「不打补丁战」，因此 wrangler 流水线需要原子化。本文从 scripts/use-wrangler-config.mjs 起步，讲解如何把账号切换、日志 tail、SQL 执行全部写进自动化任务。',
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
          '在 GitHub Actions 中，把 wrangler CLI 与 pnpm 脚本结合：install 依赖、运行 lint/test、pnpm deploy:test。若需要部署 production，可以在保护分支上触发单独 workflow，以避免手动 patch。',
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
      '官网 demo 与业务模板一样重要。本篇分享如何利用 @nuxt/ui token、Nuxt 状态管理与 Cloudflare Pages 的极速发布能力，打造真正可上线的营销站点。',
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
          '官网与模板同 repo，不需要额外 monorepo。Pages 针对静态页面自动开启 CDN 缓存，同时保留 Functions 能力供表单或订阅 API 使用。Wrangler pages deploy dist --project-name=cf-nuxt-pages-kit-site 即可上云。',
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
  <article class="post">
    <header class="hero">
      <p class="badge">{{ article.hero }} · {{ article.topic }}</p>
      <h1>{{ article.title }}</h1>
      <p class="summary">{{ article.summary }}</p>
      <div class="meta">
        <span>{{ article.readingTime }}</span>
        <span>Cloudflare Nuxt Pages Kit</span>
      </div>
    </header>

    <section v-for="section in article.sections" :key="section.heading" class="section">
      <h2>{{ section.heading }}</h2>
      <p>{{ section.body }}</p>
      <ul v-if="section.bullets" class="bullets">
        <li v-for="item in section.bullets" :key="item">{{ item }}</li>
      </ul>
      <pre v-if="section.code"><code>{{ section.code }}</code></pre>
    </section>

    <section v-if="article.resources.length" class="resources">
      <h3>延伸阅读</h3>
      <ul>
        <li v-for="item in article.resources" :key="item.label">
          <NuxtLink :to="item.to">{{ item.label }}</NuxtLink>
        </li>
      </ul>
    </section>
  </article>
</template>

<style scoped>
.post {
  padding: clamp(1.5rem, 5vw, 4rem);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  color: #0f172a;
}

.hero {
  background: linear-gradient(120deg, #312e81, #1e1b4b);
  color: #eef2ff;
  padding: clamp(2rem, 5vw, 3.5rem);
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.badge {
  text-transform: uppercase;
  letter-spacing: 0.3em;
  font-size: 0.8rem;
  opacity: 0.8;
}

.summary {
  font-size: 1.1rem;
  line-height: 1.6;
}

.meta {
  display: flex;
  gap: 1.5rem;
  opacity: 0.8;
  font-size: 0.95rem;
}

.section {
  background: #fff;
  border-radius: 1.5rem;
  padding: 1.8rem;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 20px 45px rgba(15, 23, 42, 0.07);
}

.section h2 {
  margin-bottom: 0.75rem;
  font-size: 1.5rem;
}

.section p {
  line-height: 1.7;
  color: rgba(15, 23, 42, 0.9);
}

.bullets {
  list-style: disc;
  padding-left: 1.25rem;
  color: rgba(15, 23, 42, 0.85);
  line-height: 1.6;
}

pre {
  background: #0f172a;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 1rem;
  overflow-x: auto;
  margin-top: 1rem;
}

.resources {
  border-radius: 1.5rem;
  border: 1px solid rgba(59, 130, 246, 0.25);
  padding: 1.75rem;
  background: rgba(59, 130, 246, 0.04);
}

.resources ul {
  list-style: none;
  padding: 0;
  margin: 1rem 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.resources a {
  color: #1d4ed8;
  text-decoration: none;
  font-weight: 600;
}

@media (prefers-color-scheme: dark) {
  .post {
    background: #020617;
    color: #e2e8f0;
  }

  .section {
    background: rgba(2, 6, 23, 0.8);
    border-color: rgba(148, 163, 184, 0.2);
  }

  .section p,
  .bullets {
    color: inherit;
  }

  .resources {
    background: rgba(59, 130, 246, 0.1);
  }
}
</style>
