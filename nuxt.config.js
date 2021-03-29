// import data from './static/pages.json'
// const dynamicRoutes = () => {
//   return new Promise((resolve) => {
//     console.warn(data)
//     // resolve(data.map((page) => `/${page.slug}`))
//     const pageRoutes = []
//     pageRoutes.push('/')
//     pageRoutes.push('/contact-us')
//     resolve(pageRoutes)
//   })
// }

import axios from 'axios'
const dynamicRoutes = async () => {
  const contentRoutes = []
  const contentTypes = ['pages', 'posts']
  for (let index = 0; index < contentTypes.length; index++) {
    const contentType = contentTypes[index]
    await axios
      .get(`https://cms.jampress.io/wp-json/wp/v2/${contentType}`)
      .then((res) => {
        return res.data.map((contentItem) => {
          if (contentType === 'pages') {
            if (contentItem.slug === 'home') {
              contentRoutes.push(`/`)
            } else {
              contentRoutes.push(`/${contentItem.slug}`)
            }
          } else if (contentType === 'posts') {
            contentRoutes.push(`/blog/${contentItem.slug}`)
          }
        })
      })
  }
  return contentRoutes
}

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: true,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'frontend-nuxt',
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
    baseUrl: process.env.BASE_URL || 'https://cms.jampress.io',
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
    routes() {
      return axios
        .get('https://cms.jampress.io/wp-json/wp/v2/pages')
        .then((res) => {
          return res.data.map((page) => {
            if (page.slug === 'home') {
              return {
                route: '/',
                payload: page,
              }
            } else {
              return {
                route: '/' + page.slug,
                payload: page,
              }
            }
          })
        })
    },
  },

  // generate: {
  //   routes: dynamicRoutes,
  // },
}
