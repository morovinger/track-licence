// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  
  modules: [
    '@nuxt/content',
    'nuxt-studio',
    '@nuxtjs/tailwindcss',
    '@nuxt/image',
  ],

  // Fix for nuxt-studio H3Error
  vite: {
    optimizeDeps: {
      include: ['brace-expansion']
    }
  },

  app: {
    baseURL: '/track-licence/',
    head: {
      title: 'Тракторные Права РФ - Обучение на тракторные права',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Обучение на тракторные права. Стоимость от 7000 ₽. Быстро, выгодно, легально. 99% сдают с первого раза.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800;900&display=swap' }
      ]
    }
  },

  tailwindcss: {
    cssPath: '~/assets/css/main.css',
    configPath: 'tailwind.config.ts',
  },

  image: {
    quality: 80,
    format: ['webp', 'png', 'jpg'],
  },

  studio: {
    // Studio admin route (default: '/_studio')
    route: '/_studio',

    // Git repository configuration (owner and repo are required)
    repository: {
      provider: 'github', // 'github' or 'gitlab'
      owner: 'morovinger', // your GitHub/GitLab username or organization
      repo: 'track-licence', // your repository name
      branch: 'main', // the branch to commit to (default: main)
    }
  }
})
