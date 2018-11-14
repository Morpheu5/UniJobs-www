module.exports = {
  /* Headers of the page */
  head: {
    title: 'UniJobs.it',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'unijobs.it' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lora:400,700|Roboto+Mono:400,700|Titillium+Web:300,400,600,700' },
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
        });
      }
    }
  },
  css: [
    '@/assets/_custom_theme.scss'
  ],
  router: {
    middleware: [
      'prepend_locale',
    ],
  },
  modules: [
    [ '@nuxtjs/axios', {
      baseURL: process.env.API_URL || 'http://localhost:3000'
    }],
    [ '@nuxtjs/google-analytics', {
      id: 'UA-126329174-1',
      disabled: function() {
        // const cookieparser = require('cookieparser');
        // const cookies = cookieparser.parse(document.cookie);
        // if (cookies.analytics_optin) {
        //   return false;
        // } else {
        //   return true; // disable unless user has opted in
        // }
        return process.env.NODE_ENV !== 'production';
      },
    }],
    [ '@digibytes/markdownit', {
      injected: true,
      html: true,
    }],
    [ 'bootstrap-vue/nuxt', {
      css: false
    }],
    [ 'nuxt-i18n', {
      locales: [
        { code: 'en', iso: 'en-GB', name: 'English', file: 'en-GB.js' },
        { code: 'it', iso: 'it-IT', name: 'Italiano', file: 'it-IT.js' }
      ],
      seo: false,
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
            'faUserCircle',
            'faSmile',
            'faExclamationTriangle',
            'faTimes',
            'faArrowRight',
            'faArrowCircleRight'
          ]
        },
        {
          set: '@fortawesome/free-regular-svg-icons',
          icons: [
            'faSmile'
          ]
        }
      ]
    }],
  ],
  plugins: [
    // { src: '~/plugins/toggle_analytics.js', ssr: false },
    '~/plugins/axios.js',
    '~/plugins/utils.js',
  ]
};
