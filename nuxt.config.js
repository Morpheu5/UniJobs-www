module.exports = {
  /* Headers of the page */
  head: {
    title: 'UniJobs.it',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'unijobs.it' },
      { name: 'msapplication-TileColor', content: '#0066cc' },
      { name: 'theme-color', content: '#ffffff' }
    ],
    link: [
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Lora:400,700|Roboto+Mono:400,700|Titillium+Web:300,400,600,700' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#0066cc' },
      { rel: 'shortcut icon', href: '/favicon.ico' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /* Customize the progress bar color */
  loading: false, //{ color: '#1E90FF' },
  /* Build configuration */
  build: {
    extractCSS: true,
    parallel: process.env.NODE_ENV === 'production',
    /* Run ESLint on save */
    extend (config, { isDev, isClient, loaders: { vue } }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        });
        config.devtool = 'source-map';
      }
      vue.transformAssetUrls.video = ['src', 'poster'];
      vue.transformAssetUrls.use = ['href', 'xlink:href'];
    }
  },
  css: [
    '@/assets/_custom_theme.scss'
  ],
  router: {
    middleware: [
      'whoami',
      'prepend_locale',
    ],
  },
  env: {
    editorBaseUrl: process.env.EDITOR_URL || 'http://localhost:8081',
    cdnBaseUrl: process.env.CDN_URL || 'http://localhost:3000'
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
    [ '@nuxtjs/google-adsense', {
      id: 'ca-pub-5066013786478491',
      analyticsUacct: 'UA-126329174-1',
      analyticsDomainName: 'unijobs.it',
      pageLevelAds: false,
      // test: true
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
            'faArrowCircleRight',
            'faEdit'
          ]
        },
        {
          set: '@fortawesome/free-regular-svg-icons',
          icons: [
            'faSmile',
            'faEnvelope',
            'faClock',
            'faCalendarAlt'
          ]
        },
        {
          set: '@fortawesome/free-brands-svg-icons',
          icons: [
            'faTwitter',
            'faFacebook',
            'faLinkedin'
          ]
        }
      ]
    }],
  ],
  plugins: [
    // { src: '~/plugins/toggle_analytics.js', ssr: false },
    '~/plugins/axios.js',
    '~/plugins/utils.js',
    { src: '~/plugins/vue-social-sharing.js', ssr: false },
  ]
};
