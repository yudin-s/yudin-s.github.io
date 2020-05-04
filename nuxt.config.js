const routerBase = process.env.DEPLOY_ENV === 'GH_PAGES' ? {
  router: {
    base: '/'
  }
} : {}

export default {
  ...routerBase,

  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_description || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    { src: '@assets/css/bootstrap.min.css' },
    { src: '@assets/css/font-awesome.min.css', },

    { src: '@assets/css/style.css' },
    { src: '@assets/css/reset.css' },
    { src: '@assets/css/magnific-popup.css' },
    { src: '@assets/css/color-1.css' },
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@plugins/vue-see-on-github',

  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/google-gtag',

  ],

  'google-gtag':{
    id: 'UA-165421608-1',
    config:{
      anonymize_ip: false, // anonymize IP
      send_page_view: false, // might be necessary to avoid duplicated page track on page reload
      linker:{
        domains:['yudin-s.github.io']
      }
    },
    debug: true, // enable to track in dev mode
    disableAutoPageTrack: false,
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
