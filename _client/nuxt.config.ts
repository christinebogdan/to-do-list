// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  app: {
    head: {
      title: "To Do List",
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.svg" }],
    },
  },
  ssr: false,
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
  imports: {
    dirs: [
      // Scan composables from nested directories
      "composables/**",
    ],
  },
  modules: ["@nuxtjs/tailwindcss", "@pinia/nuxt"],
  css: ["@/assets/css/index.css"],
  vite: {
    server: {
      proxy: {
        "^/api/.*": {
          target: "http://127.0.0.1:8000",
          secure: false,
          // rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
  },
};
