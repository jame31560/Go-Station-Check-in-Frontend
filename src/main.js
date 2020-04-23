import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueAnalytics from "vue-analytics";

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: "UA-164319527-1",
  router,
  autoTracking: {
    pageviewOnLoad: false,
  },
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
