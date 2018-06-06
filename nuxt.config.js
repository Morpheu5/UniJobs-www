module.exports = {
  /* Headers of the page */
  head: {
    title: 'Jobs',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'jobs.ac.it' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /* Customize the progress bar color */
  loading: { color: '#1E90FF' },
  /* Build configuration */
  build: {
    /* Run ESLint on save */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  css: [
    '@/assets/_custom_theme.scss'
  ],
  modules: [
    [ '@nuxtjs/axios', {
      baseURL: process.env.API_URL || 'http://localhost:3000',
      requestInterceptor: (config) => {
        throw new Error();
        config.headers.common["Accept"] = "application/json";
        return config;
      }
    }],
    [ '@nuxtjs/markdownit', {
      injected: true,
      html: true,
    }],
    [ 'bootstrap-vue/nuxt', {
      css: false
    }],
    [ 'nuxt-i18n', {
      locales: [
        { code: 'it', iso: 'it-IT', name: 'Italiano' },
        { code: 'en', iso: 'en-UK', name: 'English' }
      ],
      vueI18n: {
        fallbackLocale: 'it',
        messages: {
          it: {
            headline: 'Lavori accademici in Italia'
          },
          en: {
            headline: 'Academic jobs in Italy'
          }
        }
      },
      strategy: 'prefix'
    }]
  ],
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/utils.js'
  ]
}
