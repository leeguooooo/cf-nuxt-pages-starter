export default defineNuxtConfig({
  compatibilityDate: '2024-12-01',
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
