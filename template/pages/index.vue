<template>
  <main class="landing">
    <section>
      <p class="eyebrow">Cloudflare Nuxt Pages Kit</p>
      <h1>Cloudflare Pages + Nuxt 4 + D1 全栈脚手架</h1>
      <p>
        预置多账号 Wrangler 流程、部署脚本、Docs 以及示例官网，帮助你在几分钟内拉起新的 Cloudflare Pages 项目。
      </p>
      <div class="cta">
        <NuxtLink to="https://github.com/leeguooooo/cf-nuxt-pages-starter" target="_blank">查看文档</NuxtLink>
        <a href="/docs/DEPLOY.md" download>下载部署指南</a>
      </div>
    </section>
  </main>
</template>

<style scoped>
.landing {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: radial-gradient(circle at top, #111827, #030712);
  color: #f9fafb;
}

a,
.nuxt-link {
  color: inherit;
}

.eyebrow {
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-size: 0.8rem;
  opacity: 0.7;
}

h1 {
  font-size: clamp(2rem, 4vw, 3.5rem);
  margin: 0.5rem 0 1rem;
}

p {
  max-width: 40rem;
  line-height: 1.6;
}

.cta {
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
}

.cta a,
.cta .nuxt-link {
  padding: 0.75rem 1.5rem;
  border: 1px solid rgba(249, 250, 251, 0.2);
  border-radius: 999px;
  text-decoration: none;
}

.cta a:first-child,
.cta .nuxt-link:first-child {
  background: #2563eb;
  border-color: #2563eb;
}
</style>
