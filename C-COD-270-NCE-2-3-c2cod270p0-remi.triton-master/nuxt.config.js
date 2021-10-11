export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'rotten_tomates',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  serverMiddleware: {
    '/api': '~/api'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/vuetify',
    '@nuxtjs/tailwindcss'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',

    '@nuxtjs/auth'

  ],



  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL:'https://sleepy-crag-46993.herokuapp.com/'
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  auth: {
    strategies: {
      local: {
        token:{
            type:'Bearer'
        },
        endpoints: {
          login: { url: "/api/users/login", method: 'post',  propertyName: 'token' },
          logout: { url: "/api/users/logout", method: 'post'},
          user: { url: "/api/users/profile", method: 'post', propertyName:false }
        },
      }
    }

  }

}

