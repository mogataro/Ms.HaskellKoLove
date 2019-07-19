require('dotenv').config()

const API_KEY = process.env.API_KEY

export default {
  mode: 'spa',
  /*
   ** Headers of the page
   */
  head: {
    title: 'population-graph',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: false,
  /*
   ** Global CSS
   */
  css: ['~/node_modules/ress/dist/ress.min.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/axios',
    { src: '~/plugins/vue-highcharts.js', ssr: false }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/style-resources',
    '@nuxtjs/vuetify'
  ],
  vuetify: {
    // Vuetify の設定はここに書く
    theme: {
      primary: '#3f51b5',
      secondary: '#5cbbf6',
      accent: '#8c9eff',
      error: '#b71c1c'
    }
  },
  axios: {
    proxy: true,
    browserBaseURL: 'https://opendata.resas-portal.go.jp/api',
    // credentials: true,
    init: axios => {
      axios.defaults.xsrfHeaderName = 'X-XSRF-TOKEN'
    }
  },
  proxy: {
    '/api/': { target: 'http:localhost:3000', pathRewrite: { '^/api/': '/' } }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: {
    API_KEY
  }
}
