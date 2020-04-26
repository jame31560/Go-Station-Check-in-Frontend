import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isLogin: true,
    token: "",
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_AUTH(state, options) {
      state.token = options.token;
      state.isLogin = options.isLogin;
    },
  },
  actions: {
    setAuth(context, options) {
      context.commit("SET_AUTH", {
        token: options.token,
        isLogin: options.isLogin,
      });
    },
  },
});
