import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    is_login: true,
    token: "",
  },
  plugins: [createPersistedState()],
  mutations: {
    SET_AUTH(state, options) {
      state.token = options.token;
      state.is_login = options.is_login;
    },
  },
  actions: {
    setAuth(context, options) {
      context.commit("SET_AUTH", {
        token: options.token,
        is_login: options.is_login,
      });
    },
  },
});
