export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  ssr: false,
  devtools: { enabled: true },
  modules: ['@pinia/nuxt'],
  nitro: {
    preset: 'cloudflare-pages',
  },
  runtimeConfig: {
    public: {
      apiBase: '/api',
    },
  },
})
