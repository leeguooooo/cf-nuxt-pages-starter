<script setup lang="ts">
type Locale = 'zh' | 'en' | 'ja'

type Feature = {
  eyebrow: string
  title: string
  body: string
  icon: string
}

type Copy = {
  tag: string
  heroTitle: string
  heroBody: string
  ctaPrimary: string
  ctaPrimaryTo: string
  ctaSecondary: string
  ctaSecondaryTo: string
  features: Feature[]
  footerText: string
}

const locales: Array<{ code: Locale; label: string }> = [
  { code: 'zh', label: '中文' },
  { code: 'en', label: 'English' },
  { code: 'ja', label: '日本語' },
]

const messages: Record<Locale, Copy> = {
  zh: {
    tag: 'Cloudflare Nuxt Pages Kit',
    heroTitle: '下一代 Web 开发体验',
    heroBody: 'Nuxt 4 × Cloudflare Pages。极致性能，无感部署。让创意瞬间落地。',
    ctaPrimary: '开始构建',
    ctaPrimaryTo: '/docs',
    ctaSecondary: '了解更多',
    ctaSecondaryTo: '/blog',
    features: [
      {
        eyebrow: 'Performance',
        title: '极致性能',
        body: '基于 Cloudflare 全球边缘网络，毫秒级响应。',
        icon: '⚡️',
      },
      {
        eyebrow: 'Developer Experience',
        title: '极致体验',
        body: '开箱即用的 Nuxt 4 配置，专注于业务逻辑。',
        icon: '🛠️',
      },
      {
        eyebrow: 'Scalability',
        title: '无限扩展',
        body: '从个人博客到企业级应用，轻松应对流量洪峰。',
        icon: '🚀',
      },
    ],
    footerText: 'Built with Nuxt & Cloudflare',
  },
  en: {
    tag: 'Cloudflare Nuxt Pages Kit',
    heroTitle: 'Next Gen Web Experience',
    heroBody: 'Nuxt 4 × Cloudflare Pages. Extreme performance, seamless deployment. Bring ideas to life instantly.',
    ctaPrimary: 'Start Building',
    ctaPrimaryTo: '/docs',
    ctaSecondary: 'Learn More',
    ctaSecondaryTo: '/blog',
    features: [
      {
        eyebrow: 'Performance',
        title: 'Extreme Performance',
        body: 'Millisecond response times on Cloudflare global edge network.',
        icon: '⚡️',
      },
      {
        eyebrow: 'Developer Experience',
        title: 'Developer Experience',
        body: 'Out-of-the-box Nuxt 4 config, focus on your business logic.',
        icon: '🛠️',
      },
      {
        eyebrow: 'Scalability',
        title: 'Infinite Scalability',
        body: 'From personal blogs to enterprise apps, handle traffic spikes with ease.',
        icon: '🚀',
      },
    ],
    footerText: 'Built with Nuxt & Cloudflare',
  },
  ja: {
    tag: 'Cloudflare Nuxt Pages Kit',
    heroTitle: '次世代 Web 開発体験',
    heroBody: 'Nuxt 4 × Cloudflare Pages。究極のパフォーマンス、シームレスなデプロイ。アイデアを瞬時に形に。',
    ctaPrimary: '構築を始める',
    ctaPrimaryTo: '/docs',
    ctaSecondary: '詳細を見る',
    ctaSecondaryTo: '/blog',
    features: [
      {
        eyebrow: 'Performance',
        title: '究極のパフォーマンス',
        body: 'Cloudflare グローバルエッジネットワークでミリ秒単位の応答。',
        icon: '⚡️',
      },
      {
        eyebrow: 'Developer Experience',
        title: '開発者体験',
        body: '設定済みの Nuxt 4 環境で、ビジネスロジックに集中。',
        icon: '🛠️',
      },
      {
        eyebrow: 'Scalability',
        title: '無限の拡張性',
        body: '個人ブログからエンタープライズアプリまで、トラフィックの急増にも対応。',
        icon: '🚀',
      },
    ],
    footerText: 'Built with Nuxt & Cloudflare',
  },
}

const locale = useState<Locale>('site-locale', () => 'zh')
const content = computed(() => messages[locale.value])

function setLocale(code: Locale) {
  locale.value = code
}
</script>

<template>
  <div class="page-container">
    <ClientOnly>
      <div class="canvas-container">
        <TheExperience />
      </div>
    </ClientOnly>

    <main class="content-overlay">
      <header class="header">
        <div class="locales">
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
      </header>

      <section class="hero">
        <p class="tag">{{ content.tag }}</p>
        <h1 class="hero-title">{{ content.heroTitle }}</h1>
        <p class="hero-body">{{ content.heroBody }}</p>
        <div class="actions">
          <NuxtLink :to="content.ctaPrimaryTo" class="btn primary">{{ content.ctaPrimary }}</NuxtLink>
          <NuxtLink :to="content.ctaSecondaryTo" class="btn secondary">{{ content.ctaSecondary }}</NuxtLink>
        </div>
      </section>

      <section class="features">
        <div v-for="feature in content.features" :key="feature.title" class="feature-card">
          <div class="feature-icon">{{ feature.icon }}</div>
          <p class="eyebrow">{{ feature.eyebrow }}</p>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.body }}</p>
        </div>
      </section>

      <footer class="footer">
        <p>{{ content.footerText }}</p>
      </footer>
    </main>
  </div>
</template>

<style scoped>
:global(body) {
  margin: 0;
  background: #0f172a;
  color: #fff;
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
}

.page-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.canvas-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 0;
  pointer-events: all; /* Allow interaction with 3D scene */
}

.content-overlay {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: rgba(15, 23, 42, 0.3); /* Slight overlay for better text contrast */
  backdrop-filter: blur(0px); /* Start with no blur, maybe add on scroll? */
}

.header {
  padding: 2rem;
  display: flex;
  justify-content: flex-end;
}

.locales {
  display: flex;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.25rem;
  border-radius: 999px;
  backdrop-filter: blur(10px);
}

.locale-btn {
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 1rem;
  border-radius: 999px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.locale-btn.active {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font-weight: 600;
}

.hero {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 4rem 2rem;
  gap: 2rem;
}

.tag {
  text-transform: uppercase;
  letter-spacing: 0.2em;
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.6);
  margin: 0;
}

.hero-title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  margin: 0;
  background: linear-gradient(to right, #fff, #a5b4fc);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 30px rgba(165, 180, 252, 0.3);
}

.hero-body {
  font-size: clamp(1.125rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.8);
  max-width: 600px;
  line-height: 1.6;
  margin: 0;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 999px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn.primary {
  background: #fff;
  color: #0f172a;
}

.btn.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(255, 255, 255, 0.2);
}

.btn.secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn.secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.feature-card {
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 1.5rem;
  padding: 2rem;
  transition: all 0.3s ease;
}

.feature-card:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateY(-5px);
  border-color: rgba(255, 255, 255, 0.2);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 0.5rem;
}

.feature-card h3 {
  font-size: 1.5rem;
  margin: 0 0 1rem 0;
  color: #fff;
}

.feature-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 0;
}

.footer {
  padding: 2rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.875rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
</style>
