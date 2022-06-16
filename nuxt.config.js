import colors from 'vuetify/es5/util/colors'
import auth from './config/auth'

export default {
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    htmlAttrs: {
      lang: 'en',
      class: 'notranslate',
      translate: 'no'
    },
    titleTemplate: '%s - CMU Blog',
    title: 'Home',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'msapplication-TileColor', content: '#082141' },
      { name: 'msapplication-TileImage', content: '/icons/ms-icon-144x144.png' },
      { name: 'theme-color', content: '#eb9421' },
      { name: 'google', value: 'notranslate' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/icons/favicon.ico' },
      { rel: 'apple-touch-icon', sizes: '57x57', href: '/icons/apple-icon-57x57.png' },
      { rel: 'apple-touch-icon', sizes: '60x60', href: '/icons/apple-icon-60x60.png' },
      { rel: 'apple-touch-icon', sizes: '72x72', href: '/icons/apple-icon-72x72.png' },
      { rel: 'apple-touch-icon', sizes: '76x76', href: '/icons/apple-icon-76x76.png' },
      { rel: 'apple-touch-icon', sizes: '114x114', href: '/icons/apple-icon-114x114.png' },
      { rel: 'apple-touch-icon', sizes: '120x120', href: '/icons/apple-icon-120x120.png' },
      { rel: 'apple-touch-icon', sizes: '144x144', href: '/icons/apple-icon-144x144.png' },
      { rel: 'apple-touch-icon', sizes: '152x152', href: '/icons/apple-icon-152x152.png' },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/icons/apple-icon-180x180.png' },
      { rel: 'icon', type: 'image/png', sizes: '36x36', href: '/icons/android-icon-36x36.png' },
      { rel: 'icon', type: 'image/png', sizes: '48x48', href: '/icons/android-icon-48x48.png' },
      { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/icons/android-icon-192x192.png' },
      { rel: 'icon', type: 'image/png', sizes: '70x70', href: '/icons/ms-icon-70x70.png' },
      { rel: 'icon', type: 'image/png', sizes: '150x150', href: '/icons/ms-icon-150x150.png' },
      { rel: 'icon', type: 'image/png', sizes: '310x310', href: '/icons/ms-icon-310x310.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/icons/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/icons/favicon-96x96.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/icons/favicon-16x16.png' }
    ]
  },

  serverMiddleware: [
    '~/api/oauth2',
    '~/api/server'
  ],

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-free/css/all.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/lodash.js',
    '~/plugins/helpers.js',
    '~/plugins/notifier.js',
    '~/plugins/breadcrumbs.js',
    '~/plugins/overlay.js',
    '~/plugins/event-bus.js',
    '~/plugins/v-mask.js',
    '~/plugins/thai-bath-text.js',
    '~/plugins/v-uppercase.js',
    '~/plugins/base64-to-blob.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    '@nuxtjs/dayjs',
    ['v-currency-field/nuxt-treeshaking', {
      locale: 'th-TH',
      // decimalLength: 2,
      autoDecimalMode: true,
      min: null,
      max: null,
      defaultValue: null,
      valueAsInteger: false,
      allowNegative: true
    }]
  ],

  auth,

  dayjs: {
    locales: ['en', 'th'],
    defaultLocale: 'th',
    defaultTimeZone: 'Asia/Bangkok',
    plugins: [
      'utc',
      'timezone',
      'buddhistEra',
      'localeData'
    ]
  },

  pwa: {
    meta: {
      title: 'CMU Blog',
      author: 'FK'
    },
    manifest: {
      name: 'CMU Blog',
      short_name: 'CMUBg',
      lang: 'en',
      display: 'standalone',
      background_color: '#eb9421',
      theme_color: '#082141',
      description: 'Blog for CMU User'
    },
    workbox: {
      enabled: process.env.NODE_ENV === 'production'
    }
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#3E133B',
          accent: '#1A0218',
          secondary: '#7A2674',
          info: '#ff4ef2',
          warning: '#FFFF41',
          error: '#7D3030',
          success: '#233723'
        },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    cache: true,
    hardSource: true
  },
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.API_URL || 'http://localhost:3000',
    apiDirectory: process.env.API_DIR || '/api/'
  }
}
