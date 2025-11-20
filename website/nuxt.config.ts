export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  nitro: {
    preset: 'cloudflare-pages',
  },
  modules: ['@nuxt/ui', '@tresjs/nuxt'],
  ui: {
    primary: 'violet',
    gray: 'slate',
  },
  app: {
    head: {
      title: 'Cloudflare Nuxt Pages Kit',
      meta: [{ name: 'description', content: 'Nuxt + Cloudflare Pages 脚手架官网' }],
    },
  },
})
