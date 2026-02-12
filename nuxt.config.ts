import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  css: ['~/assets/scss/main.scss'],

  app: {
    head: {
      title: 'test todo',
    },
  },

  modules: [
    '@pinia/nuxt',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
  },

  features: {
    inlineStyles: false,
  },
})
