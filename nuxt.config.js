import axios from 'axios'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title:
      "CluckAndCollect.ie - Dublin's finest pasture raised eggs, chickens and turkeys.",
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/css/main'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Environment Variables
  env: {
    baseUrl: process.env.BASE_URL,
  },

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    // '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  // Generate Configuration
  generate: {
    async routes() {
      const returnedContent = []
      await axios
        .get(`${process.env.BASE_URL}/wp-json/wp/v2/pages`)
        .then((res) => {
          return res.data.map((page) => {
            if (page.slug === 'home') {
              const returnedPage = {
                route: '/',
                payload: page,
              }
              returnedContent.push(returnedPage)
            } else {
              const returnedPage = {
                route: '/' + page.slug,
                payload: page,
              }
              returnedContent.push(returnedPage)
            }
          })
        })

      await axios
        .get(`${process.env.BASE_URL}/wp-json/wp/v2/posts`)
        .then((res) => {
          return res.data.map((page) => {
            const returnedPage = {
              route: '/blog/' + page.slug,
              payload: page,
            }
            returnedContent.push(returnedPage)
          })
        })

      return returnedContent
    },
  },
}
