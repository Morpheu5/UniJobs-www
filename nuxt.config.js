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
    vendor: [
      'jquery/dist/jquery.min.js',
      'bootstrap-italia/dist/js/bootstrap-italia.bundle.min.js',
    ],
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
  router: {
    middleware: ['prepend_locale'],
  },
  modules: [
    [ '@nuxtjs/axios', {
      baseURL: process.env.API_URL || 'http://localhost:3000'
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
        { code: 'en', iso: 'en-UK', name: 'English', file: 'en-UK.js' },
        { code: 'it', iso: 'it-IT', name: 'Italiano', file: 'it-IT.js' }
      ],
      lazy: true,
      langDir: 'langs/',
      vueI18n: {
        fallbackLocale: 'it'
      },
      strategy: 'prefix',
      rootRedirect: 'it',
      defaultLocale: 'it'
    }],
    [ 'cookie-universal-nuxt' ],
    [ 'nuxt-fontawesome', {
      component: 'fa',
      imports: [
        {
          set: '@fortawesome/free-solid-svg-icons',
          icons: [
            'faEye', 'faEyeSlash',
            'faUserCircle'
          ]
        },
      ]
    }],
  ],
  plugins: [
    '~/plugins/axios.js',
    '~/plugins/utils.js'
  ]
}
