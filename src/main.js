import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import VueAnalytics from "vue-analytics";
import vueaxios from "vue-axios";
import axios from "axios";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.config.productionTip = false;

Vue.use(VueAnalytics, {
  id: "UA-164319527-1",
  router,
  autoTracking: {
    pageviewOnLoad: false,
  },
});
Vue.use(require("vue-moment"));
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyC5diImqG3h3DAqo_7dp8DiO3muZ6NO-JM",
    libraries: "places", // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
});

Vue.use(vueaxios, axios);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
