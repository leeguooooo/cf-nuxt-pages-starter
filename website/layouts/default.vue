<template>
  <div class="layout">
    <header class="site-nav">
      <div class="nav-inner">
        <NuxtLink to="/" class="logo">
          <span class="logo-dot" />
          <div>
            <span class="logo-title">Cloudflare Nuxt Pages Kit</span>
            <span class="logo-caption">Edge-ready Nuxt 4 + Pages stack</span>
          </div>
        </NuxtLink>

        <nav class="nav-links">
          <NuxtLink to="/">产品</NuxtLink>
          <NuxtLink to="/docs">Docs</NuxtLink>
          <NuxtLink to="/blog">Blog</NuxtLink>
          <NuxtLink to="/tutorial">Tutorial</NuxtLink>
        </nav>

        <div class="nav-cta">
          <NuxtLink class="btn ghost" to="/docs">查看方案</NuxtLink>
          <a
            class="btn primary"
            href="https://github.com/leeguooooo/cf-nuxt-pages-starter/tree/main/template"
            target="_blank"
            rel="noreferrer"
          >
            一键部署
          </a>
        </div>
      </div>
    </header>

    <div class="slot-wrapper">
      <slot />
    </div>

    <footer class="site-footer">
      <div>
        <p class="logo-text">Cloudflare Nuxt Pages Kit</p>
        <p class="muted">
          Nuxt 4 + Cloudflare Pages 脚手架，覆盖多账号、D1、营销官网与自动化部署。
        </p>
      </div>
      <div class="footer-links">
        <NuxtLink to="/docs">Docs</NuxtLink>
        <NuxtLink to="/blog">Blog</NuxtLink>
        <NuxtLink to="/tutorial">Tutorial</NuxtLink>
        <a href="https://github.com/leeguooooo/cf-nuxt-pages-starter" target="_blank" rel="noreferrer">GitHub</a>
      </div>
      <p class="muted">© {{ new Date().getFullYear() }} Cloudflare Nuxt Pages Kit · Run on the edge.</p>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: radial-gradient(circle at top, rgba(15, 23, 42, 0.08), transparent 55%),
    #f6f8ff;
}

.site-nav {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgba(5, 6, 31, 0.9);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.75rem clamp(1.25rem, 4vw, 3rem);
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #fff;
}

.logo-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #5eead4, #6366f1);
}

.logo-title {
  font-weight: 700;
  font-size: 0.95rem;
}

.logo-caption {
  display: block;
  font-size: 0.73rem;
  opacity: 0.7;
}

.nav-links {
  display: flex;
  gap: 1rem;
  margin-left: auto;
}

.nav-links a,
.nav-links .nuxt-link {
  color: rgba(255, 255, 255, 0.75);
  text-decoration: none;
  font-weight: 500;
}

.nav-links .nuxt-link-exact-active {
  color: #fff;
}

.nav-cta {
  display: flex;
  gap: 0.5rem;
  margin-left: 1rem;
}

.btn {
  text-decoration: none;
  border-radius: 999px;
  padding: 0.4rem 1.25rem;
  font-weight: 600;
  border: 1px solid rgba(255, 255, 255, 0.35);
  color: #fff;
  font-size: 0.9rem;
}

.btn.primary {
  border: none;
  background: linear-gradient(120deg, #f97316, #ea580c);
}

.slot-wrapper {
  flex: 1;
}

.site-footer {
  margin-top: auto;
  padding: 2.5rem clamp(1.5rem, 4vw, 3rem);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  background: #fff;
}

.footer-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-links a,
.footer-links .nuxt-link {
  text-decoration: none;
  color: #0f172a;
  font-weight: 600;
}

.logo-text {
  font-weight: 700;
  font-size: 1.1rem;
}

.muted {
  color: rgba(15, 23, 42, 0.65);
  margin: 0;
}

@media (max-width: 960px) {
  .nav-inner {
    flex-wrap: wrap;
  }

  .nav-links {
    width: 100%;
    margin-left: 0;
    justify-content: space-between;
  }

  .nav-cta {
    width: 100%;
    margin-left: 0;
  }

  .btn {
    flex: 1;
    text-align: center;
  }
}

@media (prefers-color-scheme: dark) {
  .layout {
    background: radial-gradient(circle at top, rgba(15, 23, 42, 0.4), rgba(2, 6, 23, 1));
  }

  .site-footer {
    background: rgba(2, 6, 23, 0.8);
    border-color: rgba(148, 163, 184, 0.2);
  }

  .footer-links a,
  .footer-links .nuxt-link {
    color: #e2e8f0;
  }

  .muted {
    color: rgba(226, 232, 240, 0.75);
  }
}
</style>
