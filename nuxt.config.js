export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: "universal",
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: "server",
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: "vant/lib/index.css" },
    { src: "~assets/css/common.css" },
    { src: "~assets/css/color.css" },
    { src: "~assets/css/global.css" }
  ],
  env: {
    env_config: process.env.env_config || "dev",
    baseUrl: process.env.BASE_URL || "http://localhost:3000"
  },
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    {
      src: "~/plugins/main",
      ssr: true
    },
    {
      src: "~/plugins/axios",
      ssr: true
    }
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios"
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {},
  proxy: {
    "/innerApi": {
      target: "http://test-m-shop.mayi888.cn/",
      changeOrigin: true
    }
  },
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {}
};
