import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";

// Import Bootstrap an BootstrapVue CSS files (order is important)
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import "bootstrap/dist/js/bootstrap.js";
import "vue3-toastify/dist/index.css";
// Default theme
import "@splidejs/vue-splide/css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Vue3Toastify, { type ToastContainerOptions } from "vue3-toastify";
import VueSplide from "@splidejs/vue-splide";

// Import Bootstrap and BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { MotionPlugin } from "@vueuse/motion";
import "../node_modules/vue3-emoji-picker/dist/style.css";

createApp(App)
  .use(store)
  .use(router)
  .use(Vue3Toastify, {
    autoClose: 3000,
    toastStyle: {
      borderRadius: "16px",
    }
  } as ToastContainerOptions)
  .use(VueSplide)
  .use(MotionPlugin)
  .mount("#app");